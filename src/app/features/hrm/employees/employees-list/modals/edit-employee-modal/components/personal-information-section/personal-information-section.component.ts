import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { EmployeeProfileResponse } from '../../../../../../models/user/employee-profile.model';
import { FormChangeDetector } from '../../../../../../../../shared/utils/form-change-detector.utils';
import { UpdatePersonalInformationRequest } from '../../../../../models/update-personal-information.model';
import { UpdateProfileService } from '../../../../../services/update-profile.service';
import { DateUtils } from '../../../../../../../../shared/utils/date.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorHandler } from '../../../../../../../../shared/utils/api-error-handler.utils';
import { DateValidators } from '../../../../../../../../shared/utils/date-validators.utils';

@Component({
  selector: 'app-personal-information-section',
  templateUrl: './personal-information-section.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule],
})
export class PersonalInformationSectionComponent implements OnChanges {
  @Input() employee: EmployeeProfileResponse | null = null;
  @Output() saved = new EventEmitter<UpdatePersonalInformationRequest>();

  form!: FormGroup;
  isSaving = false;
  private changeDetector!: FormChangeDetector<UpdatePersonalInformationRequest>;

  constructor(
    private fb: FormBuilder,
    private profileService: UpdateProfileService,
    private toastr: ToastrService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.employee) return;

    const initialValue: UpdatePersonalInformationRequest = {
      firstName: this.employee.firstName ?? '',
      lastName: this.employee.lastName ?? '',
      cin: this.employee.CIN ?? '',
      email: this.employee.email ?? '',
      phone: this.employee.phoneNumber ?? '',
      birthDate: DateUtils.toApiDate(this.employee.birthDate),
      address: this.employee.address ?? null,
      profileImageUrl: this.employee.picturePath ?? null,
    };

    this.form = this.fb.group({
      firstName: [
        initialValue.firstName,
        [Validators.required, Validators.maxLength(50)],
      ],

      lastName: [
        initialValue.lastName,
        [Validators.required, Validators.maxLength(50)],
      ],

      cin: [
        initialValue.cin,
        [Validators.required, Validators.pattern(/^[A-Za-z]{1,2}[0-9]{4,8}$/)],
      ],

      email: [
        initialValue.email,
        [
          Validators.required,
          Validators.pattern(
            /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
          ),
          Validators.maxLength(50),
        ],
      ],

      phone: [
        initialValue.phone,
        [Validators.required, Validators.pattern(/^(\\+212|0)[5-7][0-9]{8}$/)],
      ],

      birthDate: [
        DateUtils.toInputDate(initialValue.birthDate),
        [DateValidators.past()],
      ],

      address: [initialValue.address, [Validators.maxLength(500)]],

      profileImageUrl: [
        initialValue.profileImageUrl,
        [Validators.maxLength(500)],
      ],
    });

    this.changeDetector = new FormChangeDetector(initialValue);
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && (c.dirty || c.touched));
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.employee?.id) return;

    const raw = this.form.getRawValue();

    const payload: UpdatePersonalInformationRequest = {
      firstName: raw.firstName ?? '',
      lastName: raw.lastName ?? '',
      cin: raw.cin ?? '',
      email: raw.email ?? '',
      phone: raw.phone ?? '',
      birthDate: DateUtils.toApiDate(raw.birthDate),
      address: raw.address ?? null,
      profileImageUrl: raw.profileImageUrl ?? null,
    };

    if (!this.changeDetector.hasChanges(payload)) {
      this.toastr.info('Aucune modification détectée');
      return;
    }

    this.isSaving = true;

    this.profileService.savePersonalInfo(this.employee.id, payload).subscribe({
      next: () => {
        const directUpdate = this.profileService.canUpdateDirectly();

        this.toastr.success(
          directUpdate
            ? 'Informations personnelles enregistrées'
            : 'Demande de mise à jour envoyée',
        );

        this.changeDetector.updateSnapshot(payload);
        this.isSaving = false;

        if (directUpdate) {
          this.saved.emit(payload);
        }
      },
      error: (error: HttpErrorResponse) => {
        ApiErrorHandler.handle(error, this.toastr);
        this.isSaving = false;
      },
    });
  }
}
