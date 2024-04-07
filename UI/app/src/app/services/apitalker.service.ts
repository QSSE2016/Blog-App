import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogRequest, EditCreateBlogRequest, LoginRequest, SignUpRequest } from '../types/types';
import { ClientInfoService } from './client-info.service';

@Injectable({
  providedIn: 'root'
})
export class APITalkerService {
  port = 7136
  url = `https://localhost:${this.port}`
  credRoute = 'api/cred'
  blogRoute = 'api/blog'

  constructor(private http: HttpClient,private userInfo: ClientInfoService) { }

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


  getAllBlogs() : Observable<object> {
    return this.http.get(`${this.url}/${this.blogRoute}`)
  }

  getMyBlogs() : Observable<object> {
    if(this.userInfo.getUsername() == "")
      return of({}) // empty 


    let payload: BlogRequest = {
      id: this.userInfo.getId(),
      name: this.userInfo.getUsername()
    }

    return this.http.post(`${this.url}/${this.blogRoute}/user-based`,payload)
  }

  deleteBlog(id: number) {
    return this.http.delete(`${this.url}/${this.blogRoute}/${id}`)
  }

  createBlog(title: string,description: string) {
    let payload: EditCreateBlogRequest = {
      title: title,
      description: description,
      authorId: this.userInfo.getId(),
      authorName: this.userInfo.getUsername()
    }

    return this.http.post(`${this.url}/${this.blogRoute}/create`,payload)
  }

  editBlog(title: string,description: string) {
    let payload: EditCreateBlogRequest = {
      title: title,
      description: description,
      authorId: this.userInfo.getId(),
      authorName: this.userInfo.getUsername()
    }

    return this.http.post(`${this.url}/${this.blogRoute}/edit`,payload)
  }

}
