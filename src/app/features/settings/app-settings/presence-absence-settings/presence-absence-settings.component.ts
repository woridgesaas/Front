import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-presence-absence-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './presence-absence-settings.component.html',
  styleUrls: ['./presence-absence-settings.component.scss'],
})
export class PresenceAbsenceSettingsComponent {
  //* Schedules
  workTimeMode: 'STRICT' | 'HOURS' = 'STRICT';
  startTime = '09:00';
  endTime = '18:00';
  breakDuration = 60;
  dailyHours = 8;

  //* Justification
  justificationDelay = 48;

  //* Wrnings
  warningThreshold = 2;
  criticalThreshold = 5;

  //* Deduction
  deductionType: 'PERCENTAGE' | 'AMOUNT' = 'PERCENTAGE';
  deductionPercentage = 0;
  deductionAmount = 0;

  save(section: string, form: any) {
    if (form.valid) {
      console.log(section, form.value);
      alert(`"${section}" sauvegardé avec succès`);
    }
  }
}
