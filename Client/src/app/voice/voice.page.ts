import { Router } from '@angular/router';
import { Send } from '../models/send';
import { PrescriptionService } from './../services/prescription.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {

  capturedAudio:string="Harish 21 male hari17ec042@rmkcet.ac.in Acute Bronchitis 9514109259 Azithromycin 500mg once a day for 3 days robitussin 200mg once a day for 2 days";
  send=new Send();

  constructor(private location:Location,
    public speechRecognition:SpeechRecognition,
    private prescriptionService:PrescriptionService,
    private cd:ChangeDetectorRef,
    private loadingController:LoadingController,
    private router:Router) { }

  ngOnInit() {
  }

  startListening(){
    this.speechRecognition.hasPermission().then(permission=>{
      if(permission){
        this.speechRecognition.startListening().subscribe(speech=>{
          this.capturedAudio+=speech[0];
          this.cd.detectChanges();
        })
      }
      else
      {
        this.speechRecognition.requestPermission().then(data=>{
          this.speechRecognition.startListening().subscribe(speech=>{
            this.capturedAudio+=speech[0];
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

  addAudio(){
    this.speechRecognition.startListening().subscribe(speech=>{
      this.capturedAudio+=speech[0]+" ";
      this.cd.detectChanges();
    })
  }

  async generate_Prescription(){
    const loader=await this.loadingController.create({
      message:'Please wait...',
      spinner:'crescent',
      animated:true
    });
    await loader.present();

    this.send.text=this.capturedAudio;
    this.send.date=Date.now();
    this.send.id=localStorage.getItem('id')
    this.prescriptionService.sendPrescription(this.send).subscribe(data=>{
      this.router.navigate(['/edit-prescription/'+data.id])
      loader.dismiss();
    },
    error=>{
      console.log(error)
      loader.dismiss();
    })
  }

  cancel_Prescription(){
    this.capturedAudio="";
  }

  goBack(){
    this.location.back();
  }

}
