import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreateEditComponent } from './blog-create-edit.component';

describe('BlogCreateEditComponent', () => {
  let component: BlogCreateEditComponent;
  let fixture: ComponentFixture<BlogCreateEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogCreateEditComponent]
    });
    fixture = TestBed.createComponent(BlogCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
