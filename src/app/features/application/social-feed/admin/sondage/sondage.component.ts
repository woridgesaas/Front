import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import {  breadCrumbItems,Sondage} from '../../../../../shared/models/models';
import { routes } from '../../../../../shared/routes/routes';
import { CustomPaginationComponent } from '../../../../../shared/custom-pagination/custom-pagination.component';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { CollapseHeaderComponent } from '../../../../common/collapse-header/collapse-header.component';
import { SondageChartsComponent } from '../../components/sondage-charts/sondage-charts.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateSondageModalComponent } from '../../components/create-sondage-modal/create-sondage-modal.component';
@Component({
  selector: 'app-admin-sondages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSortModule,
    CustomPaginationComponent,
    BreadcrumbsComponent,
    CollapseHeaderComponent,
    SondageChartsComponent,
    BsDatepickerModule,
    CreateSondageModalComponent
  ],
  templateUrl: './sondage.component.html',
})

export class SondageComponent {
  @ViewChild(MatSort) sort!: MatSort;

  // Routes
  routes = routes;

  // Breadcrumb
  breadCrumbItems: breadCrumbItems[] =[];

  // Données du tableau
  tableData: Partial<Sondage>[] = [];
  originalData: Partial<Sondage>[] = [];

  // Filtres et pagination
  searchDataValue: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  initChecked: boolean = false;

  // Date range picker
  bsRangeValue: Date[] = [];

  // Statistiques
  stats = {
    sondagesActifs: 8,
    totalSondages: 42,
    participantsTotaux: 1245
  };

  // Données mockées
  private mockData: Partial<Sondage>[] = [
    {
      id: 1,
      titre: 'Préférence espace de travail',
      auteur: 'Sarah Johnson',
      departement: 'RH',
      dateCreation: '15/01/2024',
      participants: 145,
      participationRate: 72,
      statut: 'Actif',
      expiration: 19,
      nbrOptions: 4
    },
    {
      id: 2,
      titre: 'Choix événement entreprise',
      auteur: 'Michael Chen',
      departement: 'Direction',
      dateCreation: '14/01/2024',
      participants: 89,
      participationRate: 45,
      statut: 'Actif',
      expiration: 6,
      nbrOptions: 5
    },
    {
      id: 3,
      titre: 'Satisfaction outils informatiques',
      auteur: 'Ahmed Benali',
      departement: 'IT',
      dateCreation: '13/01/2024',
      participants: 203,
      participationRate: 85,
      statut: 'Actif',
      expiration: 20,
      nbrOptions: 6
    },
    {
      id: 4,
      titre: 'Formation souhaitée 2024',
      auteur: 'Fatima Zohra',
      departement: 'RH',
      dateCreation: '10/01/2024',
      participants: 178,
      participationRate: 89,
      statut: 'Expiré',
      expiration: 0,
      nbrOptions: 5
    },
    {
      id: 5,
      titre: 'Équilibre vie pro/perso',
      auteur: 'Karim Bensaid',
      departement: 'RH',
      dateCreation: '12/01/2024',
      participants: 156,
      participationRate: 78,
      statut: 'Actif',
      expiration: 24,
      nbrOptions: 4
    },
    {
      id: 7,
      titre: 'Évaluation cantine',
      auteur: 'Jean Dupont',
      departement: 'RH',
      dateCreation: '09/01/2024',
      participants: 201,
      participationRate: 90,
      statut: 'Expiré',
      expiration: 0,
      nbrOptions: 5
    },
    {
      id: 8,
      titre: 'Préférence horaires flexibles',
      auteur: 'Lisa Martinez',
      departement: 'RH',
      dateCreation: '16/01/2024',
      participants: 67,
      participationRate: 34,
      statut: 'Actif',
      expiration: 16,
      nbrOptions: 4
    },
    {
      id: 9,
      titre: 'Outils de communication',
      auteur: 'Paul Martin',
      departement: 'IT',
      dateCreation: '08/01/2024',
      participants: 134,
      participationRate: 67,
      statut: 'Expiré',
      expiration: 0,
      nbrOptions: 6
    },
    {
      id: 10,
      titre: 'Sondage bien-être au travail',
      auteur: 'Marie Curie',
      departement: 'RH',
      dateCreation: '17/01/2024',
      participants: 56,
      participationRate: 28,
      statut: 'Actif',
      expiration: 20,
      nbrOptions: 5
    }
  ];

