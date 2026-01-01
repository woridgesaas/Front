import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalInfoStepComponent } from './components/personal-info-step/personal-info-step.component';
import { BankInfoStepComponent } from './components/bank-info-step/bank-info-step.component';
import { EducationStepComponent } from './components/education-step/education-step.component';
import { ExperienceStepComponent } from './components/experience-step/experience-step.component';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonalInfoStepComponent,
    BankInfoStepComponent,
    EducationStepComponent,
    ExperienceStepComponent
  ]
})
export class EditEmployeeModalComponent implements OnInit {
  private _employeeData: any = null;
  
  @Input() 
  set employeeData(data: any) {
    this._employeeData = data;
    if (data && this.editEmployeeForm) {
      setTimeout(() => this.patchFormWithEmployeeData(data), 0);
    }
  }
  
  get employeeData(): any {
    return this._employeeData;
  }
  
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
  
  editEmployeeForm!: FormGroup;
  currentStep: number = 1;
  currentYear: number = new Date().getFullYear();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.editEmployeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      cin: ['', [Validators.required, Validators.pattern(/^[A-Z]{1,2}[0-9]{6}$/)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0[5-7][0-9]{8}$/)]],
      address: [''],
      department: ['', Validators.required],
      position: ['', Validators.required],
      bankInfo: this.fb.group({
        bankName: ['', Validators.required],
        rib: ['', [Validators.required, Validators.pattern(/^[0-9]{24}$/)]],
        iban: ['', [Validators.pattern(/^MA[0-9]{2}[0-9A-Z]{24}$/)]],
        branch: [''],
        branchCode: [''],
        branchCity: ['']
      }),
      education: this.fb.array([]),
      experience: this.fb.array([])
    });
  }

  get educationArray(): FormArray {
    return this.editEmployeeForm.get('education') as FormArray;
  }

  get experienceArray(): FormArray {
    return this.editEmployeeForm.get('experience') as FormArray;
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= 4) {
      this.currentStep = step;
    }
  }

  validateStep(step: number): boolean {
    switch (step) {
      case 1:
        const personalFields = ['firstName', 'lastName', 'cin', 'birthDate', 'email', 'phone', 'department', 'position'];
        return this.validateFields(personalFields);
      case 2:
        const bankGroup = this.editEmployeeForm.get('bankInfo') as FormGroup;
        return bankGroup.valid;
      case 3:
        return this.educationArray.length > 0 && this.educationArray.valid;
      case 4:
        return this.experienceArray.length > 0 && this.experienceArray.valid;
      default:
        return true;
    }
  }

  validateFields(fields: string[]): boolean {
    let isValid = true;
    fields.forEach(field => {
      const control = this.editEmployeeForm.get(field);
      if (control) {
        control.markAsTouched();
        if (control.invalid) {
          isValid = false;
        }
      }
    });
    return isValid;
  }

  saveCurrentSection(): void {
    this.markCurrentStepAsTouched();
    const isValid = this.validateStep(this.currentStep);
    
    if (isValid) {
      const sectionData = this.getCurrentSectionData();
      this.onSave.emit({
        section: this.currentStep,
        sectionName: this.getStepName(this.currentStep),
        data: sectionData,
        timestamp: new Date().toISOString()
      });
      this.showSuccessNotification(`Section "${this.getStepName(this.currentStep)}" enregistrée avec succès!`);
    } else {
      alert(`Veuillez remplir tous les champs obligatoires de la section "${this.getStepName(this.currentStep)}"`);
    }
  }

  cancelAndClose(): void {
    this.onCancel.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.currentStep = 1;
    this.editEmployeeForm.reset();
    while (this.educationArray.length > 0) {
      this.educationArray.removeAt(0);
    }
    while (this.experienceArray.length > 0) {
      this.experienceArray.removeAt(0);
    }
    if (this.employeeData) {
      this.patchFormWithEmployeeData(this.employeeData);
    }
  }

  private markCurrentStepAsTouched(): void {
    switch (this.currentStep) {
      case 1:
        ['firstName', 'lastName', 'cin', 'birthDate', 'email', 'phone', 'address', 'department', 'position']
          .forEach(field => this.editEmployeeForm.get(field)?.markAsTouched());
        break;
      case 2:
        const bankGroup = this.editEmployeeForm.get('bankInfo') as FormGroup;
        if (bankGroup) {
          Object.keys(bankGroup.controls).forEach(key => {
            bankGroup.get(key)?.markAsTouched();
          });
        }
        break;
      case 3:
        this.educationArray.controls.forEach((group: any) => {
          Object.keys(group.controls).forEach(key => {
            group.get(key)?.markAsTouched();
          });
        });
        break;
      case 4:
        this.experienceArray.controls.forEach((group: any) => {
          Object.keys(group.controls).forEach(key => {
            group.get(key)?.markAsTouched();
          });
        });
        break;
    }
  }

  private getCurrentSectionData(): any {
    switch (this.currentStep) {
      case 1:
        return {
          firstName: this.editEmployeeForm.get('firstName')?.value,
          lastName: this.editEmployeeForm.get('lastName')?.value,
          cin: this.editEmployeeForm.get('cin')?.value,
          birthDate: this.editEmployeeForm.get('birthDate')?.value,
          email: this.editEmployeeForm.get('email')?.value,
          phone: this.editEmployeeForm.get('phone')?.value,
          address: this.editEmployeeForm.get('address')?.value,
          department: this.editEmployeeForm.get('department')?.value,
          position: this.editEmployeeForm.get('position')?.value
        };
      case 2:
        return { bankInfo: this.editEmployeeForm.get('bankInfo')?.value };
      case 3:
        return { education: this.educationArray.value };
      case 4:
        return { experience: this.experienceArray.value };
      default:
        return {};
    }
  }

  private getStepName(step: number): string {
    const names: { [key: number]: string } = {
      1: 'Informations Personnelles',
      2: 'Informations Bancaires',
      3: 'Formation',
      4: 'Expérience Professionnelle'
    };
    return names[step] || '';
  }

  private showSuccessNotification(message: string): void {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    notification.style.zIndex = '9999';
    notification.innerHTML = `<i class="ti ti-check-circle me-2"></i>${message}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  private patchFormWithEmployeeData(employee: any): void {
    if (!employee) return;
    
    this.editEmployeeForm.patchValue({
      firstName: employee.firstName || employee.Name?.split(' ')[0] || '',
      lastName: employee.lastName || employee.Name?.split(' ').slice(1).join(' ') || '',
      cin: employee.cin || employee.CIN || '',
      birthDate: employee.birthDate || employee.BirthDate || '',
      email: employee.email || employee.Email || '',
      phone: employee.phone || employee.Phone || '',
      address: employee.address || employee.Address || '',
      department: employee.department || employee.Department || '',
      position: employee.position || employee.Position || ''
    });

    if (employee.bankInfo) {
      this.editEmployeeForm.get('bankInfo')?.patchValue(employee.bankInfo);
    }
  }
}