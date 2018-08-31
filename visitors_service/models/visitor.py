#!/usr/bin/python3
'''
    Class representing a visitor
'''
from models.base_model import BaseModel
import models
import os

class Visitor(BaseModel):
    '''
        Definition of the User class
    '''
    ip = ''
    visits = 1