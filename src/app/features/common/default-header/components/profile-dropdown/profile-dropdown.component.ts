import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routes } from '../../../../../shared/routes/routes';
import { AuthService } from '../../../../../auth/services/auth.service';
import { CurrentUserProfileResponse } from '../../models/current-user-profile.model';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.scss',
})
export class ProfileDropdownComponent implements OnInit {
  routes = routes;

  currentUser: CurrentUserProfileResponse | null = null;
  profileRoute = '';

  readonly defaultAvatar = 'assets/img/profiles/avatar-12.jpg';

  profileRouteSegments: string[] = [];

  constructor(
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCurrentUserProfile();
  }

  private loadCurrentUserProfile(): void {
    this.currentUserService.getProfile().subscribe({
      next: (profile) => {
        if (!profile) return;
        this.currentUser = profile;
        this.profileRouteSegments = [
          'employees',
          'employee-details',
          profile.id,
        ];
      },
      error: () => {
        this.toastr.error('Impossible de charger votre profil');
      },
    });
  }

  goToProfile(): void {
    if (this.profileRoute) {
      this.router.navigateByUrl(this.profileRoute);
    }
  }

  logout(): void {
    this.currentUserService.clearCache();
    this.authService.logout();
  }
}
