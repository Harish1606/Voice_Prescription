import speech_recognition as sr 
import playsound 
from gtts import gTTS 
import os
from voice import extract

num=1	
def assistant_speaks(output): 
	global num 

	# num to rename every audio file 
	# with different name to remove ambiguity 
	num += 1
	print("Doctor : ", output) 

	toSpeak = gTTS(text = output, lang ='en', slow = False) 
	# saving the audio file given by google text to speech 
	file = str(num)+".mp3 "
	toSpeak.save(file) 
	
	# playsound package is used to play the same file. 
	playsound.playsound(file, True) 
	os.remove(file) 



def get_audio(): 

	rObject = sr.Recognizer() 
	audio = '' 

	with sr.Microphone() as source: 
		print("Speak...") 
		
		# recording the audio using speech recognition 
		rObject.adjust_for_ambient_noise(source)
		audio = rObject.listen(source,phrase_time_limit=30)

	print("Stop.") # limit 30 secs 
	
	try: 
		text = rObject.recognize_google(audio, language ='en-US') 
		print("You : ", text) 
		return text 

	except: 
		assistant_speaks("Could not understand your audio, Please try again !") 
		return 0

# Driver Code 
if __name__ == "__main__": 
	text1=get_audio()
	assistant_speaks("Say some advice to the patient")
	patient_advice=get_audio() 	
	
	txt=text1.split() 
	patient_name=extract.Prescription.name(txt)
	text1=text1.title()
	txt=text1.split()
	patient_age=extract.Prescription.age(txt)
	patient_gender=extract.Prescription.gender(txt) 
	patient_symptom=extract.Prescription.symptom(txt)
	patient_diagnosis=extract.Prescription.diagnosis(txt)
	patient_medicine=extract.Prescription.medicine(txt) 

	print(patient_name)
	print(patient_age)
	print(patient_gender)
	print(patient_diagnosis)
	print(patient_symptom)
	print(patient_medicine)
	print(patient_advice)



