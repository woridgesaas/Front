import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  // Valeurs qui matchent exactement le backend (LeaveType enum)
  leaveTypes = [
    { label: 'Congé annuel',        value: 'ANNUEL' },
    { label: 'Congé exceptionnel',  value: 'EXCEPTIONNEL' },
    { label: 'Congé maladie',       value: 'MALADIE' },
  ];

  @Input() approvers: string[] = [];

  statuses = [
    { label: 'Approuvé', value: 'APPROVED', bg: 'bg-transparent-success', color: 'text-success' },
    { label: 'Refusé',   value: 'DECLINED', bg: 'bg-transparent-danger',  color: 'text-danger'  },
    { label: 'Nouveau',  value: 'NEW',      bg: 'bg-transparent-purple',  color: 'text-purple'  },
  ];

  sorts = [
    { label: 'Récemment ajouté',  value: 'recent'    },
    { label: 'Croissant',         value: 'asc'        },
    { label: 'Décroissant',       value: 'desc'       },
    { label: 'Mois dernier',      value: 'lastMonth'  },
    { label: 'Derniers 7 jours',  value: 'last7days'  },
  ];

  // Labels affichés dans les boutons dropdown
  selectedTypeLabel    = 'Type de congé';
  selectedApproverLabel = 'Approuvé par';
  selectedStatusLabel  = 'Sélectionner statut';
  selectedSortLabel    = 'Trier par : Derniers 7 jours';

  @Output() dateChange     = new EventEmitter<Date[] | null>();
  @Output() typeChange     = new EventEmitter<string>();
  @Output() approverChange = new EventEmitter<string>();
  @Output() statusChange   = new EventEmitter<string>();
  @Output() sortChange     = new EventEmitter<string>();

  onDateChange() {
    this.dateChange.emit(this.dateRange);
  }

  selectType(label: string, value: string) {
    this.selectedTypeLabel = label;
    this.typeChange.emit(value);
  }

  resetType() {
    this.selectedTypeLabel = 'Type de congé';
    this.typeChange.emit('');
  }

  selectApprover(name: string) {
    this.selectedApproverLabel = name;
    this.approverChange.emit(name);
  }

  resetApprover() {
    this.selectedApproverLabel = 'Approuvé par';
    this.approverChange.emit('');
  }

  selectStatus(label: string, value: string) {
    this.selectedStatusLabel = label;
    this.statusChange.emit(value);
  }

  resetStatus() {
    this.selectedStatusLabel = 'Sélectionner statut';
    this.statusChange.emit('');
  }

  selectSort(label: string, value: string) {
    this.selectedSortLabel = 'Trier par : ' + label;
    this.sortChange.emit(value);
  }

  resetDate() {
    this.dateRange = null;
    this.dateChange.emit(null);
  }
}
