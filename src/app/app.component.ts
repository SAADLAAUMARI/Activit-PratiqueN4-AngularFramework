import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AppErrorComponent} from "./app-error/app-error.component";
import {appHttpInterceptor} from "./services/app-http.interceptor";


@Component({
  selector: 'app-root',
  standalone: true,
  //Ce que j'ai ajouté
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: appHttpInterceptor,
      multi: true
    }
  ],
  imports: [RouterOutlet, RouterLink, CommonModule, HttpClientModule, FormsModule, DashboardComponent, NavbarComponent, AppErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
