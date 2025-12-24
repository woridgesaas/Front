import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  imports: [CommonModule, RouterLink],
})
export class ChangePasswordComponent {
  routes = routes;
  password: boolean[] = [false];
  togglePassword(i: number): void {
    this.password[i] = !this.password[i];
  }
}
