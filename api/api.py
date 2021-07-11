import json
from flask import Flask
from flask.wrappers import Request
from flask_cors import CORS
from flask import request
from functions.solution1 import getDeterminant
from functions.solution2 import *

app = Flask(__name__)
CORS(app)

@app.route('/time')
def sarrus_method():
    return {'result': 'result'}

@app.route("/solution1", methods=["POST"])
def test():
    result = request.json
    matrix = result["matrix"]

    return {'result': getDeterminant(matrix)}

@app.route("/solution2", methods=["POST"])
def test2():
    result = request.json
    matrix = result["matrix"]
    return {'colA': colA(matrix),'nulA': nulA(matrix),'rangoA': rangeA(matrix), 'filaA': rowA(matrix), 'dimensionnula': nuldimention(matrix)}
