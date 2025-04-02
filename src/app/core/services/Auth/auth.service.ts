import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode"
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { };
  private readonly router= inject (Router);
  decodedData!:any;
  //Api logic
  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }

  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }  
  decodeToken(){
    this.decodedData = jwtDecode(localStorage.getItem('token')!);
  }
  userLogout(){
    localStorage.removeItem('token');
    this.decodedData=null;
    this.router.navigate(['/login']);
  }

  sendEmailVerify(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data);
  }
  sendCodeVerify(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data);
  }
  resetPassword(data:object):Observable<any>{
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)
  }

} 
