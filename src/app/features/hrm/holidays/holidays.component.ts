import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-holidays',
  standalone: true,
  imports: [
    RouterOutlet   
  ],
  templateUrl: './holidays.component.html',
})
export class HolidaysComponent {}
