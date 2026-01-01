import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { routes } from '../../../../../shared/routes/routes';
import {
  apiResultFormat,
  pageSelection,
} from '../../../../../shared/models/models';

// ← IMPORTANT : Importer JobsInfo depuis le modèle local qui contient Description
import { JobsInfo, Plateforme } from '../../models/jobs.model';

import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../../../../shared/data/data.service';
import {
  PaginationService,
  tablePageSize,
} from '../../../../../shared/custom-pagination/pagination.service';

import { CustomPaginationComponent } from '../../../../../shared/custom-pagination/custom-pagination.component';
import { DateRangePickerComponent } from '../../../../common/date-range-picker/date-range-picker.component';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../../common/footer/footer.component';
import { ConfirmDeleteComponent } from '../../../../common/delete-modal/delete-modal.component';

import { CreateJobModalComponent } from '../../modals/create-job-modal/create-job-modal.component';
import { EditJobModalComponent } from '../../modals/edit-job-modal/edit-job-modal.component';
import { PublishJobModalComponent } from '../../modals/publish-job-modal/publish-job-modal.component';

import { JobsService } from '../../services/jobs.service';

declare const bootstrap: any;

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
    FooterComponent,
    ConfirmDeleteComponent,
    CreateJobModalComponent,
    EditJobModalComponent,
    PublishJobModalComponent,
    RouterOutlet,
  ],
})
export class JobsListComponent implements OnDestroy {
  public routes = routes;
  initChecked = false;

  // Données
  public jobsData: JobsInfo[] = [];

  // Pagination
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

  // Modaux
  showCreateModal = false;
  showEditModal = false;
  showPublishModal = false;
  currentJob!: JobsInfo;

  // Pour le modal de suppression
  selectedItem: JobsInfo | null = null;

  // Plateformes
  plateformes: Plateforme[] = [
    { id: 'linkedin', nom: 'LinkedIn', icone: 'ti ti-brand-linkedin', description: 'Réseau professionnel mondial', selectionnee: false },
    { id: 'indeed', nom: 'Indeed', icone: 'ti ti-briefcase', description: "Premier site d'emploi mondial", selectionnee: false },
    { id: 'facebook', nom: 'Facebook Jobs', icone: 'ti ti-brand-facebook', description: "Offres d'emploi sur Facebook", selectionnee: false },
    { id: 'site', nom: 'Site Entreprise', icone: 'ti ti-world', description: 'Votre site carrières', selectionnee: false },
    { id: 'apec', nom: 'APEC', icone: 'ti ti-user-check', description: 'Cadres et jeunes diplômés', selectionnee: false },
    { id: 'pole-emploi', nom: 'Pôle Emploi', icone: 'ti ti-building', description: "Service public de l'emploi", selectionnee: false },
  ];

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService,
    private jobsService: JobsService
  ) {
    this.currentJob = this.jobsService.createEmptyJob();
    this.loadJobs();
  }

  private loadJobs(): void {
    this.data.getJobList().subscribe((apiRes: apiResultFormat) => {
      console.log('📊 Données reçues:', apiRes.data);
      
      // ← MIGRATION : Ajouter Description aux jobs existants
      this.jobsData = (apiRes.data as any[]).map(job => ({
        ...job,
        Description: job.Description || '',
        Number_of_Positions: job.Number_of_Positions || 1
      }));
      
      this.totalData = this.jobsData.length;
      this.getTableData({ skip: 0, limit: this.pageSize });
    });

    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url === this.routes.jobList) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  getDeleteMessage(): string {
    if (!this.selectedItem) return '';
    return `Êtes-vous sûr de vouloir supprimer l'offre "${this.selectedItem.Job_Title}" ?`;
  }

  private getTableData(pageOption: pageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];
    this.totalData = this.jobsData.length;

    this.jobsData.forEach((res: JobsInfo, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        res.sNo = serialNumber;
        this.tableData.push(res);
        this.tableDataCopy.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });

    this.dataSource = new MatTableDataSource<JobsInfo>(this.jobsData);

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
    this.row = this.tableData.length > 0;

    this.pagination.calculatePageSize.next({
      totalData: this.searchDataValue ? this.tableData.length : this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      serialNumberArray: this.tableData.map((_, i) => i + 1),
    });
  }

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

  selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => (f.isSelected = !initChecked));
  }

  togglePassword(index: number): void {
    this.password[index] = !this.password[index];
  }

  openCreateModal(): void {
    this.currentJob = this.jobsService.createEmptyJob();
    this.showCreateModal = true;
  }

  openEditModal(job: JobsInfo): void {
    this.currentJob = this.jobsService.cloneJob(job);
    this.showEditModal = true;
  }

  openPublishModal(job: JobsInfo): void {
    this.currentJob = { ...job };
    this.plateformes.forEach(p => p.selectionnee = false);
    this.showPublishModal = true;
  }

  onJobCreated(job: JobsInfo): void {
    const validation = this.jobsService.validateJob(job);
    if (!validation.isValid) {
      alert('⚠️ ' + validation.errors.join('\n'));
      return;
    }

    job.Job_ID = this.jobsService.generateId();
    job.Posted_Date = new Date().toLocaleDateString('fr-FR');
    
    this.jobsData.unshift(job);
    this.getTableData({ skip: 0, limit: this.pageSize });
    this.showCreateModal = false;
    alert(`✅ L'offre "${job.Job_Title}" créée !`);
  }

  onJobUpdated(job: JobsInfo): void {
    const validation = this.jobsService.validateJob(job);
    if (!validation.isValid) {
      alert('⚠️ ' + validation.errors.join('\n'));
      return;
    }

    const index = this.jobsData.findIndex(j => j.Job_ID === job.Job_ID);
    if (index !== -1) {
      this.jobsData[index] = job;
      this.getTableData({ skip: this.skip, limit: this.limit });
    }
    this.showEditModal = false;
    alert(`✅ L'offre "${job.Job_Title}" modifiée !`);
  }

  onJobPublished(job: JobsInfo): void {
    const selected = this.plateformes.filter(p => p.selectionnee);
    if (selected.length === 0) {
      alert('⚠️ Veuillez sélectionner au moins une plateforme');
      return;
    }
    this.showPublishModal = false;
    alert(`✅ L'offre "${job.Job_Title}" publiée sur ${selected.length} plateforme(s) !`);
  }

  // Ouvrir le modal de suppression
  onJobDeleted(job: JobsInfo): void {
    this.selectedItem = job;
    
    setTimeout(() => {
      const modalElement = document.getElementById('deleteJobModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error('❌ Modal deleteJobModal introuvable');
      }
    }, 100);
  }

  // Confirmer la suppression
  confirmDelete(job: JobsInfo): void {
    if (!job) {
      return;
    }

    this.jobsData = this.jobsData.filter(j => j.Job_ID !== job.Job_ID);
    this.getTableData({ skip: this.skip, limit: this.limit });
    
    const modalElement = document.getElementById('deleteJobModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    
    this.selectedItem = null;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  closePublishModal(): void {
    this.showPublishModal = false;
    this.plateformes.forEach(p => p.selectionnee = false);
  }

  togglePlateforme(plateforme: Plateforme): void {
    plateforme.selectionnee = !plateforme.selectionnee;
  }

  ngOnDestroy(): void {}
}