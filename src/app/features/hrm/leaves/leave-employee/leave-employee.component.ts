import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { FormsModule } from '@angular/forms';
import { LeavesKpisComponent } from '../Components/leaves-kpis/leaves-kpis.component';
import { FilterComponent } from '../../../common/filter/filter.component';
import { LeavesTableComponent } from '../Components/leaves-table/leaves-table.component';
import { ConfirmDeleteComponent } from '../../../common/delete-modal/delete-modal.component';
import { LeavesToolbarComponent } from '../Components/leaves-toolbar/leaves-toolbar.component';
import { LeavesModalStateService } from '../services/leaves-modal-state.service';
import { LeaveService } from '../services/leave.service';
import { LeaveRequestListResponse } from '../models/leave-request-list-response.model';

@Component({
  selector: 'app-leave-employee',
  templateUrl: './leave-employee.component.html',
  styleUrl: './leave-employee.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    BsDatepickerModule,
    FormsModule,
    MatSortModule,
    BreadcrumbsComponent,
    CustomPaginationComponent,
    LeavesKpisComponent,
    FilterComponent,
    LeavesTableComponent,
    ConfirmDeleteComponent,
    LeavesToolbarComponent,
  ],
})
export class LeaveEmployeeComponent {

  selectedLeave: LeaveRequestListResponse | null = null;
  public routes = routes;
  initChecked = false;

  // pagination variables
  public pageSize = 10;
  public tableData: LeaveRequestListResponse[] = [];
  public tableDataCopy: LeaveRequestListResponse[] = [];
  public actualData: LeaveRequestListResponse[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<LeaveRequestListResponse>;
  public searchDataValue = '';
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(
    private router: Router,
    private pagination: PaginationService,
    private modalState: LeavesModalStateService,
    private leaveService: LeaveService,       // ← remplace DataService
  ) {
    this.leaveService.getAll().subscribe((data: LeaveRequestListResponse[]) => {
      this.actualData = data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.leaveemployee) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  private getTableData(pageOption: pageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];
    this.totalData = this.actualData.length;

    this.actualData.forEach((res: LeaveRequestListResponse, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        this.tableData.push(res);
        this.tableDataCopy.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });

    this.dataSource = new MatTableDataSource<LeaveRequestListResponse>(this.actualData);
    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
  }

  public row = true;
  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchDataValue;
    this.tableData = this.dataSource.filteredData;
    this.row = this.tableData.length > 0;

    if (this.searchDataValue !== '') {
      this.pagination.calculatePageSize.next({
        totalData: this.tableData.length,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.tableData.map((_, i) => i + 1),
      });
    } else {
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    }
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

  onEditClick(leave: LeaveRequestListResponse): void {
    this.selectedLeave = leave;
  }

  onSearchChange(value: string): void {
    this.searchDataValue = value;
    this.searchData(value);
  }

  onDeleteClick(leave: LeaveRequestListResponse): void {
    this.selectedLeave = leave;
  }

  confirmDelete(leave: LeaveRequestListResponse): void {
    console.log('DELETE CONFIRMED:', leave);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.changePageSize(size);
  }

  openDeleteModal(leave: LeaveRequestListResponse): void {
    this.selectedLeave = leave;
  }

  onDateFilter(range: Date[] | null): void {
    console.log('DATE:', range);
  }

  onTypeFilter(type: string): void {
    console.log('TYPE:', type);
  }

  onApproverFilter(name: string): void {
    console.log('APPROVER:', name);
  }

  onStatusFilter(status: string): void {
    console.log('STATUS:', status);
  }

  onSortFilter(sort: string): void {
    console.log('SORT:', sort);
  }
}
