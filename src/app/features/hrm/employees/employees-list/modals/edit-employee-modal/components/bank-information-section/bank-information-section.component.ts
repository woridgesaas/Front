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
import { ToastrService } from 'ngx-toastr';
import {
  EmployeeProfileResponse,
  BankInformationSummary,
} from '../../../../../../models/user/employee-profile.model';
import { UpdateBankInformationRequest } from '../../../../../models/update-bank-information.model';
import { FormChangeDetector } from '../../../../../../../../shared/utils/form-change-detector.utils';
import { UpdateProfileService } from '../../../../../services/update-profile.service';
import { AddBankInformationRequest } from '../../../../../models/add-bank-information.model';
import { BANK_NAME } from '../../../../../enums/bank-name.enum';
import { ApiErrorHandler } from '../../../../../../../../shared/utils/api-error-handler.utils';
import { HttpErrorResponse } from '@angular/common/http';

type BankFormValue = Omit<UpdateBankInformationRequest, 'id'>;

@Component({
  selector: 'app-bank-information-section',
  templateUrl: './bank-information-section.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class BankInformationSectionComponent implements OnChanges {
  @Input() employee: EmployeeProfileResponse | null = null;
  @Output() saved = new EventEmitter<BankInformationSummary>();

  form!: FormGroup;
  isSaving = false;
  private changeDetector!: FormChangeDetector<BankFormValue>;

  readonly bankOptions = Object.entries(BANK_NAME);

  get isNew(): boolean {
    return !this.employee?.bankInformationSummary?.id;
  }

  get canEditDirectly(): boolean {
    return this.profileService.canUpdateDirectly();
  }

  get canSave(): boolean {
    if (this.isNew && !this.canEditDirectly) {
      return false;
    }

    return true;
  }

  constructor(
    private fb: FormBuilder,
    private profileService: UpdateProfileService,
    private toastr: ToastrService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.employee) return;

    const bank = this.employee.bankInformationSummary;

    const initialValue: BankFormValue = {
      name: bank?.name ?? '',
      accountHolderName: bank?.accountHolderName ?? '',
      RIB: bank?.RIB ?? '',
      IBAN: bank?.IBAN ?? '',
      agencyName: bank?.agencyName ?? null,
      agencyCity: bank?.agencyCity ?? null,
    };

    this.form = this.fb.group({
      name: [initialValue.name, Validators.required],

      accountHolderName: [
        initialValue.accountHolderName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],

      RIB: [
        initialValue.RIB,
        [Validators.required, Validators.pattern(/^\d{24}$/)],
      ],

      IBAN: [
        initialValue.IBAN,
        [Validators.required, Validators.pattern(/^MA\d{26}$/)],
      ],

      agencyName: [
        initialValue.agencyName ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],

      agencyCity: [
        initialValue.agencyCity ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });

    this.changeDetector = new FormChangeDetector(initialValue);
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && (c.dirty || c.touched));
  }

  save(): void {
    if (!this.canSave) {
      this.toastr.warning(
        "Vous n'avez pas la permission d'ajouter des informations bancaires",
      );
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.employee?.id) return;

    const raw = this.form.getRawValue();

    const payload: BankFormValue = {
      name: raw.name ?? '',
      accountHolderName: raw.accountHolderName ?? '',
      RIB: raw.RIB ?? '',
      IBAN: raw.IBAN ?? '',
      agencyName: raw.agencyName ?? null,
      agencyCity: raw.agencyCity ?? null,
    };

    if (!this.isNew && !this.changeDetector.hasChanges(payload)) {
      this.toastr.info('Aucune modification détectée');
      return;
    }

    this.isSaving = true;
    const userId = this.employee.id;
    const directUpdate = this.profileService.canUpdateDirectly();

    const request$ = this.isNew
      ? this.profileService.addBankInfo(
          userId,
          payload as AddBankInformationRequest,
        )
      : this.profileService.saveBankInfo(
          userId,
          this.employee.bankInformationSummary!.id,
          {
            id: this.employee.bankInformationSummary!.id,
            ...payload,
          },
        );

    request$.subscribe({
      next: (res: any) => {
        this.toastr.success(
          directUpdate
            ? this.isNew
              ? 'Informations bancaires ajoutées'
              : 'Informations bancaires enregistrées'
            : 'Demande de mise à jour envoyée',
        );

        this.changeDetector.updateSnapshot(payload);
        this.isSaving = false;

        if (directUpdate) {
          this.saved.emit({
            id:
              this.employee?.bankInformationSummary?.id ||
              res?.data?.id ||
              res?.id ||
              '',
            name: payload.name,
            accountHolderName: payload.accountHolderName,
            RIB: payload.RIB,
            IBAN: payload.IBAN,
            agencyName: payload.agencyName ?? '',
            agencyCity: payload.agencyCity ?? '',
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        ApiErrorHandler.handle(error, this.toastr);
        this.isSaving = false;
      },
    });
  }
}
