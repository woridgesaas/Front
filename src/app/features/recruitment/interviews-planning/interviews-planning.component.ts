import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../common/footer/footer.component';

interface Entretien {
  id: string;
  candidat: {
    nom: string;
    email: string;
    poste: string;
    photo: string;
  };
  interviewer: {
    nom: string;
    email: string;
    photo: string;
  };
  date: string;
  heure: string;
  duree: number; // en minutes
  type: 'Téléphonique' | 'Visioconférence' | 'Présentiel' | 'Technique';
  statut:
    | 'Planifié'
    | 'Confirmé'
    | 'En cours'
    | 'Terminé'
    | 'Annulé'
    | 'Reporté';
  salle?: string;
  lienVisio?: string;
  notes?: string;
  scoreIA?: number; // Score de filtrage IA (0-100)
  validationIA: boolean;
}

interface Interviewer {
  id: string;
  nom: string;
  email: string;
  photo: string;
  specialite: string;
  disponibilites: string[];
}

@Component({
  selector: 'app-interviews-planning',
  templateUrl: './interviews-planning.component.html',
  styleUrl: './interviews-planning.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BreadcrumbsComponent,
    FooterComponent,
  ],
})
export class InterviewsPlanningComponent {
  // Mode d'affichage
  modeAffichage: 'tableau' | 'calendrier' = 'tableau';

  // Données
  entretiens: Entretien[] = [];
  interviewers: Interviewer[] = [];

  // Variables pour les modales
  nouvelEntretien: Partial<Entretien> = {};
  entretienPourModifier: Entretien | null = null;
  entretienPourSupprimer: Entretien | null = null;
  entretienPourAnnuler: Entretien | null = null;
  entretienDetail: Entretien | null = null;

  // Filtres
  filtres = {
    dateDebut: '',
    dateFin: '',
    interviewer: '',
    candidat: '',
    statut: '',
    type: '',
  };

  // Messages
  isOpen = false;
  messageSucces = '';
  detailSucces = '';

  // Breadcrumb
  breadCrumbItems = [
    { label: 'Recrutement' },
    { label: 'Planification des Entretiens', active: true },
  ];

  constructor() {
    this.chargerDonnees();
  }

  // ============ CHARGEMENT DES DONNÉES ============
  chargerDonnees() {
    // Charger les interviewers disponibles
    this.interviewers = [
      {
        id: 'INT-001',
        nom: 'Marie Dubois',
        email: 'marie.dubois@entreprise.fr',
        photo: 'user-01.jpg',
        specialite: 'Développement',
        disponibilites: ['Lundi 14h-17h', 'Mercredi 9h-12h'],
      },
      {
        id: 'INT-002',
        nom: 'Jean Martin',
        email: 'jean.martin@entreprise.fr',
        photo: 'user-02.jpg',
        specialite: 'Design',
        disponibilites: ['Mardi 10h-16h', 'Jeudi 14h-18h'],
      },
      {
        id: 'INT-003',
        nom: 'Sophie Leroy',
        email: 'sophie.leroy@entreprise.fr',
        photo: 'user-03.jpg',
        specialite: 'RH',
        disponibilites: ['Lundi-Vendredi 9h-18h'],
      },
    ];

    // Données d'exemple
    this.entretiens = [
      {
        id: 'ENT-001',
        candidat: {
          nom: 'Thomas Petit',
          email: 'thomas.petit@email.com',
          poste: 'Développeur Full Stack',
          photo: 'user-04.jpg',
        },
        interviewer: {
          nom: 'Marie Dubois',
          email: 'marie.dubois@entreprise.fr',
          photo: 'user-01.jpg',
        },
        date: '2024-12-20',
        heure: '14:00',
        duree: 60,
        type: 'Visioconférence',
        statut: 'Planifié',
        lienVisio: 'https://meet.google.com/abc-defg-hij',
        scoreIA: 85,
        validationIA: true,
        notes: "Candidat très prometteur avec 5 ans d'expérience",
      },
      {
        id: 'ENT-002',
        candidat: {
          nom: 'Julie Moreau',
          email: 'julie.moreau@email.com',
          poste: 'Designer UI/UX',
          photo: 'user-05.jpg',
        },
        interviewer: {
          nom: 'Jean Martin',
          email: 'jean.martin@entreprise.fr',
          photo: 'user-02.jpg',
        },
        date: '2024-12-21',
        heure: '10:30',
        duree: 45,
        type: 'Présentiel',
        statut: 'Confirmé',
        salle: 'Salle de Réunion A',
        scoreIA: 92,
        validationIA: true,
        notes: 'Portfolio excellent, à prioriser',
      },
    ];
  }

  // ============ CRÉATION D'ENTRETIEN ============
  ouvrirModalCreer() {
    this.nouvelEntretien = {
      date: '',
      heure: '',
      duree: 60,
      type: 'Visioconférence',
      statut: 'Planifié',
      validationIA: false,
    };
  }

