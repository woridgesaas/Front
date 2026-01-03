import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { AuditLog } from '../../../../../shared/models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-audit-list',
  imports: [FormsModule,CommonModule,MatSortModule],
  templateUrl: './audit-list.component.html',
})
export class AuditListComponent {
  @Input() tableData:AuditLog[]=[];
  @Output() onViewItem = new EventEmitter<AuditLog>();

  selectAll: boolean = false;
  //Methods hellpers:
  getActionBadge(action: string): string {
    const badges: Record<string, string> = {
      'create': 'bg-success-subtle text-success border-success',
      'update': 'bg-warning-subtle text-warning border-warning',
      'delete': 'bg-danger-subtle text-danger border-danger',
      'view': 'bg-info-subtle text-info border-info',
      'login': 'bg-primary-subtle text-primary border-primary'
    };
    return badges[action] || 'bg-light text-dark border';
  }
  getActionLabel(action: string): string {
    const labels: Record<string, string> = {
      'create': 'Création',
      'update': 'Modification',
      'delete': 'Suppresion',
      'view': 'Consultation',
      'login': 'Login'
    };
    return labels[action] || action;
  }
  getModuleLabel(module: string): string {
    const labels: Record<string, string> = {
      'rh_intern': 'RH Intern',
      'rh_extern': 'RH Extern',
      'communication': 'Intranet',
      'system': 'Systéme'
    };
    return labels[module] || module;
  }
  getActionIcon(action: string): string {
    const icons: Record<string, string> = {
      'create': 'ti-plus',
      'update': 'ti-edit',
      'delete': 'ti-trash',
      'view': 'ti-eye',
      'login': 'ti-login'
    };
    return icons[action] || 'ti-activity';
  }
    getStatusBadge(status: string): string {
    const badges: Record<string, string> = {
      'success': 'bg-success-subtle text-success border-success',
      'error': 'bg-danger-subtle text-danger border-danger',
      'warning': 'bg-warning-subtle text-warning border-warning'
    };
    return badges[status] || 'bg-secondary';
  }
    getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'success': 'Success',
      'error': 'Error',
      'warning': 'Warning'
    };
    return labels[status] || status;
  }
  //Emition to parent
  public onViewDetails(item:AuditLog):void{
    this.onViewItem.emit(item);
  }
  toggleSelectAll(): void {
    this.tableData.forEach(item => {
      item.isSelected = this.selectAll;
    });
  }
  getSortValue(item: AuditLog, column: string): any {
    switch (column) {
      case 'timestamp': return new Date(item.timestamp);
      case 'user': return item.user.name.toLowerCase();
      case 'action': return item.action;
      case 'module': return item.module;
      case 'object': return item.objectName.toLowerCase();
      case 'status': return item.status;
      default: return '';
    }
  }
  sortData(event: any): void {
    const { active, direction } = event;
    
    if (!active || direction === '') return;

    this.tableData.sort((a, b) => {
      const aValue = this.getSortValue(a, active);
      const bValue = this.getSortValue(b, active);

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
