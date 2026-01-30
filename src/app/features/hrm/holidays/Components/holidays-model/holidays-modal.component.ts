import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Holiday } from '../../../../../shared/models/models';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../common/modal-footer/modal-footer.component';
import { HolidayService } from '../../../../../shared/services/holiday.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-holiday-add-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    BsDatepickerModule, 
    ModalFooterComponent,
  ],
  templateUrl: './holidays-modal.component.html',
  styleUrl:'./holidays-modal.component.scss',
})
export class HolidayAddModalComponent implements OnInit {

  @Input() open = false;

  @Output() add = new EventEmitter<Holiday>();
  @Output() cancel = new EventEmitter<void>();

  holiday: Holiday = this.emptyHoliday();

  allHolidays: Holiday[] = [];
  filteredHolidays: Holiday[] = [];

  showDropdown = false;

  constructor(private holidayService: HolidayService) {}

  ngOnInit() {
    this.holidayService.getHolidayTemplates().subscribe(data => {
      this.allHolidays = data;
      this.filteredHolidays = data;
    });
  }

  onFocus() {
    this.showDropdown = true;
    this.filteredHolidays = this.allHolidays;
  }

  filterHolidays(term: string) {
    this.showDropdown = true;

    if (!term) {
      this.filteredHolidays = this.allHolidays;
      return;
    }

    const value = term.toLowerCase();
    this.filteredHolidays = this.allHolidays.filter(h =>
      h.nameFr.toLowerCase().includes(value) ||
      h.nameAr.includes(value)
    );
  }

  selectHoliday(h: Holiday) {
    this.holiday = {
      ...h,
      id: Date.now(),
      date: new Date(h.date),
    };

    this.showDropdown = false;
  }

  onBlur() {
    setTimeout(() => (this.showDropdown = false), 150);
  }

  submit() {
    this.add.emit(this.holiday);
    this.close();
  }

  close() {
    this.cancel.emit();
    this.holiday = this.emptyHoliday();
    this.showDropdown = false;
  }

  private emptyHoliday(): Holiday {
    return {
      id: Date.now(),
      nameFr: '',
      nameAr: '',
      date: new Date(),
      days: 1,
      type: 'national',
    };
  }
}
