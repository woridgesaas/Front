import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-events',
  imports: [DatePipe,CommonModule],
  templateUrl: './my-events.component.html',
})
export class MyEventsComponent {
  @Input() myEvents:any[]=[];
}
