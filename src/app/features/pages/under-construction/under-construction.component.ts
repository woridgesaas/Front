import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-under-construction',
    templateUrl: './under-construction.component.html',
    styleUrl: './under-construction.component.scss',
    imports: [CommonModule,RouterLink]
})
export class UnderConstructionComponent {
routes= routes
}
