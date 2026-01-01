import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TechnicienService {
   private techniciens = [
    { id: 1, nom: 'Ahmed Benali', disponible: true ,nbr:2},
    { id: 2, nom: 'Fatima Zohra', disponible: true ,nbr:5},
    { id: 3, nom: 'Karim Bensaid', disponible: false ,nbr:0},
    { id: 4, nom: 'Samira El Amri', disponible: true ,nbr:1}
  ];
  getTechniciens() {
    return this.techniciens;
  }

  
  chargerTechniciensDepuisAPI() {
    // this.http.get(...)
  }
}
