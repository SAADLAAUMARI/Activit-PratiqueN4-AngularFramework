import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-app-error',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe
  ],
  templateUrl: './app-error.component.html',
  styleUrl: './app-error.component.css'
})
export class AppErrorComponent {
   constructor(public appState: AppStateService) {
   }
}
