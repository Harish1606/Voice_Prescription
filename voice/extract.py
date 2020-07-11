
class Prescription:
	def name(text):
		patient_name=""
		for i in range(len(text)):
			if text[i][0].isupper() and text[i+1][0].isupper():
				patient_name+=text[i]+' '+text[i+1] 
				break
			elif text[i][0].isupper():
				patient_name+=text[i]
				break
		return patient_name
		
	def age(text):
		patient_age=""	
		for i in range(len(text)):
			if text[i].isdigit():
				patient_age+=text[i]
				break 
		
		return patient_age 

	def gender(text):
		patient_gender=""
		if ('She' in text) or ('Her' in text) or ('Female' in text):
			patient_gender+='female'
		else:
			patient_gender+='male'

		return patient_gender 

	def symptom(text):
		pain=['Abdomen','Back','Chest','Ear','Head','Pelvis','Tooth','Teeth','Rectum','Skin','Extremities','Chronic','Pain','Throat']
		suffering=['No','Chills','Fever','Paranthesia','Light','Headed','Dry','Mouth','Nauseated','Flu','Vomit','Short','Breath','Sleepy','Sweaty','Thirsty','Tired','Weak','Dry','Cough','Running','Nose','Vomiting']
		cant=['Normally',"Can'T",'Breathe','Hear','Move','One','Side','Arm','Leg','Pass','Bowel','Action','Urine','Remember','See','Blindness','Blurred','Vision','Double','Sleep','Smell','Things','Speak','Stop','Scratching','Sweating','Swallow','Taste','Walk','Write']
		f=['For','A','Days','Day','Week','Weeks']

		p="";s="";c="";index1=0;index2=0
		for i in range(len(text)):
			if text[i] in pain:
				p+=text[i]+' '
				index1=i 
	
		for i in range(len(text)):	
			if text[i] in suffering:
				index2=i 
				break 

		if index1<index2 and index1>0:
			for i in range(index1+1,index2):
				if text[i] in f or text[i].isdigit():
					p+=text[i]+' '

		for i in range(len(text)):
			if text[i] in suffering:
				s+=text[i]+' '
				index1=i

		for i in range(len(text)):
			if text[i] in cant:
				index2=i 
				break 

		if index1<index2 and index1>0:
			for i in range(index1+1,index2):
				if text[i] in f or text[i].isdigit():
					s+=text[i]+' '

		for i in range(len(text)):
			if text[i] in cant:
				c+=text[i]+' '
				index1=i

		diagnosis=['Hypertension','Hyperlipidemia','Diabetes','Back','Pain','Anxiety','Obesity','Allergic','Rhinitis','Reflux','Esophagitis','Respiratory','Problems','Hypothyroidism','Visual','Refractive','Errors','General','Medical','Exam','Osteoarthritis','Fibromyalgia','Myositis','Malaise','And','Fatigue','Pain','In','Joint','Acute','Laryngopharyngitis','Maxillary','Sinusitis','Major','Depressive','Disorder','Bronchitis','Asthma','Depressive','Disorder','Nail','Fungus','Coronary','Atherosclerosis','Urinary','Tract','Infection']
		medicines=['Abilify','Acetaminophen','Hydrocodone','Actos','Acyclovir','Adderall','Advair','Advair','Diskus','Advil','Albuterol','Aldactone','Alendronate','Aleve','Alfuzosin','Allegra','Allopurinol','Alprazolam','Amantadine','Ambien','Amiodarone','Amitiza','Amitriptyline','Amlodipine','Amoxicillin','Clavulanate','Anastrozole','Apixaban','Aricept','Aripiprazole','Aspirin','Atarax','Atenolol','Ativan','Atorvastatin','Atropine','Augmentin','Avapro','Azathioprine','Azelastine','Azithromycin','Bacitracin','Baclofen','Bactrim','DS','Bactroban','Basaglar','Belsomra','Benadryl','Benazepril','Benicar','Bentyl','Benzonatate','Benztropine','Betamethasone','Biaxin','Bicalutamide','Biktarvy','Biotin','Bisacodyl','Bismuth','subsalicylate','Budesonide','Budesonide','Formoterol','Bumetanide','Bumex','Buprenorphine','Naloxone','Bupropion','Buspar','Buspirone','Butrans','Bydureon','Bystolic','Ciprofloxacin','Citalopram','Clindamycin','Clonazepam','Codeine','Cyclobenzaprine','Cymbalta','Doxycycline','Gabapentin','Hydrochlorothiazide','Ibuprofen','Lexapro','Lisinopril','Loratadine','Lorazepam','Losartan','Lyrica','Meloxicam','Metformin','Metoprolol','Naproxen','Omeprazole','Oxycodone','Pantoprazole','Prednisone','Tramadol','Trazodone','Viagra','Wellbutrin','Xanax','Zoloft','Calcitriol','Calcium','carbonate','Carafate','Carbamazepine','Carbidopa','levodopa','Cardizem','Carvedilol','Cefdinir','Ceftriaxone','Cefuroxime','Celebrex','Celecoxib','Celexa','Cephalexin','Cetirizine','Chlorthalidone','Cholecalciferol','Cialis','Cilostazol','Cipro','Citalopram','Clarithromycin','Claritin','Cyanocobalamin','Debrox','Decadron','Demerol','Denosumab','Depakote','Desloratadine','Desmopressin','Desvenlafaxine','Dexamethasone','Dexamethasone','Intensol','Dexilant','Dextroamphetamine','Dextromethorphan','Diazepam','Diclofenac','Sodium','Dicyclomine','Diflucan','Digoxin','Dilantin','Dyazide','Echinacea','Ecotrin','Effexor','XR','Effient','Efudex','Elavil','Eligard','Eliquis','Elmiron','Emgality','Enoxaparin','Entecavir','Ephedrine','Famciclovir','Famotidine','Farxiga','Febuxostat','Felodipine','Femara','Fenofibrate','Fentanyl','Ferrous','gluconate','Sulfate','Flagyl','Fish','Oil','Glucagon','Glucophage','Glucosamine','Glucose','Glycerin','Hydralazine','Lisinopril','Losartan','Triamterene','Valsartan','Hydroxyzine','Hydrochloride','Pamoate','Indocin','Indomethacin','Infliximab','Imuran','Insulin','Glargine','Lispro','Regular','Jadenu','Jakafi','Jalyn','Jantoven','Janumet','Jardiance','Jencycla','Kadcyla','Kaletra','Kadian','Keflex','Kenalog','Ketamine','Labetalol','Lactulose','Lamictal','Lamotrigine','Lansoprazole','Lithium','Lupron','Macrobid','Magnesium','Citrate','Oxide','Methadone','Metronidazole','Nabumetone','Naloxone','Naltrexone','Neomycin','Neupogen','Niaspan','Nitroglycerin','Ofloxacin','Olmesartan','Olopatadine','Ophthalmic','Oxytocin','Oxymorphone','Oxybutynin','Oxaliplatin','Paracetamol','Paroxetine','Phenazopyridine','Potassium','Chloride','Primidone','Promethazine','Protonix','Pseudoephedrine','Pyridium','Qbrelis','Qbrexza','Quadramet','Qualaquin','Quercetin','Quetiapine','Quinapril','Quinine','Rabeprazole','Raloxifene','Rifampin','Rifaximin','Risedronate','Robaxin','Robitussin','Roxicodone','Salbutamol','Selenium','Sodium','chloride','Spironolactone','Sucralfate','Sulfasalazine','Tacrolimus','Tamoxifen','Terazosin','Tetracycline','Tobramycin','Turmeric','Ubiquinone','Umeclidinium','Uniphyl','Urea','Cream','Urin','D/S','Uroxatral','Viagra','Valium','Vancomycin','Venofer','Vitamin','B','12','C','D','E','2','3','Warfarin','Wycillin','WP','Thyroid','Xalatan','Xenazine','Xifaxan','Xylocaine','Xylometazoline','Yasmin','Yellow','Fever','Vaccine','Yohimbine','Zaleplon','Zaroxolyn','Ziprasidone','Zithromax','Zolpidem','Zonisamide','Zyloprim','Zyprexa']
		for i in range(len(text)):
			if text[i] in diagnosis:
				index2=i 
				break  
			elif text[i] in medicines:
				index2=i 
				break 

		if index1<index2 and index1>0:
			for i in range(index1+1,index2):
				if text[i] in f or text[i].isdigit():
					c+=text[i]+' ' 

		patient_symptom=p+'\n'+s+'\n'+c
		return  patient_symptom

	def diagnosis(text):
		patient_diagnosis=""
		diagnosis=['Hypertension','Hyperlipidemia','Diabetes','Back','Pain','Anxiety','Obesity','Allergic','Rhinitis','Reflux','Esophagitis','Respiratory','Problems','Hypothyroidism','Visual','Refractive','Errors','General','Medical','Exam','Osteoarthritis','Fibromyalgia','Myositis','Malaise','And','Fatigue','Pain','In','Joint','Acute','Laryngopharyngitis','Maxillary','Sinusitis','Major','Depressive','Disorder','Bronchitis','Asthma','Depressive','Disorder','Nail','Fungus','Coronary','Atherosclerosis','Urinary','Tract','Infection']
		for i in text:
			if i in diagnosis:
				patient_diagnosis+=i+' '

		return patient_diagnosis 

	def medicine(text):
		medicines=['Abilify','Acetaminophen','Hydrocodone','Actos','Acyclovir','Adderall','Advair','Diskus','Advil','Albuterol','Aldactone','Alendronate','Aleve','Alfuzosin','Allegra','Allopurinol','Alprazolam','Amantadine','Ambien','Amiodarone','Amitiza','Amitriptyline','Amlodipine','Amoxicillin','Clavulanate','Anastrozole','Apixaban','Aricept','Aripiprazole','Aspirin','Atarax','Atenolol','Ativan','Atorvastatin','Atropine','Augmentin','Avapro','Azathioprine','Azelastine','Azithromycin','Bacitracin','Baclofen','Bactrim','DS','Bactroban','Basaglar','Belsomra','Benadryl','Benazepril','Benicar','Bentyl','Benzonatate','Benztropine','Betamethasone','Biaxin','Bicalutamide','Biktarvy','Biotin','Bisacodyl','Bismuth','subsalicylate','Budesonide','Budesonide','Formoterol','Bumetanide','Bumex','Buprenorphine','Naloxone','Bupropion','Buspar','Buspirone','Butrans','Bydureon','Bystolic','Ciprofloxacin','Citalopram','Clindamycin','Clonazepam','Codeine','Cyclobenzaprine','Cymbalta','Doxycycline','Gabapentin','Hydrochlorothiazide','Ibuprofen','Lexapro','Lisinopril','Loratadine','Lorazepam','Losartan','Lyrica','Meloxicam','Metformin','Metoprolol','Naproxen','Omeprazole','Oxycodone','Pantoprazole','Prednisone','Tramadol','Trazodone','Viagra','Wellbutrin','Xanax','Zoloft','Calcitriol','Calcium','carbonate','Carafate','Carbamazepine','Carbidopa','levodopa','Cardizem','Carvedilol','Cefdinir','Ceftriaxone','Cefuroxime','Celebrex','Celecoxib','Celexa','Cephalexin','Cetirizine','Chlorthalidone','Cholecalciferol','Cialis','Cilostazol','Cipro','Citalopram','Clarithromycin','Claritin','Cyanocobalamin','Debrox','Decadron','Demerol','Denosumab','Depakote','Desloratadine','Desmopressin','Desvenlafaxine','Dexamethasone','Dexamethasone','Intensol','Dexilant','Dextroamphetamine','Dextromethorphan','Diazepam','Diclofenac','Sodium','Dicyclomine','Diflucan','Digoxin','Dilantin','Dyazide','Echinacea','Ecotrin','Effexor','XR','Effient','Efudex','Elavil','Eligard','Eliquis','Elmiron','Emgality','Enoxaparin','Entecavir','Ephedrine','Famciclovir','Famotidine','Farxiga','Febuxostat','Felodipine','Femara','Fenofibrate','Fentanyl','Ferrous','gluconate','Sulfate','Flagyl','Fish','Oil','Glucagon','Glucophage','Glucosamine','Glucose','Glycerin','Hydralazine','Lisinopril','Losartan','Triamterene','Valsartan','Hydroxyzine','Hydrochloride','Pamoate','Indocin','Indomethacin','Infliximab','Imuran','Insulin','Glargine','Lispro','Regular','Jadenu','Jakafi','Jalyn','Jantoven','Janumet','Jardiance','Jencycla','Kadcyla','Kaletra','Kadian','Keflex','Kenalog','Ketamine','Labetalol','Lactulose','Lamictal','Lamotrigine','Lansoprazole','Lithium','Lupron','Macrobid','Magnesium','Citrate','Oxide','Methadone','Metronidazole','Nabumetone','Naloxone','Naltrexone','Neomycin','Neupogen','Niaspan','Nitroglycerin','Ofloxacin','Olmesartan','Olopatadine','Ophthalmic','Oxytocin','Oxymorphone','Oxybutynin','Oxaliplatin','Paracetamol','Paroxetine','Phenazopyridine','Potassium','Chloride','Primidone','Promethazine','Protonix','Pseudoephedrine','Pyridium','Qbrelis','Qbrexza','Quadramet','Qualaquin','Quercetin','Quetiapine','Quinapril','Quinine','Rabeprazole','Raloxifene','Rifampin','Rifaximin','Risedronate','Robaxin','Robitussin','Roxicodone','Salbutamol','Selenium','Sodium','chloride','Spironolactone','Sucralfate','Sulfasalazine','Tacrolimus','Tamoxifen','Terazosin','Tetracycline','Tobramycin','Turmeric','Ubiquinone','Umeclidinium','Uniphyl','Urea','Cream','Urin','D/S','Uroxatral','Viagra','Valium','Vancomycin','Venofer','Vitamin','B','12','C','D','E','2','3','Warfarin','Wycillin','WP','Thyroid','Xalatan','Xenazine','Xifaxan','Xylocaine','Xylometazoline','Yasmin','Yellow','Fever','Vaccine','Yohimbine','Zaleplon','Zaroxolyn','Ziprasidone','Zithromax','Zolpidem','Zonisamide','Zyloprim','Zyprexa']
		f=['For','A','Days','Day','Week','Weeks']
		patient_medicine=""
	
		index3=[]
		for i in range(len(text)):
			if text[i] in medicines:
				index3.append(i)  

		if len(index3)>1:
			for i in range(len(index3)-1):
				for j in range(index3[i],index3[i+1]):
					if text[j] in medicines or text[j] in f or text[j].isdigit():
						patient_medicine+=text[j]+' '
		elif len(index3)==1:
			for i in range(index3[0],len(text)):
				patient_medicine+=text[i]+' '

		return patient_medicine



