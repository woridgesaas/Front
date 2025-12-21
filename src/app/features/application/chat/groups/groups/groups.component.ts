import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { breadCrumbItems, ChatGroup } from '../../../../../shared/models/models';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GroupService } from '../../../../../shared/data/group-service';
import { CustomPaginationComponent } from '../../../../../shared/custom-pagination/custom-pagination.component';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { GroupeChartsComponent } from '../../components/groupe-charts/groupe-charts.component';
import { CreateGroupeModalComponent } from '../../components/create-groupe-modal/create-groupe-modal.component';

@Component({
  selector: 'app-groups',
  imports: [BreadcrumbsComponent, FormsModule, GroupeChartsComponent ,CommonModule,BsDatepickerModule,CustomPaginationComponent,MatSortModule,CreateGroupeModalComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit{
  breadCrumbItems : breadCrumbItems[]=[
    {label: 'Intranet', active:false},
    {label: 'Administration' , active:false},
    {label: 'List groupes' , active:true}
  ]
  @ViewChild(MatSort) sort!: MatSort;

  // list des donéne depuis le service mocked
  groupes: ChatGroup[] = [];
  groupesFiltres: ChatGroup[] = [];
  tableData: ChatGroup[] = []; 

  // Filtres
  searchDataValue: string = '';
  initChecked: boolean = false;

  // Pagination
  pageCourante: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  // États
  isAdmin: boolean = true;

  groupeSelectionnePourEdition: ChatGroup | null = null;
  groupeSelectionnePourGestion: ChatGroup | null = null;
  groupeSelectionnePourSuppression: ChatGroup | null = null;
  //statistiques à passer au composant responsable d'afficher les stats
  stats: any;
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.chargerGroupes();
      this.stats = this.groupService.getGroupStats();
  }


  private chargerGroupes(): void {
    this.groupes = this.groupService.getAllGroups();
    this.groupesFiltres = [...this.groupes];
    this.totalItems = this.groupesFiltres.length;
    this.mettreAJourTableData();
  }


  private mettreAJourTableData(): void {
    const startIndex = (this.pageCourante - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.tableData = this.groupesFiltres.slice(startIndex, endIndex);
  }

  rechercherDonnees(value: string): void {
    this.searchDataValue = value;
    
    if (!value || value.trim() === '') {
      this.groupesFiltres = [...this.groupes];
    } else {
      const searchTerm = value.toLowerCase().trim();
      this.groupesFiltres = this.groupes.filter(groupe =>
        groupe.name.toLowerCase().includes(searchTerm) ||
        groupe.description?.toLowerCase().includes(searchTerm) ||
        groupe.createdBy.name.toLowerCase().includes(searchTerm) ||
        this.getTypeLabel(groupe.type).toLowerCase().includes(searchTerm)
      );
    }
    
    this.totalItems = this.groupesFiltres.length;
    this.pageCourante = 1;
    this.initChecked = false;
    this.mettreAJourTableData();
  }


  changerTaillePage(newSize: number): void {
    this.pageSize = newSize;
    this.pageCourante = 1;
    this.mettreAJourTableData();
  }


  changerPage(page: number): void {
    this.pageCourante = page;
    this.mettreAJourTableData();
  }


  trierDonnees(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.mettreAJourTableData();
      return;
    }

    const data = [...this.groupesFiltres];
    
    this.groupesFiltres = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      
      switch (sort.active) {
        case 'nom':
          return this.comparer(a.name, b.name, isAsc);
        
        case 'createdBy':
          return this.comparer(a.createdBy.name, b.createdBy.name, isAsc);
        
        case 'createdAt':
          return this.comparerDates(a.createdAt, b.createdAt, isAsc);
        
        case 'statut':
          return this.comparer(a.status, b.status, isAsc);
        
        case 'type':
          return this.comparer(this.getTypeLabel(a.type), this.getTypeLabel(b.type), isAsc);
        
        case 'memberCount':
          return this.comparer(a.memberCount, b.memberCount, isAsc);
        
        default:
          return 0;
      }
    });
    
    this.mettreAJourTableData();
  }


  private comparer(a: any, b: any, isAsc: boolean): number {
    if (a == null) return isAsc ? -1 : 1;
    if (b == null) return isAsc ? 1 : -1;
    
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b) * (isAsc ? 1 : -1);
    }
    
    return (a < b ? -1 : a > b ? 1 : 0) * (isAsc ? 1 : -1);
  }


  private comparerDates(dateA: Date, dateB: Date, isAsc: boolean): number {
    return this.comparer(dateA.getTime(), dateB.getTime(), isAsc);
  }


  selectionnerTous(checked: boolean): void {
    this.initChecked = checked;
    this.tableData.forEach(groupe => {
      groupe.isSelected = checked;
    });
  }


  getGroupesSelectionnes(): ChatGroup[] {
    return this.tableData.filter(item => item.isSelected);
  }


  voirDetailsGroupe(groupe: ChatGroup): void {
    alert('Voir détails du groupe:'+ groupe.name);
    // Navigation vers le chat du groupe ou modal de détails
  }


  selectionnerGroupePourEdition(groupe: ChatGroup): void {
    this.groupeSelectionnePourEdition = { ...groupe };
  }


  selectionnerGroupePourGestion(groupe: ChatGroup): void {
    this.groupeSelectionnePourGestion = { ...groupe };
  }


  selectionnerGroupePourSuppression(groupe: ChatGroup): void {
    this.groupeSelectionnePourSuppression = { ...groupe };
  }


  getStatusLabel(status: string): string {
    switch (status) {
      case 'actif': return 'Actif';
      case 'fermé': return 'Fermé';
      default: return status;
    }
  }

  /**
   * Obtenir la classe CSS pour un statut
   */
  getStatusBadgeClass(status: string): string {
    return this.groupService.getStatusBadgeClass(status);
  }


  getTypeLabel(type: string): string {
    switch (type) {
      case 'department': return 'Département';
      case 'announcement': return 'Annonces';
      default: return type;
    }
  }


  getTypeIcon(type: string): string {
    return this.groupService.getGroupTypeIcon(type);
  }


  formatDate(date: Date): string {
    return this.groupService.formatDate(date);
  }


  actionsEnMasse(action: string): void {
    const selectionnes = this.getGroupesSelectionnes();
    
    if (selectionnes.length === 0) {
      alert('Aucun groupe sélectionné');
      return;
    }
    
    switch (action) {
      case 'activer':
        if (confirm(`Activer ${selectionnes.length} groupe(s) ?`)) {
          selectionnes.forEach(g => {
            this.groupService.changeGroupStatus(g.id, 'actif');
          });
          this.chargerGroupes();
        }
        break;
        
      case 'fermer':
        if (confirm(`Fermer ${selectionnes.length} groupe(s) ?`)) {
          selectionnes.forEach(g => {
            this.groupService.changeGroupStatus(g.id, 'fermé');
          });
          this.chargerGroupes();
        }
        break;
        
      case 'supprimer':
        if (confirm(`Supprimer ${selectionnes.length} groupe(s) ? Cette action est irréversible.`)) {
          selectionnes.forEach(g => {
            this.groupService.deleteGroup(g.id);
          });
          this.chargerGroupes();
        }
        break;
    }
  }
}
