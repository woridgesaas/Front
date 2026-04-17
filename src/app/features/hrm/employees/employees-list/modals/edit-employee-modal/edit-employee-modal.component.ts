import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  BankInformationSummary,
  EducationSummary,
  EmployeeProfileResponse,
  ProfessionalExperienceSummary,
} from '../../../../models/user/employee-profile.model';
import { BankInformationSectionComponent } from './components/bank-information-section/bank-information-section.component';
import { EducationSectionComponent } from './components/education-section/education-section.component';
import { PersonalInformationSectionComponent } from './components/personal-information-section/personal-information-section.component';
import { ProfessionalExperienceSectionComponent } from './components/professional-experience-section/professional-experience-section.component';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { SecurityModalComponent } from '../../../profilemployee/modals/security-modal/security-modal.component';
import { UpdateProfileService } from '../../../services/update-profile.service';
import { UpdatePersonalInformationRequest } from '../../../models/update-personal-information.model';

declare const bootstrap: any;

type ActiveSection =
  | 'personal'
  | 'bank'
  | 'education'
  | 'experience'
  | 'security';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    BankInformationSectionComponent,
    EducationSectionComponent,
    PersonalInformationSectionComponent,
    ProfessionalExperienceSectionComponent,
    SecurityModalComponent,
  ],
})
export class EditEmployeeModalComponent implements OnChanges {
  @Input() employeeData: EmployeeProfileResponse | null = null;
  @Input() showSecuritySection = false;

  @ViewChild('personalSection')
  personalSection?: PersonalInformationSectionComponent;

  @ViewChild('bankSection')
  bankSection?: BankInformationSectionComponent;

  @ViewChild('educationSection')
  educationSection?: EducationSectionComponent;

  @ViewChild('experienceSection')
  experienceSection?: ProfessionalExperienceSectionComponent;

  activeSection: ActiveSection = 'personal';

  constructor(private profileService: UpdateProfileService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeData'] && this.employeeData) {
      this.activeSection = 'personal';
    }
  }

  setSection(section: ActiveSection): void {
    this.activeSection = section;
  }

  submitActiveSection(): void {
    switch (this.activeSection) {
      case 'personal':
        this.personalSection?.save();
        break;
      case 'bank':
        this.bankSection?.save();
        break;
      case 'education':
        this.educationSection?.saveFirstInvalidOrTouched();
        break;
      case 'experience':
        this.experienceSection?.saveFirstInvalidOrTouched();
        break;
      case 'security':
        break;
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('edit_employee_detail');
    if (!modalElement) return;

    const modalInstance =
      bootstrap.Modal.getInstance(modalElement) ||
      new bootstrap.Modal(modalElement);

    modalInstance.hide();
  }

  get isCurrentSectionSaving(): boolean {
    switch (this.activeSection) {
      case 'personal':
        return !!this.personalSection?.isSaving;
      case 'bank':
        return !!this.bankSection?.isSaving;
      case 'education':
        return this.educationSection?.savingIndex !== null;
      case 'experience':
        return this.experienceSection?.savingIndex !== null;
      case 'security':
        return false;
      default:
        return false;
    }
  }

  get isSubmitDisabled(): boolean {
    if (this.isCurrentSectionSaving) {
      return true;
    }

    if (this.activeSection === 'bank') {
      return !this.bankSection?.canSave;
    }

    return false;
  }

  get showFooterSave(): boolean {
    return this.activeSection === 'personal' || this.activeSection === 'bank';
  }

  get submitButtonText(): string {
    switch (this.activeSection) {
      case 'personal':
        return 'Enregistrer';
      case 'bank':
        return this.bankSection?.isNew ? 'Ajouter' : 'Enregistrer';
      case 'education':
        return 'Enregistrer';
      case 'experience':
        return 'Enregistrer';
      default:
        return 'Enregistrer';
    }
  }

  onPersonalSaved(updated: UpdatePersonalInformationRequest): void {
    if (!this.employeeData || !this.profileService.canUpdateDirectly()) return;

    Object.assign(this.employeeData, {
      firstName: updated.firstName,
      lastName: updated.lastName,
      CIN: updated.cin,
      email: updated.email,
      phoneNumber: updated.phone,
      birthDate: updated.birthDate,
      address: updated.address,
      picturePath: updated.profileImageUrl,
    });
  }

  onBankSaved(updated: BankInformationSummary): void {
    if (!this.employeeData || !this.profileService.canUpdateDirectly()) return;

    this.employeeData.bankInformationSummary = {
      id: updated.id,
      name: updated.name,
      accountHolderName: updated.accountHolderName,
      RIB: updated.RIB,
      IBAN: updated.IBAN,
      agencyName: updated.agencyName,
      agencyCity: updated.agencyCity,
    };
  }

  onEducationSaved(updated: EducationSummary): void {
    if (!this.employeeData || !this.profileService.canUpdateDirectly()) return;

    const index = this.employeeData.educationSummaries.findIndex(
      (item) => item.id === updated.id,
    );

    if (index !== -1) {
      this.employeeData.educationSummaries[index] = updated;
      this.employeeData.educationSummaries = [
        ...this.employeeData.educationSummaries,
      ];
    } else {
      this.employeeData.educationSummaries = [
        ...this.employeeData.educationSummaries,
        updated,
      ];
    }
  }

  onEducationDeleted(id: string): void {
    if (!this.employeeData || !this.profileService.canUpdateDirectly()) return;

    this.employeeData.educationSummaries =
      this.employeeData.educationSummaries.filter((item) => item.id !== id);
  }

  onExperienceSaved(updated: ProfessionalExperienceSummary): void {
    if (!this.employeeData || !this.profileService.canUpdateDirectly()) return;

    const index = this.employeeData.experienceSummaries.findIndex(
      (item) => item.id === updated.id,
    );

    if (index !== -1) {
      this.employeeData.experienceSummaries[index] = updated;
      this.employeeData.experienceSummaries = [
        ...this.employeeData.experienceSummaries,
      ];
    } else {
      this.employeeData.experienceSummaries = [
        ...this.employeeData.experienceSummaries,
        updated,
      ];
    }
  }

  onExperienceDeleted(id: string): void {
    if (!this.employeeData || !this.profileService.canUpdateDirectly()) return;

    this.employeeData.experienceSummaries =
      this.employeeData.experienceSummaries.filter((item) => item.id !== id);
  }
}