  creerEntretien() {
    // Validation
    if (
      !this.nouvelEntretien.candidat ||
      !this.nouvelEntretien.interviewer ||
      !this.nouvelEntretien.date ||
      !this.nouvelEntretien.heure
    ) {
      alert('⚠️ Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Créer l'entretien
    const entretien: Entretien = {
      id: 'ENT-' + Date.now(),
      candidat: this.nouvelEntretien.candidat!,
      interviewer: this.nouvelEntretien.interviewer!,
      date: this.nouvelEntretien.date!,
      heure: this.nouvelEntretien.heure!,
      duree: this.nouvelEntretien.duree || 60,
      type: this.nouvelEntretien.type || 'Visioconférence',
      statut: 'Planifié',
      salle: this.nouvelEntretien.salle,
      lienVisio: this.nouvelEntretien.lienVisio,
      notes: this.nouvelEntretien.notes,
      validationIA: this.nouvelEntretien.validationIA || false,
    };

    console.log("✅ Création de l'entretien:", entretien);

    // Ajout local
    this.entretiens.unshift(entretien);

    // Envoyer les invitations APRÈS création
    this.envoyerInvitations(entretien);

    this.messageSucces = 'Entretien Planifié et Invitations Envoyées !';
    this.detailSucces = `L'entretien avec ${
      entretien.candidat.nom
    } a été planifié pour le ${this.formaterDate(entretien.date)} à ${
      entretien.heure
    }.

📧 Invitations envoyées à :
• ${entretien.candidat.email} (Candidat)
• ${entretien.interviewer.email} (Interviewer)`;
    this.isOpen = true;

    this.annulerModalCreer();
  }

  annulerModalCreer() {
    this.nouvelEntretien = {};
  }

  // ============ MODIFICATION D'ENTRETIEN ============
  ouvrirModalModifier(entretien: Entretien) {
    this.entretienPourModifier = { ...entretien };
  }

  modifierEntretien() {
    if (!this.entretienPourModifier) return;

    console.log("✏️ Modification de l'entretien:", this.entretienPourModifier);

    // Mise à jour
    const index = this.entretiens.findIndex(
      (e) => e.id === this.entretienPourModifier!.id
    );
    if (index !== -1) {
      this.entretiens[index] = { ...this.entretienPourModifier };

      // Notifier les participants du changement
      this.envoyerNotificationModification(this.entretienPourModifier);
    }

    this.messageSucces = 'Entretien Modifié !';
    this.detailSucces =
      'Les modifications ont été enregistrées et les participants ont été notifiés.';
    this.isOpen = true;

    this.annulerModalModifier();
  }

  annulerModalModifier() {
    this.entretienPourModifier = null;
  }

  // ============ SUPPRESSION D'ENTRETIEN ============
  ouvrirModalSupprimer(entretien: Entretien) {
    this.entretienPourSupprimer = { ...entretien };
  }

  supprimerEntretien() {
    if (!this.entretienPourSupprimer) return;

    console.log("🗑️ Suppression de l'entretien:", this.entretienPourSupprimer);

    this.entretiens = this.entretiens.filter(
      (e) => e.id !== this.entretienPourSupprimer!.id
    );

    this.messageSucces = 'Entretien Supprimé';
    this.detailSucces = "L'entretien a été supprimé définitivement.";
    this.isOpen = true;

    this.annulerModalSupprimer();
  }

  annulerModalSupprimer() {
    this.entretienPourSupprimer = null;
  }

  // ============ ANNULATION D'ENTRETIEN ============
  ouvrirModalAnnuler(entretien: Entretien) {
    this.entretienPourAnnuler = { ...entretien };
  }

  annulerEntretien(raison: string) {
    if (!this.entretienPourAnnuler) return;

    console.log(
      "❌ Annulation de l'entretien:",
      this.entretienPourAnnuler,
      'Raison:',
      raison
    );

    // Changer le statut
    const index = this.entretiens.findIndex(
      (e) => e.id === this.entretienPourAnnuler!.id
    );
    if (index !== -1) {
      this.entretiens[index].statut = 'Annulé';
      this.entretiens[index].notes =
        (this.entretiens[index].notes || '') + '\n[Annulé] ' + raison;

      // Notifier les participants
      this.envoyerNotificationAnnulation(this.entretiens[index], raison);
    }

    this.messageSucces = 'Entretien Annulé';
    this.detailSucces = "Les participants ont été notifiés de l'annulation.";
    this.isOpen = true;

    this.fermerModalAnnuler();
  }

  fermerModalAnnuler() {
    this.entretienPourAnnuler = null;
  }

  // ============ ENVOI D'INVITATIONS ============
  envoyerInvitations(entretien: Entretien) {
    console.log('📧 ========== ENVOI DES INVITATIONS ==========');
    console.log('📅 Entretien ID:', entretien.id);
    console.log(
      '📍 Date:',
      this.formaterDate(entretien.date),
      'à',
      entretien.heure
    );
    console.log('⏱️ Durée:', entretien.duree, 'minutes');
    console.log('');
    console.log('✉️ INVITATION CANDIDAT:');
    console.log('  → Destinataire:', entretien.candidat.nom);
    console.log('  → Email:', entretien.candidat.email);
    console.log(
      '  → Sujet: Invitation à un entretien - ' + entretien.candidat.poste
    );
    console.log('');
    console.log('✉️ INVITATION INTERVIEWER:');
    console.log('  → Destinataire:', entretien.interviewer.nom);
    console.log('  → Email:', entretien.interviewer.email);
    console.log('  → Sujet: Entretien planifié avec ' + entretien.candidat.nom);

    if (entretien.lienVisio) {
      console.log('');
      console.log('🔗 Lien Visioconférence inclus:', entretien.lienVisio);
    }
    if (entretien.salle) {
      console.log('');
      console.log('🏢 Lieu:', entretien.salle);
    }
    console.log('==========================================');

    // Appel API réel pour envoyer les emails
    // this.emailService.envoyerInvitationCandidat(entretien).subscribe(...)
    // this.emailService.envoyerInvitationinterviewer(entretien).subscribe(...)
  }

  envoyerNotificationModification(entretien: Entretien) {
    console.log('📧 Notification de modification envoyée pour:', entretien.id);
    console.log('  → Candidat:', entretien.candidat.email);
    console.log('  → Interviewer:', entretien.interviewer.email);
    // Appel API
  }

  envoyerNotificationAnnulation(entretien: Entretien, raison: string) {
    console.log("📧 Notification d'annulation envoyée");
    console.log('  → Raison:', raison);
    console.log('  → Candidat:', entretien.candidat.email);
    console.log('  → Interviewer:', entretien.interviewer.email);
    // Appel API
  }

  // Méthode pour renvoyer les invitations
  renvoyerInvitations(entretien: Entretien) {
    console.log('🔄 Renvoi des invitations pour:', entretien.id);
    this.envoyerInvitations(entretien);

    this.messageSucces = 'Invitations Renvoyées !';
    this.detailSucces = `Les invitations ont été renvoyées à ${entretien.candidat.nom} et ${entretien.interviewer.nom}.`;
    this.isOpen = true;
  }

  // ============ DÉTAILS D'ENTRETIEN ============
  ouvrirDetails(entretien: Entretien) {
    this.entretienDetail = { ...entretien };
  }

  fermerDetails() {
    this.entretienDetail = null;
  }

  // ============ CHANGEMENT DE STATUT ============
  changerStatut(entretien: Entretien, nouveauStatut: string) {
    const ancienStatut = entretien.statut;
    entretien.statut = nouveauStatut as any;

    console.log(` Changement de statut de l'entretien ${entretien.id}`);
    console.log(`  De: ${ancienStatut} → Vers: ${nouveauStatut}`);

    // Notification aux participants
    if (nouveauStatut === 'Confirmé') {
      console.log(' Notification de confirmation envoyée');
    }

    // Appel API pour sauvegarder le changement
    // this.apiService.updateStatut(entretien.id, nouveauStatut).subscribe(...)
  }

  // ============ FILTRAGE ============
  get entretiensFiltres(): Entretien[] {
    return this.entretiens.filter((e) => {
      let valide = true;

      if (this.filtres.dateDebut && e.date < this.filtres.dateDebut)
        valide = false;
      if (this.filtres.dateFin && e.date > this.filtres.dateFin) valide = false;
      if (
        this.filtres.interviewer &&
        e.interviewer.nom !== this.filtres.interviewer
      )
        valide = false;
      if (
        this.filtres.candidat &&
        !e.candidat.nom
          .toLowerCase()
          .includes(this.filtres.candidat.toLowerCase())
      )
        valide = false;
      if (this.filtres.statut && e.statut !== this.filtres.statut)
        valide = false;
      if (this.filtres.type && e.type !== this.filtres.type) valide = false;

      return valide;
    });
  }

  reinitialiserFiltres() {
    this.filtres = {
      dateDebut: '',
      dateFin: '',
      interviewer: '',
      candidat: '',
      statut: '',
      type: '',
    };
  }

  // ============ CHANGEMENT DE MODE ============
  changerMode(mode: 'tableau' | 'calendrier') {
    this.modeAffichage = mode;
  }

  // ============ UTILITAIRES ============
  openSuccessModal() {
    this.isOpen = !this.isOpen;
  }

  getStatutBadgeClass(statut: string): string {
    const classes: { [key: string]: string } = {
      Planifié: 'bg-primary-400',
      Confirmé: 'bg-success',
      'En cours': 'bg-info',
      Terminé: 'bg-secondary',
      Annulé: 'bg-danger',
      Reporté: 'bg-warning',
    };
    return classes[statut] || 'bg-secondary';
  }

  getTypeBadgeClass(type: string): string {
    const classes: { [key: string]: string } = {
      Téléphonique: 'bg-purple-transparent',
      Visioconférence: 'bg-info-transparent',
      Présentiel: 'bg-success-transparent',
      Technique: 'bg-warning-transparent',
    };
    return classes[type] || 'bg-secondary-transparent';
  }

  formaterDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getScoreIAColor(score: number): string {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  }
}
