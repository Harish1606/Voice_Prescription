import { User } from './../models/register';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {

  theme:string="primary";
  user=new User()
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user._id=localStorage.getItem('id')
    this.authService.setUserById(this.user).subscribe(data=>{
      this.user=data;
      this.theme=this.user.theme;
    },
    error=>{
      console.log(error)
    })
  }

  goToTemplate(theme:string){
    this.router.navigate(['/template/'+theme])
  }

  goBack(){
    this.router.navigate(['/home']);
  }

}
