import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsInfo } from '../../../shared/models/models';
import { DataService } from '../../../shared/data/data.service';
import { routes } from '../../../shared/routes/routes';

interface Plateforme {
  id: string;
  nom: string;
  icone: string;
  description: string;
  selectionnee: boolean;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  imports: [RouterOutlet, FooterComponent, CommonModule, RouterLink, FormsModule]
})
export class JobsComponent {
  public routes = routes;

  // Données partagées
  public jobsData: JobsInfo[] = [];
  
  // Variables pour les modales
  offrePourPoster: JobsInfo | null = null;
  offrePourModifier: JobsInfo | null = null;
  offrePourSupprimer: JobsInfo | null = null;
  nouvelleOffre: JobsInfo = this.initialiserNouvelleOffre();
  isOpen = false;
  messageSucces = '';
  detailSucces = '';

  // Plateformes disponibles
  plateformesDisponibles: Plateforme[] = [
    { 
      id: 'linkedin', 
      nom: 'LinkedIn', 
      icone: 'ti ti-brand-linkedin',
      description: 'Réseau professionnel mondial',
      selectionnee: false 
    },
    { 
      id: 'indeed', 
      nom: 'Indeed', 
      icone: 'ti ti-briefcase',
      description: 'Premier site d\'emploi mondial',
      selectionnee: false 
    },
    { 
      id: 'facebook', 
      nom: 'Facebook Jobs', 
      icone: 'ti ti-brand-facebook',
      description: 'Offres d\'emploi sur Facebook',
      selectionnee: false 
    },
    { 
      id: 'site', 
      nom: 'Site Entreprise', 
      icone: 'ti ti-world',
      description: 'Votre site carrières',
      selectionnee: false 
    },
    { 
      id: 'apec', 
      nom: 'APEC', 
      icone: 'ti ti-user-check',
      description: 'Cadres et jeunes diplômés',
      selectionnee: false 
    },
    { 
      id: 'pole-emploi', 
      nom: 'Pôle Emploi', 
      icone: 'ti ti-building',
      description: 'Service public de l\'emploi',
      selectionnee: false 
    }
  ];

  constructor(private data: DataService) {
    this.chargerDonnees();
  }

  // ============ CHARGEMENT DES DONNÉES ============
  chargerDonnees(): void {
    this.data.getJobList().subscribe((apiRes) => {
      this.jobsData = apiRes.data;
    });
  }

  // ============ CRÉATION D'OFFRE ============
  private initialiserNouvelleOffre(): JobsInfo {
    return {
      Job_ID: '',
      Job_Title: '',
      Category: '',
      Location: '',
      Salary_Range: '',
      Posted_Date: new Date().toLocaleDateString('fr-FR'),
      Roll: '',
      Image: 'briefcase.svg',
      Experience: '',
      isSelected: false
    } as JobsInfo;
  }

  ouvrirModalCreer(): void {
    this.nouvelleOffre = this.initialiserNouvelleOffre();
  }

  creerOffre(): void {
    // Validation des champs obligatoires
    if (!this.nouvelleOffre.Job_Title || !this.nouvelleOffre.Category || !this.nouvelleOffre.Location) {
      alert('⚠️ Veuillez remplir tous les champs obligatoires (Titre, Catégorie, Localisation)');
      return;
    }

    // Validation du titre (minimum 5 caractères)
    if (this.nouvelleOffre.Job_Title.length < 5) {
      alert('⚠️ Le titre du poste doit contenir au moins 5 caractères');
      return;
    }

    // Génération d'un ID unique
    this.nouvelleOffre.Job_ID = 'JOB-' + Date.now();
    this.nouvelleOffre.Posted_Date = new Date().toLocaleDateString('fr-FR');
    
    console.log('✅ Création de l\'offre:', this.nouvelleOffre);

    // Appel API (à implémenter)
    // this.data.creerOffre(this.nouvelleOffre).subscribe(...)

    // Ajout local
    this.jobsData.unshift({ ...this.nouvelleOffre });
    
    // Afficher message de succès
    this.messageSucces = 'Offre Créée avec Succès !';
    this.detailSucces = `L'offre "${this.nouvelleOffre.Job_Title}" a été créée et ajoutée à votre liste.`;
    this.isOpen = true;
    
    this.annulerModalCreer();
  }

