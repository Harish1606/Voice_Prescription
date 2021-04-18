from flask import Flask,request,Response,jsonify,session,render_template,make_response
from flask_cors import CORS
import pymongo
import json
from bson.objectid import ObjectId
from functools import wraps
import jwt
import datetime
import pdfkit
from pdf_mail import sendpdf
import os
from prescription_combined import Prescription

app=Flask(__name__)
app.config['SECRET_KEY']='voice_prescription'

cors=CORS(app)

#Database configuration
client=pymongo.MongoClient("mongodb+srv://harish:harish1606@cluster0.1ktjl.mongodb.net/Voice?retryWrites=true&w=majority")
Database=client.get_database('Voice')

path_wkhtmltopdf = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'
config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)

def check_for_token(func):
    @wraps(func)
    def wrapped(*args,**kwargs):
        token=request.args.get('token')
        if not token:
            return jsonify({'message':'Missing token'}),403
        try:
            jwt.decode(token,app.config['SECRET_KEY'])
        except:
            return jsonify({'message':'Invalid token'}),403
        return func(*args,**kwargs)
    return wrapped

@app.route("/")
def index():
    if not session.get('logged_in'):
        return Response(response=json.dumps({"message":"user not logged in"}),status=500,mimetype="application/json")
    else:
        return Response(response=json.dumps({"message":"user already logged in"}),status=200,mimetype="application/json")

