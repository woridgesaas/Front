import { Component, EventEmitter, Output } from '@angular/core';
import { ShowcaseWebsiteModalComponent } from './components/showcase-website-modal/showcase-website-modal.component';
import { DepositionChannelModalComponent } from './components/deposition-channel-modal/deposition-channel-modal.component';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';
import { RecruitmentType } from '../../../../shared/enum/recruitment-type.enum';

@Component({
  selector: 'app-recruitment-settings',
  standalone: true,
  imports: [
    ShowcaseWebsiteModalComponent,
    DepositionChannelModalComponent,
    SwitchButtonComponent,
    SettingsHeaderComponent,
  ],
  templateUrl: './recruitment-settings.component.html',
  styleUrls: ['./recruitment-settings.component.scss'],
})
export class RecruitmentSettingsComponent {
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  RecruitmentType = RecruitmentType;

  //* Active switch
  activeRecruitmentType: RecruitmentType = RecruitmentType.SHOWCASE;

  //* Modals
  showcaseModalOpen = false;
  channelsModalOpen = false;

  //* Track if at least one config is done
  private configured = false;

  //* Open showcase modal
  openShowcaseModal(): void {
    this.activeRecruitmentType = RecruitmentType.SHOWCASE;
    this.showcaseModalOpen = true;
    this.channelsModalOpen = false;
  }

  //* Open channels modal
  openChannelsModal(): void {
    this.activeRecruitmentType = RecruitmentType.CHANNELS;
    this.channelsModalOpen = true;
    this.showcaseModalOpen = false;
  }

  //* Call this when a modal is successfully configured
  markConfigured(): void {
    if (!this.configured) {
      this.configured = true;
      this.save.emit(); //* notify onboarding
    }
  }
}
