import { Injectable } from '@angular/core';
import { sondageEmployes } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SondageService {
  getSondagesActifs(): sondageEmployes[] {
    return [
      {
        id: 1,
        titre: 'Préférence espace de travail',

        creeIlYa: '5h',
        expireDans: 19,
        options: [
          'Bureau individuel fermé',
          'Open space collaboratif', 
          'Espaces flexibles'
        ],
        voted: false,
        totalVotes: 45
      },
      {
        id: 2,
        titre: 'Choix événement d\'entreprise',
        creeIlYa: '12h',
        expireDans: 12,
        options: [
          'Soirée team building',
          'Atelier bien-être',
          'Formation cuisine',
          'Sortie culturelle'
        ],
        voted: false,
        totalVotes: 78
      }
    ];
  }
}
