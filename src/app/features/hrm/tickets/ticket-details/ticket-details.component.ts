import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
    selector: 'app-ticket-details',
    templateUrl: './ticket-details.component.html',
    styleUrl: './ticket-details.component.scss',
    imports: [CommonModule,RouterModule,RouterLink,BsDatepickerModule,MatSelectModule,CollapseHeaderComponent]
})
export class TicketDetailsComponent {
 public routes=routes;
}
