import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { PreLoginComponent } from './components/pre-login.component';
import { MainComponent } from './components/main.component';

@NgModule({
  declarations: [
    AppComponent,
    PreLoginComponent,
    MainComponent
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
