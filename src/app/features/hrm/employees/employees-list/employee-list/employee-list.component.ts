import { Component, OnDestroy } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CustomPaginationComponent } from '../../../../../shared/custom-pagination/custom-pagination.component';
import { MatSortModule } from '@angular/material/sort';
import { EditEmployeeModalComponent } from '../modals/edit-employee-modal/edit-employee-modal.component';
import { KpisComponent } from '../../../../common/kpis/kpis.component';
import { ConfirmDeleteComponent } from '../../../../common/delete-modal/delete-modal.component';
import { AddEmployeeComponent } from '../modals/add-employee/add-employee.component';
import { GetAllUserResponse } from '../../../models/user/get-all-user.model';
import { UserService } from '../../../services/user/user.service';
import { EmployeeProfileResponse } from '../../../models/user/employee-profile.model';

declare const bootstrap: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  imports: [
    CommonModule,
    RouterLink,
    BsDatepickerModule,
    CustomPaginationComponent,
    BreadcrumbsComponent,
    FormsModule,
    MatSortModule,
    EditEmployeeModalComponent,
    KpisComponent,
    ConfirmDeleteComponent,
    AddEmployeeComponent,
  ],
})
export class EmployeeListComponent implements OnDestroy {
  public routes = routes;
  initChecked = false;
  isDeleteModalOpen = false;
  // Filtres
  posts: string[] = [];
  selectedPost: string = '';
  selectedStatus: string = '';
  selectedSort: string = '7days';
  selectedEmployee: EmployeeProfileResponse | null = null;
  selectedItem: any = null;

  kpis = [
    { title: 'Total employés', value: 0, icon: 'ti ti-users', color: 'dark' },
    { title: 'Actifs', value: 0, icon: 'ti ti-user-share', color: 'success' },
    { title: 'Inactifs', value: 0, icon: 'ti ti-user-pause', color: 'danger' },
    {
      title: 'Nouveaux arrivants',
      value: 0,
      icon: 'ti ti-user-plus',
      color: 'info',
    },
  ];

  public pageSize = 10;
  public tableData: GetAllUserResponse[] = [];
  public tableDataCopy: GetAllUserResponse[] = [];
  public actualData: GetAllUserResponse[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<GetAllUserResponse>;
  public searchDataValue = '';
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  isOpen = false;

  ngOnDestroy(): void {
    this.isOpen = false;
  }

  constructor(
    private userApi: UserService,
    private router: Router,
    private pagination: PaginationService,
  ) {
    this.userApi.getAllUsers().subscribe((data: GetAllUserResponse[]) => {
      this.actualData = data;
      this.totalData = data.length;
      this.dataSource = new MatTableDataSource<GetAllUserResponse>(
        this.actualData,
      );
      this.updateKPIs();

      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.employeeList) {
          this.applyPagination({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
      this.userApi.getPosts().subscribe((data: any[]) => {
        this.posts = [...new Set(data.map((p) => p.name))];
      });

      // Déclencher la pagination initiale
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.actualData,
        tableDataCopy: this.actualData,
        serialNumberArray: this.actualData.map((_, i) => i + 1),
      });
    });

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  private applyPagination(pageOption: pageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];

    this.actualData.forEach((res, index) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        this.tableData.push(res);
        this.tableDataCopy.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });

    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
  }

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

