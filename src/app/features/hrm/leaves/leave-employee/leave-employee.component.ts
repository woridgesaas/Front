import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import {
  apiResultFormat,
  leaveEmployee,
} from '../../../../shared/models/models';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
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
  selectedLeave: leaveEmployee | null = null;
  public routes = routes;
  initChecked = false;
  // pagination variables
  public pageSize = 10;
  public tableData: leaveEmployee[] = [];
  public tableDataCopy: leaveEmployee[] = [];
  public actualData: leaveEmployee[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<leaveEmployee>;
  public searchDataValue = '';
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService,
    private modalState: LeavesModalStateService
  ) {
    this.data.getleaveEmployee().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
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
    this.data.getleaveEmployee().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: leaveEmployee, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<leaveEmployee>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public row = true;
  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchDataValue;
    this.tableData = this.dataSource.filteredData;
    this.row = this.tableData.length > 0;

    if (this.searchDataValue !== '') {
      // Handle filtered data
      this.pagination.calculatePageSize.next({
        totalData: this.tableData.length,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.tableData.map((_, i) => i + 1), // Generates serials like [1, 2, 3...]
      });
    } else {
      // Handle reset to full data
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

 onEditClick(leave: leaveEmployee): void {
  this.selectedLeave = leave;
}
  onSearchChange(value: string): void {
    this.searchDataValue = value;
    this.searchData(value); // logique existante
  }

  onDeleteClick(leave: any): void {
    this.selectedLeave = leave;
  }

  confirmDelete(leave: any): void {
    // 🔥 ici tu appelles ton service backend
    // ex:
    // this.leavesService.deleteLeave(leave.Id).subscribe(() => {
    //   this.loadData();
    // });

    console.log('DELETE CONFIRMED:', leave);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.changePageSize(size); // logique existante
  }

  openDeleteModal(leave: any): void {
    this.selectedLeave = leave;
  }
  onDateFilter(range: Date[] | null) {
    console.log('DATE:', range);
  }

  onTypeFilter(type: string) {
    console.log('TYPE:', type);
  }

  onApproverFilter(name: string) {
    console.log('APPROVER:', name);
  }

  onStatusFilter(status: string) {
    console.log('STATUS:', status);
  }

  onSortFilter(sort: string) {
    console.log('SORT:', sort);
  }
}
