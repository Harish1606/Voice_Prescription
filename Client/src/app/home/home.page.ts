import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sliderImages:string[]=['/assets/image1','/assets/image2','/assets/image3','/assets/image4']
  sliderOptions:{}={
    autoplay:{
      delay:2000
    },
    loop:true
  }
  constructor(private router:Router,private authService:AuthService,private alertController:AlertController) {}

  goToVoice(){
    this.router.navigate(['/voice'])
  }

  goToText(){
    this.router.navigate(['/text'])
  }

  goToProfile(){
    this.router.navigate(['/profile'])
  }

  goToSecurityPin(){
    this.router.navigate(['/update-pin'])
  }

  toggleTheme(event){
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark');
    }
    else{
      document.body.setAttribute('color-theme','light');
    }
  }

  logout(){
    this.confirmLogout();
  }


  async confirmLogout(){
    const alert=await this.alertController.create({
      header:'Logout',
      message:'Are you sure you want to logout?',
      buttons:[
        {
          text:'No',
          role:'cancel'
        },
        {
          text:'Yes',
          role:'Ok',
          handler:()=>{
            this.authService.logout();
          }
        }
      ]
    })
    await alert.present();
  }

  goToSearch(){
    this.router.navigate(['/search']);
  }

  goToTemplate(){
    this.router.navigate(['/templates']);
  }

}
