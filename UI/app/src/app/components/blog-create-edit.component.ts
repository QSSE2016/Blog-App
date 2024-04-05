import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog, EDIT_MODE } from '../types/types';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-create-edit',
  templateUrl: './blog-create-edit.component.html',
  styleUrls: ['./blog-create-edit.component.css']
})
export class BlogCreateEditComponent {
  @Input() pageFunctionMode: EDIT_MODE = EDIT_MODE.CREATE
  @Input() blogToEdit?: Blog
  form: FormGroup

  @Output() finishEditEvent = new EventEmitter<Blog>();

  constructor() {
    this.form = new FormGroup({
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
    })
  }

  submit() {
    let finishedBlog: Blog = {} as Blog

    this.finishEditEvent.emit(finishedBlog)
  }


  get isCreating() : boolean {return this.pageFunctionMode == EDIT_MODE.CREATE}
}
