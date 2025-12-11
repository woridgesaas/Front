import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-add-language',
    templateUrl: './add-language.component.html',
    styleUrl: './add-language.component.scss',
    imports: [CommonModule,RouterLink]
})
export class AddLanguageComponent {
public routes=routes;
}
