import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Department } from '../../../../../shared/models/models';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-departments-table',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './departments-table.component.html',
  styleUrl: './departments-table.component.scss'
})
export class DepartmentsTableComponent {

  @Input() departments: Department[] = [];

  @Output() edit = new EventEmitter<Department>();
  @Output() delete = new EventEmitter<Department>();
  @Output() sort = new EventEmitter<Sort>();
}