import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-leaves-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule],
  templateUrl: './leaves-toolbar.component.html',
})

export class LeavesToolbarComponent {

  dateRange: Date[] | null = null;

  leaveTypes = [
    'Congé annuel',
    'Congé Exceptionnelle',
    'Congé maladie',
  ];

  approvers = [
    'Doglas Martini',
    'Warren Morales',
  ];

  statuses = [
    {
      label: 'Approuvé',
      value: 'Approved',
      bg: 'bg-transparent-success',
      color: 'text-success',
    },
    {
      label: 'Refusé',
      value: 'Declined',
      bg: 'bg-transparent-danger',
      color: 'text-danger',
    },
    {
      label: 'Nouveau',
      value: 'New',
      bg: 'bg-transparent-purple',
      color: 'text-purple',
    },
  ];

  sorts = [
    { label: 'Récemment ajouté', value: 'recent' },
    { label: 'Croissant', value: 'asc' },
    { label: 'Décroissant', value: 'desc' },
    { label: 'Mois dernier', value: 'lastMonth' },
    { label: 'Derniers 7 jours', value: 'last7days' },
  ];

  @Output() dateChange = new EventEmitter<Date[] | null>();
  @Output() typeChange = new EventEmitter<string>();
  @Output() approverChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();

  onDateChange() {
    this.dateChange.emit(this.dateRange);
  }

  selectType(type: string) {
    this.typeChange.emit(type);
  }

  selectApprover(name: string) {
    this.approverChange.emit(name);
  }

  selectStatus(status: string) {
    this.statusChange.emit(status);
  }

  selectSort(sort: string) {
    this.sortChange.emit(sort);
  }
}
