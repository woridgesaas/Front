import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promotion } from '../../../../../shared/models/models';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-promotions-table',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './promotion-table.component.html',
})
export class PromotionsTableComponent {

  @Input() promotions: Promotion[] = [];

  @Output() edit = new EventEmitter<Promotion>();
  @Output() remove = new EventEmitter<Promotion>();
  @Output() sort = new EventEmitter<Sort>();

  trackById(index: number, item: Promotion) {
  return item.id ?? index;
}
}