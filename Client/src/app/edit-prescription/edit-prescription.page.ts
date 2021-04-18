import { LoadingController } from '@ionic/angular';
import { Text_Prescription } from './../models/text';
import { PrescriptionService } from './../services/prescription.service';
import { User } from './../models/register';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-prescription',
  templateUrl: './edit-prescription.page.html',
  styleUrls: ['./edit-prescription.page.scss'],
})
export class EditPrescriptionPage implements OnInit {

  user=new User();
  Prescription=new Text_Prescription();

  constructor(private route:ActivatedRoute,
    private authService:AuthService,
    private prescriptionService:PrescriptionService,
    private router:Router,
    private loadingController:LoadingController) { }

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

  async update_Prescription(){
    const loader=await this.loadingController.create({
      message:'Updating...',
      spinner:'crescent',
      animated:true
    });
    await loader.present();

    this.Prescription.date=Date.now();
    this.prescriptionService.updateTextPrescription(this.Prescription).subscribe(data=>{
      this.router.navigate(['/options/'+this.Prescription._id])
      loader.dismiss();
    },
    error=>{
      console.log(error)
      loader.dismiss();
    })
  }

}
