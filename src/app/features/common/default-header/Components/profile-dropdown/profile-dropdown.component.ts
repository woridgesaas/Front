import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';
import { AuthService } from '../../../../../../app/auth/services/auth.service'

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.scss',
})
export class ProfileDropdownComponent {
  routes = routes;
  user = {
    name: 'douae doudi💜',
    email: 'warren@example.com',
    avatar: 'assets/img/profiles/avatar-12.jpg',
  };

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
  
}