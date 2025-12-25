import { Component, OnDestroy } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import {
  apiResultFormat,
  breadCrumbItems,
  CandidateInfo,
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
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.scss',
  imports: [
    BreadcrumbsComponent,
    RouterModule,
    DateRangePickerComponent,
    MatInputModule,
    FormsModule,
    CustomPaginationComponent,
    MatSelectModule,
    MatSortModule,
    CommonModule,
  ],
})
export class CandidatesListComponent implements OnDestroy {
  public routes = routes;
  initChecked = false;

  // Variables de pagination
  public pageSize = 10;
  public tableData: CandidateInfo[] = [];
  public tableDataCopy: CandidateInfo[] = [];
  public actualData: CandidateInfo[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<CandidateInfo>;
  public searchDataValue = '';
  breadCrumbItems: breadCrumbItems[] = [];
  public password: boolean[] = [false, false, false, false];
  isOpen = false;

  // Variables pour les modales
  candidatPourSupprimer: CandidateInfo | null = null;
  candidatPourDetails: CandidateInfo | null = null;

  // Messages
  messageSucces = '';
  detailSucces = '';

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
    this.breadCrumbItems = [
      { label: 'Recrutement' },
      { label: 'Liste des Candidats', active: true },
    ];

    this.data.getCandidatesList().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.candidateslist) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getCandidatesList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: CandidateInfo, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<CandidateInfo>(this.actualData);
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

  // ============ CHANGEMENT DE STATUT ============
  changerStatut(candidat: CandidateInfo, nouveauStatut: string) {
    const ancienStatut = candidat.Status;
    candidat.Status = nouveauStatut;

    console.log(` Changement de statut du candidat ${candidat.Candidate}`);
    console.log(`  De: ${ancienStatut} → Vers: ${nouveauStatut}`);

    // Appel API pour sauvegarder le changement
    // this.data.updateCandidateStatus(candidat.Cand_ID, nouveauStatut).subscribe(...)

    // Notification automatique selon le statut
    if (nouveauStatut === 'Embauché') {
      console.log('🎉 Email de félicitations envoyé au candidat');
      this.messageSucces = 'Candidat Embauché !';
      this.detailSucces = `${candidat.Candidate} a été marqué comme embauché. Un email de félicitations lui a été envoyé.`;
      this.isOpen = true;
    } else if (nouveauStatut === 'Refusé') {
      console.log('📧 Email de refus poli envoyé au candidat');
    }

    // Mise à jour dans le tableau
    const index = this.actualData.findIndex(
      (c) => c.Cand_ID === candidat.Cand_ID
    );
    if (index !== -1) {
      this.actualData[index].Status = nouveauStatut;
    }
  }

  // ============ SUPPRESSION ============
  ouvrirModalSupprimer(candidat: CandidateInfo) {
    this.candidatPourSupprimer = { ...candidat };
  }

  supprimerCandidat() {
    if (!this.candidatPourSupprimer) return;

    console.log(
      ' Suppression du candidat:',
      this.candidatPourSupprimer.Candidate
    );

    // Appel API
    // this.data.deleteCandidate(this.candidatPourSupprimer.Cand_ID).subscribe(...)

    // Suppression locale
    this.tableData = this.tableData.filter(
      (c) => c.Cand_ID !== this.candidatPourSupprimer!.Cand_ID
    );
    this.actualData = this.actualData.filter(
      (c) => c.Cand_ID !== this.candidatPourSupprimer!.Cand_ID
    );
    this.totalData = this.actualData.length;

    this.messageSucces = 'Candidat Supprimé';
    this.detailSucces = `Le candidat ${this.candidatPourSupprimer.Candidate} a été supprimé de la base de données.`;
    this.isOpen = true;

    this.annulerModalSupprimer();
  }

  annulerModalSupprimer() {
    this.candidatPourSupprimer = null;
  }

  // ============ DÉTAILS ============
  ouvrirDetails(candidat: CandidateInfo) {
    this.candidatPourDetails = { ...candidat };
  }

  fermerDetails() {
    this.candidatPourDetails = null;
  }

  // ============ UTILITAIRES ============
  getStatutBadgeClass(statut: string): string {
    const classes: { [key: string]: string } = {
      Embauché: 'border-success text-success',
      Hired: 'border-success text-success',
      Nouveau: 'border-purple text-purple',
      New: 'border-purple text-purple',
      Interviewé: 'border-info text-info',
      Interviewed: 'border-info text-info',
      'Entretien Planifié': 'border-pink text-pink',
      Scheduled: 'border-pink text-pink',
      'Offre Envoyée': 'border-warning text-warning',
      Offered: 'border-warning text-warning',
      Refusé: 'border-danger text-danger',
      Rejected: 'border-danger text-danger',
    };
    return classes[statut] || 'border-secondary text-secondary';
  }

  traduireStatut(statut: string): string {
    const traductions: { [key: string]: string } = {
      Hired: 'Embauché',
      New: 'Nouveau',
      Interviewed: 'Interviewé',
      Scheduled: 'Entretien Planifié',
      Offered: 'Offre Envoyée',
      Rejected: 'Refusé',
    };
    return traductions[statut] || statut;
  }

  // Télécharger le CV
  telechargerCV(candidat: CandidateInfo) {
    console.log('Téléchargement du CV de:', candidat.Candidate);
    // Implémenter le téléchargement
    // window.open(candidat.cvUrl, '_blank');
  }

  // Voir le CV
  voirCV(candidat: CandidateInfo) {
    console.log(' Visualisation du CV de:', candidat.Candidate);
    // Ouvrir dans une nouvelle fenêtre ou modal
    // this.router.navigate(['/cv-viewer', candidat.Cand_ID]);
  }
}
