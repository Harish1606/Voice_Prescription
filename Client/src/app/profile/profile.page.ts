import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/register';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user=new User();
  constructor(private location:Location,
    private authService:AuthService,
    private alertController:AlertController,
    private toastController:ToastController,
    private loadingController:LoadingController) { }

  ngOnInit() {
    this.user._id=localStorage.getItem('id')
    this.authService.setUserById(this.user).subscribe(data=>{
      this.user=data;
      this.user.cpassword=data.password;
    },
    error=>{
      console.log(error)
    })
  }

  async update(){
    const loader=await this.loadingController.create({
      message:'Saving...',
      spinner:'crescent',
      animated:true
    });
    await loader.present();

    if(this.user.password!=this.user.cpassword)
    {
      this.showAlert("Error","Password and Confirm password should be same")
      loader.dismiss();
      return console.log("Password did not match")
    }

    this.authService.updateDetails(this.user).subscribe(data=>{
      loader.dismiss();
      this.showToast(data['message'])
    },
    error=>{
      loader.dismiss();
      this.showAlert("Error","Check your internet connectivity")
    })
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
