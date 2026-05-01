import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import { GetRecruitmentSiteResponse } from '../../models/recruitment-settings.models';
import { ShowcaseWebsiteSettings } from '../../models/showcase.model';
import { RecruitmentSettingsService } from '../../services/recruitment-settings.service';

@Component({
  selector: 'app-showcase-website-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    AlertInformationComponent,
    FormErrorMessageComponent,
  ],
  templateUrl: './showcase-website-modal.component.html',
  styleUrl: './showcase-website-modal.component.scss',
})
export class ShowcaseWebsiteModalComponent implements OnChanges {
  @Input() open = false;
  @Input() existingConfig: GetRecruitmentSiteResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ payload: ShowcaseWebsiteSettings }>();

  form: ShowcaseWebsiteSettings = this.getDefaultForm();

  errors: any = {};
  touchedFields: any = {};

  logoPreviewUrl: string | null = null;

  hasExistingLogo = false;

  constructor(private recruitmentService: RecruitmentSettingsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.errors = {};
      this.touchedFields = {};

      if (this.existingConfig) {
        this.form = {
          ...this.existingConfig,
          logoFile: null,
        };

        this.logoPreviewUrl = this.recruitmentService.getLogoUrl();
        this.hasExistingLogo = true;
      } else {
        this.form = this.getDefaultForm();
        this.logoPreviewUrl = null;
        this.hasExistingLogo = false;
      }

      this.validateAll();
    }
  }

  private getDefaultForm(): ShowcaseWebsiteSettings {
    return {
      description: '',
      primaryColor: '#6A5ACD',
      secondaryColor: '#FFFFFF',
      foundedYear: '',
      email: '',
      phone: '',
      address: '',
      linkedinUrl: '',
      logoFile: null,
    };
  }

  onFieldChange(field: string): void {
    this.touchedFields[field] = true;
    this.validateField(field);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.form.logoFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreviewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.form.logoFile);

      this.hasExistingLogo = false;

      this.touchedFields.logo = true;
      this.validateField('logo');
    }
  }

  //* Validation

  validateField(field: string): void {
    switch (field) {
      case 'description':
        if (!this.form.description.trim()) {
          this.errors.description = 'La description est obligatoire';
        } else if (this.form.description.length < 10) {
          this.errors.description = 'Minimum 10 caractères';
        } else {
          delete this.errors.description;
        }
        break;

      case 'primaryColor':
        if (!this.form.primaryColor.trim()) {
          this.errors.primaryColor = 'Couleur obligatoire';
        } else {
          delete this.errors.primaryColor;
        }
        break;

      case 'secondaryColor':
        if (!this.form.secondaryColor.trim()) {
          this.errors.secondaryColor = 'Couleur obligatoire';
        } else {
          delete this.errors.secondaryColor;
        }
        break;

      case 'foundedYear':
        if (!this.form.foundedYear.trim()) {
          this.errors.foundedYear = 'Année obligatoire';
        } else if (!/^\d{4}$/.test(this.form.foundedYear)) {
          this.errors.foundedYear = '4 chiffres requis';
        } else {
          delete this.errors.foundedYear;
        }
        break;

      case 'email':
        if (!this.form.email.trim()) {
          this.errors.email = 'Email obligatoire';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
          this.errors.email = 'Email invalide';
        } else {
          delete this.errors.email;
        }
        break;

      case 'phone':
        if (!this.form.phone.trim()) {
          this.errors.phone = 'Téléphone obligatoire';
        } else if (!/^(\+212|0)([567])[0-9]{8}$/.test(this.form.phone)) {
          this.errors.phone = 'Numéro marocain invalide';
        } else {
          delete this.errors.phone;
        }
        break;

      case 'address':
        if (!this.form.address.trim()) {
          this.errors.address = 'Adresse obligatoire';
        } else {
          delete this.errors.address;
        }
        break;

      case 'linkedinUrl':
        if (!this.form.linkedinUrl.trim()) {
          this.errors.linkedinUrl = 'LinkedIn obligatoire';
        } else if (
          !/^https:\/\/.*linkedin\.com\/.*$/.test(this.form.linkedinUrl)
        ) {
          this.errors.linkedinUrl = 'URL LinkedIn invalide';
        } else {
          delete this.errors.linkedinUrl;
        }
        break;

      case 'logo':
        if (!this.form.logoFile && !this.hasExistingLogo) {
          this.errors.logo = 'Logo obligatoire';
        } else {
          delete this.errors.logo;
        }
        break;
    }
  }

  validateAll(): void {
    [
      'description',
      'primaryColor',
      'secondaryColor',
      'foundedYear',
      'email',
      'phone',
      'address',
      'linkedinUrl',
      'logo',
    ].forEach((f) => this.validateField(f));
  }

  get isFormValid(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  submit(): void {
    this.validateAll();

    if (!this.isFormValid) return;

    this.save.emit({ payload: this.form });
  }
}
