import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { routes } from '../../../../../shared/routes/routes';
import { pageSelection } from '../../../../../shared/models/models';
import { JobsInfo, Plateforme } from '../../models/jobs.model';

import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

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
export class JobsListComponent implements OnInit, OnDestroy {
  public routes = routes;
  initChecked = false;

  public jobsData: JobsInfo[] = [];
  public pageSize = 10;
  public tableData: JobsInfo[] = [];
  public tableDataCopy: JobsInfo[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<JobsInfo>;
  public searchDataValue = '';

  showCreateModal = false;
  showEditModal = false;
  showPublishModal = false;
  currentJob!: JobsInfo;
  selectedItem: JobsInfo | null = null;

  plateformes: Plateforme[] = [
    { id: 'linkedin', nom: 'LinkedIn', icone: 'ti ti-brand-linkedin', description: 'Réseau professionnel mondial', selectionnee: false },
    { id: 'indeed', nom: 'Indeed', icone: 'ti ti-briefcase', description: "Premier site d'emploi mondial", selectionnee: false },
    { id: 'facebook', nom: 'Facebook Jobs', icone: 'ti ti-brand-facebook', description: "Offres d'emploi sur Facebook", selectionnee: false },
    { id: 'site', nom: 'Site Entreprise', icone: 'ti ti-world', description: 'Votre site carrières', selectionnee: false },
  ];

  constructor(
    private router: Router,
    private pagination: PaginationService,
    private jobsService: JobsService
  ) {
    this.currentJob = this.jobsService.createEmptyJob();
  }

  // ─────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────
  ngOnInit(): void {
    this.loadJobs();
  }

  ngOnDestroy(): void {}

  // ─────────────────────────────────────────
  // CHARGEMENT
  // ─────────────────────────────────────────
  private loadJobs(): void {
    this.jobsService.getAllJobs().subscribe({
      next: (jobs) => {
        console.log('✅ Offres reçues:', jobs.length);
        this.jobsData = jobs;
        this.totalData = jobs.length;
        this.getTableData({ skip: 0, limit: this.pageSize });
      },
      error: (err) => {
        console.error('❌ Erreur chargement:', err.status, err.error);
      }
    });

    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url === this.routes.jobList) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  // ─────────────────────────────────────────
  // PAGINATION
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // RECHERCHE + TRI
  // ─────────────────────────────────────────
  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchDataValue;
    this.tableData = this.dataSource.filteredData;

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

  // ─────────────────────────────────────────
  // MODAUX
  // ─────────────────────────────────────────
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

  closeCreateModal(): void { this.showCreateModal = false; }
  closeEditModal(): void { this.showEditModal = false; }
  closePublishModal(): void {
    this.showPublishModal = false;
    this.plateformes.forEach(p => p.selectionnee = false);
  }

  getDeleteMessage(): string {
    if (!this.selectedItem) return '';
    return `Êtes-vous sûr de vouloir supprimer l'offre "${this.selectedItem.Job_Title}" ?`;
  }

  // ─────────────────────────────────────────
  // ACTIONS CRUD
  // ─────────────────────────────────────────
  onJobCreated(job: JobsInfo): void {
    const validation = this.jobsService.validateJob(job);
    if (!validation.isValid) {
      alert('⚠️ ' + validation.errors.join('\n'));
      return;
    }

    this.jobsService.createJob(job).subscribe({
      next: (created) => {
        this.jobsData.unshift(created);
        this.getTableData({ skip: 0, limit: this.pageSize });
        this.showCreateModal = false;
        alert(`✅ L'offre "${created.Job_Title}" créée avec succès !`);
      },
      error: (err) => {
        console.error('❌ Erreur création:', err);
        alert('❌ Erreur lors de la création de l\'offre');
      }
    });
  }

  onJobUpdated(job: JobsInfo): void {
    const validation = this.jobsService.validateJob(job);
    if (!validation.isValid) {
      alert('⚠️ ' + validation.errors.join('\n'));
      return;
    }

    this.jobsService.updateJob(job).subscribe({
      next: (updated) => {
        const index = this.jobsData.findIndex(j => j.Job_ID === job.Job_ID);
        if (index !== -1) {
          this.jobsData[index] = updated;
          this.getTableData({ skip: this.skip, limit: this.limit });
        }
        this.showEditModal = false;
        alert(`✅ L'offre "${updated.Job_Title}" modifiée avec succès !`);
      },
      error: (err) => {
        console.error('❌ Erreur modification:', err);
        alert('❌ Erreur lors de la modification');
      }
    });
  }

  // ← Simple : juste setter selectedItem
  onJobDeleted(job: JobsInfo): void {
    this.selectedItem = job;
  }

  // ← Simple : appel API + reset selectedItem
  confirmDelete(job: JobsInfo): void {
    if (!job) return;

    this.jobsService.deleteJob(job.Job_ID).subscribe({
      next: () => {
        this.jobsData = this.jobsData.filter(j => j.Job_ID !== job.Job_ID);
        this.getTableData({ skip: this.skip, limit: this.limit });
        this.selectedItem = null; // ← ferme le modal
        alert('✅ Offre supprimée avec succès !');
      },
      error: (err) => {
        console.error('❌ Erreur suppression:', err);
        alert('❌ Erreur lors de la suppression');
      }
    });
  }

  onJobPublished(event: {
    job: JobsInfo;
    canalNames: string[];
    notifyHrTeam: boolean;
    isFeatured: boolean;
  }): void {

    this.jobsService.publishJob(
      event.job.Job_ID,
      event.canalNames,
      event.notifyHrTeam,
      event.isFeatured
    ).subscribe({
      next: (result) => {
        console.log('✅ Résultat publication:', result);
        this.showPublishModal = false;
        this.plateformes.forEach(p => p.selectionnee = false);
        this.loadJobs();
        alert(`✅ Offre publiée sur ${event.canalNames.length} plateforme(s) !`);
      },
      error: (err) => {
        console.error('❌ Erreur publication:', err);
        alert('❌ Erreur lors de la publication');
      }
    });
  }

  togglePlateforme(plateforme: Plateforme): void {
    plateforme.selectionnee = !plateforme.selectionnee;
  }
}