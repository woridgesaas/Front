import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { KpisComponent } from '../../../common/kpis/kpis.component';
import { 
  PersonalInfoRequestService, 
  PersonalInfoRequest 
} from '../../employees/services/personal-info-request.service';
import { Subscription } from 'rxjs';

// Déclaration TypeScript pour Bootstrap
declare const bootstrap: any;

type Status = 'En attente' | 'Acceptée' | 'Refusée';

@Component({
  selector: 'app-validate-personal-info',
  standalone: true,
  templateUrl: './validate-personal-info.component.html',
  styleUrls: ['./validate-personal-info.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    BsDatepickerModule,
    BreadcrumbsComponent,
    FooterComponent,
    KpisComponent,
  ],
})
export class ValidateInfoPersonnelComponent implements OnInit, OnDestroy {
  requests: PersonalInfoRequest[] = [];
  filteredRequests: PersonalInfoRequest[] = [];
  
  searchTerm = '';
  selectedDateRange: Date[] | null = null;
  sortMode: 'recent' | 'asc' | 'desc' = 'recent';

  private subscription?: Subscription;

  bsConfig = {
    adaptivePosition: true,
    rangeInputFormat: 'DD/MM/YYYY',
    displayMonths: 2,
  };

  // Modal pour afficher les détails
  selectedRequest: PersonalInfoRequest | null = null;

  constructor(private requestService: PersonalInfoRequestService) {
    console.log('🔵 ValidateInfoPersonnelComponent - Constructor');
  }

  ngOnInit(): void {
    console.log('🔵 ValidateInfoPersonnelComponent - ngOnInit');
    
    // S'abonner aux demandes
    this.subscription = this.requestService.getAllRequests().subscribe(
      (requests: PersonalInfoRequest[]) => {
        console.log('📋 Demandes reçues dans la page validation:', requests);
        this.requests = requests;
        this.applyFilters();
      }
    );

    // Charger les demandes immédiatement
    this.loadRequests();
  }

