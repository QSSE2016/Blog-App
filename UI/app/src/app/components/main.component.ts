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

   constructor(private talker: APITalkerService,private client: ClientInfoService) {
      let blog1: Blog = {
        id: 0,
        title: "Blog 1",
        description: "Description 1",
        authorId: 0,
        authorName: "I dunno what vegan is."
      }

      this.blogs.push(blog1)
   }
}
