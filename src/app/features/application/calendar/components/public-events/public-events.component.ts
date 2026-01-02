import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-public-events',
  imports: [DatePipe],
  templateUrl: './public-events.component.html',
})
export class PublicEventsComponent {
  @Input() publicEvents:any[]=[];
}
