import { Component } from '@angular/core';
import { Blog, EDIT_MODE } from '../types/types';
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

   // Edit Mode (Create or Edit). I have to use enums here (ok have, is a lie but whatever) since i want to use the mode in another component too.

   myBlogs: Array<Blog> = []
   blogs: Array<Blog> = []
   currentSubPage = this.MY_BLOGS 
   currentEditMode: EDIT_MODE = EDIT_MODE.CREATE
   selectedBlog?: Blog

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

      this.selectedBlog = blog1
      this.myBlogs.push(blog1)
      this.myBlogs.push(blog2)
      this.myBlogs.push(blog3)
   }

   // View,Edit,Create,Delete
   viewBlog(blog: Blog) {
    this.selectedBlog = blog
    this.updateSubPage(this.VIEW_BLOG)
   }

   editBlog(blog: Blog) {
    this.selectedBlog = blog
    this.updateEditMode(EDIT_MODE.EDIT)
    this.updateSubPage(this.CREATE_EDIT_BLOG)
   }

   createBlog() {
     this.selectedBlog = undefined
     this.updateEditMode(EDIT_MODE.CREATE)
     this.updateSubPage(this.CREATE_EDIT_BLOG)
   }

   deleteBlog(blog: Blog) {
    if(confirm("Are you sure you want to delete this blog?")) {
      alert("Blog Deleted!") // will implement later.
    } 
   }

   updateSubPage(num: number) {
    this.currentSubPage = num
   }

   updateEditMode(editMode: EDIT_MODE) {
    this.currentEditMode = editMode
   }


   // Events
   saveEditChanges(blog: Blog) {
    alert("saved!")
    this.updateSubPage(this.MY_BLOGS)
   }


   get username() {return this.client.getUsername()}
}