  openEditModal(employee: GetAllUserResponse): void {
    if (!employee?.id) return;

    this.userApi.getProfile(employee.id).subscribe({
      next: (fullEmployee: EmployeeProfileResponse) => {
        this.selectedEmployee = fullEmployee;

        setTimeout(() => {
          const modalElement = document.getElementById('edit_employee_detail');
          if (!modalElement) return;

          const modalInstance =
            bootstrap.Modal.getInstance(modalElement) ||
            new bootstrap.Modal(modalElement);

          modalInstance.show();
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil employé', error);
      },
    });
  }

  onEmployeeSaved(saveEvent: any): void {
    if (!saveEvent?.data || !this.selectedEmployee) return;

    Object.assign(this.selectedEmployee, saveEvent.data);

    const index = this.tableData.findIndex(
      (e) => e.id === this.selectedEmployee?.id,
    );

    if (index !== -1) {
      this.tableData[index] = {
        ...this.tableData[index],
        ...saveEvent.data,
      };
    }

    const actualIndex = this.actualData.findIndex(
      (e) => e.id === this.selectedEmployee?.id,
    );

    if (actualIndex !== -1) {
      this.actualData[actualIndex] = {
        ...this.actualData[actualIndex],
        ...saveEvent.data,
      };
    }

    this.dataSource.data = [...this.actualData];

    this.updateKPIs();
  }

  prepareDelete(employee: any): void {
    this.selectedItem = employee;
    this.isDeleteModalOpen = true;
  }
  onDeleteCancel(): void {
    this.isDeleteModalOpen = false;
    this.selectedItem = null;
  }

  deleteItem(employee: any): void {
    if (!employee) return;

    this.userApi.deleteUser(employee.id).subscribe({
      next: () => {
        const tableIndex = this.tableData.findIndex((e) => e === employee);
        if (tableIndex !== -1) this.tableData.splice(tableIndex, 1);

        const actualIndex = this.actualData.findIndex((e) => e === employee);
        if (actualIndex !== -1) this.actualData.splice(actualIndex, 1);

        this.dataSource.data = this.actualData;
        this.totalData = this.actualData.length;

        this.pagination.calculatePageSize.next({
          totalData: this.totalData,
          pageSize: this.pageSize,
          tableData: this.tableData,
          tableDataCopy: this.tableDataCopy,
          serialNumberArray: this.serialNumberArray,
        });

        this.updateKPIs();
        this.selectedItem = null;
        this.isDeleteModalOpen = false;
      },
      error: (err: any) => {
        console.error('Erreur lors de la suppression');
      },
    });
  }
  applyFilters(): void {
    let filtered = [...this.actualData];

    if (this.selectedPost) {
      filtered = filtered.filter((e) => e.postName === this.selectedPost);
    }

    if (this.selectedStatus) {
      filtered = filtered.filter((e) => e.status === this.selectedStatus);
    }

    if (this.selectedSort === '7days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filtered = filtered.filter((e) => new Date(e.createdAt) >= sevenDaysAgo);
    } else if (this.selectedSort === 'asc') {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else if (this.selectedSort === 'desc') {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    this.tableData = filtered;
    this.totalData = filtered.length;

    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableData,
      serialNumberArray: this.tableData.map((_, i) => i + 1),
    });
  }

  selectPost(post: string): void {
    this.selectedPost = this.selectedPost === post ? '' : post;
    this.applyFilters();
  }

  selectStatus(status: string): void {
    this.selectedStatus = this.selectedStatus === status ? '' : status;
    this.applyFilters();
  }

  selectSort(sort: string): void {
    this.selectedSort = sort;
    this.applyFilters();
  }

  private updateKPIs(): void {
    const total = this.actualData.length;
    const actifs = this.actualData.filter((e) => e.status === 'ACTIVE').length;
    const inactifs = this.actualData.filter(
      (e) => e.status === 'INACTIVE',
    ).length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); //li dkhlo 3ed jdad hed cheher
    const nouveaux = this.actualData.filter((e) => {
      return new Date(e.createdAt) >= thirtyDaysAgo;
    }).length;

    this.kpis = [
      {
        title: 'Total employés',
        value: total,
        icon: 'ti ti-users',
        color: 'dark',
      },
      {
        title: 'Actifs',
        value: actifs,
        icon: 'ti ti-user-share',
        color: 'success',
      },
      {
        title: 'Inactifs',
        value: inactifs,
        icon: 'ti ti-user-pause',
        color: 'danger',
      },
      {
        title: 'Nouveaux arrivants',
        value: nouveaux,
        icon: 'ti ti-user-plus',
        color: 'info',
      },
    ];
  }
}
