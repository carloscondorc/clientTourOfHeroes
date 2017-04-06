import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/secret-heroes" *ngIf="authService.loggedIn()" routerLinkActive="active">Secret Heroes</a>
      <a routerLink="/login" *ngIf="!authService.loggedIn()">Log In</a>
      <a (click)=authService.logout() *ngIf="authService.loggedIn()">Log Out</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {

  title = 'Tour of Heroes';

  constructor(private authService: AuthService) {}
}