  /**
   * Charger manuellement les demandes depuis localStorage
   */
  loadRequests(): void {
    const stored = localStorage.getItem('personalInfoRequests');
    console.log('📦 localStorage personalInfoRequests:', stored);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('✅ Demandes parsées:', parsed);
        this.requests = parsed;
        this.applyFilters();
      } catch (e) {
        console.error('❌ Erreur parsing localStorage:', e);
      }
    } else {
      console.log('⚠️ Aucune demande dans localStorage');
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  statusClass(status: string): string {
    switch (status) {
      case 'En attente':
        return 'status-warning';
      case 'Acceptée':
        return 'status-success';
      case 'Refusée':
        return 'status-danger';
      default:
        return '';
    }
  }

  applyFilters(): void {
    console.log('🔍 Application des filtres...');
    let data = [...this.requests];

    if (this.searchTerm) {
      const t = this.searchTerm.toLowerCase();
      data = data.filter(
        (r) =>
          r.employeeName.toLowerCase().includes(t) ||
          r.employeeRole.toLowerCase().includes(t) ||
          r.status.toLowerCase().includes(t)
      );
    }

    if (this.selectedDateRange?.length === 2) {
      const [start, end] = this.selectedDateRange;
      data = data.filter((r) => {
        const d = new Date(`${r.modifiedDate}T00:00:00`);
        return d >= start && d <= end;
      });
    }

    if (this.sortMode === 'asc') {
      data.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
    } else if (this.sortMode === 'desc') {
      data.sort((a, b) => b.employeeName.localeCompare(a.employeeName));
    } else {
      data.sort(
        (a, b) =>
          new Date(b.modifiedDate).getTime() -
          new Date(a.modifiedDate).getTime()
      );
    }

    this.filteredRequests = data;
    console.log('✅ Demandes filtrées:', this.filteredRequests);
  }

  sortBy(mode: 'recent' | 'asc' | 'desc'): void {
    this.sortMode = mode;
    this.applyFilters();
  }

  /**
   * Accepter une demande
   */
  accept(r: PersonalInfoRequest): void {
    const confirmMsg = `Êtes-vous sûr de vouloir accepter cette demande de modification pour ${r.employeeName} ?`;
    if (!confirm(confirmMsg)) return;

    console.log('✅ Acceptation de la demande:', r.id);
    this.requestService.acceptRequest(r.id, 'Admin RH'); // TODO: Récupérer le vrai nom

    // TODO: Appliquer les modifications dans la base de données
    this.applyChangesToDatabase(r);

    alert('✅ Demande acceptée avec succès !');
    
    // Recharger les demandes
    this.loadRequests();
  }

  /**
   * Refuser une demande
   */
  refuse(r: PersonalInfoRequest): void {
    const reason = prompt(`Pourquoi refusez-vous cette demande pour ${r.employeeName} ?`);
    if (reason === null) return; // Annulé

    console.log('❌ Refus de la demande:', r.id);
    this.requestService.refuseRequest(r.id, 'Admin RH'); // TODO: Récupérer le vrai nom

    // TODO: Notifier l'employé du refus avec la raison
    console.log('Demande refusée. Raison:', reason);

    alert('❌ Demande refusée.');
    
    // Recharger les demandes
    this.loadRequests();
  }

  /**
   * Supprimer une demande (seulement si Acceptée ou Refusée)
   */
  deleteRequest(r: PersonalInfoRequest): void {
    // Vérifier que la demande n'est pas en attente
    if (r.status === 'En attente') {
      alert('❌ Impossible de supprimer une demande en attente. Veuillez l\'accepter ou la refuser d\'abord.');
      return;
    }

    const confirmMsg = `Êtes-vous sûr de vouloir supprimer définitivement cette demande de ${r.employeeName} ?`;
    if (!confirm(confirmMsg)) return;

    console.log('🗑️ Suppression de la demande:', r.id);
    const success = this.requestService.deleteRequest(r.id);

    if (success) {
      alert('✅ Demande supprimée avec succès !');
      this.loadRequests();
    } else {
      alert('❌ Erreur lors de la suppression.');
    }
  }

  /**
   * Supprimer toutes les demandes traitées
   */
  deleteAllProcessed(): void {
    const processedCount = this.requests.filter(
      r => r.status === 'Acceptée' || r.status === 'Refusée'
    ).length;

    if (processedCount === 0) {
      alert('ℹ️ Aucune demande traitée à supprimer.');
      return;
    }

    const confirmMsg = `Êtes-vous sûr de vouloir supprimer toutes les ${processedCount} demande(s) traitée(s) ?`;
    if (!confirm(confirmMsg)) return;

    console.log('🗑️ Suppression de toutes les demandes traitées');
    const deletedCount = this.requestService.deleteProcessedRequests();

    alert(`✅ ${deletedCount} demande(s) supprimée(s) avec succès !`);
    this.loadRequests();
  }

  /**
   * Voir les détails d'une demande
   */
  viewChanges(req: PersonalInfoRequest): void {
    console.log('👁️ Affichage des détails:', req);
    this.selectedRequest = req;
    
    // Ouvrir le modal Bootstrap
    const modalElement = document.getElementById('viewChangesModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  /**
   * Appliquer les modifications dans la base de données
   */
  private applyChangesToDatabase(request: PersonalInfoRequest): void {
    // TODO: Appeler votre API pour mettre à jour les données de l'employé
    console.log('🔄 Application des changements:', request.changes);
    
    /*
    Exemple d'implémentation avec un service API:
    
    this.employeeService.updateEmployee(
      request.employeeId,
      this.convertChangesToEmployeeData(request.changes)
    ).subscribe({
      next: () => console.log('Employé mis à jour'),
      error: (err) => console.error('Erreur:', err)
    });
    */
  }

  /**
   * Convertir les changements en données employé
   */
  private convertChangesToEmployeeData(changes: any[]): any {
    const data: any = {};
    changes.forEach(change => {
      data[change.field] = change.newValue;
    });
    return data;
  }

  // KPIs calculés dynamiquement
  get total(): number {
    return this.requests.length;
  }
  
  get pending(): number {
    return this.requests.filter((r) => r.status === 'En attente').length;
  }
  
  get accepted(): number {
    return this.requests.filter((r) => r.status === 'Acceptée').length;
  }
  
  get refused(): number {
    return this.requests.filter((r) => r.status === 'Refusée').length;
  }
  
  get kpis() {
    return [
      {
        title: 'Total des demandes',
        value: this.total,
        icon: 'fa-solid fa-file-lines',
        color: 'primary',
      },
      {
        title: 'En attente',
        value: this.pending,
        icon: 'fa-solid fa-clock',
        color: 'warning',
      },
      {
        title: 'Acceptées',
        value: this.accepted,
        icon: 'fa-solid fa-check',
        color: 'success',
      },
      {
        title: 'Refusées',
        value: this.refused,
        icon: 'fa-solid fa-xmark',
        color: 'danger',
      },
    ];
  }
}