import json
from flask import Flask
from flask.wrappers import Request
from flask_cors import CORS
from flask import request
from functions.sarrus import getDeterminant

app = Flask(__name__)
CORS(app)

@app.route('/time')
def sarrus_method():
    return {'result': 'result'}

@app.route("/determinant", methods=["POST"])
def test():
    result = request.json
    matrix = result["matrix"]

    return {'result': getDeterminant(matrix)}

