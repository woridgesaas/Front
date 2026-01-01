import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Holiday } from '../../../../../shared/models/models';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../common/modal-footer/modal-footer.component';

@Component({
  selector: 'app-holiday-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
  ],
  templateUrl: './holiday-table.component.html',
  styleUrl: './holiday-table.component.scss',
})
export class HolidayTableComponent {
  @Input() holidays: Holiday[] = [];

  selectedHoliday: Holiday | null = null;

  selectHoliday(holiday: Holiday) {
    this.selectedHoliday = { ...holiday }; // clone propre
  }

  closeModal() {
    this.selectedHoliday = null;
  }
}
