import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent {
  @Input() eventDetails:any;
  @Input() showEventDetailsModal:boolean=false;

  @Output() modalClosed =new EventEmitter();
  public onHandlleClose():void{
    this.modalClosed.emit();
  }
}
