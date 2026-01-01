import { Injectable } from '@angular/core';
import { ExceptionalLeave } from '../models/leaves.model';

@Injectable({
  providedIn: 'root',
})
export class ExceptionalLeaveService {
  private readonly exceptionalLeaves: ExceptionalLeave[] = [
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
    {
      code: 'CIVIC_DUTY',
      name: 'Obligation civique',
      legalDays: 0,
      grantedDays: 0,
    },
  ];

  //* Return a copy of the list
  getExceptionalLeaves(): ExceptionalLeave[] {
    return this.exceptionalLeaves.map((leave) => ({ ...leave }));
  }
}
