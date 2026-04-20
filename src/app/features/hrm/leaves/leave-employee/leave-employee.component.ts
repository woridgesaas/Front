import { Component, OnInit } from '@angular/core';
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
import { LeaveType } from '../models/leave-type.enum';

@Component({
  selector: 'app-leave-employee',
  templateUrl: './leave-employee.component.html',
  styleUrl: './leave-employee.component.scss',
  imports: [
    CommonModule, RouterModule, BsDatepickerModule, FormsModule, MatSortModule,
    BreadcrumbsComponent, CustomPaginationComponent, LeavesKpisComponent,
    FilterComponent, LeavesTableComponent, ConfirmDeleteComponent, LeavesToolbarComponent,
  ],
})
export class LeaveEmployeeComponent implements OnInit {

  selectedLeave: LeaveRequestListResponse | null = null;
  public routes = routes;
  initChecked = false;

  // pagination
  public pageSize = 10;
  public tableData: LeaveRequestListResponse[] = [];
  public tableDataCopy: LeaveRequestListResponse[] = [];
  public actualData: LeaveRequestListResponse[] = [];
  public filteredData: LeaveRequestListResponse[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<LeaveRequestListResponse>;
  public searchDataValue = '';

  // KPIs
  public annualCount = 0;
  public totalCount = 0;
  public remainingBalance = 0;

  // Filtres actifs
  private activeFilters = {
    dateRange: null as Date[] | null,
    type: '' as string,
    approver: '' as string,
    status: '' as string,
    sort: '' as string,
  };

  // Approvers dynamiques pour la toolbar
  public approvers: string[] = [];

  constructor(
    private router: Router,
    private pagination: PaginationService,
    private modalState: LeavesModalStateService,
    private leaveService: LeaveService,
  ) {
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  ngOnInit(): void {
    this.loadData();
    this.leaveService.getRemainingBalance().subscribe({
      next: (val) => this.remainingBalance = val,
      error: () => this.remainingBalance = 0,
    });
  }

  private loadData(): void {
    this.leaveService.getAll().subscribe((data: LeaveRequestListResponse[]) => {
      this.actualData = data;

      // KPIs
      this.totalCount = data.length;
      this.annualCount = data.filter(
        l => l.leaveType?.toUpperCase() === LeaveType.ANNUAL
      ).length;

      // Approvers dynamiques — noms uniques non-null
      this.approvers = [...new Set(
        data
          .map(l => l.approvedBy?.fullName)
          .filter((name): name is string => !!name)
      )];

      this.filteredData = [...data];
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.leaveemployee) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];
    this.totalData = this.filteredData.length;

    this.filteredData.forEach((res, index) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        this.tableData.push(res);
        this.tableDataCopy.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });

    this.dataSource = new MatTableDataSource<LeaveRequestListResponse>(this.filteredData);
    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
  }

  // ─── Filtrage front ───────────────────────────────────────────
  private applyFilters(): void {
    let result = [...this.actualData];
    const f = this.activeFilters;

    // Date range
    if (f.dateRange && f.dateRange[0] && f.dateRange[1]) {
      const from = f.dateRange[0].getTime();
      const to   = f.dateRange[1].getTime();
      result = result.filter(l => {
        const start = new Date(l.startDate).getTime();
        return start >= from && start <= to;
      });
    }

    // Type
    if (f.type) {
      result = result.filter(
        l => l.leaveType?.toUpperCase() === f.type.toUpperCase()
      );
    }

    // Approver
    if (f.approver) {
      result = result.filter(
        l => l.approvedBy?.fullName === f.approver
      );
    }

    // Status
    if (f.status) {
      result = result.filter(
        l => l.status?.toUpperCase() === f.status.toUpperCase()
      );
    }

    // Sort
    if (f.sort === 'asc') {
      result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    } else if (f.sort === 'desc') {
      result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    } else if (f.sort === 'last7days') {
      const last7 = Date.now() - 7 * 24 * 60 * 60 * 1000;
      result = result.filter(l => new Date(l.startDate).getTime() >= last7);
    } else if (f.sort === 'lastMonth') {
      const lastMonth = Date.now() - 30 * 24 * 60 * 60 * 1000;
      result = result.filter(l => new Date(l.startDate).getTime() >= lastMonth);
    } else if (f.sort === 'recent') {
      result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }

    this.filteredData = result;
    this.getTableData({ skip: 0, limit: this.pageSize });
  }

  onDateFilter(range: Date[] | null): void {
    this.activeFilters.dateRange = range;
    this.applyFilters();
  }

  onTypeFilter(type: string): void {
    this.activeFilters.type = type;
    this.applyFilters();
  }

  onApproverFilter(name: string): void {
    this.activeFilters.approver = name;
    this.applyFilters();
  }

  onStatusFilter(status: string): void {
    this.activeFilters.status = status;
    this.applyFilters();
  }

  onSortFilter(sort: string): void {
    this.activeFilters.sort = sort;
    this.applyFilters();
  }

  // ─── Search ───────────────────────────────────────────────────
  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchDataValue;
    this.tableData = this.dataSource.filteredData;

    this.pagination.calculatePageSize.next({
      totalData: this.tableData.length,
      pageSize: this.pageSize,
      tableData: this.tableData,
      serialNumberArray: this.tableData.map((_, i) => i + 1),
    });
  }

  onSearchChange(value: string): void {
    this.searchData(value);
  }

  // ─── Sort colonnes ────────────────────────────────────────────
  public sortData(sort: Sort): void {
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

  // ─── Pagination ───────────────────────────────────────────────
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

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.changePageSize(size);
  }

  // ─── Actions ──────────────────────────────────────────────────
  onEditClick(leave: LeaveRequestListResponse): void {
    this.selectedLeave = leave;
  }

  onDeleteClick(leave: LeaveRequestListResponse): void {
    this.selectedLeave = leave;
  }

  confirmDelete(leave: LeaveRequestListResponse): void {
    console.log('DELETE CONFIRMED:', leave);
  }

  openDeleteModal(leave: LeaveRequestListResponse): void {
    this.selectedLeave = leave;
  }
}
