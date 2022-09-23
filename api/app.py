from utilities import *

from flask import Flask
from flask import jsonify
from flask import request
from flask import Response

from datetime import date,timedelta

app = Flask(__name__)

headers = {"Access-Control-Allow-Origin": "*",'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'}

@app.route('/hello')
def return_hello():
	return {'text': 'hello there'}

@app.route('/search', methods = ['POST'])
def search():
	return (jsonify(search_for_client(request.json))), 200, headers

@app.route('/book_appointment', methods = ['POST'])
def book_appointment():
	return (jsonify(book_appointment_for_client(request.json))), 200, headers

@app.route('/confirmed_appointments', methods = ['POST'])
def confirmed_appointment():
	return (jsonify(get_confirmed_appointment_list())), 200, headers

@app.route('/cancel_appointments', methods = ['POST'])
def cancel_appointment():
	return (jsonify(cancel_appointment_for_client(request.json))), 200, headers

@app.route('/get_health_records', methods = ['POST'])
def get_health_records_for_client():
	return (jsonify(get_health_records())), 200, headers