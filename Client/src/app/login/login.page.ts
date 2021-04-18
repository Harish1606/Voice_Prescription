import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/register';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  image:string='bdbb98ce-b03f-443c-bae8-fff3fd23c661';
  user=new User();

  constructor(private router:Router,private authService:AuthService,private alertController:AlertController,private toastController:ToastController,private loadingController:LoadingController) { }

  ngOnInit() {
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

  async login(){
    const loader=await this.loadingController.create({
      message:'Please wait...',
      spinner:'crescent',
      animated:true
    });
    await loader.present();

    this.authService.loginUser(this.user).subscribe(res=>{
      this.router.navigate(['/home'])
      localStorage.setItem('token',res.token)
      localStorage.setItem('id',res.id)
      loader.dismiss();
      this.showToast("Login successfully")
    },
    error=>{
      loader.dismiss();
      this.showAlert("Error",error.error.message)
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

}
