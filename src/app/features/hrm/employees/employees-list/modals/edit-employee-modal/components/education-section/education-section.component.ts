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
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  EmployeeProfileResponse,
  EducationSummary,
} from '../../../../../../models/user/employee-profile.model';
import { UpdateEducationRequest } from '../../../../../models/update-education.model';
import { FormChangeDetector } from '../../../../../../../../shared/utils/form-change-detector.utils';
import { UpdateProfileService } from '../../../../../services/update-profile.service';
import { AddEducationRequest } from '../../../../../models/add-education.model';
import { EDUCATION_TYPE } from '../../../../../enums/education-type.enum';
import { DateUtils } from '../../../../../../../../shared/utils/date.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorHandler } from '../../../../../../../../shared/utils/api-error-handler.utils';
import { DateValidators } from '../../../../../../../../shared/utils/date-validators.utils';

type EduFormValue = Omit<UpdateEducationRequest, 'id'>;

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule],
})
export class EducationSectionComponent implements OnChanges {
  @Input() employee: EmployeeProfileResponse | null = null;
  @Output() saved = new EventEmitter<EducationSummary>();
  @Output() deleted = new EventEmitter<string>();

  educationArray!: FormArray;
  savingIndex: number | null = null;

  private changeDetectors: FormChangeDetector<EduFormValue>[] = [];
  readonly educationTypeOptions = Object.entries(EDUCATION_TYPE);

  get canEdit(): boolean {
    return this.profileService.canUpdateDirectly();
  }

  get controls(): FormGroup[] {
    return this.educationArray.controls as FormGroup[];
  }

  constructor(
    private fb: FormBuilder,
    private profileService: UpdateProfileService,
    private toastr: ToastrService,
  ) {
    this.educationArray = this.fb.array([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.changeDetectors = [];

    const groups = (this.employee?.educationSummaries ?? []).map((e) => {
      const value = this.toFormValue(e);
      this.changeDetectors.push(new FormChangeDetector(value));
      return this.buildGroup(e.id, value);
    });

    this.educationArray = this.fb.array(groups);
    this.savingIndex = null;
  }

  private toFormValue(education: EducationSummary): EduFormValue {
    return {
      type: education.type,
      title: education.title,
      fieldOfStudy: education.fieldOfStudy,
      institution: education.institution,
      startDate: DateUtils.toApiDate(education.startDate),
      endDate: DateUtils.toApiNullableDate(education.endDate),
      description: education.description ?? null,
    };
  }

  private buildGroup(id: string | null, value: EduFormValue): FormGroup {
    return this.fb.group({
      _id: [id],

      type: [value.type, Validators.required],

      title: [value.title, [Validators.required, Validators.maxLength(50)]],

      fieldOfStudy: [
        value.fieldOfStudy,
        [Validators.required, Validators.maxLength(50)],
      ],

      institution: [
        value.institution,
        [Validators.required, Validators.maxLength(50)],
      ],

      startDate: [
        DateUtils.toInputDate(value.startDate),
        [Validators.required, DateValidators.pastOrPresent()],
      ],
      endDate: [DateUtils.toInputDate(value.endDate)],
      description: [value.description],
    });
  }

  addEntry(): void {
    const empty: EduFormValue = {
      type: '',
      title: '',
      fieldOfStudy: '',
      institution: '',
      startDate: '',
      endDate: null,
      description: null,
    };

    this.changeDetectors.push(new FormChangeDetector(empty));
    this.educationArray.push(this.buildGroup(null, empty));
  }

  removeEntry(index: number): void {
    const group = this.educationArray.at(index) as FormGroup;
    const id = group.get('_id')?.value as string | null;

    if (id) {
      this.profileService.deleteEducation(id).subscribe({
        next: () => {
          this.educationArray.removeAt(index);
          this.changeDetectors.splice(index, 1);
          this.toastr.success('Formation supprimée');

          if (this.canEdit) {
            this.deleted.emit(id);
          }
        },
        error: (error: HttpErrorResponse) => {
          ApiErrorHandler.handle(error, this.toastr);
        },
      });
    } else {
      this.educationArray.removeAt(index);
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
    const group = this.educationArray.at(index) as FormGroup;

    if (group.invalid) {
      group.markAllAsTouched();
      return;
    }

    if (!this.employee?.id) return;

    const { _id, ...rest } = group.getRawValue();

    const payload: EduFormValue = {
      ...rest,
      startDate: DateUtils.toApiDate(rest.startDate),
      endDate: DateUtils.toApiNullableDate(rest.endDate),
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
      ? this.profileService.saveEducation(userId, _id, {
          id: _id,
          ...payload,
        } as UpdateEducationRequest)
      : this.profileService.addEducation(
          userId,
          payload as AddEducationRequest,
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
            ? 'Formation enregistrée'
            : 'Demande de mise à jour envoyée',
        );

        this.savingIndex = null;

        if (directUpdate && finalId) {
          this.saved.emit({
            id: finalId,
            type: payload.type,
            title: payload.title,
            startDate: payload.startDate,
            endDate: payload.endDate,
            description: payload.description ?? '',
            fieldOfStudy: payload.fieldOfStudy,
            institution: payload.institution,
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
