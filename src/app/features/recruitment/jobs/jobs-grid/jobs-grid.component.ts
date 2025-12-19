import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, breadCrumbItems } from '../../../../shared/models/models';
import { DataService } from '../../../../shared/data/data.service';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { FormsModule } from '@angular/forms';
import { JobsComponent } from '../jobs.component';

@Component({
  selector: 'app-jobs-grid',
  templateUrl: './jobs-grid.component.html',
  styleUrl: './jobs-grid.component.scss',
  imports: [CommonModule, BreadcrumbsComponent, CollapseHeaderComponent, 
            RouterLink, DateRangePickerComponent, FormsModule]
})
export class JobsGridComponent {
  public routes = routes;
  breadCrumbItems: breadCrumbItems[] = [];

  constructor(
    private data: DataService,
    public parent: JobsComponent  // ⬅️ Injection du composant parent
  ) {
    this.breadCrumbItems = [
      { label: 'Recrutement' },
      { label: 'Grille des Offres', active: true }
    ];
    
    // Utiliser les données du parent
    this.data.getJobList().subscribe((apiRes: apiResultFormat) => {
      this.parent.jobsData = apiRes.data;
    });
  }
}