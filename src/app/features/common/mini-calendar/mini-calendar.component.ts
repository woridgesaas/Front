import { Component } from '@angular/core';
import { CustomCalendarComponent } from '../custom-calendar/custom-calendar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarService } from '../../../shared/services/calendar-service';
import { RouterModule } from '@angular/router';
import { EventDetailsComponent } from '../../application/calendar/components/event-details/event-details.component';
import { CalendarEvent } from 'angular-calendar';
@Component({
  selector: 'app-mini-calendar',
  imports: [CustomCalendarComponent,CommonModule,FormsModule,RouterModule,EventDetailsComponent],
  templateUrl: './mini-calendar.component.html',
  styleUrl: './mini-calendar.component.scss',
})
export class MiniCalendarComponent {
  miniEvents:any=[];
  showEventDetailsModal:boolean=false;
  isVisible = false;
  currentDate = new Date();
  eventDetails = { title: '' ,startDate: '' , startTime:''};
  constructor(private eventsService :CalendarService) {
    
    this.loadMiniEvents();
  }
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  private loadMiniEvents(): void {

    const data= this.eventsService.getPublicEvents();
    this.miniEvents=data.map((event:any) => ({
        id: event.id,
        title: event.title,
        start: event.date,
        color: { 
          primary: this.getColor(event.color), 
          secondary: this.getColor(event.color) 
        },
        meta: { type: event.type, personal: true }
      }))
    }

  handleEventDetailsClose(): void {
    this.showEventDetailsModal = false;
  }
    onEventClick(event: CalendarEvent): void {
      const dateIso = event.start;
      this.eventDetails.title = event.title;
      this.eventDetails.startDate = dateIso.toLocaleDateString('fr-FR');
      this.eventDetails.startTime = dateIso.toLocaleTimeString('fr-FR');
      this.showEventDetailsModal = true;
    }
  private getColor(type: string): { primary: string; secondary: string } { 
    const colors: Record<string, { primary: string; secondary: string }> = 
    { 'reunion': { primary: '#0d6efd', secondary: '#cfe2ff' },
    'evenement': { primary: '#198754', secondary: '#d1e7dd' }, 
    'Fête': { primary: '#dc3545', secondary: '#f8d7da' } };
    return colors[type] || colors['reunion'];
   }
}

