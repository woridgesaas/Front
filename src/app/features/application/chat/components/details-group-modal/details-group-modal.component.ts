import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Membre {
  id: string;
  nom: string;
  role: 'admin' | 'membre';
  departement: string;
  email: string;
  poste: string;
}

interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  departement: string;
  poste: string;
}

@Component({
  selector: 'app-details-group-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-group-modal.component.html',
})
export class DetailsGroupModalComponent {
  @Output() fermer = new EventEmitter<void>();
  @Output() membresAjoutes = new EventEmitter<string[]>();

  // Données statiques du groupe
  groupe = {
    id: 'groupe-123',
    nom: 'Équipe Développement',
    description: 'Groupe pour les développeurs de la société',
    membreCount: 8
  };

  // Membres actuels (statiques)
  membresActuels: Membre[] = [
    { id: 'm1', nom: 'Jean Dupont', role: 'admin', departement: 'IT', email: 'jean@mail.com', poste: 'Lead Dev' },
    { id: 'm2', nom: 'Marie Martin', role: 'membre',  departement: 'IT', email: 'marie@mail.com', poste: 'Frontend' },
    { id: 'm3', nom: 'Paul Bernard', role: 'membre', departement: 'IT', email: 'paul@mail.com', poste: 'Backend' },
    { id: 'm4', nom: 'Sophie Petit', role: 'membre',  departement: 'IT', email: 'sophie@mail.com', poste: 'Fullstack' },
    { id: 'm5', nom: 'Luc Durand',role: 'membre',  departement: 'IT', email: 'luc@mail.com', poste: 'DevOps' }
  ];

  // Utilisateurs disponibles (statiques)
  utilisateursDisponibles: Utilisateur[] = [
    { id: 'u1', nom: 'Thomas Moreau', email: 'thomas@mail.com', departement: 'Marketing', poste: 'CMO'  },
    { id: 'u2', nom: 'Julie Lefebvre',  email: 'julie@mail.com', departement: 'Marketing', poste: 'Designer'  },
    { id: 'u3', nom: 'Michel Lambert', email: 'michel@mail.com', departement: 'RH', poste: 'HR Manager' },
    { id: 'u4', nom: 'Nathalie Roux', email: 'nathalie@mail.com', departement: 'RH', poste: 'Recruiter' },
    { id: 'u5', nom: 'David Simon',  email: 'david@mail.com', departement: 'IT', poste: 'Mobile Dev' },
    { id: 'u6', nom: 'Laura Michel',  email: 'laura@mail.com', departement: 'IT', poste: 'QA Engineer' },
    { id: 'u7', nom: 'Alexandre Leroy',  email: 'alex@mail.com', departement: 'Sales', poste: 'Sales Manager'}
  ];

  // Filtres
  filtresDisponibles = [
    { id: 'tous', nom: 'Tous' },
    { id: 'it', nom: 'IT' },
    { id: 'marketing', nom: 'Marketing' },
    { id: 'rh', nom: 'RH' },
    { id: 'sales', nom: 'Sales' }
  ];

  // États UI
  membresSelectionnes: string[] = [];
  rechercheMembre: string = '';
  filtreActif: any = null;
  utilisateursFiltres: Utilisateur[] = [...this.utilisateursDisponibles];
  chargementUI: boolean = false;

  constructor() {}

  // Méthodes UI
  fermerModal(): void {
    this.fermer.emit();
  }

  filtrerUtilisateurs(): void {
    const recherche = this.rechercheMembre.toLowerCase();
    
    if (!recherche && !this.filtreActif) {
      this.utilisateursFiltres = [...this.utilisateursDisponibles];
      return;
    }

    this.utilisateursFiltres = this.utilisateursDisponibles.filter(user => {
      const matchRecherche = !recherche || 
        user.nom.toLowerCase().includes(recherche) ||
        user.email.toLowerCase().includes(recherche) ||
        user.departement.toLowerCase().includes(recherche) ||
        user.poste.toLowerCase().includes(recherche);
      
      const matchFiltre = !this.filtreActif || 
        this.filtreActif.id === 'tous' ||
        user.departement.toLowerCase() === this.filtreActif.nom.toLowerCase();
      
      return matchRecherche && matchFiltre;
    });
  }

  appliquerFiltre(filtre: any): void {
    this.filtreActif = filtre;
    this.filtrerUtilisateurs();
  }

  effacerFiltre(): void {
    this.filtreActif = null;
    this.rechercheMembre = '';
    this.filtrerUtilisateurs();
  }

  toggleSelection(utilisateurId: string): void {
    const index = this.membresSelectionnes.indexOf(utilisateurId);
    
    if (index === -1) {
      this.membresSelectionnes.push(utilisateurId);
    } else {
      this.membresSelectionnes.splice(index, 1);
    }
  }

  estSelectionne(utilisateurId: string): boolean {
    return this.membresSelectionnes.includes(utilisateurId);
  }

  selectionnerTous(event: Event): void {
    const target = event.target as HTMLInputElement;
    
    if (target.checked) {
      this.membresSelectionnes = this.utilisateursFiltres.map(user => user.id);
    } else {
      this.membresSelectionnes = [];
    }
  }

  get tousSelectionnes(): boolean {
    if (this.utilisateursFiltres.length === 0) return false;
    return this.membresSelectionnes.length === this.utilisateursFiltres.length;
  }

  viderSelection(): void {
    this.membresSelectionnes = [];
  }

  getNomsSelectionnes(): string {
    const noms = this.utilisateursDisponibles
      .filter(user => this.membresSelectionnes.includes(user.id))
      .map(user => user.nom);
    
    if (noms.length <= 3) {
      return noms.join(', ');
    } else {
      return `${noms.slice(0, 3).join(', ')} et ${noms.length - 3} autre(s)`;
    }
  }

  ajouterMembres(): void {
    if (this.membresSelectionnes.length === 0) return;
    
    this.chargementUI = true;
    
    // Simuler un appel API
    setTimeout(() => {
      for (let i = 0; i < this.membresSelectionnes.length; i++) {
        this.membresActuels.push({id:'999' , nom:this.membresSelectionnes[i] , role:'membre' , email:'testadded@gmail.com' , departement:'Département 1' , poste:'Seller'});
        
      }
      alert(`Membres à ajouter: ${this.membresSelectionnes.join(', ')}`);
      
      this.membresSelectionnes = [];
      this.chargementUI = false;
      
      this.fermerModal();
    }, 1000);
  }

  // Helpers


  formaterRole(role: string): string {
    return role === 'admin' ? 'Manager' : 'Employe';
  }

  get nombreMembres(): number {
    return this.membresActuels.length;
  }
}