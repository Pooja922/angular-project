from flask import Flask, jsonify,request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import sportspedia_db as sd

app = Flask(__name__)
CORS(app)


@app.route('/cricket')
def get_info_of_cricket():
    info = sd.get_info_of_cricket()
    return jsonify({'cricket_info':info})

@app.route('/cricket/events')
def get_info_of_event():
    info = sd.get_info_of_event()
    return jsonify({'event_info':info})

@app.route('/cricket/players')
def get_info_of_players():
    info = sd.get_info_of_players()
    return jsonify({'players_info':info})

@app.route('/cricket/ipl-teams')
def get_info_of_ipl_teams():
    info = sd.get_ipl_teams_info()
    return jsonify({'ipl_info':info})

@app.route('/cricket/international-teams')
def get_info_of_int_teams():
    info = sd.get_int_teams_info()
    return jsonify({'int_info':info})

if __name__ == "__main__":
    app.run(debug=True)