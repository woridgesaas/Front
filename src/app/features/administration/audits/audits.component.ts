import { PaginationService, tablePageSize } from './../../../shared/custom-pagination/pagination.service';
import { routes } from './../../../shared/routes/routes';
import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { AuditLog, AuditLogResponse } from '../../../shared/models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomPaginationComponent } from '../../../shared/custom-pagination/custom-pagination.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuditsService } from '../../../shared/services/audits/audits-service';
import { AuditListComponent } from './components/audit-list/audit-list.component';
import { FooterStatesComponent } from './components/footer-states/footer-states.component';
import { ConnectableObservable } from 'rxjs';
@Component({
  selector: 'app-audits',
  imports: [BreadcrumbsComponent,FormsModule,CommonModule,CustomPaginationComponent,BsDatepickerModule,AuditListComponent,FooterStatesComponent],
  templateUrl: './audits.component.html',
  styleUrl: './audits.component.scss',
})
export class AuditsComponent {
  selectedItem: AuditLog|null=null;
  lastUpdate: Date = new Date();
  // Data
  originAudit: AuditLog[] = []; // datasource imutable
  filteredAudit: AuditLog[] = [];
  tableData: AuditLog[] = [];

  // Filtres
  dateRange: Date[] = [];
  moduleFilter: string = '';
  roleFilter: string = '';
  statusFilter: string = '';
  searchText: string = '';
  private lastBackendDateRange: string = '';

  // Pagination
  pageSize: number = 10;
  totalItems: number = 0;
  
  public auditStates: Record<string, number> = {};

  constructor(
    private auditService: AuditsService,
    private pagination: PaginationService 
  ) {}

  private getDataFromService(): void {
    const start = this.dateRange[0] ? this.formatDate(this.dateRange[0]) : undefined;
    const end = this.dateRange[1] ? this.formatDate(this.dateRange[1]) : undefined;

    this.auditService.getAllAudits(undefined,start, end).subscribe({
      next: (response) => {
        this.originAudit = response.data;
        this.applyFilters(); 
        this.initStates();
        
      },
      error: (err) => console.error('Error while charging data', err)
    });
  }
  private updateDisplay(skip: number, limit: number): void {
    this.tableData = this.filteredAudit.slice(skip, limit);
  }
  private initStates(): void {

    this.auditStates = {
      totalItems: this.originAudit.length,
      success: this.originAudit.filter(item => item.status === 'success').length,
      errors: this.originAudit.filter(item => item.status === 'failed' || item.status === 'error').length,
    };
  }
  ngOnInit(): void {
    this.getDataFromService();
    
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      this.pageSize = res.pageSize;
      this.updateDisplay(res.skip, res.limit);
    });
    
  }

  // Filtering
  applyFilters(): void {
    
    let filtered = [...this.originAudit];
    if (this.dateRange && this.dateRange.length === 2 && this.dateRange[0] && this.dateRange[1]) {
      const currentRangeStr = this.dateRange[0].getTime() + '-' + this.dateRange[1].getTime();
      if (currentRangeStr !== this.lastBackendDateRange) {
        this.lastBackendDateRange = currentRangeStr;
        this.getDataFromService();
        return; 
      }
    }

    // Module filter
    if (this.moduleFilter) {
      filtered = filtered.filter(item => item.serviceName === this.moduleFilter);
    }

    // Role filter
    if (this.roleFilter) {
      filtered = filtered.filter(item => item.userRole === this.roleFilter);
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(item => item.status === this.statusFilter);
    }

    // Search filter
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(item => 
        item.userMatricule.toLowerCase().includes(search) ||
        item.targetId.toLowerCase().includes(search) ||
        item.action.toLowerCase().includes(search)
      );
    }

    this.filteredAudit = filtered;
    this.totalItems = filtered.length;

    this.pagination.calculatePageSize.next({
      totalData: this.totalItems,
      pageSize: this.pageSize,
      tableData: this.filteredAudit,
      serialNumberArray: filtered.map((_, i) => i + 1)
    });
    this.updateDisplay(0, this.pageSize);
  }

  // Clear all filters
  clearFilters(): void {
    this.dateRange = [];
    this.moduleFilter = '';
    this.roleFilter = '';
    this.statusFilter = '';
    this.searchText = '';
    this.lastBackendDateRange = '';
    this.applyFilters();
  }
    getActiveFiltersCount(): number {
    let count = 0;
    if (this.moduleFilter !== '') count++;
    if (this.searchText!== '') count++;
    if (this.dateRange?.length === 2) count++;
    if(this.roleFilter !== '') count++;
    return count;
  }
  public onPageSizeChange(): void {
    this.pageSize = Number(this.pageSize);
    this.pagination.changePagesize.next({
      pageSize: Number(this.pageSize)
    });

    this.applyFilters(); 
  }

  hasActiveFilters(): boolean {
    return this.getActiveFiltersCount() > 0;
  }

  exportData(): void {
    const selected = this.tableData.filter(item => item.isSelected);
    const dataToExport = selected.length > 0 ? selected : this.filteredAudit;
    this.auditService.export(dataToExport);
    alert(`Exporting ${dataToExport.length} items`);
  }
  private formatDate(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

}
