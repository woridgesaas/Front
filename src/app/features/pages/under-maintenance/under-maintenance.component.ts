import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../Common/logo/logo.component';
import { IllustrationComponent } from '../Common/illustration/illustration.component';
import { DescriptionComponent } from '../Common/description/description.component';
import { ButtonComponent } from '../Common/button/button.component';

@Component({
    selector: 'app-under-maintenance',
    templateUrl: './under-maintenance.component.html',
    styleUrl: './under-maintenance.component.scss',
    imports: [CommonModule,LogoComponent,IllustrationComponent,DescriptionComponent,ButtonComponent]
})
export class UnderMaintenanceComponent {
}