  constructor() {
        this.breadCrumbItems = [
      { label: 'Intranet' },
      {label: 'Administration'},
      { label: 'Liste des sondages', active: true }
  ];
  }

  ngOnInit(): void {
    this.tableData = [...this.mockData];
    this.originalData = [...this.mockData];
    // Initialiser les dates pour le date picker
    this.initDateRange();
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.sort.sortChange.subscribe(() => {
        this.sortData(this.sort);
      });
    }
  }

  // Initialiser la plage de dates
  private initDateRange(): void {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    this.bsRangeValue = [start, end];
  }

  // Recherche
  searchData(value: string): void {
    this.searchDataValue = value;
    
    if (value === '') {
      this.tableData = [...this.originalData];
      return;
    }

    const searchLower = value.toLowerCase();
    this.tableData = this.originalData.filter(item => {
      return (
        item.titre?.toLowerCase().includes(searchLower) ||
        item.auteur?.toLowerCase().includes(searchLower) ||
        item.departement?.toLowerCase().includes(searchLower) ||
        item.statut?.toLowerCase().includes(searchLower)
      );
    });
  }

  // Tri des données
  sortData(sort: Sort): void {
    const data = this.tableData.slice();
    
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
      return;
    }

    this.tableData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      
      switch (sort.active) {
        case 'id':
          return this.compare(a.id!, b.id!, isAsc);
        case 'titre':
          return this.compare(a.titre!, b.titre!, isAsc);
        case 'auteur':
          return this.compare(a.auteur!, b.auteur!, isAsc);
        case 'departement':
          return this.compare(a.departement!, b.departement!, isAsc);
        case 'dateCreation':
          return this.compareDates(a.dateCreation!, b.dateCreation!, isAsc);
        case 'participants':
          return this.compare(a.participants!, b.participants!, isAsc);
        case 'statut':
          return this.compare(a.statut!, b.statut!, isAsc);
        case 'expiration':
          return this.compare(a.expiration!, b.expiration!, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareDates(dateA: string, dateB: string, isAsc: boolean): number {
    const [dayA, monthA, yearA] = dateA.split('/').map(Number);
    const [dayB, monthB, yearB] = dateB.split('/').map(Number);
    
    const dateObjA = new Date(yearA, monthA - 1, dayA);
    const dateObjB = new Date(yearB, monthB - 1, dayB);
    
    return this.compare(dateObjA.getTime(), dateObjB.getTime(), isAsc);
  }

  // selection 3lalisr des id
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

  // Pagination
  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    //appele de service pour recuperer les donnes
  }

  
  onEdit(sondage: Sondage): void {
    console.log('Éditer le sondage:', sondage.id);
    //Ouvrir modal d'édition
  }

  onDelete(sondage: Sondage): void {
    console.log('Supprimer le sondage:', sondage.id);
    // Ouvrir modal de confirmation
  }

  onViewResults(sondage: Sondage): void {
    console.log('Voir résultats du sondage:', sondage.id);
    // Navigation vers la page des résultats
  }

  // Méthodes utilitaires
  getSelectedItems(): Partial<Sondage>[] {
    return this.tableData.filter(item => item.isSelected);
  }

  getTotalSelected(): number {
    return this.getSelectedItems().length;
  }


  // Statistiques (pourraient venir d'un service)
  updateStats(): void {
    // En temps réel, tu pourrais appeler un service
    this.stats.sondagesActifs = this.tableData.filter(s => s.statut === 'Actif').length;
    this.stats.totalSondages = this.tableData.length;
    this.stats.participantsTotaux = this.tableData.reduce((sum, sondage) => sum + sondage.participants!, 0);
  }
}
