import { Component } from '@angular/core';

export enum Page {
  PRE_LOGIN,
  MAIN
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page: Page = Page.PRE_LOGIN

  get isInPreLogin() {return this.page == Page.PRE_LOGIN}
}
