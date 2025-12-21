import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExceptionalLeave } from '../../../../shared/models/leaves.model';

@Component({
  selector: 'app-leave-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-settings.component.html',
  styleUrls: ['./leave-settings.component.scss'],
})
export class LeaveSettingsComponent {
  exceptionalLeaves: ExceptionalLeave[] = [
    //* Événements familiaux
    {
      code: 'MARRIAGE_EMPLOYEE',
      name: 'Mariage du salarié',
      legalDays: 4,
      grantedDays: 4,
    },

    {
      code: 'MARRIAGE_CHILD',
      name: "Mariage d'un enfant",
      legalDays: 2,
      grantedDays: 2,
    },

    {
      code: 'BIRTH_CHILD',
      name: "Naissance d'un enfant",
      legalDays: 3,
      grantedDays: 3,
    },

    {
      code: 'DEATH_CLOSE_FAMILY',
      name: 'Décès proche (conjoint, parent, enfant)',
      legalDays: 3,
      grantedDays: 3,
    },

    {
      code: 'DEATH_EXTENDED_FAMILY',
      name: 'Décès famille élargie',
      legalDays: 2,
      grantedDays: 2,
    },

    {
      code: 'CIRCUMCISION_CHILD',
      name: "Circoncision d'un enfant",
      legalDays: 2,
      grantedDays: 2,
    },

    {
      code: 'SURGERY_FAMILY',
      name: 'Opération chirurgicale proche',
      legalDays: 2,
      grantedDays: 2,
    },

    //* Obligations personnelles / professionnelles
    {
      code: 'OFFICIAL_EXAM',
      name: 'Examen officiel',
      legalDays: 0,
      grantedDays: 0,
    },

    {
      code: 'SPORT_EVENT',
      name: 'Événement sportif officiel',
      legalDays: 0,
      grantedDays: 0,
    },

    //* Obligations civiques
    {
      code: 'CIVIC_DUTY',
      name: 'Obligation civique',
      legalDays: 0,
      grantedDays: 0,
    },
  ];

  isInvalid(leave: ExceptionalLeave): boolean {
    return leave.grantedDays < leave.legalDays;
  }

  // Toggle exceptional leaves section
  showExceptionalLeaves = false;

  toggleExceptionalLeaves(): void {
    this.showExceptionalLeaves = !this.showExceptionalLeaves;
  }

  saveSettings(): void {
    const invalid = this.exceptionalLeaves.some(
      (leave) => leave.grantedDays < leave.legalDays
    );

    if (invalid) {
      alert('Granted days cannot be lower than the legal minimum.');
      return;
    }

    const payload = this.exceptionalLeaves.map((leave) => ({
      code: leave.code,
      grantedDays: leave.grantedDays,
    }));

    console.log('Payload sent to backend:', payload);
  }
}
