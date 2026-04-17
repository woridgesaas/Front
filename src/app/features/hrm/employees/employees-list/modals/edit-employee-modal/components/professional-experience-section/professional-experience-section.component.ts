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
  FormArray,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import {
  EmployeeProfileResponse,
  ProfessionalExperienceSummary,
} from '../../../../../../models/user/employee-profile.model';
import { UpdateProfessionalExperienceRequest } from '../../../../../models/update-professional-experience.model';
import { FormChangeDetector } from '../../../../../../../../shared/utils/form-change-detector.utils';
import { UpdateProfileService } from '../../../../../services/update-profile.service';
import { AddProfessionalExperienceRequest } from '../../../../../models/add-professional-experience.model';
import { EMPLOYMENT_TYPE } from '../../../../../enums/employement-type.enum';
import { EXPERIENCE_LEVEL } from '../../../../../enums/experience-level.enum';
import { DateUtils } from '../../../../../../../../shared/utils/date.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorHandler } from '../../../../../../../../shared/utils/api-error-handler.utils';
import { DateValidators } from '../../../../../../../../shared/utils/date-validators.utils';

type ExpFormValue = Omit<UpdateProfessionalExperienceRequest, 'id'>;

@Component({
  selector: 'app-professional-experience-section',
  templateUrl: './professional-experience-section.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule],
})
export class ProfessionalExperienceSectionComponent implements OnChanges {
  @Input() employee: EmployeeProfileResponse | null = null;
  @Output() saved = new EventEmitter<ProfessionalExperienceSummary>();
  @Output() deleted = new EventEmitter<string>();

  experienceArray!: FormArray;
  savingIndex: number | null = null;

  private changeDetectors: FormChangeDetector<ExpFormValue>[] = [];

  readonly employmentTypeOptions = Object.entries(EMPLOYMENT_TYPE);
  readonly experienceLevelOptions = Object.entries(EXPERIENCE_LEVEL);

  get canEdit(): boolean {
    return this.profileService.canUpdateDirectly();
  }

  get controls(): FormGroup[] {
    return this.experienceArray.controls as FormGroup[];
  }

  constructor(
    private fb: FormBuilder,
    private profileService: UpdateProfileService,
    private toastr: ToastrService,
  ) {
    this.experienceArray = this.fb.array([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.changeDetectors = [];

    const groups = (this.employee?.experienceSummaries ?? []).map((exp) => {
      const value = this.toFormValue(exp);
      this.changeDetectors.push(new FormChangeDetector(value));
      return this.buildGroup(exp.id, value);
    });

    this.experienceArray = this.fb.array(groups);
    this.savingIndex = null;
  }

  private toFormValue(exp: ProfessionalExperienceSummary): ExpFormValue {
    return {
      employmentType: exp.employmentType,
      experienceLevel: exp.experienceLevel,
      jobTitle: exp.jobTitle,
      companyName: exp.companyName,
      companyLocation: exp.companyLocation,
      startDate: DateUtils.toApiDate(exp.startDate),
      endDate: DateUtils.toApiNullableDate(exp.endDate),
      isCurrent: exp.isCurrent,
      description: exp.description ?? null,
    };
  }

  private buildGroup(id: string | null, value: ExpFormValue): FormGroup {
    return this.fb.group({
      _id: [id],

      employmentType: [value.employmentType, Validators.required],

      experienceLevel: [value.experienceLevel, Validators.required],

      jobTitle: [
        value.jobTitle,
        [Validators.required, Validators.maxLength(50)],
      ],

      companyName: [
        value.companyName,
        [Validators.required, Validators.maxLength(50)],
      ],

      companyLocation: [
        value.companyLocation,
        [Validators.required, Validators.maxLength(50)],
      ],

      startDate: [
        DateUtils.toInputDate(value.startDate),
        [Validators.required, DateValidators.pastOrPresent()],
      ],

      endDate: [DateUtils.toInputDate(value.endDate)],

      isCurrent: [value.isCurrent ?? false],

      description: [value.description],
    });
  }

  addEntry(): void {
    const empty: ExpFormValue = {
      employmentType: '',
      experienceLevel: '',
      jobTitle: '',
      companyName: '',
      companyLocation: '',
      startDate: '',
      endDate: null,
      isCurrent: false,
      description: null,
    };

    this.changeDetectors.push(new FormChangeDetector(empty));
    this.experienceArray.push(this.buildGroup(null, empty));
  }

  removeEntry(index: number): void {
    const group = this.experienceArray.at(index) as FormGroup;
    const id = group.get('_id')?.value as string | null;

    if (id) {
      this.profileService.deleteExperience(id).subscribe({
        next: () => {
          this.experienceArray.removeAt(index);
          this.changeDetectors.splice(index, 1);
          this.toastr.success('Expérience supprimée');

          if (this.canEdit) {
            this.deleted.emit(id);
          }
        },
        error: (error: HttpErrorResponse) => {
          ApiErrorHandler.handle(error, this.toastr);
        },
      });
    } else {
      this.experienceArray.removeAt(index);
      this.changeDetectors.splice(index, 1);
    }
  }

  saveFirstInvalidOrTouched(): void {
    if (this.controls.length === 0) {
      if (this.canEdit) this.addEntry();
      return;
    }

    const invalidIndex = this.controls.findIndex((group) => group.invalid);
    if (invalidIndex !== -1) {
      this.save(invalidIndex);
      return;
    }

    this.save(0);
  }

  save(index: number): void {
    const group = this.experienceArray.at(index) as FormGroup;

    if (group.invalid) {
      group.markAllAsTouched();
      return;
    }

    if (!this.employee?.id) return;

    const { _id, ...rest } = group.getRawValue();

    const payload: ExpFormValue = {
      ...rest,
      startDate: DateUtils.toApiDate(rest.startDate),
      endDate: rest.isCurrent
        ? null
        : DateUtils.toApiNullableDate(rest.endDate),
      description: rest.description ?? null,
    };

    const directUpdate = this.profileService.canUpdateDirectly();

    if (_id && !this.changeDetectors[index].hasChanges(payload)) {
      this.toastr.info('Aucune modification détectée');
      return;
    }

    this.savingIndex = index;
    const userId = this.employee.id;

    const request$ = _id
      ? this.profileService.saveExperience(userId, _id, {
          id: _id,
          ...payload,
        } as UpdateProfessionalExperienceRequest)
      : this.profileService.addExperience(
          userId,
          payload as AddProfessionalExperienceRequest,
        );

    request$.subscribe({
      next: (res: any) => {
        const finalId = _id || res?.data?.id || res?.id || '';

        if (!_id && finalId) {
          group.get('_id')?.setValue(finalId);
        }

        this.changeDetectors[index].updateSnapshot(payload);

        this.toastr.success(
          directUpdate
            ? _id
              ? 'Expérience enregistrée'
              : 'Expérience ajoutée'
            : 'Demande de mise à jour envoyée',
        );

        this.savingIndex = null;

        if (directUpdate && finalId) {
          this.saved.emit({
            id: finalId,
            employmentType: payload.employmentType,
            experienceLevel: payload.experienceLevel,
            companyName: payload.companyName,
            companyLocation: payload.companyLocation,
            jobTitle: payload.jobTitle,
            startDate: payload.startDate,
            endDate: payload.endDate,
            isCurrent: payload.isCurrent,
            description: payload.description ?? '',
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        ApiErrorHandler.handle(error, this.toastr);
        this.savingIndex = null;
      },
    });
  }
}
