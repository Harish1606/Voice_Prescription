import { AlertController, IonInput, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/register';
import { AuthService } from '../services/auth.service';
import { Pin } from '../models/pin';

@Component({
  selector: 'app-security-pin',
  templateUrl: './security-pin.page.html',
  styleUrls: ['./security-pin.page.scss'],
})
export class SecurityPinPage implements OnInit {

  temp_pin=new Pin();
  user=new User();

  @ViewChild('n1', { static: false }) i1:IonInput;
  @ViewChild('n2', { static: false }) i2:IonInput;
  @ViewChild('n3', { static: false }) i3:IonInput;
  constructor(private router:Router,
    private authService:AuthService,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private toastController:ToastController) { }

  ngOnInit() {
    this.user._id=localStorage.getItem('id')
  }

  next1(){
    setTimeout(() => this.i1.setFocus(),50);
  }

  next2(){
    setTimeout(() => this.i2.setFocus(),50);
  }

  next3(){
    setTimeout(() => this.i3.setFocus(),50);
  }

  async set(){
    if(this.temp_pin.t1>9 || this.temp_pin.t1<0){
      this.showAlert("Error","Enter value for each field from 0-9")
      return console.log("error")
    }

    if(this.temp_pin.t2>9 || this.temp_pin.t2<0){
      this.showAlert("Error","Enter value for each field from 0-9")
      return console.log("error")
    }

    if(this.temp_pin.t3>9 || this.temp_pin.t3<0){
      this.showAlert("Error","Enter value for each field from 0-9")
      return console.log("error")
    }

    if(this.temp_pin.t4>9 || this.temp_pin.t4<0){
      this.showAlert("Error","Enter value for each field from 0-9")
      return console.log("error")
    }

    this.user.pin=(this.temp_pin.t1*1000)+(this.temp_pin.t2*100)+(this.temp_pin.t3*10)+this.temp_pin.t4;
    const loader=await this.loadingController.create({
      message:'Please wait...',
      spinner:'crescent',
      animated:true
    });
    await loader.present();

    this.authService.setPin(this.user).subscribe(res=>{
      this.router.navigate(['/home'])
      loader.dismiss();
      this.showToast("Registered successfully")
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
