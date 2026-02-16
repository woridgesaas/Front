import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuditLog } from '../../../../../shared/models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../common/modal-footer/modal-footer.component';

@Component({
  selector: 'app-audit-details-modal',
  imports: [FormsModule,CommonModule,ModalHeaderComponent,ModalFooterComponent],
  templateUrl: './audit-details-modal.component.html',
  styleUrl: './audit-details-modal.component.scss',
})
export class AuditDetailsModalComponent {
  @Input() data: any;
  @Input() showAuditDetailsModal:boolean=false;
  
  @Output() onCloseModal=new EventEmitter<void>();
  getActionIcon(): string {
    const icons: Record<string, string> = {
      'create': 'ti-plus',
      'update': 'ti-edit',
      'delete': 'ti-trash',
      'view': 'ti-eye',
      'login': 'ti-login',
      'download': 'ti-download'
    };
    return icons[this.data?.action || ''] || 'ti-activity';
  }

  getActionLabel(): string {
    const labels: Record<string, string> = {
      'create': 'Create',
      'update': 'Update',
      'delete': 'Delete',
      'view': 'View',
      'login': 'Login',
      'download': 'Download'
    };
    return labels[this.data?.action || ''] || this.data?.action || '';
  }

  getActionBadgeClass(): string {
    const classes: Record<string, string> = {
      'create': 'bg-success-subtle text-success border-success',
      'update': 'bg-warning-subtle text-warning border-warning',
      'delete': 'bg-danger-subtle text-danger border-danger',
      'view': 'bg-info-subtle text-info border-info',
      'login': 'bg-primary-subtle text-primary border-primary'
    };
    return classes[this.data?.action || ''] || 'bg-light text-dark border';
  }

  getStatusLabel(): string {
    const labels: Record<string, string> = {
      'success': 'Success',
      'error': 'Error',
      'warning': 'Warning'
    };
    return labels[this.data?.status || ''] || this.data?.status || '';
  }

getStatusBadgeClass(): string {
    const classes: Record<string, string> = {
      'success': 'bg-success-subtle text-success border-success',
      'error': 'bg-danger-subtle text-danger border-danger',
      'warning': 'bg-warning-subtle text-warning border-warning'
    };
    return classes[this.data?.status || ''] || 'bg-secondary';
  }

  getStatusBgClass(): string {
    const classes: Record<string, string> = {
      'success': 'bg-success-subtle',
      'error': 'bg-danger-subtle',
      'warning': 'bg-warning-subtle'
    };
    return classes[this.data?.status || ''] || 'bg-light';
  }

  getModuleIcon(): string {
    const icons: Record<string, string> = {
      'rh_intern': 'ti-users',
      'rh_extern': 'ti-user-plus',
      'communication': 'ti-message',
      'finance': 'ti-currency-dollar',
      'system': 'ti-device-desktop'
    };
    return icons[this.data?.module || ''] || 'ti-apps';
  }

  getModuleLabel(): string {
    const labels: Record<string, string> = {
      'rh_intern': 'Internal HR',
      'rh_extern': 'External HR',
      'communication': 'Communication',
      'finance': 'Finance',
      'system': 'System'
    };
    return labels[this.data?.module || ''] || this.data?.module || '';
  }
  getActionBgClass(): string {
  const classes: Record<string, string> = {
    'create': 'bg-success',
    'update': 'bg-warning',
    'delete': 'bg-danger',
    'view': 'bg-info',
    'login': 'bg-primary'
  };
  return classes[this.data?.action || ''] || 'bg-secondary';
}
  getFormattedDetails(): any[] {
    if (!this.data?.details) return [];
    
    return Object.entries(this.data.details).map(([key, value]) => ({
      key: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value: typeof value === 'object' ? JSON.stringify(value) : value,
      isObject: typeof value === 'object'
    }));
  }
  getRoleLabel(role: string = ''): string {
  const labels: Record<string, string> = {
    'ceo': 'CEO',
    'rh': 'RH',
    'manager': 'Manager',
    'employee': 'Employé',
    'admin': 'Administrateur'
  };
  return labels[role] || role;
}

  public viewUserProfile():void{
    //redirect to employe details
  }


}
