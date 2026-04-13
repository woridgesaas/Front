import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Holiday } from '../../../../../shared/models/models';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../common/modal-footer/modal-footer.component';
import { EmptyStateComponent } from '../../../../common/empty-state/empty-state.component';

@Component({
  selector: 'app-holiday-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EmptyStateComponent
  ],
  templateUrl: './holiday-table.component.html',
  styleUrl: './holiday-table.component.scss',
})
export class HolidayTableComponent {
  @Input() holidays: Holiday[] = [];
  @Input() showResetButton: boolean = false;
  @Output() resetFilters = new EventEmitter<void>();
  @Output() openAddModal = new EventEmitter<void>();
  selectedHoliday: Holiday | null = null;

  selectHoliday(holiday: Holiday) {
    this.selectedHoliday = { ...holiday }; // clone propre
  }

  closeModal() {
    this.selectedHoliday = null;
  }
  openUpdateModal(holiday:Holiday){
    alert("Do something");
  }



}
