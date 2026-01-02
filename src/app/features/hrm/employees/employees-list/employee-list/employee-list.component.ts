import { Component, OnDestroy } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import { apiResultFormat, employees } from '../../../../../shared/models/models';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../../shared/data/data.service';
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

// Déclaration de Bootstrap
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
  
  // Employé sélectionné pour modification
  selectedEmployee: any = null;
  
  // Employé sélectionné pour suppression
  selectedItem: any = null;
  
  // Données KPI
  kpis = [
    {
      title: 'Total employés',
      value: 1007,
      icon: 'ti ti-users',
      color: 'dark'
    },
    {
      title: 'Actifs',
      value: 1007,
      icon: 'ti ti-user-share',
      color: 'success'
    },
    {
      title: 'Inactifs',
      value: 1007,
      icon: 'ti ti-user-pause',
      color: 'danger'
    },
    {
      title: 'Nouveaux arrivants',
      value: 67,
      icon: 'ti ti-user-plus',
      color: 'info'
    }
  ];
  
  // Variables de pagination
  public pageSize = 10;
  public tableData: employees[] = [];
  public tableDataCopy: employees[] = [];
  public actualData: employees[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<employees>;
  public searchDataValue = '';
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  public password: boolean[] = [false, false, false, false];
  isOpen = false;
  
  togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  
  openSuccessModal() {
    this.isOpen = !this.isOpen;
  }
  
  ngOnDestroy(): void {
    this.isOpen = false;
  }
  
  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService
  ) {
    this.data.getEmployeeList().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.employeeList) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  
  private getTableData(pageOption: pageSelection): void {
    this.data.getEmployeeList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: employees, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<employees>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
      
      // Mettre à jour les KPIs
      this.updateKPIs();
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

  // ========================================
  // GESTION DE LA MODIFICATION
  // ========================================

  /**
   * Ouvre le modal de modification avec les données de l'employé
   */
  openEditModal(employee: any): void {
    console.log('📋 Ouverture du modal pour:', employee);
    
    this.selectedEmployee = employee;
    
    const modalElement = document.getElementById('edit_employee_multistep');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('❌ Modal element #edit_employee_multistep not found!');
    }
  }

  /**
   * Callback appelé quand une section est sauvegardée
   */
  onEmployeeSaved(saveEvent: any): void {
    console.log('💾 Section sauvegardée:', saveEvent);
    
    if (saveEvent.data && this.selectedEmployee) {
      Object.assign(this.selectedEmployee, saveEvent.data);
      
      const index = this.tableData.findIndex(e => e === this.selectedEmployee);
      if (index !== -1) {
        this.tableData[index] = { ...this.selectedEmployee };
      }
      
      console.log('✅ Données mises à jour dans le tableau');
      
      // Mettre à jour les KPIs
      this.updateKPIs();
    }
  }

  // ========================================
  // GESTION DE LA SUPPRESSION
  // ========================================

  /**
   * Prépare la suppression en stockant l'employé sélectionné
   * Le modal s'ouvrira automatiquement via data-bs-toggle
   */
  prepareDelete(employee: any): void {
    console.log('🗑️ Préparation de suppression pour:', employee);
    this.selectedItem = employee;
  }

  /**
   * Callback appelé quand la suppression est confirmée depuis le modal
   */
  deleteItem(employee: any): void {
    console.log('🗑️ Suppression confirmée pour:', employee);
    
    if (!employee) {
      console.error('❌ Aucun employé à supprimer');
      return;
    }
    
    // Supprimer de tableData
    const tableIndex = this.tableData.findIndex(e => e === employee);
    if (tableIndex !== -1) {
      this.tableData.splice(tableIndex, 1);
      console.log('✅ Supprimé de tableData');
    }
    
    // Supprimer de actualData
    const actualIndex = this.actualData.findIndex(e => e === employee);
    if (actualIndex !== -1) {
      this.actualData.splice(actualIndex, 1);
      console.log('✅ Supprimé de actualData');
    }
    
    // Mettre à jour le datasource
    this.dataSource.data = this.actualData;
    this.totalData = this.actualData.length;
    
    // Mettre à jour la pagination
    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
    
    // Mettre à jour les KPIs
    this.updateKPIs();
    
    // Réinitialiser l'employé à supprimer
    this.selectedItem = null;
    
    console.log('✅ Suppression terminée avec succès');
    
    // Optionnel : Appeler votre API pour supprimer en base de données
    /*
    this.data.deleteEmployee(employee.id).subscribe({
      next: (response) => {
        console.log('✅ Supprimé en base de données:', response);
        // Afficher un message de succès
        this.openSuccessModal();
      },
      error: (error) => {
        console.error('❌ Erreur lors de la suppression:', error);
        // Restaurer l'employé en cas d'erreur
        if (tableIndex !== -1) {
          this.tableData.splice(tableIndex, 0, employee);
        }
        if (actualIndex !== -1) {
          this.actualData.splice(actualIndex, 0, employee);
        }
        this.dataSource.data = this.actualData;
        this.updateKPIs();
      }
    });
    */
  }

  // ========================================
  // MISE À JOUR DES KPIS
  // ========================================

  /**
   * Met à jour les valeurs des KPIs en fonction des données actuelles
   */
  private updateKPIs(): void {
    const total = this.actualData.length;
    const actifs = this.actualData.filter(e => e.Status === 'Active').length;
    const inactifs = this.actualData.filter(e => e.Status === 'Inactive').length;
    
    // Calculer les nouveaux arrivants (exemple: derniers 30 jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const nouveaux = this.actualData.filter(e => {
      const joiningDate = new Date(e.JoiningDate);
      return joiningDate >= thirtyDaysAgo;
    }).length;
    
    this.kpis = [
      {
        title: 'Total employés',
        value: total,
        icon: 'ti ti-users',
        color: 'dark'
      },
      {
        title: 'Actifs',
        value: actifs,
        icon: 'ti ti-user-share',
        color: 'success'
      },
      {
        title: 'Inactifs',
        value: inactifs,
        icon: 'ti ti-user-pause',
        color: 'danger'
      },
      {
        title: 'Nouveaux arrivants',
        value: nouveaux,
        icon: 'ti ti-user-plus',
        color: 'info'
      }
    ];
  }
}