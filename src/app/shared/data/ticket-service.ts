import { Injectable } from '@angular/core';
import { TicketAdmin, TicketBase } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticketsAdmin: TicketAdmin[] = [
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
      assignedTo: null,
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
      titre: 'Problème de Réseau',
      description: 'Pouruqoi la connexion esttres lent ..',
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

  private ticketsBase: TicketBase[] = [
    {
      id: 1,
      numeroTicket: 'TIC-001',
      titre: 'Problème de Laptop',
      description: 'Mon portable ne s\'allume pas, besoin d\'aide urgente',
      categorie: 'Matériel',
      priorite: 'Haute',
      statut: 'Ouvert',
      createdAt: '2024-01-15'
    },
    {
      id: 1,
      numeroTicket: 'TIC-002',
      titre: 'Installation Logicielle',
      description: 'Besoin d\'installer Adobe Creative Suite',
      categorie: 'Logiciel',
      priorite: 'Moyenne',
      statut: 'En Cours',
      createdAt: '2024-01-14'
    },
    {
      id: 5,
      numeroTicket: 'TIC-005',
      titre: 'Souris défectueuse',
      description: 'Ma souris ne fonctionne plus',
      categorie: 'Matériel',
      priorite: 'Moyenne',
      statut: 'Ouvert',
      createdAt: '2024-01-17'
    }
  ];

  //call api futur...
  public getAllTickets(): TicketAdmin[]{
    return this.ticketsAdmin;
  }
  public getTicketsByEmployeId(userId : number):TicketBase[]{
    //1 === 1 just pour test pour l'instant :)
    return this.ticketsBase.filter(t=>t.id === userId)
  }

}
