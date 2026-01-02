import {
  Component,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { CustomCalendarComponent } from '../../common/custom-calendar/custom-calendar.component';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { CalendarEvent } from 'angular-calendar';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { PublicEventsComponent } from './components/public-events/public-events.component';
import { CalendarService } from '../../../shared/services/calendar-service';
import { EventDetailsComponent } from './components/event-details/event-details.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CustomCalendarComponent,
    CommonModule,
    DatePickerModule,
    FormsModule,
    BsDatepickerModule,
    BreadcrumbsComponent,
    MyEventsComponent,
    PublicEventsComponent,
    EventDetailsComponent
  ],
})
export class CalendarComponent implements OnInit {

  showEventDetailsModal = false;
  eventDetails = { title: '' ,startDate: '' , startTime:''};
  date: Date[] | undefined;
  dropdownOpen = false;
  selectedTime: Date = new Date();
  addtime2: Date | undefined;
  addtime: Date | undefined;
  bsInlineValue = new Date();

  myEvents: any[] = [];
  publicEvents: any[] = [];
  //flitring list 
  filtredPublicEvents: any[]=[]; 
  activeFilter: string = 'all';
  eventTypes = [
    { value: 'all', label: 'Tous', icon: 'ti ti-list' },
    { value: 'entretien', label: 'Entretiens', icon: 'ti ti-user-star' },
    { value: 'reunion', label: 'Réunions', icon: 'ti ti-users' },
    { value: 'Fête', label: 'Fête', icon: 'ti ti-confetti' }
  ];

  calendarEvents: CalendarEvent[] = [];
  constructor(private eventService : CalendarService){}
  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.myEvents = this.eventService.getEventsByEmploye();
     this.publicEvents =this.eventService.getPublicEvents();
     this.filtredPublicEvents = [...this.publicEvents];
    // switch to events of calendar :
    this.calendarEvents = [
      ...this.myEvents.map(event => ({
        id: event.id,
        title: event.title,
        start: event.date,
        color: { 
          primary: this.getColorHex(event.color), 
          secondary: this.getColorHex(event.color, true) 
        },
        meta: { type: event.type, personal: true }
      })),
      ...this.publicEvents.map(event => ({
        id: 'pub-' + event.id,
        title: event.title + ' (Public)',
        start: event.date,
        color: { primary: '#0d6efd', secondary: '#cfe2ff' },
        meta: { type: event.type, public: true }
      }))
    ];
  }

  openDropdown(): void {
    this.dropdownOpen = true;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  onTimeChange(): void {
    this.closeDropdown();
  }

  handleEventDetailsClose(): void {
    this.showEventDetailsModal = false;
  }
  applyFilter(type: string): void {
    this.activeFilter = type;
    if(this.activeFilter === 'all')
      this.filtredPublicEvents = [...this.publicEvents];
    else{
        this.filtredPublicEvents= this.publicEvents.filter(event=>event.type === this.activeFilter);
    }
    
  }
  //============ Emited events ====================
  onEventClick(event: CalendarEvent): void {
    const dateIso = event.start;
    this.eventDetails.title = event.title;
    this.eventDetails.startDate = dateIso.toLocaleDateString('fr-FR');
    this.eventDetails.startTime = dateIso.toLocaleTimeString('fr-FR');
    this.showEventDetailsModal = true;
  }

  onDayClick(event: any): void {
    
    console.log('Jour cliqué dans le parent:', event);

    
  }
  private getColorHex(colorName: string, light: boolean = false): string {
    const colors: {[key: string]: string} = {
      purple: light ? '#e2d9f3' : '#6f42c1',
      pink: light ? '#f7d6e6' : '#d63384',
      success: light ? '#d1e7dd' : '#198754',
      primary: light ? '#cfe2ff' : '#0d6efd'
    };
    return colors[colorName] || (light ? '#e9ecef' : '#6c757d');
  }
}
