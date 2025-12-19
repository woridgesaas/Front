import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SondageForm } from '../../../../../shared/models/models';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-sondage-modal',
  imports: [FormsModule],
  templateUrl: './create-sondage-modal.component.html',
})
export class CreateSondageModalComponent implements OnInit{
  newSondage :SondageForm={
    titre: '',
    description: '',
    options: ['','']
  }
  constructor() { }
  ngOnInit(): void {}
  public creerSondage(form: NgForm): void {

    if (form.valid) {
      console.log('Nouveau sondage crée:', this.newSondage.titre, this.newSondage.options[0] , this.newSondage.options[1]);
      this.reinitialiserFormulaire(form);
      const modalElement = document.getElementById('creerSondageModal');
      if (modalElement) {
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
    
  }
  public annuler(form: NgForm) {
    this.reinitialiserFormulaire(form);
    
  }
  public reinitialiserFormulaire(form: NgForm): void {
    form.resetForm();
    this.newSondage = {
    titre: '',
    description: '',
    options: ['', '']
  };
  }
    ajouterOption(): void {
    this.newSondage.options.push('');
  }

}
