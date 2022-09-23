import json
from constants import DOCTORS_PATH

def get_available_doctors():
	doctors_file = open(DOCTORS_PATH) 
	doctors = json.load(doctors_file)
	doctors_file.close()
	available_doctor = []

	for doc in doctors["doctors"]:
		available_slots = []
		for slot in doc["availability"]:
			available_timeslots = get_available_timeslots(slot["timeslots"])
			if len(available_timeslots) != 0:
				slot["timeslots"] = available_timeslots
				available_slots.append(slot)
		if len(available_slots) != 0:
			doc["availability"] = available_slots
			available_doctor.append(doc)

	return available_doctor

def get_available_timeslots(timeslots):
	available_timeslots_time = []
	for slot in timeslots:
		if slot["status"] != "booked":
			available_timeslots_time.append(slot["time"])
	return available_timeslots_time

def get_filters_from_entities(entities):
	filters = []
	for entity in entities:
		if entity["entityType"] != "other":
			filters.append(entity)
	return filters

def get_filtered_doctors(available_doctors, filters):
	filtered_doctors = []

	for doc in available_doctors:
		addDoc = True
		for filter in filters:
			if filter["entityType"] in doc:
				if doc[filter["entityType"]] != filter["entityValue"]:
					addDoc = False
					break
		if addDoc == True:
			filtered_doctors.append(doc)

	return filtered_doctors