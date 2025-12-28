import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { department } from '../../../../../shared/models/models';

@Component({
  selector: 'app-departments-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments-table.component.html',
  styleUrl:'./departments-table.component.scss'
})
export class DepartmentsTableComponent {
  @Input() departments: department[] = [];
openDeleteModal(item: department) {
}
@Output() delete = new EventEmitter<department>();
  @Output() edit = new EventEmitter<department>();
}
