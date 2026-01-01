import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { leaveEmployee } from '../../../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class LeavesModalStateService {
  private readonly _selectedLeave = new BehaviorSubject<leaveEmployee | null>(
    null
  );
  readonly selectedLeave$ = this._selectedLeave.asObservable();

  setSelectedLeave(leave: leaveEmployee | null) {
    this._selectedLeave.next(leave);
  }
}
