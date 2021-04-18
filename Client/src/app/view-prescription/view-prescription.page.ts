import { AuthService } from './../services/auth.service';
import { Text_Prescription } from './../models/text';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/register';
import { PrescriptionService } from '../services/prescription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.page.html',
  styleUrls: ['./view-prescription.page.scss'],
})
export class ViewPrescriptionPage implements OnInit {

  user=new User();
  Prescription=new Text_Prescription();
  constructor(private location:Location,
    private prescriptionService:PrescriptionService,
    private authService:AuthService,
    private route:ActivatedRoute) { }

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

  goBack(){
    this.location.back();
  }

}
