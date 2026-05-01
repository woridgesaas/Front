import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ShowcaseWebsiteModalComponent } from './modals/showcase-website-modal/showcase-website-modal.component';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';
import { RecruitmentSettingsService } from './services/recruitment-settings.service';
import { ToastrService } from 'ngx-toastr';
import { ApiErrorHandler } from '../../../../shared/utils/api-error-handler.utils';
import {
  ConfigureRecruitmentSiteRequest,
  GetRecruitmentSiteResponse,
} from './models/recruitment-settings.models';
import { FormChangeDetector } from '../../../../shared/utils/form-change-detector.utils';
import { ShowcaseWebsiteSettings } from './models/showcase.model';

@Component({
  selector: 'app-recruitment-settings',
  standalone: true,
  imports: [
    CommonModule,
    SwitchButtonComponent,
    ShowcaseWebsiteModalComponent,
    SettingsHeaderComponent,
  ],
  templateUrl: './recruitment-settings.component.html',
  styleUrls: ['./recruitment-settings.component.scss'],
})
export class RecruitmentSettingsComponent implements OnInit {
  @Output() configured = new EventEmitter<void>();

  showcaseModalOpen = false;

  currentRecruitmentSite: GetRecruitmentSiteResponse | null = null;

  private recruitmentSiteChangeDetector: FormChangeDetector<ConfigureRecruitmentSiteRequest> | null =
    null;

  private hasBeenConfigured = false;

  constructor(
    private recruitmentSettingsService: RecruitmentSettingsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadRecruitmentSite();
  }

  private loadRecruitmentSite(): void {
    this.recruitmentSettingsService.getRecruitmentSite().subscribe({
      next: (data) => {
        this.currentRecruitmentSite = data;
        this.recruitmentSiteChangeDetector =
          new FormChangeDetector<ConfigureRecruitmentSiteRequest>({
            primaryColor: data.primaryColor,
            secondaryColor: data.secondaryColor,
            description: data.description,
            foundedYear: data.foundedYear,
            email: data.email,
            phone: data.phone,
            address: data.address,
            linkedinUrl: data.linkedinUrl,
          });
      },
      error: () => {
        this.currentRecruitmentSite = null;
        this.recruitmentSiteChangeDetector = null;
      },
    });
  }

  openShowcaseModal(): void {
    this.showcaseModalOpen = true;
  }

  saveRecruitmentSite(event: { payload: ShowcaseWebsiteSettings }): void {
    const { payload } = event;

    const requestPayload: ConfigureRecruitmentSiteRequest = {
      primaryColor: payload.primaryColor,
      secondaryColor: payload.secondaryColor,
      description: payload.description,
      foundedYear: payload.foundedYear,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      linkedinUrl: payload.linkedinUrl,
    };

    if (
      this.recruitmentSiteChangeDetector &&
      !payload.logoFile &&
      !this.recruitmentSiteChangeDetector.hasChanges(requestPayload)
    ) {
      this.toastr.warning('Aucune modification détectée');
      this.showcaseModalOpen = false;
      return;
    }

    this.recruitmentSettingsService
      .configureRecruitmentSite(requestPayload, payload.logoFile)
      .subscribe({
        next: () => {
          this.toastr.success('Site vitrine configuré avec succès');
          this.currentRecruitmentSite = {
            ...requestPayload,
            id: this.currentRecruitmentSite?.id ?? '',
          };
          this.recruitmentSiteChangeDetector = new FormChangeDetector(
            requestPayload,
          );
          this.showcaseModalOpen = false;
          this.markAsConfigured();
        },
        error: (err: HttpErrorResponse) =>
          ApiErrorHandler.handle(err, this.toastr),
      });
  }

  private markAsConfigured(): void {
    if (!this.hasBeenConfigured) {
      this.hasBeenConfigured = true;
      this.configured.emit();
    }
  }
}
