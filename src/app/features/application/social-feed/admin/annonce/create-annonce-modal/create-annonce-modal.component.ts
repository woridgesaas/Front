import { Component } from '@angular/core';
import { AnnonceForm } from '../../../../../../shared/models/models';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-annonce-modal',
  imports: [FormsModule , CommonModule],
  templateUrl: './create-annonce-modal.component.html',
  styleUrl: './create-annonce-modal.component.scss',
})
export class CreateAnnonceModalComponent {
    newAnnonce: AnnonceForm = {
    titre: '',
    contenu: '',
    visibilite: 'public'
  };

  departements : any[]=[
     { id: 1, nom: 'Département IT' },
    { id: 2, nom: 'Département RH' },
    { id: 5, nom: 'Département Production' }
  ]
    hashtagsTexte = '';
    creerAnnonce(form: NgForm): void {
      console.log('=== TEST DE RÉCUPÉRATION ===');
      console.log('1. Formulaire valide?:', form.valid);
      console.log('2. Valeurs du formulaire:', form.value);
      console.log('3. Modèle newAnnonce:', this.newAnnonce);
      console.log('4. Hashtags texte:', this.hashtagsTexte);

      if (form.valid) {
        // Convertir le texte hashtags en tableau
        this.convertStringToArray();
        if (this.newAnnonce.visibilite === 'public') {
          console.log('7. Cette annonce sera visible par TOUT LE MONDE');
        } else {
          console.log('7. Cette annonce sera visible seulement par ton DÉPARTEMENT' + this.newAnnonce.departementId);
        }
        
        // reset
        this.reinitialiserFormulaire(form);
        
        alert('Donnes recuperer et envoiyer vers le backend .. console ');
      } 
  }
  private convertStringToArray(): void {
    if (this.hashtagsTexte.trim()) {
      this.newAnnonce.hashtags = this.hashtagsTexte
        .split(' ')
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.trim());
    } else {
      this.newAnnonce.hashtags = [];
    }
  }
  reinitialiserFormulaire(form: NgForm): void {
    form.resetForm();
    
    
    this.newAnnonce = {
      titre: '',
      contenu: '',
      visibilite: 'public',
      hashtags: []
    };
    this.hashtagsTexte = '';
  }
  annuler(form: NgForm): void {
    this.reinitialiserFormulaire(form);
  }

  onVisibiliteChange(): void {
    if (this.newAnnonce.visibilite !== 'departement') {
      this.newAnnonce.departementId = undefined;
    }
  }


}
