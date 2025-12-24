import { Component,OnInit, ViewChild} from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { TicketCategoriesComponent } from '../components/ticket-categories/ticket-categories.component';
import { TicketChartsComponent } from '../components/ticket-charts/ticket-charts.component';
import { TicketListComponent } from '../components/ticket-list/ticket-list.component';
import { TechnicienService } from '../../../../shared/data/technicien-service';
import { TicketCreateComponent } from '../components/ticket-create/ticket-create.component';
@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.scss',
    imports: [TicketListComponent,TicketChartsComponent,TicketCategoriesComponent ,CommonModule,RouterModule,MatSelectModule,BsDatepickerModule,FormsModule,MatSortModule,BreadcrumbsComponent,TicketCreateComponent]  
})
export class TicketComponent implements OnInit {
  public routes=routes;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  breadCrumbItems: breadCrumbItems[] =[];
  techniciens:any[]=[];
  constructor(private technicienService: TechnicienService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.breadCrumbItems = [
      { label: 'Employee' },
      { label: 'Tickets', active: true }
  ];
  }
  ngOnInit(): void {
    this.techniciens = this.technicienService.getTechniciens();
  }
}
