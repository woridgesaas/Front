import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TechnicienService } from '../../../../../shared/data/technicien-service';

@Component({
  selector: 'app-technicien-dropwon',
  imports: [CommonModule,MatSelectModule,
    MatFormFieldModule],
  templateUrl: './technicien-dropwon.component.html',
  styleUrl: './technicien-dropwon.component.scss',
})
export class TechnicienDropwonComponent implements  OnInit {
  
   techniciens: any[] = [];
   
   selectedTechnicienId=1;
   constructor(private technicienService: TechnicienService) {}

   ngOnInit(): void {
    // Récupère les données du SERVICE
    this.techniciens = this.technicienService.getTechniciens();
  }
}
