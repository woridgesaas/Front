import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Sondage } from '../../../../../../shared/models/models';
import { SondageResultsComponent } from '../../../components/sondage-results/sondage-results.component';
import { CommonModule } from '@angular/common';
import { routes } from '../../../../../../shared/routes/routes';
@Component({
  selector: 'app-sondage-details',
  standalone: true,
  imports: [CommonModule, SondageResultsComponent, RouterLink],
  templateUrl: './sondage-details.component.html'
})
export class SondageDetailsComponent implements OnInit {
  sondageId!: number;
  sondage!: Sondage;
  routes = routes;
  constructor(
    private route: ActivatedRoute,
   
  ) {}
  
  ngOnInit(): void {
    this.sondageId = +this.route.snapshot.params['id'];
    this.loadSondage();
  }
  
  loadSondage(): void {
    //  depuis le service future
    this.sondage = {
      id: 1,
      titre: 'Préférence espace de travail',
      auteur: 'Sarah Johnson',
      departement: 'RH',
      dateCreation: '15/01/2024',
      dateExpiration: '20/01/2024',
      totalVotes: 145,
      tauxParticipation: 72,
      statut: 'Actif',
      options: [
        { id: 1, texte: 'Bureau individuel fermé', votes: 65, pourcentage: 45, couleur: '#3498db' },
        { id: 2, texte: 'Open space collaboratif', votes: 42, pourcentage: 29, couleur: '#2ecc71' },
        { id: 3, texte: 'Espaces flexibles', votes: 28, pourcentage: 19, couleur: '#e74c3c' },
        { id: 4, texte: 'Autre', votes: 10, pourcentage: 7, couleur: '#f39c12' }
      ]
    };
  }
}