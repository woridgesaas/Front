import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  public getEventsByEmploye():any{
    return [
      {
        id: 1,
        title: 'Entretien avec candidat',
        date: new Date('2026-01-15'),
        time: '14:30',
        color: 'purple',
        type: 'entretien'
      }, 
    ];
  }
  public getPublicEvents():any{
    return [
        {
          id: 101,
          title: 'Réunion générale',
          date: new Date('2026-02-18'),
          type: 'reunion'
        },
        {
          id: 102,
          title: "Fête de l'entreprise",
          date: new Date('2025-03-22'),
          type: 'evenement'
        },
        {
          id:33,
          title: "Manifeste de l’Indépendance",
          date: new Date('2026-01-11'),
          type: 'Fête',
          color:'success'
        }
      ];
  }
  
}
