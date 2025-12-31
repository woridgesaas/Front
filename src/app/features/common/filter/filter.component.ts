import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  searchValue = '';

  @Input() pageSize = 10;
  @Input() pageSizes: number[] = [10, 25, 50, 100];

  @Output() searchChange = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  onPageSizeChange(size: number): void {
    this.pageSizeChange.emit(size);
  }
}
