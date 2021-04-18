import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/register';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private themeUrl="http://192.168.43.91:5000/theme";
  private userDetailsByIdUrl="http://192.168.43.91:5000/userdetailsbyid";
  private registerUrl="http://192.168.43.91:5000/register";
  private loginUrl="http://192.168.43.91:5000/login";
  private setpinUrl="http://192.168.43.91:5000/pin";
  private updateUrl="http://192.168.43.91:5000/updatedetails";

  constructor(private http:HttpClient,private router:Router) { }

  public setUserById(user:User){
    return this.http.post<User>(this.userDetailsByIdUrl,user)
  }

  public registerUser(user:User):Observable<any>{
    return this.http.post<User>(this.registerUrl,user)
  }

  public loginUser(user:User):Observable<any>{
    return this.http.post<User>(this.loginUrl,user)
  }

  public setPin(user:User):Observable<any>{
    return this.http.post<User>(this.setpinUrl,user)
  }

  public loggedIn(){
    return !!localStorage.getItem('token')
  }

  public logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.router.navigate(['/login'])
  }

  public saveTheme(user:User){
    return this.http.post<User>(this.themeUrl,user)
  }

  public updateDetails(user:User){
    return this.http.post<User>(this.updateUrl,user)
  }

}
