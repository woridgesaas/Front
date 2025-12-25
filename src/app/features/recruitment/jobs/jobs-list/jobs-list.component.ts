import { Component, OnDestroy } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import {
  apiResultFormat,
  breadCrumbItems,
  JobsInfo,
  pageSelection,
} from '../../../../shared/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import {
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';
import { Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { JobsComponent } from '../jobs.component';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    DateRangePickerComponent,
    CustomPaginationComponent,
    MatSortModule,
    FormsModule,
  ],
})
export class JobsListComponent implements OnDestroy {
  public routes = routes;
  initChecked = false;

  // Pagination variables
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
  breadCrumbItems: breadCrumbItems[] = [];
  public password: boolean[] = [false, false, false, false];

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService,
    public parent: JobsComponent // ⬅️ Injection du composant parent
  ) {
    this.breadCrumbItems = [
      { label: 'Recrutement' },
      { label: 'Liste des Offres', active: true },
    ];

    // Utiliser les données du parent
    this.data.getJobList().subscribe((apiRes: apiResultFormat) => {
      this.parent.jobsData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.jobList) {
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

  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }

  togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  ngOnDestroy(): void {
    // Nettoyage si nécessaire
  }
}
