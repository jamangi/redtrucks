#!/usr/bin/python3
'''
    This module contains the routes for the visitor service
'''
from flask import Flask, jsonify, request
from flask_cors import CORS

import models
from models import Visitor

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
cors = CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})

@app.route('/')
def status():
    return jsonify({"status": "OK"})

@app.route('/visit')
def visit():
    """
        Create user if not exists
        Increment user visits otherwise
    """
    ip = request.remote_addr
    visitor = models.storage.get_by_ip(ip)
    if visitor is None:
        visitor = Visitor()
        setattr(visitor, "ip", ip)
        models.storage.new(visitor)
        models.storage.save()
    setattr(visitor, "visits", visitor.visits + 1)
    return jsonify(visitor.to_dict())

@app.route('/visits')
def visit_count():
    """
        Sum of all visits of all visitors
    """
    count = models.storage.visit_count()
    return jsonify({"visits": count})

@app.route('/visitors')
def visitors():
    """
        return list of all visitors
    """
    all_visitors = models.storage.all()
    list_of_dicts = [x.to_dict() for x in all_visitors.values()]
    return jsonify({"visitors": list_of_dicts})

@app.after_request
def handle_cors(response):
    # allow access from other domains
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == "__main__":
    app.run(port=5003)