  annulerModalCreer(): void {
    this.nouvelleOffre = this.initialiserNouvelleOffre();
  }

  // ============ PUBLICATION D'OFFRE ============
  ouvrirModalPoster(offre: JobsInfo): void {
    this.offrePourPoster = { ...offre };
    // Réinitialiser toutes les sélections
    this.plateformesDisponibles.forEach(p => p.selectionnee = false);
  }

  togglePlateforme(plateforme: Plateforme): void {
    plateforme.selectionnee = !plateforme.selectionnee;
  }

  posterOffre(): void {
    if (!this.offrePourPoster) return;

    // Vérifier qu'au moins une plateforme est sélectionnée
    const plateformesSelectionnees = this.plateformesDisponibles
      .filter(p => p.selectionnee)
      .map(p => p.nom);

    if (plateformesSelectionnees.length === 0) {
      alert('⚠️ Veuillez sélectionner au moins une plateforme de publication');
      return;
    }

    console.log('📤 Publication de l\'offre:', this.offrePourPoster.Job_Title);
    console.log('📍 Sur les plateformes:', plateformesSelectionnees);

    // Appel API (à implémenter)
    // this.data.posterOffre(this.offrePourPoster.Job_ID, plateformesSelectionnees).subscribe(...)

    // Message de succès
    this.messageSucces = 'Offre Publiée avec Succès !';
    this.detailSucces = `L'offre "${this.offrePourPoster.Job_Title}" a été publiée sur ${plateformesSelectionnees.length} plateforme(s) : ${plateformesSelectionnees.join(', ')}.`;
    this.isOpen = true;
    
    this.annulerModalPoster();
  }

  annulerModalPoster(): void {
    this.offrePourPoster = null;
    this.plateformesDisponibles.forEach(p => p.selectionnee = false);
  }

  // ============ MODIFICATION D'OFFRE ============
  ouvrirModalModifier(offre: JobsInfo): void {
    this.offrePourModifier = { ...offre };
  }

  modifierOffre(): void {
    if (!this.offrePourModifier) return;

    // Validation
    if (!this.offrePourModifier.Job_Title || !this.offrePourModifier.Category) {
      alert('⚠️ Veuillez remplir tous les champs obligatoires');
      return;
    }

    console.log('✏️ Modification de l\'offre:', this.offrePourModifier);

    // Appel API (à implémenter)
    // this.data.modifierOffre(this.offrePourModifier).subscribe(...)

    // Mise à jour locale
    const index = this.jobsData.findIndex(o => o.Job_ID === this.offrePourModifier!.Job_ID);
    if (index !== -1) {
      this.jobsData[index] = { ...this.offrePourModifier };
    }

    // Message de succès
    this.messageSucces = 'Offre Modifiée avec Succès !';
    this.detailSucces = `Les modifications de l'offre "${this.offrePourModifier.Job_Title}" ont été enregistrées.`;
    this.isOpen = true;

    this.annulerModalModifier();
  }

  annulerModalModifier(): void {
    this.offrePourModifier = null;
  }

  // ============ SUPPRESSION D'OFFRE ============
  ouvrirModalSupprimer(offre: JobsInfo): void {
    this.offrePourSupprimer = { ...offre };
  }

  supprimerOffre(): void {
    if (!this.offrePourSupprimer) return;

    console.log('🗑️ Suppression de l\'offre:', this.offrePourSupprimer.Job_Title);

    // Appel API (à implémenter)
    // this.data.supprimerOffre(this.offrePourSupprimer.Job_ID).subscribe(...)

    const titreSupprime = this.offrePourSupprimer.Job_Title;
    
    // Suppression locale
    this.jobsData = this.jobsData.filter(o => o.Job_ID !== this.offrePourSupprimer!.Job_ID);

    // Message de succès
    this.messageSucces = 'Offre Supprimée';
    this.detailSucces = `L'offre "${titreSupprime}" a été supprimée définitivement.`;
    this.isOpen = true;

    this.annulerModalSupprimer();
  }

  annulerModalSupprimer(): void {
    this.offrePourSupprimer = null;
  }

  // ============ UTILITAIRES ============
  openSuccessModal(): void {
    this.isOpen = !this.isOpen;
  }

  getNombrePlateformesSelectionnees(): number {
    return this.plateformesDisponibles.filter(p => p.selectionnee).length;
  }
}