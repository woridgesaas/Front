
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
 
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string; label: string; sortable?: boolean }[] = [];
  @Input() showActions = false;
  @Output() onSort = new EventEmitter<{ key: string; direction: string }>();

  sortKey = '';
  sortDir: 'asc' | 'desc' = 'asc';
  sortedData: any[] = [];

  ngOnChanges(): void {
    this.sortedData = [...this.data];
    if (this.sortKey) this.applySort();
  }

  sort(key: string): void {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'asc';
    }
    this.applySort();
    this.onSort.emit({ key, direction: this.sortDir });
  }

  private applySort(): void {
    this.sortedData = [...this.data].sort((a, b) => {
      const aVal = this.getValue(a, this.sortKey);
      const bVal = this.getValue(b, this.sortKey);
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return this.sortDir === 'asc' ? comparison : -comparison;
    });
  }

  getValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }
}