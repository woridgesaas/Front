import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../Common/logo/logo.component';
import { IllustrationComponent } from '../Common/illustration/illustration.component';
import { DescriptionComponent } from '../Common/description/description.component';
import { ButtonComponent } from '../Common/button/button.component';

@Component({
    selector: 'app-under-construction',
    templateUrl: './under-construction.component.html',
    styleUrl: './under-construction.component.scss',
    imports: [CommonModule,LogoComponent,IllustrationComponent,DescriptionComponent,ButtonComponent]
})
export class UnderConstructionComponent {
}
