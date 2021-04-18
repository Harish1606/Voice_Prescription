import { LoadingController, ToastController } from '@ionic/angular';
import { User } from './../models/register';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {

  user=new User();
  theme:string="";
  constructor(private location:Location,
    private route:ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    private loadingController:LoadingController,
    private toastController:ToastController) { }

  ngOnInit() {
    this.theme=this.route.snapshot.paramMap.get('id')
    this.user._id=localStorage.getItem('id');
    this.authService.setUserById(this.user).subscribe(data=>{
      this.user=data;
    },
    error=>{
      console.log(error);
    })
  }

  async saveTheme(){
    this.user.theme=this.theme;
    const loader=await this.loadingController.create({
      message:'Saving...',
      spinner:'crescent',
      animated:true
    });
    await loader.present();

    this.authService.saveTheme(this.user).subscribe(data=>{
      this.router.navigate(['/templates']);
      loader.dismiss();
      this.showToast('Template saved successfully')
    },
    error=>{
      console.log(error);
    })
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
