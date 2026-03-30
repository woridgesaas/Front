import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { EmployeeDetailModalComponent } from '../modals/employee-detail-modal/employee-detail-modal.component';
import { UserApiService } from '../../../services/user/user-api.service';
import { EmployeeProfileResponse } from '../../../models/user/employee-profile.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    EmployeeDetailModalComponent,
  ],
})
export class EmployeeDetailsComponent implements OnInit {
  public routes = routes;
  employee: EmployeeProfileResponse | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private userApi: UserApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userApi.getProfile(id).subscribe({
        next: (data) => {
          this.employee = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Erreur chargement profil:', err);
          this.isLoading = false;
        }
      });
    }
  }
}
