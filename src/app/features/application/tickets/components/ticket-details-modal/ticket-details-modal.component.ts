import { Component, Input, OnInit } from '@angular/core';
import { TicketDetailData } from '../../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-details-modal',
  imports: [CommonModule , FormsModule],
  templateUrl: './ticket-details-modal.component.html',
  styleUrl: './ticket-details-modal.component.scss',
})
export class TicketDetailsModalComponent implements OnInit{
  @Input() ticketData!: TicketDetailData;
  noteFermeture: string = '';
  // mock static (pour l'insatnt si @Input absent de data from parent)
  staticTicketData: TicketDetailData = {
    id: 1,
    numeroTicket: 'TIC-001',
    titre: 'Problème de Laptop',
    description: 'Mon portable ne s\'allume plus depuis ce matin. J\'ai essayé de le brancher sur secteur mais aucun voyant ne s\'allume. Le problème est survenu après une mise à jour Windows.',
    categorie: 'Matériel',
    priorite: 'Haute',
    statut: 'En Cours',
    createdAt: '2024-01-15',
    historiqueStatuts: [
      {
        date: '15/01/2024 10:30',
        statut: 'Ouvert',
        description: 'Ticket créé par l\'employé'
      },
      {
        date: '15/01/2024 14:15',
        statut: 'En Cours',
        description: 'Pris en charge par l\'équipe support'
      },
      
    ]
  };
  ngOnInit(): void {
    // Si pas de donne passés en input, utiliser les dylna mockedd statiques
    if (!this.ticketData) {
      this.ticketData = { ...this.staticTicketData };
    } 
  }

  /**
   * Formater la date
   */
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /**
   * Fermer le modal
   */
  /**
   *  CSS pour la priorite
   */
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Urgente': return 'badge-danger';
      case 'Haute': return 'badge-warning';
      case 'Moyenne': return 'badge-info';
      case 'Basse': return 'badge-success';
      default: return 'badge-secondary';
    }
  }
  //CSS pour le status
  getStatusClass(status: string): string {
    switch (status) {
      case 'Ouvert': return 'badge-primary';
      case 'En Cours': return 'badge-info';
      case 'Résolu': return 'badge-success';
      case 'Fermé': return 'badge-secondary';
      default: return 'badge-light';
    }
  }
}
