import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-variables-modal',
  imports: [],
  templateUrl: './variables-modal.component.html',
  styleUrl: './variables-modal.component.scss',
})
export class VariablesModalComponent {
  @ViewChild('carousel') carousel!: ElementRef;
  @Input() predefinedVariables:any;
  currentCategoryIndex = 0;

  previousCategory() {
    if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex--;
    }
  }
  
  
  nextCategory() {
    if (this.currentCategoryIndex < this.predefinedVariables.length - 1) {
      this.currentCategoryIndex++;
    }
  }

  getCategoryIcon(label: string): string {
    const icons: { [key: string]: string } = {
      '👤 Employé': '<i class="ti ti-user" style="font-size: 24px;"></i>',
      '🏢 Entreprise': '<i class="ti ti-building" style="font-size: 24px;"></i>',
      '📄 Contrat': '<i class="ti ti-file-text" style="font-size: 24px;"></i>',
      '💰 Salaire': '<i class="ti ti-coin" style="font-size: 24px;"></i>',
      '⏰ Congés': '<i class="ti ti-calendar" style="font-size: 24px;"></i>'
    };
    
    return icons[label] || '<i class="ti ti-code" style="font-size: 24px;"></i>';
  }
  closeModal():void{
    this.currentCategoryIndex=0; 
  }
}
