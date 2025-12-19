import { Component, NgModule, OnInit } from '@angular/core';
import { sondage } from '../../../../../shared/models/models';
import { SondageService } from '../../../../../shared/data/sondage-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sondage-list',
  imports: [CommonModule , FormsModule],
  templateUrl: './sondage-list.component.html',

})
export class SondageListComponent implements OnInit {
   sondages: sondage[] = [];
  constructor(private sondageService: SondageService) {
    
  }
  public ngOnInit(): void {
    this.sondages = this.sondageService.getSondagesActifs();
  }

  public getBadgeColor(heuresRestantes: number): string {
    if (heuresRestantes <= 5) {
      return 'danger';
    } else if (heuresRestantes <= 12) {
      return 'warning';
    } else {
      return 'success';
    }
  }

  voter(sondageId: number): void {
    const sondage = this.sondages.find(s => s.id === sondageId);
    alert(sondage?.selectedOption+"")
    if (!sondage || sondage.selectedOption === undefined) {
      alert('khtarrr!'); // à modifier latter...
      return;
    }
    sondage.voted = true;
  }

}
