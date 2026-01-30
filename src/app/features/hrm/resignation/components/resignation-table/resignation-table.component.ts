import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resignation } from '../../../../../shared/models/models';
import { Sort,MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resignation-table',
  standalone: true,
  imports: [CommonModule,MatSortModule,FormsModule],
  templateUrl: './resignation-table.component.html',
})
export class ResignationTableComponent {

  @Input() tableData: resignation[] = [];
  @Input() initChecked = false;

  @Output() edit = new EventEmitter<resignation>();
  @Output() delete = new EventEmitter<resignation>();
  @Output() selectAll = new EventEmitter<boolean>();
  @Output() sort = new EventEmitter<Sort>();

  onSelectAll() {
    this.selectAll.emit(this.initChecked);
  }

  onSortChange(event: Sort) {
    this.sort.emit(event);
  }
}
