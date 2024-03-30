import { Injectable } from '@angular/core';
import { Blog, User } from '../types/types';

// Keeps info about the currently loggedInUser
// Assume that currentUser == undefined -> NOT LOGGED IN

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
  private currentUser?: User
  currentBlogs: Array<Blog> = []

  constructor() { }

  setUser(user: User) { this.currentUser = user}

  hasSameId(id: number) {return this.currentUser?.id == id}
  getUsername() : string {return this.currentUser == undefined ? "" : this.currentUser.username}

  getBlogs() { this.currentBlogs}
}
