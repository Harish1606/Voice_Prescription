import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../models/register';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  image:string='bdbb98ce-b03f-443c-bae8-fff3fd23c661';
  user=new User();
  constructor(private router:Router,private authService:AuthService,private alertController:AlertController,private toastController:ToastController,private loadingController:LoadingController) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  async register(){
    this.user.theme="primary";
    this.user.pin=0;
    const loader=await this.loadingController.create({
      message:'Please wait...',
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

    this.authService.registerUser(this.user).subscribe(res=>{
      localStorage.setItem('token',res.token)
      localStorage.setItem('id',res.id)
      this.router.navigate(['/security-pin/'+localStorage.getItem('id')])
      loader.dismiss();
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
