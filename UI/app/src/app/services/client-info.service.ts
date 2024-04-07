import { Injectable } from '@angular/core';
import { Blog, User } from '../types/types';

// Keeps info about the currently loggedInUser
// Assume that currentUser == undefined -> NOT LOGGED IN

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
  private currentUser?: User
  constructor() { }

  setUser(user: User) { this.currentUser = user}

  hasSameId(id: number) {return this.currentUser?.id == id}
  getId() { return this.currentUser == undefined ? 0 : this.currentUser.id }
  getUsername() : string {return this.currentUser == undefined ? "" : this.currentUser.username}
}
