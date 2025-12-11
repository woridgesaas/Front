import {  Component, ViewEncapsulation ,OnInit, AfterViewInit} from '@angular/core';

import { routes } from '../../../shared/routes/routes';
import { CustomCalendarComponent } from '../../common/custom-calendar/custom-calendar.component';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseHeaderComponent } from '../../common/collapse-header/collapse-header.component';
import { DateRangePickerComponent } from '../../common/date-range-picker/date-range-picker.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [CustomCalendarComponent,CommonModule,DatePickerModule,FormsModule,BsDatepickerModule
      ,CollapseHeaderComponent,DateRangePickerComponent,RouterLink  
    ]
})
export class CalendarComponent implements OnInit, AfterViewInit {
  routes = routes
  showEventDetailsModal = false;
  eventDetails = { title: '' };
  date: Date[] | undefined;
  dropdownOpen = false;
  selectedTime: Date = new Date();
  addtime2: Date | undefined;
  addtime: Date | undefined;
  bsInlineValue = new Date()
  constructor() {}

  ngOnInit(): void {}
    // Open the dropdown
    openDropdown() {
      this.dropdownOpen = true;
    }

    // Close the dropdown
    closeDropdown() {
      this.dropdownOpen = false;
    }

    // Update displayed time when selection changes
    onTimeChange() {
      this.closeDropdown(); // Close dropdown after time selection
    }
  ngAfterViewInit(): void {
    // Initialize external draggable events
    const containerEl = document.getElementById('external-events');


    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendar');



  }

  handleEventDetailsClose() {
    this.showEventDetailsModal = false;
  }
}