@app.route("/login",methods=['POST'])
def login():
    try:
        user=Database.users.find_one({'email':request.get_json()['email'],'password':request.get_json()['password']})
        user["_id"]=str(user["_id"])
        if user:
            if request.get_json()['email'] and request.get_json()['password']:
                session['logged_in']=True
                try:
                    payload={'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=60),'iat': datetime.datetime.utcnow(),'sub': request.get_json()['email']}
                    return jsonify({'token':jwt.encode(
                        payload,
                        app.config.get('SECRET_KEY'),
                        algorithm='HS256'
                    ),'id':user["_id"]})
                except Exception as e:
                    return e
        else:
            return Response(response=json.dumps({"message":"User credential is wrong"}),status=500,mimetype="application/json")
    except Exception as e:
        return e

@app.route("/register",methods=['POST'])
def register():
    try:
        user=Database.users.find_one({'email':request.get_json()['email']})
        if not user:
            dbResponse=Database.users.insert_one({"email":request.get_json()['email'],"username":request.get_json()['username'],"qualification":request.get_json()['qualification'],"address":request.get_json()['address'],"regno":request.get_json()['regno'],"mobileno":request.get_json()['mobileno'],"hospitalname":request.get_json()['hospitalname'],"password":request.get_json()['password'],"theme":request.get_json()['theme'],"pin":request.get_json()['pin']})
            if request.get_json()['email'] and request.get_json()['username'] and request.get_json()['password']:
                session['logged_in']=True
                try:
                    payload={'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=60),'iat': datetime.datetime.utcnow(),'sub': request.get_json()['email']}
                    return jsonify({'token':jwt.encode(
                        payload,
                        app.config.get('SECRET_KEY'),
                        algorithm='HS256'
                    ),'id':f"{dbResponse.inserted_id}"})
                except Exception as e:
                    return e
        else:
            return Response(response=json.dumps({"message":"email is already present"}),status=500,mimetype="application/json")
    except Exception as ex:
        return ex

@app.route("/pin",methods=['POST'])
def updatePin():
    try:
        Database.users.update_one({'_id':ObjectId(request.get_json()['_id'])},{"$set":{"pin":request.get_json()['pin']}})
        return jsonify({"message":"Registered successfully"})
    except Exception as e:
        return e

@app.route("/userdetailsbyid",methods=['POST'])
def user_DetailsById():
    try:
        user=Database.users.find_one({'_id':ObjectId(request.get_json()['_id'])})
        user["_id"]=str(user["_id"])
        return jsonify(user)
    except Exception as e:
        return e

@app.route("/theme",methods=['POST'])
def save_Theme():
    try:
        Database.users.update_one({'_id':ObjectId(request.get_json()['_id'])},{"$set":{"theme":request.get_json()['theme']}})
        return jsonify({"message":"Theme saved successfully"})
    except Exception as e:
        return e

@app.route("/updatedetails",methods=['POST'])
def update_Details():
    try:
        Database.users.update_one({'_id':ObjectId(request.get_json()['_id'])},{"$set":{"email":request.get_json()['email'],"username":request.get_json()['username'],"qualification":request.get_json()['qualification'],"address":request.get_json()['address'],"regno":request.get_json()['regno'],"mobileno":request.get_json()['mobileno'],"hospitalname":request.get_json()['hospitalname'],"password":request.get_json()['password']}})
        return jsonify({"message":"Profile updated successfully"})
    except Exception as e:
        return e

@app.route("/prescription",methods=['POST'])
def generate_Prescription():
    try:
        input_str=request.get_json()['text']
        p=Prescription()
        Extracted_words=p.generate_prescription(input_str)
        prescription={"id":request.get_json()["id"],"email":Extracted_words["email"],"name":Extracted_words["name"],"age":int(Extracted_words["age"]),"gender":Extracted_words["gender"],"mobileno":int(Extracted_words["mobileno"]),"symptoms":"","diagnosis":Extracted_words["diagnosis"],"prescription":Extracted_words["prescription"],"advice":"","date":request.get_json()["date"]}
        dbResponse=Database.prescriptions.insert_one(prescription)
        return Response(response=json.dumps({"id":f"{dbResponse.inserted_id}"}),status=200,mimetype="application/json")
    except Exception as ex:
        return ex

@app.route("/textprescription",methods=['POST'])
def generate_TextPrescription():
    try:
        prescription={"id":request.get_json()["id"],"email":request.get_json()["email"],"name":request.get_json()["name"],"age":request.get_json()["age"],"gender":request.get_json()["gender"],"mobileno":request.get_json()["mobileno"],"symptoms":request.get_json()["symptoms"],"diagnosis":request.get_json()["diagnosis"],"prescription":request.get_json()["prescription"],"advice":request.get_json()["advice"],"date":request.get_json()["date"]}
        dbResponse=Database.prescriptions.insert_one(prescription)
        return Response(response=json.dumps({"id":f"{dbResponse.inserted_id}"}),status=200,mimetype="application/json")
    except Exception as ex:
        return ex


@app.route("/gettextprescription",methods=['POST'])
def get_TextPrescription():
    try:
        prescription=Database.prescriptions.find_one({'_id':ObjectId(request.get_json()['_id'])})
        prescription["_id"]=str(prescription["_id"])
        return jsonify(prescription)
    except Exception as ex:
        return ex

@app.route("/updatetextprescription",methods=['POST'])
def update_TextPrescription():
    try:
        prescription={"email":request.get_json()["email"],"name":request.get_json()["name"],"age":request.get_json()["age"],"gender":request.get_json()["gender"],"mobileno":request.get_json()["mobileno"],"symptoms":request.get_json()["symptoms"],"diagnosis":request.get_json()["diagnosis"],"prescription":request.get_json()["prescription"],"advice":request.get_json()["advice"],"date":request.get_json()["date"]}
        Database.prescriptions.update_one({'_id':ObjectId(request.get_json()['_id'])},{"$set":prescription})
        return jsonify({"message":"Prescription updated successfully"})
    except Exception as e:
        return e

@app.route("/shareprescription",methods=['POST'])
def share_Prescription():
    try:
        Prescription={"_id":request.get_json()["_id"],"id":request.get_json()["id"],"email":request.get_json()["email"],"name":request.get_json()["name"],"age":request.get_json()["age"],"gender":request.get_json()["gender"],"mobileno":request.get_json()["mobileno"],"symptoms":request.get_json()["symptoms"],"diagnosis":request.get_json()["diagnosis"],"prescription":request.get_json()["prescription"],"advice":request.get_json()["advice"],"date":request.get_json()["date"]}
        user=Database.users.find_one({'_id':ObjectId(request.get_json()["id"])})
        user["_id"]=str(user["_id"])
        Prescription["date"]=str(datetime.datetime.fromtimestamp(Prescription["date"]/1000.0)).split()[0][::-1][:-4][::-1][1:]+'-'+str(datetime.datetime.fromtimestamp(Prescription["date"]/1000.0)).split()[0][::-1][-4:][::-1]
        rendered=render_template('index.html',Prescription=Prescription,user=user)
        pdfkit.from_string(rendered,request.get_json()["_id"]+'.pdf',configuration=config)
        k=sendpdf("harishharish3759@gmail.com",request.get_json()["email"],"hariyuvaraj","Prescription","Hi its me Harish, I herewith attached the pdf of the prescription",request.get_json()["_id"],"C:/Users/ELCOT/Desktop/Voice prescription/Server")
        k.email_send()
        if os.path.exists(request.get_json()['_id']+'.pdf'):
            os.remove(request.get_json()['_id']+'.pdf')
        return jsonify({"message":"Prescription sent to the patient mail successfully"})
    except Exception as e:
        return e

@app.route("/getprescriptions",methods=['GET'])
def get_Prescriptions():
    try:
        Prescriptions=list(Database.prescriptions.find())
        for prescription in Prescriptions:
            prescription["_id"]=str(prescription["_id"])
        return jsonify(Prescriptions)
    except Exception as e:
        return e

@app.route("/deleteprescription",methods=['POST'])
def delete_Prescription():
    try:
        Database.prescriptions.delete_one({"_id":ObjectId(request.get_json()["_id"])})
        return jsonify({"message":"Prescription deleted successfully"})
    except Exception as e:
        return e

@app.route("/users",methods=['POST'])
def create_user():
    try:
        user={"name":request.form["name"],"lastName":request.form["lastName"]}
        dbResponse=Database.users.insert_one(user)
        return Response(response=json.dumps({"message":"user created","id":f"{dbResponse.inserted_id}"}),status=200,mimetype="application/json")
    except Exception as ex:
        print(ex)

@app.route("/users",methods=['GET'])
def read_user():
    try:
        data=list(Database.users.find())
        for user in data:
            user["_id"]=str(user["_id"])
        return Response(response=json.dumps(data),status=200,mimetype="application/json")
    except Exception as ex:
        print(ex)
        return Response(response=json.dumps({"message":"user not found"}),status=500,mimetype="application/json")

if __name__=="__main__":
    app.run(host='192.168.43.91',debug=True)