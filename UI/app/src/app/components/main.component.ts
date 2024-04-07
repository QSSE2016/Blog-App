import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog, EDIT_MODE } from '../types/types';
import { APITalkerService } from '../services/apitalker.service';
import { ClientInfoService } from '../services/client-info.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnDestroy {
   // I used enums before to track which page is active so now I'll use constants. Perfectly balanced as all things should be.
   readonly EXPLORE = 0
   readonly MY_BLOGS = 1
   readonly ABOUT = 2

   // Secret Pages
   readonly VIEW_BLOG = 3 
   readonly CREATE_EDIT_BLOG = 4 
   
   // Edit Mode (Create or Edit). I have to use enums here (ok have, is a lie but whatever) since i want to use the mode in another component too.
   currentSubPage = this.MY_BLOGS 
   currentEditMode: EDIT_MODE = EDIT_MODE.CREATE
   selectedBlog?: Blog

   // Information
   blogs: Array<Blog> = []
   myBlogs: Array<Blog> = []
   allBlogSub?: Subscription
   myBlogSub?: Subscription
   deleteSub?: Subscription

   constructor(private talker: APITalkerService,private client: ClientInfoService) {    }

   ngOnInit(): void {
     this.getBlogsToView()
   }

   ngOnDestroy(): void {
     this.myBlogSub?.unsubscribe()
     this.allBlogSub?.unsubscribe()
     this.deleteSub?.unsubscribe()
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

   deleteBlog(i: number) {
    if(confirm("Are you sure you want to delete this blog?")) {
      this.deleteSub = this.talker.deleteBlog(this.myBlogs[i].id).subscribe({
        next: (arg) => {
          this.myBlogs.splice(i,1)
          console.log("on next")
        },
        error: (arg) => {
          console.log("ERROR")
        }
      }) // idk if this sub,unsub stuff is needed but it's going here regardgless
    } 
   }

   updateSubPage(num: number) {
    this.currentSubPage = num
   }

   updateEditMode(editMode: EDIT_MODE) {
    this.currentEditMode = editMode
   }


   // Events
   saveEditChanges() {
    this.getBlogsToView()
    this.updateSubPage(this.MY_BLOGS)
   }

   getBlogsToView() {
    this.allBlogSub = this.talker.getAllBlogs().subscribe((items: any) => {
      this.blogs = items
   })

   this.myBlogSub = this.talker.getMyBlogs().subscribe((items: any) => {
    this.myBlogs = items
   })
   }

   get username() {return this.client.getUsername()}
}
