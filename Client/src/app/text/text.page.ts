import { User } from './../models/register';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { PrescriptionService } from './../services/prescription.service';
import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Text_Prescription } from '../models/text';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {

  user=new User();
  text_Prescription=new Text_Prescription();
  constructor(private location:Location,
    private prescriptionService:PrescriptionService,
    public speechRecognition:SpeechRecognition,
    private cd:ChangeDetectorRef,
    private authService:AuthService,
    private router:Router,
    private loadingController:LoadingController) { }

  ngOnInit() {
    this.user._id=localStorage.getItem('id')
    this.authService.setUserById(this.user).subscribe(data=>{
      this.user=data;
    },
    error=>{
      console.log(error)
    })
  }

  async generate_Prescription(){
    const loader=await this.loadingController.create({
      message:'Please wait...',
      spinner:'crescent',
      animated:true
    });
    await loader.present();

    this.text_Prescription.date=Date.now();
    this.text_Prescription.id=this.user._id;
    this.prescriptionService.sendTextPrescription(this.text_Prescription).subscribe(data=>{
      this.router.navigate(['/edit-prescription/'+data.id])
      loader.dismiss();
    },
    error=>{
      console.log(error)
      loader.dismiss();
    })
  }

  startEmailListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.email=speech[0];
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.email=speech[0];
            this.cd.detectChanges();
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  startNameListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.name=speech[0];
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.name=speech[0];
            this.cd.detectChanges();
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  startAgeListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.age=parseInt(speech[0]);
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.age=parseInt(speech[0]);
            this.cd.detectChanges();
          },
          err=>{
            console.log(err)
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  startGenderListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.gender=speech[0];
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.gender=speech[0];
            this.cd.detectChanges();
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  startMobileNoListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.mobileno=parseInt(speech[0]);
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.mobileno=parseInt(speech[0]);
            this.cd.detectChanges();
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  startSymptomsListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.symptoms=speech[0];
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.symptoms=speech[0];
            this.cd.detectChanges();
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  startDiagnosisListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.diagnosis=speech[0];
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.diagnosis=speech[0];
            this.cd.detectChanges();
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  startMedicineListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.prescription=speech[0];
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.prescription=speech[0];
            this.cd.detectChanges();
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  startAdviceListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.text_Prescription.advice=speech[0];
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.text_Prescription.advice=speech[0];
            this.cd.detectChanges();
          })
        },
        err=>{
          console.log(err)
        })
      }
    },
    err=>{
      console.log(err)
    })
  }

  goBack(){
    this.location.back();
  }

}
