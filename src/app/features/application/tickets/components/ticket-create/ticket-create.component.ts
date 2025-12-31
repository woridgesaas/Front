import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { NewTicketForm } from '../../../../../shared/models/models';
import { TechnicienService } from '../../../../../shared/data/technicien-service';
@Component({
  selector: 'app-ticket-create',
  imports: [MatSelectModule , CommonModule , RouterModule , TagInputModule,FormsModule],
  templateUrl: './ticket-create.component.html',
})
export class TicketCreateComponent {
  constructor(private technicienService:TechnicienService) {
    
  }
  techniciens: any[] = [];
  @Input() userRole= '';
    newTicket: NewTicketForm = {
    titre: '',
    description: '',
    categorie: '',
    priorite: 'Moyenne'
  };
  priorities = [
    { value: 'Basse', label: 'Basse' },
    { value: 'Moyenne', label: 'Moyenne' },
    { value: 'Haute', label: 'Haute' },
    { value: 'Urgente', label: 'Urgente' }
  ];
   categories = [
     'Logiciel', 'Panne matérielle', 'Sécurité', 'Ticket général'
  ];
  
  statusOptions = [
    { value: 'Ouvert', label: 'Ouvert' },
    { value: 'En Cours', label: 'En Cours' },
    { value: 'Résolu', label: 'Résolu' }
  ];
  ngOnInit():void{
    this.techniciens = this.technicienService.getTechniciens();
    
  }
  departements = [
    'IT - Informatique',
    'RH - Ressources Humaines', 
    'Marketing',
    'Ventes',
    'Production'
  ];
  canAssignTickets(): boolean {
    return this.userRole === 'canAssigneticket';
  }
  creerTicket(form: NgForm): void {
    console.log('=== CREATION DE TICKET ===');
    console.log('Rôle utilisateur:', this.userRole);
    console.log('Données du formulaire:', this.newTicket);
    console.log('Formulaire valide:', form.valid);
    
    if (form.valid) {
      
      if (this.userRole === '') {
        console.log('Ticket créé par un employé');
       
      } else {
        console.log('Ticket créé par admin/technicien');
     
      }

      this.reinitialiserFormulaire();
    }
  }
  reinitialiserFormulaire(): void {
    this.newTicket = {
      titre: '',
      description: '',
      categorie: '',
      priorite: 'Moyenne'
    };

  }
}
