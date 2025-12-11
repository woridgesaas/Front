import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-security-settings',
    templateUrl: './security-settings.component.html',
    styleUrl: './security-settings.component.scss',
    imports: [CommonModule,RouterLink]
})
export class SecuritySettingsComponent {
routes = routes
password:boolean[]=[false];
togglePassword(i:number):void{
this.password[i]=!this.password[i]
}
}
