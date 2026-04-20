import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import {
  LeaveApiService,
  CalendarLeaveResponse
} from '../../../../../../shared/services/leave-api.service';

@Component({
  selector: 'app-leave-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.scss']
})
export class LeaveCalendarComponent implements OnInit {

  /* ================== ÉTAT ================== */

  isLoading = false;
  calendarEvents: EventInput[] = [];

  userRole: string = '';
  departments: string[] = [];
  selectedDepartmentId: string = '';

  private currentYear: number = new Date().getFullYear();
  private currentMonth: number = new Date().getMonth() + 1;

  /* ================== FULLCALENDAR CONFIG ================== */

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'fr',
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    buttonText: { today: "Aujourd'hui" },
    height: 'auto',
    events: [],
    dayMaxEvents: 3,
    moreLinkText: 'plus',
    eventDisplay: 'block',

    datesSet: (dateInfo) => {
      this.currentYear = dateInfo.view.currentStart.getFullYear();
      this.currentMonth = dateInfo.view.currentStart.getMonth() + 1;
      this.loadLeaves();
    },

    eventClick: (info) => {
      console.log('Congé cliqué :', info.event);
    }
  };

  /* ================== CYCLE DE VIE ================== */

  constructor(private leaveApi: LeaveApiService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userRole = payload.role || '';
      } catch (e) {
        this.userRole = '';
      }
    }

    if (this.userRole === 'HR' || this.userRole === 'RH') {
      this.loadDepartments();
    }
  }

  /* ================== API ================== */

  loadDepartments(): void {
    this.leaveApi.getDepartments().subscribe({
      next: (data) => { this.departments = data; },
      error: (err) => console.error('Error loading departments', err)
    });
  }

  loadLeaves(): void {
    this.isLoading = true;
    const departmentFilter = this.selectedDepartmentId || undefined;

    this.leaveApi.getCalendarLeaves(
      this.currentYear,
      this.currentMonth,
      departmentFilter
    ).subscribe({
      next: (leaves) => {
        this.calendarEvents = leaves.map(leave => this.toCalendarEvent(leave));
        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.calendarEvents
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading calendar leaves', err);
        this.isLoading = false;
      }
    });
  }

  onDepartmentChange(): void {
    this.loadLeaves();
  }

  /* ================== HELPERS ================== */

  get isHR(): boolean {
    return this.userRole === 'HR' || this.userRole === 'RH';
  }

  shortDepartmentId(id: string): string {
    return 'Dpt ' + id.substring(0, 8);
  }

  private toCalendarEvent(leave: CalendarLeaveResponse): EventInput {
    const endDate = new Date(leave.endDate);
    endDate.setDate(endDate.getDate() + 1);

    const colors = this.getLeaveColors(leave.leaveType);

    return {
      id: leave.leaveId,
      title: `${leave.employeeName}`,
      start: leave.startDate,
      end: endDate.toISOString().split('T')[0],
      backgroundColor: colors.bg,
      borderColor: colors.bg,
      textColor: colors.text,
      extendedProps: {
        departmentId: leave.departmentId,
        leaveType: leave.leaveType,
        employeeId: leave.employeeId
      }
    };
  }

  // ✅ Palette Woridge : violet, vert pastel, orange pastel
  private getLeaveColors(leaveType: string): { bg: string; text: string } {
    switch (leaveType) {
      case 'ANNUEL':       return { bg: '#C084FC', text: '#ffffff' };  // violet Woridge
      case 'MALADIE':      return { bg: '#BBF7D0', text: '#166534' };  // vert pastel / texte vert foncé
      case 'EXCEPTIONNEL': return { bg: '#FED7AA', text: '#9A3412' };  // orange pastel / texte orange foncé
      default:             return { bg: '#E9D5FF', text: '#6B21A8' };
    }
  }
}