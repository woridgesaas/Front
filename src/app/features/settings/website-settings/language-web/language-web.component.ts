import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-language-web',
    templateUrl: './language-web.component.html',
    styleUrl: './language-web.component.scss',
    imports: [CommonModule,RouterLink]
})
export class LanguageWebComponent {
public routes=routes;
}
