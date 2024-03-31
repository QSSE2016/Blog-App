import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { PreLoginComponent } from './components/pre-login.component';
import { MainComponent } from './components/main.component';
import { BlogCreateEditComponent } from './components/blog-create-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PreLoginComponent,
    MainComponent,
    BlogCreateEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
