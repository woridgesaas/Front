import { Component } from '@angular/core';
import { AnnualLeaveModalComponent } from './components/annual-leave-modal/annual-leave-modal.component';
import { ExceptionalLeavesModalComponent } from './components/exceptional-leaves-modal/exceptional-leaves-modal.component';
import { ExceptionalLeave } from '../../../../shared/models/leaves.model';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { LeaveType } from '../../../../shared/enum/leave-type.enum';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';

@Component({
  selector: 'app-leave-settings',
  standalone: true,
  imports: [
    AnnualLeaveModalComponent,
    ExceptionalLeavesModalComponent,
    SwitchButtonComponent,
    SettingsHeaderComponent,
  ],
  templateUrl: './leave-settings.component.html',
  styleUrls: ['./leave-settings.component.scss'],
})
export class LeaveSettingsComponent {
  LeaveType = LeaveType;

  //* Active switch
  activeLeaveType: LeaveType = LeaveType.ANNUAL;

  //* Modals
  annualModalOpen = false;
  exceptionalModalOpen = false;

  //* Open annual leave modal
  openAnnualModal(): void {
    this.activeLeaveType = LeaveType.ANNUAL;
    this.annualModalOpen = true;
    this.exceptionalModalOpen = false;
  }

  //* Open exceptional leave modal
  openExceptionalModal(): void {
    this.activeLeaveType = LeaveType.EXCEPTIONAL;
    this.exceptionalModalOpen = true;
    this.annualModalOpen = false;
  }

  //* Save annual leave
  saveAnnualLeave(days: number): void {
    console.log('Annual leave saved:', days);
  }

  //* Save exceptional leave
  saveExceptionalLeaves(leaves: ExceptionalLeave[]): void {
    console.log('Exceptional leaves saved:', leaves);
    //todo Call the backend
  }
}
