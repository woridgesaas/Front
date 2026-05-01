import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnnualLeaveModalComponent } from './modals/annual-leave-modal/annual-leave-modal.component';
import { ExceptionalLeavesModalComponent } from './modals/exceptional-leaves-modal/exceptional-leaves-modal.component';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { LeaveType } from './enums/leave-type.enum';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';
import { LeaveSettingsService } from './services/leave-settings.service';
import { GetAnnualBalanceResponse } from './models/leave-settings.models';
import { ToastrService } from 'ngx-toastr';
import { ApiErrorHandler } from '../../../../shared/utils/api-error-handler.utils';
import { HttpErrorResponse } from '@angular/common/http';

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
export class LeaveSettingsComponent implements OnInit {
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  LeaveType = LeaveType;

  //* Active switch
  activeLeaveType: LeaveType = LeaveType.ANNUAL;

  //* Modals
  annualModalOpen = false;
  exceptionalModalOpen = false;

  //* Existing configs
  existingAnnualConfig: GetAnnualBalanceResponse | null = null;

  constructor(
    private leaveSettingsService: LeaveSettingsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.leaveSettingsService.getAnnualBalance().subscribe({
      next: (config) => (this.existingAnnualConfig = config),
      error: (err: HttpErrorResponse) =>
        ApiErrorHandler.handle(err, this.toastr),
    });
  }

  openAnnualModal(): void {
    this.activeLeaveType = LeaveType.ANNUAL;
    this.annualModalOpen = true;
    this.exceptionalModalOpen = false;
  }

  openExceptionalModal(): void {
    this.activeLeaveType = LeaveType.EXCEPTIONAL;
    this.exceptionalModalOpen = true;
    this.annualModalOpen = false;
  }

  onAnnualSaved(): void {
    this.leaveSettingsService.getAnnualBalance().subscribe({
      next: (config) => {
        this.existingAnnualConfig = config;
        this.toastr.success('Solde annuel configuré avec succès');
      },
      error: (err: HttpErrorResponse) =>
        ApiErrorHandler.handle(err, this.toastr),
    });

    this.save.emit();
    this.close.emit();
  }

  onExceptionalSaved(): void {
  this.toastr.success('Congés exceptionnels configurés avec succès');
  this.save.emit();
  this.close.emit();
}
}
