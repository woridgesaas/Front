import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GroupService } from '../../../../../shared/data/group-service';
import { ChatGroup } from '../../../../../shared/models/models';

@Component({
  selector: 'app-create-groupe-modal',
  imports: [FormsModule],
  templateUrl: './create-groupe-modal.component.html',
  styleUrl: './create-groupe-modal.component.scss',
})
export class CreateGroupeModalComponent {

  constructor(private groupService:GroupService) {
    
    
  }
   newGroup : Partial<ChatGroup>= {
    name: '',
    type:'' 
  };
    groupTypes = [
    { value: 'department', label: 'Département', icon: 'ti-building' },
    { value: 'announcement', label: 'Annonces', icon: 'ti-megaphone' }
  ];

  addGroup(form: NgForm): void {
    if (form.valid) {
      console.log('Groupe à créer:'+ this.newGroup);
      console.log("Group created with infos : \n" ,this.groupService.createGroup(this.newGroup)); //simulation memoire
      this.reinitialiserFormulaire(form);
      this.fermerModal();
    }
  }
  cancel(form: NgForm): void {
    this.reinitialiserFormulaire(form);
    this.fermerModal();
  }
  private reinitialiserFormulaire( form:NgForm): void {
    form.reset();
    this.newGroup = {
      name: '',
      type: ''
    };
  }
   private fermerModal(): void {
    const modal = document.getElementById('createGroupModal');
    if (modal) {
      (window as any).bootstrap?.Modal?.getInstance(modal)?.hide();
    }
  }
}
