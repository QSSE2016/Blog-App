import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, SignUpRequest } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class APITalkerService {

  port = 7136
  url = `https://localhost:${this.port}`
  credRoute = 'api/cred'
  infoRoute = 'api/info'

  constructor(private http: HttpClient) { }

  attemptLogin(username: string,password: string) : Observable<any> {
    const payload: LoginRequest = {
      username: username,
      password: password
    }
    
    return this.http.post(`${this.url}/${this.credRoute}/log-in`,payload)
  }


  attemptSignUp(username:string,email:string,password:string) : Observable<any> {
    const payload: SignUpRequest = {
      username: username,
      email: email,
      password: password
    }
    
   
    return this.http.post(`${this.url}/${this.credRoute}/sign-up`,payload)
  }


  getBlogs() : Observable<object> {
    // Temporary. Won't actually work for now
    const payload: SignUpRequest = {
      username: '',
      email: '',
      password: ''
    }
    
   
    return this.http.post(`${this.url}/${this.infoRoute}/blogs`,payload)
  }

}
