import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments-filters.component.html',
})
export class DepartmentsFiltersComponent {
  @Input() status: 'all' | 'Actif' | 'Inactif' = 'all';
  @Output() statusChange = new EventEmitter<'all' | 'Actif' | 'Inactif'>();

  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();
}
