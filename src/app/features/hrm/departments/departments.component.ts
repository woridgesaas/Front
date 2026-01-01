import { Component, Input, ViewChild } from '@angular/core';
import { department } from '../../../shared/models/models';
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
    ConfirmDeleteComponent,
    AddDepartmentModalComponent,
    EditDepartmentModalComponent
],
})
export class DepartmentsComponent {

  departments: department[] = [];
  selectedDepartment: department | null = null;
  selectedItem!: department;

  @ViewChild(EditDepartmentModalComponent) editModal!: EditDepartmentModalComponent;
openAddModal = false;
  selectedStatus: 'all' | 'Actif' | 'Inactif' = 'all';
  searchValue = '';

  constructor(private departmentService: DepartmentService) {
    this.loadDepartments();
  }
isEditModalOpen = false;

openEdit(dep: department) {
  this.selectedDepartment = { ...dep };
  this.isEditModalOpen = true;
}


  loadDepartments() {
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
    });
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
  get filteredDepartments(): department[] {
    return this.departments.filter(d => {
      const byStatus =
        this.selectedStatus === 'all' || d.Status === this.selectedStatus;

      const bySearch =
        !this.searchValue ||
        d.Department.toLowerCase().includes(this.searchValue.toLowerCase());

      return byStatus && bySearch;
    });
  }

  addDepartment(dep: department) {
    this.departments = [...this.departments, dep];
  }


closeEditModal() {
  this.selectedDepartment = null;
}

 saveEdit(updated: department) {
  this.departments = this.departments.map(d =>
    d.id === updated.id ? updated : d
  );
}

  openDelete(dep: department) {
    this.selectedItem = dep;
  }

  deleteItem() {
    this.departments = this.departments.filter(
      d => d.Department !== this.selectedItem.Department
    );
  }
}