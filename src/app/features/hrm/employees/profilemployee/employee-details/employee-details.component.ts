import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { EmployeeDetailModalComponent } from '../modals/employee-detail-modal/employee-detail-modal.component';
import { UserService } from '../../../services/user/user.service';
import { EmployeeProfileResponse } from '../../../models/user/employee-profile.model';
import { BankNamePipe } from '../../../../../shared/pipe/bank-name.pipe';
import { ExperienceLevelPipe } from '../../../../../shared/pipe/experience-level.pipe';
import { EmploymentTypePipe } from '../../../../../shared/pipe/employment-type.pipe';
import { EducationTypePipe } from '../../../../../shared/pipe/education-type.pipe';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    EmployeeDetailModalComponent,
    BankNamePipe,
    EducationTypePipe,
    EmploymentTypePipe,
    ExperienceLevelPipe,
  ],
})
export class EmployeeDetailsComponent implements OnInit {
  public routes = routes;
  employee: EmployeeProfileResponse | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private userApi: UserService,
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
          this.isLoading = false;
        },
      });
    }
  }
}
