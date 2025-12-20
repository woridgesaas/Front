import { Component, OnInit } from '@angular/core';
import { CollapseHeaderComponent } from '../../../../../common/collapse-header/collapse-header.component';
import { routes } from '../../../../../../shared/routes/routes';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-annonce',
  imports: [CollapseHeaderComponent,RouterModule , FormsModule],
  templateUrl: './edit-annonce.component.html',
  styleUrl: './edit-annonce.component.scss',
})
export class EditAnnonceComponent implements OnInit{
  routes = routes;
  annonceId: string = '';
  hashtagsTexte: string = '';
  // (simulées pour l'instant)
  annonce = {
    id: 0,
    titre: '',
    contenu: '',
    visibilite: '',
    hashtags: [] as string[],
    dateCreation: new Date(),
    auteurNom: '',
    auteurDepartement: ''
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //recuperer id depuis url envoiyer par routerLink
    this.annonceId = this.route.snapshot.params['id'];
    this.chargerAnnonceSimulee();
  }
  private chargerAnnonceSimulee(): void {
    console.log('Chargement des données pour l\'annonce ID:', this.annonceId);
    
    // Données simulées
    this.annonce = {
      id: parseInt(this.annonceId),
      titre: 'Maintenance serveur prévue ce weekend',
      contenu: 'Une maintenance du serveur principal est prévue ce weekend. Le service sera interrompu de 02h00 à 06h00. Veuillez sauvegarder vos travaux avant cette période.',
      visibilite: 'departement',
      hashtags: ['#maintenance', '#IT', '#urgent'],
      dateCreation: new Date('2024-01-15'),
      auteurNom: 'Richard Smith',
      auteurDepartement: 'IT - Informatique'
    };

    this.hashtagsTexte = this.annonce.hashtags.join(' ').replace(/#/g, '');
    
  }
  formaterHashtags(): string[] {
    if (!this.hashtagsTexte) return [];
    
    return this.hashtagsTexte
      .split(' ')
      .filter(tag => tag.trim() !== '')
      .map(tag => `#${tag.trim()}`);
  }
  sauvegarderModifications(form: NgForm): void {
    console.log('=== TENTATIVE DE SAUVEGARDE ===');
    console.log('Formulaire valide?:', form.valid);
    console.log('Données du formulaire:', form.value);
    console.log('Annonce modifiée:', this.annonce);
    console.log('Hashtags texte:', this.hashtagsTexte);
    console.log('Hashtags formatés:', this.formaterHashtags());
    
    if (form.valid) {
     
      // Simuler un appel API de service
      setTimeout(() => {
       
        alert('Modifications enregistrer (simulation)');
        
      
      }, 400);
    }
  }
  reinitialiserFormulaire(): void {
    this.chargerAnnonceSimulee();
  }
  getAuteurNom(): string {
    return this.annonce.auteurNom || 'Utilisateur inconnu';
  }
  getDateFormatee(): string {
    return this.annonce.dateCreation.toDateString();
  }
  getDepartementNom():string{
    return this.annonce.auteurDepartement;
  }
}
