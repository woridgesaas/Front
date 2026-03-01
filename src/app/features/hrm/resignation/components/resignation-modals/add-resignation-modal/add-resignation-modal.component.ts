import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { resignation } from '../../../../../../shared/models/models';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { ResignationApiService } from '../../../services/resignation-api.service';
// import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Resignation, UserSearch } from '../../../models/models';

import { Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-add-resignation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    ModalHeaderComponent,
    ModalFooterComponent,
  ],
  templateUrl: './add-resignation-modal.component.html',
})
export class AddResignationModalComponent {

  @Input() open = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<Resignation>();

  // Recherche CIN
  cinInput = '';
  userFound: UserSearch | null = null;
  cinError = '';
  isSearching = false;

  private cinSearch$ = new Subject<string>();

  form: Resignation = {
    reason: '',
    noticeDate: null,
    resignationDate: null,
  };

  constructor(private resignationService: ResignationApiService) {
    this.cinSearch$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(cin => {
            this.isSearching = true;
            this.cinError = '';
            return this.resignationService.searchUserByCin(cin).pipe(
                catchError(() => {
                    this.userFound = null;
                    this.cinError = 'Aucun employé trouvé avec ce CIN';
                    this.isSearching = false;
                    return of(null); // ✅ ne casse pas le stream
                })
            );
        })
    ).subscribe({
        next: (user) => {
            if (user) {
                this.userFound = user;
            }
            this.isSearching = false;
        }
    });
}
  onCinChange() {
    if (this.cinInput.length >= 3) {
      this.cinSearch$.next(this.cinInput);
    } else {
      this.userFound = null;
      this.cinError = '';
    }
  }

  submit() {
    if (!this.userFound) {
        this.cinError = 'Veuillez entrer un CIN valide';
        return;
    }
    this.add.emit({ ...this.form, cin: this.cinInput }); //  ajouter le CIN
    this.resetForm();
    this.cancel.emit();
}

  private resetForm() {
    this.cinInput = '';
    this.userFound = null;
    this.cinError = '';
    this.form = {
      reason: '',
      noticeDate: null,
      resignationDate: null,
    };
  }
  onCancel() {
    this.resetForm();
    this.cancel.emit();
}
}