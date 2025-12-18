import { Component ,OnInit , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TechnicienDropwonComponent } from '../technicien-dropwon/technicien-dropwon.component';
import { routes } from '../../../../../shared/routes/routes';
export interface Ticket {
  id: number;
  numeroTicket: string;
  titre: string;
  description?: string;
  categorie: string;
  priorite: 'Basse' | 'Moyenne' | 'Haute' | 'Urgente';
  statut: 'Ouvert' | 'En Cours' | 'Résolu' | 'Fermé';
  assignedTo: {
    id: number;
    nom: string;
    avatar: string;
  } | null;
  departement: string;
  updated: string;
  createdAt: string;
}
@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule, RouterModule , TechnicienDropwonComponent],
  templateUrl: './ticket-list.component.html',
})

export class TicketListComponent {
  @Input() tickets: Ticket[] = [];
  routes = routes;
  ticketsMocks: Ticket[] = [
    {
      id: 1,
      numeroTicket: 'TIC-001',
      titre: 'Problème de Laptop',
      description: 'Mon portable ne s\'allume pas, besoin d\'aide urgente',
      categorie: 'Matériel',
      priorite: 'Haute',
      statut: 'Ouvert',
      assignedTo: {
        id: 101,
        nom: 'Edgar Hansel',
        avatar: 'assets/img/profiles/avatar-03.jpg'
      },
      departement: 'Support IT',
      updated: 'Il y a 10 heures',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      numeroTicket: 'TIC-002',
      titre: 'Installation Logicielle',
      description: 'Besoin d\'installer Adobe Creative Suite',
      categorie: 'Logiciel',
      priorite: 'Moyenne',
      statut: 'En Cours',
      assignedTo:null,
      departement: 'Support IT',
      updated: 'Il y a 2 jours',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      numeroTicket: 'TIC-003',
      titre: 'Problème de Réseau',
      description: 'Connexion internet intermittente dans le bureau',
      categorie: 'Réseau',
      priorite: 'Urgente',
      statut: 'Ouvert',
      assignedTo: {
        id: 103,
        nom: 'Michael Chen',
        avatar: 'assets/img/profiles/avatar-07.jpg'
      },
      departement: 'Support IT',
      updated: 'Il y a 5 heures',
      createdAt: '2024-01-16'
    },
    {
      id: 4,
      numeroTicket: 'TIC-004',
      titre: 'Mot de Passe Oublié',
      description: 'Besoin de réinitialiser le mot de passe AD',
      categorie: 'Sécurité',
      priorite: 'Basse',
      statut: 'Résolu',
      assignedTo: {
        id: 104,
        nom: 'Lisa Martinez',
        avatar: 'assets/img/profiles/avatar-09.jpg'
      },
      departement: 'Support IT',
      updated: 'Il y a 1 semaine',
      createdAt: '2024-01-10'
    }
  ];
  ngOnInit(): void {
    // Utilise les tickets du parent s'ils existent, sinon les mocks
    if(!this.tickets || this.tickets.length === 0) {
      this.tickets = this.ticketsMocks;
    } 
  }
}
