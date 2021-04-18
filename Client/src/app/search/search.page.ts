import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { PrescriptionService } from './../services/prescription.service';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Text_Prescription } from '../models/text';
import { User } from '../models/register';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  pin:number;
  busy:boolean=true;
  id:string;
  Prescriptions:any=[];
  searchedPrescription=[];
  user=new User();
  Prescription=new Text_Prescription();
  deleteprescription=new Text_Prescription();
  @ViewChild('search',{static:false}) search:IonSearchbar;

  constructor(private location:Location,
    private prescriptionService:PrescriptionService,
    private router:Router,
    private alertController:AlertController,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private authService:AuthService) { }

  ngOnInit() {
    this.prescriptionService.getPrescriptions().subscribe(data=>{
      this.Prescriptions=data;
      this.Prescriptions.sort((a,b)=>{
        return b.date-a.date;
      })
      this.searchedPrescription=this.Prescriptions;
    },
    error=>{
      console.log(error)
    })

    this.user._id=localStorage.getItem('id')
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.busy=false;
    }, 2000);

    this.authService.setUserById(this.user).subscribe(data=>{
      this.user=data;
    },
    error=>{
      console.log(error)
    })
  }

  searchPrescription(event){
    const val=event.target.value;
    this.searchedPrescription=this.Prescriptions;
    if(val && val.trim()!=''){
      this.searchedPrescription=this.searchedPrescription.filter((item:any)=>{
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  goToView(id:string){
    this.router.navigate(['/view-prescription/'+id]);
  }

  goToEdit(id:string){
    this.router.navigate(['/edit-prescription/'+id]);
  }

  delete_Prescription(id:string){
    this.deleteprescription._id=id;
    this.confirmDelete();
  }

  share_Prescription(id:string){
    this.Prescription._id=id;
    this.prescriptionService.getTextPrescription(this.Prescription).subscribe(data=>{
      this.Prescription=data;
      this.confirmShare();
    },
    error=>{
      console.log(error)
    })
  }

  async confirmDelete(){
    const loader=await this.loadingController.create({
      message:'Please wait...',
      spinner:'crescent',
      animated:true
    });

    const alert=await this.alertController.create({
      header:'Delete',
      message:'Are you sure you want to delete prescription?',
      buttons:[
        {
          text:'No',
          role:'cancel'
        },
        {
          text:'Yes',
          role:'Ok',
          handler:()=>{
            loader.present();
            this.prescriptionService.deletePrescription(this.deleteprescription).subscribe(data=>{
              loader.dismiss();
              this.showToast(data.message)
            },
            error=>{
              loader.dismiss();
              this.showAlert("Error","Check your internet connectivity")
            })

            this.prescriptionService.getPrescriptions().subscribe(data=>{
              this.Prescriptions=data;
              this.Prescriptions.sort((a,b)=>{
                return b.date-a.date;
              })
              this.searchedPrescription=this.Prescriptions;
            },
            error=>{
              console.log(error)
            })
          }
        }
      ]
    })
    await alert.present();
  }

  async confirmShare(){
    const alert=await this.alertController.create({
      header:'Share',
      message:"Do you want to share the prescription to the patient's mail?",
      buttons:[
        {
          text:'No',
          role:'cancel'
        },
        {
          text:'Yes',
          role:'Ok',
          handler:()=>{
            this.presentAlertPrompt();
          }
        }
      ]
    })
    await alert.present();
  }


  async presentAlertPrompt() {
    const loader=await this.loadingController.create({
      message:'Please wait...',
      spinner:'crescent',
      animated:true
    });

    const alert = await this.alertController.create({
      header: 'Security Pin',
      inputs: [
        {
          name: 'name1',
          type: 'number',
          placeholder: 'Enter 4 digit security pin'
        }
      ],
      buttons:[
        {
          text:'cancel',
          role:'cancel'
        },
        {
          text:'Ok',
          handler:(data)=>{
            loader.present();
            this.pin=data.name1;
            if(this.pin==this.user.pin)
            {
              this.prescriptionService.sharePrescription(this.Prescription).subscribe(data=>{
                loader.dismiss();
                this.showToast(data.message)
              },
              error=>{
                loader.dismiss();
                this.showAlert("Error","Check your internet connectivity")
              })
            }
            else
            {
              loader.dismiss();
              this.showAlert("Error","Please enter correct security pin")
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlert(header:string,message:string){
    const alert=await this.alertController.create({
      header:header,
      message:message,
      buttons:["Ok"]
    })
    await alert.present();
  }

  async showToast(message:string){
    const toast=await this.toastController.create({
      message:message,
      duration:2000,
      position:'top',
      animated:true,
      color:'success'
    })
    await toast.present();
  }

  goBack(){
    this.location.back();
  }

}
