import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingService } from '../services/onboarding.service';
import { AppSettingItem } from '../models/app-setting-item.model';
import { APP_SETTINGS_ITEMS } from '../config/app-settings.config';
import { AppSettingKey } from '../enum/app-setting-key.enum';
import { OnboardingCardComponent } from '../components/onboarding-card/onboarding-card.component';
import { LeaveSettingsComponent } from '../../features/settings/app-settings/leave-settings/leave-settings.component';
import { AttendanceSettingsComponent } from '../../features/settings/app-settings/attendance-settings/attendance-settings.component';
import { DocumentsTemplateSettingsComponent } from '../../features/settings/app-settings/documents-template-settings/documents-template-settings.component';
import { RecruitmentSettingsComponent } from '../../features/settings/app-settings/recruitment-settings/recruitment-settings.component';

@Component({
  selector: 'app-app-settings-setup',
  standalone: true,
  imports: [
    CommonModule,
    OnboardingCardComponent,
    LeaveSettingsComponent,
    AttendanceSettingsComponent,
    DocumentsTemplateSettingsComponent,
    RecruitmentSettingsComponent,
  ],
  templateUrl: './app-settings-setup.component.html',
})
export class AppSettingsSetupComponent {
  @Output() completed = new EventEmitter<void>();
  @Output() skipped = new EventEmitter<void>();

  readonly settings: AppSettingItem[] = APP_SETTINGS_ITEMS;
  readonly AppSettingKey = AppSettingKey;

  activeSetting: AppSettingKey | null = null;

  //* Track configured settings
  private configuredSettings = new Set<AppSettingKey>();

  constructor(private readonly onboarding: OnboardingService) {}

  trackBySettingKey(_: number, item: AppSettingItem): string {
    return item.key;
  }

  openSetting(key: AppSettingKey): void {
    this.activeSetting = key;

    setTimeout(() => {
      document
        .querySelector('.settings-section')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  closeSettings(): void {
    this.activeSetting = null;
  }

  //* Configuration logic
  onSettingConfigured(key: AppSettingKey): void {
    this.configuredSettings.add(key);
  }

  get configuredCount(): number {
    return this.configuredSettings.size;
  }

  get allConfigured(): boolean {
    return this.configuredCount === this.settings.length;
  }

  get actionLabel(): string {
    if (this.allConfigured) return 'Terminer';
    if (this.configuredCount > 0) return 'Continuer';
    return 'Passer cette étape';
  }

  action(): void {
    if (this.allConfigured) {
      this.onboarding.markAppConfigured();
      this.completed.emit();
      return;
    }

    if (this.configuredCount > 0) {
      this.completed.emit(); //* Continue onboarding
      return;
    }

    this.skipped.emit(); //* Skip step
  }
}
