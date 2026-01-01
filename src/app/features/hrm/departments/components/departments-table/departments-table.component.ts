import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { department } from '../../../../../shared/models/models';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-departments-table',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './departments-table.component.html',
  styleUrl: './departments-table.component.scss'
})
export class DepartmentsTableComponent {
  @Input() departments: department[] = [];

  @Output() edit = new EventEmitter<department>();
  @Output() delete = new EventEmitter<department>();
  @Output() sort = new EventEmitter<Sort>();
}
