import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Blog, EDIT_MODE, EditCreateBlogRequest } from '../types/types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientInfoService } from '../services/client-info.service';
import { APITalkerService } from '../services/apitalker.service';

@Component({
  selector: 'app-blog-create-edit',
  templateUrl: './blog-create-edit.component.html',
  styleUrls: ['./blog-create-edit.component.css']
})
export class BlogCreateEditComponent implements OnInit,OnDestroy {
  @Input() pageFunctionMode: EDIT_MODE = EDIT_MODE.CREATE
  @Input() blogToEdit?: Blog
  originalTitle: string = ''
  form: FormGroup = new FormGroup({})

  @Output() finishEditEvent = new EventEmitter<void>();
  editBlogSub?: Subscription
  createBlogSub?: Subscription

  constructor(private userInfo: ClientInfoService,private talker: APITalkerService) {}

  ngOnInit(): void {
    if(this.blogToEdit !== undefined)
       this.originalTitle = this.pageFunctionMode == EDIT_MODE.EDIT ? this.blogToEdit.title : ''

    this.form = new FormGroup({
      title: new FormControl(this.pageFunctionMode == EDIT_MODE.CREATE ? '' : this.blogToEdit?.title,Validators.required),
      description: new FormControl(this.pageFunctionMode == EDIT_MODE.CREATE ? '' : this.blogToEdit?.description,Validators.required),
    })
  }

  ngOnDestroy(): void {
    this.editBlogSub?.unsubscribe()
    this.createBlogSub?.unsubscribe()
  }

  submit() {
    let finishedBlog: Blog = {} as Blog

    // There has to be a better way to do this, but i really just want to finish the project.
    // If you want, come up with some way to do this in a nicer way
    if(this.pageFunctionMode == EDIT_MODE.EDIT) {
       this.editBlogSub = this.talker.editBlog(this.originalTitle,this.form.controls['title'].value,this.form.controls['description'].value).subscribe({
        next: () => {
           this.finishEditEvent.emit()
        },
        error: (message) => {
          alert(message.error)
        }
       })
    } else {
      this.createBlogSub = this.talker.createBlog(this.form.controls['title'].value,this.form.controls['description'].value).subscribe({
        next: () => {
           this.finishEditEvent.emit()
        },
        error: (message) => {
          alert(message.error)
        }
       })
    }
  }


  get isCreating() : boolean {return this.pageFunctionMode == EDIT_MODE.CREATE}
}
