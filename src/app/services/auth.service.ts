import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl : string ='https://localhost:7053/api/Values/';

  constructor(private http : HttpClient) { }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

    login(loginObj: any){
      return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)

    }

    storeToken(tokenValue : string){
      localStorage.setItem('token',tokenValue);
      console.log(this.storeToken);
    }

    getToken(){
      return localStorage.getItem('token');
      console.log(this.getToken);
    }

    isLoggedIn(): boolean{
      return !!localStorage.getItem('token');
    }
  
}
