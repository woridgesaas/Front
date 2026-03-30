import { Component, Input, ViewChild } from '@angular/core';
import { Department } from '../../../shared/models/models';
import { DepartmentService } from '../../../shared/services/department.service';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { DepartmentsStatsComponent } from './components/departments-stats/departments-stats.component';
import { DepartmentsFiltersComponent } from './components/departments-filters/departments-filters.component';
import { DepartmentsTableComponent } from './components/departments-table/departments-table.component';
import { ConfirmDeleteComponent } from "../../common/delete-modal/delete-modal.component";
import { AddDepartmentModalComponent } from "./components/departments-modal/add-department-modal/add-department-modal.component";
import { EditDepartmentModalComponent } from "./components/departments-modal/edit-department-modal/edit-department-modal.component";
import { CommonModule } from '@angular/common';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
  imports: [
    BreadcrumbsComponent,
    CommonModule,
    DepartmentsStatsComponent,
    DepartmentsFiltersComponent,
    DepartmentsTableComponent,
    AddDepartmentModalComponent,
    EditDepartmentModalComponent,
    
],
})
export class DepartmentsComponent {

  departments: Department[] = [];
  selectedDepartment: Department | null = null;
  selectedItem!: Department;

  openAddModal = false;
  isEditModalOpen = false;

  selectedStatus: 'all' | 'ACTIVE' | 'INACTIVE' = 'all';
  searchValue = '';

  constructor(private departmentService: DepartmentService) {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll()
      .subscribe(data => {
        this.departments = data;
      });
  }

  openEdit(dep: Department) {
    this.selectedDepartment = { ...dep };
    this.isEditModalOpen = true;
  }

  saveEdit(payload: { id: string; name: string; status: 'ACTIVE' | 'INACTIVE' }) {
    this.departmentService.update(payload.id, payload.name,payload.status)
      .subscribe(() => this.loadDepartments());
  }

  openDelete(dep: Department) {
    this.selectedItem = dep;
  }



  addDepartment(payload: { name: string; status: string }) {
  this.departmentService.create(payload.name, payload.status)
    .subscribe(() => this.loadDepartments());
}

  sortData(sort: Sort) {
    const data = [...this.departments];

    if (!sort.active || sort.direction === '') {
      this.departments = data;
      return;
    }

    this.departments = data.sort((a, b) => {
      const aValue = (a as any)[sort.active];
      const bValue = (b as any)[sort.active];

      return (aValue < bValue ? -1 : 1) *
        (sort.direction === 'asc' ? 1 : -1);
    });
  }

  get filteredDepartments(): Department[] {
    return this.departments.filter(d => {

      const byStatus =
        this.selectedStatus === 'all' ||
        d.status === this.selectedStatus;

      const bySearch =
        !this.searchValue ||
        d.name.toLowerCase().includes(this.searchValue.toLowerCase());

      return byStatus && bySearch;
    });
  }
}