import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrl: './jobs.component.scss',
    imports: [RouterOutlet,FooterComponent,MatSelectModule,BsDatepickerModule,CommonModule,RouterLink]
})
export class JobsComponent {
public routes=routes
}
