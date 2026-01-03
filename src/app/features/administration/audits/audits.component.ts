import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { AuditLog } from '../../../shared/models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomPaginationComponent } from '../../../shared/custom-pagination/custom-pagination.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuditsService } from '../../../shared/services/audits-service';
import { AuditListComponent } from './components/audit-list/audit-list.component';
import { AuditDetailsModalComponent } from './components/audit-details-modal/audit-details-modal.component';
import { FooterStatesComponent } from './components/footer-states/footer-states.component';
@Component({
  selector: 'app-audits',
  imports: [BreadcrumbsComponent,FormsModule,CommonModule,CustomPaginationComponent,BsDatepickerModule,AuditListComponent,AuditDetailsModalComponent,FooterStatesComponent],
  templateUrl: './audits.component.html',
  styleUrl: './audits.component.scss',
})
export class AuditsComponent {
  selectedItem:AuditLog|null=null;
  showAuditDetailsModal = false;
  allData: AuditLog[]=[];
  lastUpdate: Date = new Date();
  // Display data
  tableData: AuditLog[] = [];
  
  // Filters
  dateRange: Date[] = [];
  moduleFilter: string = '';
  roleFilter: string = '';
  statusFilter: string = '';
  searchText: string = '';
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
 //States to send theme to child :
 public auditStates:Record<string , number>={}
  constructor(private audiService :AuditsService){
  }
  private getDataFromService():void{
    this.allData=this.audiService.getAllAudits();
    
  }
  private initStates():void{
    this.auditStates={
      totalItems:this.totalItems,
      success:this.getSuccessCount(),
      errors:this.getErrorCount(),

    }
  }
  ngOnInit(): void {
    this.getDataFromService();
    this.tableData = [...this.allData];
    this.totalItems = this.tableData.length;
    this.initStates();
  }
  //Emited events :
  public itemDetails(item:AuditLog):void{
    this.selectedItem = item;
    this.openDetailsModal();
  }
  private openDetailsModal():void{
    this.showAuditDetailsModal=true;
  }
  public handlleCloseModal():void{
    this.showAuditDetailsModal=false;
  }
  // Filtering
  applyFilters(): void {
    let filtered = [...this.allData];

    // Date range filter
    if (this.dateRange && this.dateRange.length === 2) {
      const start = new Date(this.dateRange[0]);
      const end = new Date(this.dateRange[1]);
      end.setHours(23, 59, 59);
      
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= start && itemDate <= end;
      });
    }

    // Module filter
    if (this.moduleFilter) {
      filtered = filtered.filter(item => item.module === this.moduleFilter);
    }

    // Role filter
    if (this.roleFilter) {
      filtered = filtered.filter(item => item.user.role === this.roleFilter);
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(item => item.status === this.statusFilter);
    }

    // Search filter
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(item => 
        item.user.name.toLowerCase().includes(search) ||
        item.objectName.toLowerCase().includes(search) ||
        item.action.toLowerCase().includes(search)
      );
    }

    this.tableData = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
  }

  // Clear all filters
  clearFilters(): void {
    this.dateRange = [];
    this.moduleFilter = '';
    this.roleFilter = '';
    this.statusFilter = '';
    this.searchText = '';
    this.applyFilters();
  }

  // Statistics
  getSuccessCount(): number {
    return this.tableData.filter(item => item.status === 'success').length;
  }

  getErrorCount(): number {
    return this.tableData.filter(item => item.status === 'error').length;
  }

  // Actions
  viewDetails(item: AuditLog): void {
    console.log('View details:', item);
    // In real app: open modal or navigate
  }

  exportData(): void {
    const selected = this.tableData.filter(item => item.isSelected);
    const data = selected.length > 0 ? selected : this.tableData;
    console.log('Exporting:', data);
    alert(`Exporting ${data.length} items`);
  }


  // Pagination
  changePage(page: any): void {
    this.currentPage = page;
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }
}
