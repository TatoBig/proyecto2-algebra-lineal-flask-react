import time
from flask import Flask
from flask.wrappers import Request
from flask_cors import CORS
from flask import request
import json

app = Flask(__name__)
CORS(app)

@app.route('/time')
def get_current_time():
    matrix = [
        [2, 5, -3, -1], 
        [3, 0, 1, -3],
        [-6, 0, -4, 9],
        [4, 10, -4, -1]
    ]

    new_matrix = matrix

    for i in range(0, 4):
        for j in range(0, 3):
            new_matrix[i].append(matrix[i][j])
    result = 0
    diagonal_up = 0
    for i in range(0, 4):
        if i == 3 or i == 1:
            diagonal_up = diagonal_up * -1
        result = diagonal_up + result
        diagonal_up = 1
        for j in range(0, 4):
            diagonal_up = new_matrix[j][j+i] * diagonal_up
    result = diagonal_up + result

    result2 = 0
    diagonal_down = 0
    for i in range(0, 4):
        if i == 3 or i == 1:
            diagonal_down = diagonal_down * -1
        result2 = diagonal_down + result2
        diagonal_down = 1
        for j in range(0, 4):
            diagonal_down = new_matrix[3-j][j+i] * diagonal_down
    result2 = diagonal_down + result2

    result = result - result2

    return {'result': new_matrix}

@app.route("/test", methods=["POST"])
def test():
    result = 'test'
    new_matrix = json.loads(request.json)
    print(new_matrix("result"))
    return {'result': 'test'}

