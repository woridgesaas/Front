import { Component } from '@angular/core';
import { ShowcaseWebsiteModalComponent } from './components/showcase-website-modal/showcase-website-modal.component';
import { DepositionChannelModalComponent } from './components/deposition-channel-modal/deposition-channel-modal.component';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';

export enum RecruitmentType {
  SHOWCASE = 'SHOWCASE',
  CHANNELS = 'CHANNELS',
}

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
  RecruitmentType = RecruitmentType;

  //* Active switch
  activeRecruitmentType: RecruitmentType = RecruitmentType.SHOWCASE;

  //* Modals
  showcaseModalOpen = false;
  channelsModalOpen = false;

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
}
