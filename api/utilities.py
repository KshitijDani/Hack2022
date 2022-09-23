import json
import requests

from constants import DOCTORS_PATH
from constants import NLU_URL

from testFunctions import *
from appointmentExtensions import *

def search_for_client(requestBody):
	available_doctors = get_available_doctors()
	print(requestBody)

	#Use for demo
	# additionalParam = requestBody["searchString"]
	# if additionalParam == "":
	# 	return []
	# print(additionalParam)
	# print(additionalParam)
	#additionalParam = "cancer doctors in Bangalore"
	# URL = NLU_URL+ "?searchString=" + additionalParam
	# r = requests.get(url = URL)
	# entities = r.json()

	#Use to test - comment out later
	entities = get_test_entities()
	entities = []

	filters = get_filters_from_entities(entities)
	filtered_doctors = get_filtered_doctors(available_doctors, filters)
	print(filtered_doctors)
	return filtered_doctors

def book_appointment_for_client(requestBody):
	doctor_id = requestBody['doctorId']
	availability_date = requestBody['date']
	availability_slot = requestBody['slotTiming']
	doctor = {}
	booked_slot = {}
	booked_timeslot = {}

	available_doctors_file = open(DOCTORS_PATH, "r") 
	available_doctors = json.load(available_doctors_file)
	available_doctors_file.close()

	for available_doctor in available_doctors["doctors"]:
		if doctor_id == available_doctor["id"]:
			for slot in available_doctor["availability"]:
				if slot["date"] == availability_date:
					for timeslot in slot["timeslots"]:
						if availability_slot == timeslot["time"]:
							timeslot["status"] = "booked"
							booked_timeslot = timeslot
							booked_slot = slot
							doctor = available_doctor

	with open(DOCTORS_PATH, "w") as outfile:
		json.dump(available_doctors, outfile)

	booked_slot["timeslots"] = [booked_timeslot]
	doctor["availability"] = booked_slot
	return doctor

def get_confirmed_appointment_list():
	doctors_file = open(DOCTORS_PATH) 
	doctors = json.load(doctors_file)
	doctors_file.close()
	booked_doctors = []

	for doc in doctors["doctors"]:
		booked_slots = []
		for slot in doc["availability"]:
			booked_timeslots = []
			for timeslot in slot["timeslots"]:
				if timeslot["status"] == "booked":
					booked_timeslots.append(timeslot)	
			if len(booked_timeslots) != 0:
				slot["timeslots"] = booked_timeslots
				booked_slots.append(slot)
		if(len(booked_slots) != 0):
			doc["availability"] = booked_slots
			booked_doctors.append(doc)

	return booked_doctors

def cancel_appointment_for_client(requestBody):
	doctor_id = requestBody['doctorId']
	availability_date = requestBody['date']
	availability_slot = requestBody['slotTiming']
	doctor = {}
	booked_slot = {}
	booked_timeslot = {}

	available_doctors_file = open(DOCTORS_PATH, "r") 
	available_doctors = json.load(available_doctors_file)
	available_doctors_file.close()

	for available_doctor in available_doctors["doctors"]:
		if doctor_id == available_doctor["id"]:
			for slot in available_doctor["availability"]:
				if slot["date"] == availability_date:
					for timeslot in slot["timeslots"]:
						if availability_slot == timeslot["time"]:
							timeslot["status"] = "not-booked"
							booked_timeslot = timeslot
							booked_slot = slot
							doctor = available_doctor

	with open(DOCTORS_PATH, "w") as outfile:
		json.dump(available_doctors, outfile)

	booked_slot["timeslots"] = [booked_timeslot]
	doctor["availability"] = booked_slot
	return doctor

def get_health_records():
	return {
  "HealthRecords": [
    "https://microsoftapc-my.sharepoint.com/:b:/g/personal/ksdani_microsoft_com/EVC67o1u9f5Jk_KwclcLouQBJfiZAE0nBfweMJdVZr-oew?e=tH8of1",
    "https://microsoftapc-my.sharepoint.com/:b:/g/personal/ksdani_microsoft_com/EXyvdYRZqvxMp4QsGbp3pDkBzFWuhz9QedRdwGlugQe2qQ?e=wLTQvo",
    "https://microsoftapc-my.sharepoint.com/:b:/g/personal/ksdani_microsoft_com/EQ94CEEbTsFKmO6LBpzdErIB_Z_-kjpdvlQr4Ozw20kokQ?e=KkOM8P"
  ]
}




