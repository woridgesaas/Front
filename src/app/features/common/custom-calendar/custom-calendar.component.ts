import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent,CalendarView } from 'angular-calendar';
import { CalendarWrapperModule } from '../../../shared/calendar/calendar-wrapper.module'; 
import { 
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths, } from 'date-fns';

@Component({
  selector: 'app-custom-calendar',
  standalone: true,
  imports: [CommonModule, CalendarWrapperModule],
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss'],
})
export class CustomCalendarComponent {
  @Input() events: CalendarEvent[] = [];
  @Input() isMini:boolean =false;

  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() dayClicked = new EventEmitter<any>();
  viewDate: Date = new Date(); 
  view: CalendarView = CalendarView.Month; 
  CalendarView = CalendarView;
  prevMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }
  
  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }
  
  onEventClick(event: CalendarEvent): void {
    alert("event" + event);
    this.eventClicked.emit(event); 
  }
  
  onDayClick(event: any): void {
    alert('Jour cliqué dans le calendrier:'+ event);
    this.dayClicked.emit(event);
  }


 setView(view: CalendarView) {
    this.view = view;
  }

  today(): void {
    this.viewDate = new Date();
  }

  next(): void {
    this.viewDate = this.changeDateByView(this.viewDate, 1);
  }

  prev(): void {
    this.viewDate = this.changeDateByView(this.viewDate, -1);
  }

  private changeDateByView(date: Date, step: number): Date {
    switch (this.view) {
      case CalendarView.Month:
        return step > 0 ? addMonths(date, 1) : subMonths(date, 1);
      case CalendarView.Week:
        return step > 0 ? addWeeks(date, 1) : subWeeks(date, 1);
      case CalendarView.Day:
        return step > 0 ? addDays(date, 1) : subDays(date, 1);
      default:
        return date;
    }
  }
}
