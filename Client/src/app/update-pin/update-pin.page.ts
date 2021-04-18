import { User } from './../models/register';
import { LoadingController, ToastController, AlertController, IonInput } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Pin } from './../models/pin';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-update-pin',
  templateUrl: './update-pin.page.html',
  styleUrls: ['./update-pin.page.scss'],
})
export class UpdatePinPage implements OnInit {

  temp_user=new User();
  user=new User();
  temp_pin=new Pin();

  @ViewChild('n1', { static: false }) i1:IonInput;
  @ViewChild('n2', { static: false }) i2:IonInput;
  @ViewChild('n3', { static: false }) i3:IonInput;
  @ViewChild('n4', { static: false }) i4:IonInput;
  constructor(private router:Router,
    private authService:AuthService,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private alertController:AlertController) { }

  ngOnInit() {
    this.user._id=localStorage.getItem('id')
    this.temp_user._id=localStorage.getItem('id')
    this.authService.setUserById(this.user).subscribe(data=>{
      this.user=data;
    },
    error=>{
      console.log(error)
    })
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

  next4(){
    setTimeout(() => this.i4.setFocus(),50);
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

    this.temp_user.pin=(this.temp_pin.t1*1000)+(this.temp_pin.t2*100)+(this.temp_pin.t3*10)+this.temp_pin.t4;
    const loader=await this.loadingController.create({
      message:'Please wait...',
      spinner:'crescent',
      animated:true
    });
    await loader.present();

    if(this.temp_user.password==this.user.password)
    {
      this.authService.setPin(this.temp_user).subscribe(res=>{
        loader.dismiss();
        this.showToast("Security pin updated successfully")
      },
      error=>{
        loader.dismiss();
        this.showAlert("Error",error.error.message)
      })
    }
    else
    {
      loader.dismiss();
      this.showAlert("Error","Please enter correct password")
    }
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
    this.router.navigate(['/home']);
  }

}
