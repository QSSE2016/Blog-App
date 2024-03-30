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
   blogs: Array<Blog> = []
   currentSubPage = 1 // by default we are viewing the client's blogs.
   blogSelected: Blog = {} as Blog

   // I used enums before to track which page is active so now I'll use constants. Perfectly balanced as all things should be.
   readonly EXPLORE = 0
   readonly MY_BLOGS = 1
   readonly ABOUT = 2
   readonly VIEW_BLOG = 3 // secret page hehe

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

      this.blogs.push(blog1)
      this.blogs.push(blog2)
      this.blogs.push(blog3)
   }

   updateSubPage(num: number) {
    this.currentSubPage = num
   }
}
