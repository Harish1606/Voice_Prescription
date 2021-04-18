import string
import re
import json
from math import floor
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

class Prescription:
    def __init__(self):
        # Medicine name list
        self.data = [line.rstrip('\n') for line in open('wordlist.txt','r')]

        # Names list
        self.namedata=[line.rstrip('\n') for line in open('names.csv','r', encoding="utf8")]

        # Gender list
        self.gen=['mail','male','email','main','female','unknown']

        # for converting non meaningful words to meaningful words
        self.lemma = WordNetLemmatizer()

        # contains words which is not present in data list(medicine name list)
        self.result=[]
     
        # contains the gender of the patient
        self.gender=[]

        self.meddata = [line.rstrip('\n') for line in open('wordlist2.txt','r')]

        self.timelist=['twice','thrice','once','one','two','three','four','five','six','seven','eight','nine']

        #Contains medicine for patients
        self.medicine=[]

        #contains the dosage of the medicines prescribed
        self.dosage=[]

    def namecatch(self, str):
        str1 = str.lower()
        #removing punctuation
        str2 = str1.translate(str.maketrans('', '', string.punctuation))

        #tokenize all words
        tokens = word_tokenize(str2)

        #create list of all stopwords
        stpwords = list(stopwords.words('english'))

        #removing the stopwords (removing 'a, an, the', etc)
        tokens1 = [word for word in tokens if word not in stpwords]

        #create final list of keywords
        for word in tokens1:
            self.lemma.lemmatize(word)

        self.result = [word for word in tokens1 if (word not in self.data or word in self.namedata)]
        self.gender=[word for word in tokens1 if word in self.gen]
        
        if self.gender:
            if self.gender[0]=="mail" or self.gender[0]=="main" or self.gender[0]=="email":
                self.gender[0]='male'

    def name_code(self, name):
        self.namecatch(name)
        
        if not self.result:
            self.result.append("None")
        self.result[0]=self.result[0].capitalize()
        
        while len(self.result)>1 and self.result[1].isnumeric()==False:
            i=1
            if self.result[i].isnumeric()==False:
                self.result[0]=self.result[0]+" "+self.result[i].capitalize()
                del(self.result[i])
            else:
                self.result[0]=self.result[0].capitalize()
                
        if not self.gender:
            self.gender.append('g')
        if len(self.result)==1:
            self.result.append("NA")
            
        dict_name={
                "name": self.result[0],
                "age": self.result[1],
                "gender": self.gender[0].capitalize()}
        return dict_name

    def assembler(self):
        assembled=""
        for m in self.medicine:
            assembled+=m.capitalize()+" "

        assembly_string=""
        ct=0
        for d in self.dosage:
            if (d in self.timelist or d.isnumeric()) and ct==0:
                assembly_string+=d+"/day"
                ct+=1
            elif (d in self.timelist or d.isnumeric()) and ct>0 and self.dosage.index(d)<len(self.dosage)-1:
                assembly_string+=" X "+d+" "+self.dosage[self.dosage.index(d)+1]
        
        prescription={
                "medicine":assembled,
                "dosage":assembly_string
                }
        return prescription

    def medicine_dosage(self,straw):
        str1 = straw.lower()
        
        str2 = str1.translate(straw.maketrans('', '', string.punctuation))

        tokens = word_tokenize(str2)

        stpwords = list(stopwords.words('english'))
        stpwords.append('per')
        stpwords.append('times')
        tokens1 = [word for word in tokens if word not in stpwords]

        #assmeble final list of keywords
        for word in tokens1:
            self.lemma.lemmatize(word)
          
        self.medicine = [word for word in tokens1 if word in self.meddata and word not in self.timelist or (word.isnumeric() and tokens1.index(word)!=len(tokens1)-1 and (tokens1[tokens1.index(word)+1][-4:-1]=="gra" or tokens1[tokens1.index(word)+1]=="mg"))]
        self.dosage=[word for word in tokens1 if (word not in self.meddata or word in self.timelist) and word not in self.medicine]

    def pres_code(self, pres):
        prescrip=re.split('(days |month |months |year |years |week |weeks)',pres)
        if not prescrip[-1]:
            del(prescrip[-1])
        if(len(prescrip)==2):
            prescrip[0]=prescrip[0]+prescrip[1]
            del(prescrip[1])
        else:
            for i in range(1,len(prescrip)-floor(len(prescrip)/2)):
                prescrip[i-1]=prescrip[i-1]+prescrip[i]
                del(prescrip[i])
        pfinal={}
        for i in range(len(prescrip)):
            p1=str(prescrip[i])
            self.medicine_dosage(p1)
            pfinal["prescription"+str(i+1)]=self.assembler()
        return(pfinal)
    
    def email_code(self,email):
        emails=re.findall(r"[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+", email)
        d={"email":emails}
        return d
    
    def diagnosis_code(self,diagnosis):
        diagnosis_list=['Hypertension','Hyperlipidemia','Diabetes','Back','Pain','Anxiety','Obesity','Allergic','Rhinitis','Reflux','Esophagitis','Respiratory','Problems','Hypothyroidism','Visual','Refractive','Errors','General','Medical','Exam','Osteoarthritis','Fibromyalgia','Myositis','Malaise','And','Fatigue','Pain','In','Joint','Acute','Laryngopharyngitis','Maxillary','Sinusitis','Major','Depressive','Disorder','Bronchitis','Asthma','Depressive','Disorder','Nail','Fungus','Coronary','Atherosclerosis','Urinary','Tract','Infection']
        final=''
        for i in diagnosis.split():
            if i in diagnosis_list:
                final+=i+' '
        d={"diagnosis":final}
        return d      

    def mobileno_code(self,number):
        for i in number.split():
            if i.isdigit() and len(i)==10:
                return {"mobileno":i}      

    def generate_prescription(self, voiceData):
        prescriptionData = {}

        d=self.name_code(voiceData)
        prescriptionData["name"]=d["name"]
        prescriptionData["age"]=d["age"]
        prescriptionData["gender"]=d["gender"]
        voiceData=voiceData.replace(d["name"],'',1).replace(d["age"],'',1).replace(d["gender"].lower(),'',1)

        d=self.email_code(voiceData)
        prescriptionData["email"]=d["email"][0]
        voiceData=voiceData.replace(d["email"][0],'',1)

        d=self.diagnosis_code(voiceData)
        prescriptionData["diagnosis"]=d["diagnosis"]
        diagnosis_list=['Hypertension','Hyperlipidemia','Diabetes','Back','Pain','Anxiety','Obesity','Allergic','Rhinitis','Reflux','Esophagitis','Respiratory','Problems','Hypothyroidism','Visual','Refractive','Errors','General','Medical','Exam','Osteoarthritis','Fibromyalgia','Myositis','Malaise','And','Fatigue','Pain','In','Joint','Acute','Laryngopharyngitis','Maxillary','Sinusitis','Major','Depressive','Disorder','Bronchitis','Asthma','Depressive','Disorder','Nail','Fungus','Coronary','Atherosclerosis','Urinary','Tract','Infection']
        a=voiceData.split()
        for i in a:
            if i in diagnosis_list:
                voiceData=voiceData.replace(i,'',1)

        d=self.mobileno_code(voiceData)
        prescriptionData["mobileno"]=d["mobileno"]
        voiceData=voiceData.replace(d["mobileno"],'',1)
        
        d=self.pres_code(voiceData)
        st=''
        for i in d.keys():
            st+=d[i]['medicine']+" "+d[i]['dosage']+" "
        prescriptionData["prescription"]=st
        return prescriptionData

'''capturedAudio="Harish 21 male hari17ec042@rmkcet.ac.in Acute Bronchitis 9514109259 Azithromycin 500mg once a day for 3 days robitussin 200mg once a day for 2 days";
p=Prescription()
print(p.generate_prescription(capturedAudio))'''