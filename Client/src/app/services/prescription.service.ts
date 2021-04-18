import { Observable } from 'rxjs';
import { Send } from './../models/send';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Text_Prescription } from '../models/text';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private prescriptionUrl="http://192.168.43.91:5000/prescription";
  private textPrescriptionUrl="http://192.168.43.91:5000/textprescription";
  private getTextPrescriptionUrl="http://192.168.43.91:5000/gettextprescription";
  private updateTextPrescriptionUrl="http://192.168.43.91:5000/updatetextprescription";
  private sharePrescripionUrl="http://192.168.43.91:5000/shareprescription";
  private getPrescriptionsUrl="http://192.168.43.91:5000/getprescriptions";
  private deletePrescriptionUrl="http://192.168.43.91:5000/deleteprescription";
  constructor(private http:HttpClient) { }

  public sendPrescription(send:Send):Observable<any>{
    return this.http.post<Send>(this.prescriptionUrl,send);
  }

  public sendTextPrescription(prescription:Text_Prescription):Observable<any>{
    return this.http.post<Text_Prescription>(this.textPrescriptionUrl,prescription);
  }

  public getTextPrescription(prescription:Text_Prescription):Observable<any>{
    return this.http.post<Text_Prescription>(this.getTextPrescriptionUrl,prescription);
  }

  public updateTextPrescription(prescription:Text_Prescription):Observable<any>{
    return this.http.post<Text_Prescription>(this.updateTextPrescriptionUrl,prescription);
  }

  public sharePrescription(prescription:Text_Prescription):Observable<any>{
    return this.http.post<Text_Prescription>(this.sharePrescripionUrl,prescription);
  }

  public getPrescriptions(){
    return this.http.get(this.getPrescriptionsUrl);
  }

  public deletePrescription(prescription:Text_Prescription):Observable<any>{
    return this.http.post<Text_Prescription>(this.deletePrescriptionUrl,prescription);
  }
}
