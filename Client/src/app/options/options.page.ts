import { User } from './../models/register';
import { AuthService } from './../services/auth.service';
import { PrescriptionService } from './../services/prescription.service';
import { Text_Prescription } from './../models/text';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  pin:number;
  user=new User();
  Prescription=new Text_Prescription();
  constructor(private route:ActivatedRoute,
    private router:Router,
    private prescriptionService:PrescriptionService,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private alertController:AlertController,
    private authService:AuthService) {}

  ngOnInit() {
    this.Prescription._id=this.route.snapshot.paramMap.get('id')
    this.prescriptionService.getTextPrescription(this.Prescription).subscribe(data=>{
      this.Prescription=data;
    },
    error=>{
      console.log(error)
    })
    this.user._id=localStorage.getItem('id')
    this.authService.setUserById(this.user).subscribe(data=>{
      this.user=data;
    },
    error=>{
      console.log(error)
    })
  }

  share(){
    this.confirmShare();
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

  delete_Prescription(){
    this.confirmDelete();
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
            this.prescriptionService.deletePrescription(this.Prescription).subscribe(data=>{
              loader.dismiss();
              this.router.navigate(['/home'])
              this.showToast(data.message)
            },
            error=>{
              loader.dismiss();
              this.showAlert("Error","Check your internet connectivity")
            })
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

  goToView(){
    this.router.navigate(['/view-prescription/'+this.Prescription._id]);
  }

  goToEdit(){
    this.router.navigate(['/edit-prescription/'+this.Prescription._id]);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

}
