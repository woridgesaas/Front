import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Holiday, HolidayRequest } from '../../../../../shared/models/models';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../common/modal-footer/modal-footer.component';
import { HolidayService } from '../../../../../shared/services/holiday.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-holiday-add-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    BsDatepickerModule, 
    ModalFooterComponent,
  ],
  templateUrl: './holidays-modal.component.html',
  styleUrl:'./holidays-modal.component.scss',
})
export class HolidayAddModalComponent implements OnInit {

  @Input() open = false;

  @Output() add = new EventEmitter<HolidayRequest>();
  @Output() cancel = new EventEmitter<void>();

  holiday: HolidayRequest = this.emptyHoliday();
  loading:boolean = false;
  showDropdown = false;
  fieldErrors: { [key: string]: string } = {};
logicError: string | null = null;
  constructor(private holidayService: HolidayService, private toastService :ToastrService) {}

  ngOnInit() {
    
  }
  submit() {
    this.loading = true;
    console.log(this.holiday);
    this.holidayService.createHoliday(this.holiday).subscribe({
      next: (response: Holiday) => {
        this.loading = false;
        this.add.emit(response);
        this.toastService.success("Jour férié créé avec succès !" , "Succès")
        this.close();
      },
  error: (err) => {
      this.loading = false;
      
      const validationErrors = this.validateHoliday(this.holiday);
      if (validationErrors.length > 0) {
        validationErrors.forEach(msg => this.toastService.warning(msg, "Validation"));
        return;
      }
      
      
      if (err.status === 400) {
        this.toastService.warning("Veuillez vérifier les champs du formulaire", "Données invalides");
      } else if (err.status === 409) {
        this.toastService.warning("Ce jour férié existe déjà", "Attention");
      } else if (err.status === 422) {
        this.toastService.warning("La date doit être dans le futur", "Date invalide");
      } else {
        this.toastService.error("Erreur serveur, réessayez plus tard", "Erreur");
      }
    }
    });
  }
  private validateHoliday(h: HolidayRequest): string[] {
    const errors: string[] = [];
    
    if (!h.labelFr || h.labelFr.length < 3) {
      errors.push("Le libellé français doit contenir au moins 3 caractères");
    }
    if (!h.labelAr || h.labelAr.length < 3) {
      errors.push("Le libellé arabe doit contenir au moins 3 caractères");
    }
    if (!h.duration || h.duration < 1 || h.duration > 5) {
      errors.push("La durée doit être entre 1 et 5 jours");
    }
    if (!h.date) {
      errors.push("La date est requise");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const holidayDate = new Date(h.date);
      if (holidayDate <= today) {
        errors.push("La date doit être dans le futur");
      }
    }
    
    return errors;
  }

  close() {
    this.cancel.emit();
    this.holiday = this.emptyHoliday();
    this.showDropdown = false;
  }

  private emptyHoliday(): HolidayRequest {
    return {
      labelFr: '',
      labelAr: '',
      date: new Date(),
      duration: 1,
      isFixed: true,
    };
  }
}
