import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { routes } from '../../../../shared/routes/routes';
import {
  apiResultFormat,
  JobsInfo,
  pageSelection,
} from '../../../../shared/models/models';

import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../../../shared/data/data.service';
import {
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';

import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';

import { JobsComponent } from '../jobs.component';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
  imports: [
    CommonModule,
    DateRangePickerComponent,
    CustomPaginationComponent,
    MatSortModule,
    FormsModule,
    BreadcrumbsComponent,
  ],
})
export class JobsListComponent implements OnDestroy {
  public routes = routes;
  initChecked = false;

  //* Pagination variables
  public pageSize = 10;
  public tableData: JobsInfo[] = [];
  public tableDataCopy: JobsInfo[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<JobsInfo>;
  public searchDataValue = '';
  public password: boolean[] = [false, false, false, false];
  public row = true;

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService,
    public parent: JobsComponent // parent component injection
  ) {
    this.loadJobs();
  }

  //* Load & paginate jobs
  private loadJobs(): void {
    this.data.getJobList().subscribe((apiRes: apiResultFormat) => {
      this.parent.jobsData = apiRes.data;

      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url === this.routes.jobList) {
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
    this.totalData = this.parent.jobsData.length;

    this.parent.jobsData.forEach((res: JobsInfo, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        res.sNo = serialNumber;
        this.tableData.push(res);
        this.tableDataCopy.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });

    this.dataSource = new MatTableDataSource<JobsInfo>(this.parent.jobsData);

    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
  }

  //* Search
  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchDataValue;
    this.tableData = this.dataSource.filteredData;
    this.row = this.tableData.length > 0;

    this.pagination.calculatePageSize.next({
      totalData: this.searchDataValue ? this.tableData.length : this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      serialNumberArray: this.tableData.map((_, i) => i + 1),
    });
  }

  //* Sort
  public sortData(sort: Sort): void {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
      return;
    }

    this.tableData = data.sort((a, b) => {
      const aValue = (a as never)[sort.active];
      const bValue = (b as never)[sort.active];
      return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
    });
  }

  //* Pagination size change
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

  //* Sellect all
  selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => (f.isSelected = !initChecked));
  }

  togglePassword(index: number): void {
    this.password[index] = !this.password[index];
  }

  ngOnDestroy(): void {}
}
