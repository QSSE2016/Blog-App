import { Component } from '@angular/core';
import { Blog } from '../types/types';
import { APITalkerService } from '../services/apitalker.service';
import { ClientInfoService } from '../services/client-info.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
   // I used enums before to track which page is active so now I'll use constants. Perfectly balanced as all things should be.
   readonly EXPLORE = 0
   readonly MY_BLOGS = 1
   readonly ABOUT = 2

   // Secret Pages
   readonly VIEW_BLOG = 3 
   readonly CREATE_EDIT_BLOG = 4 

   // Edit Mode (Create or Edit). I'm lowkey starting to regret this method but whatever
   readonly CREATE_MODE = 10
   readonly EDIT_MODE = 11

   myBlogs: Array<Blog> = []
   blogs: Array<Blog> = []
   currentSubPage = 1 // by default we are viewing the client's blogs.
   currentEditMode = 10
   selectedBlog: Blog = {} as Blog 

   constructor(private talker: APITalkerService,private client: ClientInfoService) {
      let blog1: Blog = {
        id: 0,
        title: "Ben Shapiro Travels to Barbie World",
        description: "Ok let's say hypothetically i'm a barbie girl. Ok let's also say im in a barbie world. Right, so with this hypothetical its trivial to assume that life in plastic is going to be fantastic.",
        authorId: 0,
        authorName: "You"
      }

      let blog2: Blog = {
        id: 0,
        title: "Ben Shapiro Travels to Some other World",
        description: "Ok let's say hypothetically i'm a barbie girl. Ok let's also say im in a barbie world. Right, so with this hypothetical its trivial to assume that life in plastic is going to be fantastic.",
        authorId: 0,
        authorName: "You"
      }

      let blog3: Blog = {
        id: 0,
        title: "Ben Shapiro Travels to some other other world. World",
        description: "Ok let's say hypothetically i'm a barbie girl. Ok let's also say im in a barbie world. Right, so with this hypothetical its trivial to assume that life in plastic is going to be fantastic.",
        authorId: 0,
        authorName: "You"
      }

      this.myBlogs.push(blog1)
      this.myBlogs.push(blog2)
      this.myBlogs.push(blog3)
   }

   // View,Edit,Create
   viewBlog(blog: Blog) {
    this.selectedBlog = blog
    this.updateSubPage(this.VIEW_BLOG)
   }

   updateSubPage(num: number) {
    this.currentSubPage = num
   }

   updateEditMode(editMode: number) {
    this.currentEditMode = editMode
   }


   get username() {return this.client.getUsername()}
}
