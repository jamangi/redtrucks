#!/usr/bin/python3
'''
    Package initializer
'''

from models.base_model import BaseModel
from models.visitor import Visitor
from models.engine.file_storage import FileStorage

classes = {"Visitor": Visitor, "BaseModel": BaseModel}

storage = FileStorage()
storage.reload()