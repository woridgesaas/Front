import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-filters.component.html',
  styleUrl: './post-filters.component.scss',
})
export class PostFiltersComponent {
  @Input() status = 'all';
  @Input() search = '';

  @Output() statusChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
}
