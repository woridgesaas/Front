import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PersonalInfoStepComponent } from './components/personal-info-step/personal-info-step.component';
import { BankInfoStepComponent } from './components/bank-info-step/bank-info-step.component';
import { EducationStepComponent } from './components/education-step/education-step.component';
import { ExperienceStepComponent } from './components/experience-step/experience-step.component';

interface SectionStatus {
  personal: 'pristine' | 'modified' | 'saved';
  bank: 'pristine' | 'modified' | 'saved';
  education: 'pristine' | 'modified' | 'saved';
  experience: 'pristine' | 'modified' | 'saved';
}

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
export class EditEmployeeModalComponent implements OnInit, OnDestroy {
  private _employeeData: any = null;
  private subscriptions: Subscription[] = [];
  private initialFormValues: any = {};
  
  @Input() 
  set employeeData(data: any) {
    this._employeeData = data;
    if (data && this.editEmployeeForm) {
      setTimeout(() => {
        this.patchFormWithEmployeeData(data);
        this.captureInitialValues();
        this.resetSectionStatuses();
      }, 0);
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
  isSaving: boolean = false;
  
  sectionStatus: SectionStatus = {
    personal: 'pristine',
    bank: 'pristine',
    education: 'pristine',
    experience: 'pristine'
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupChangeDetection();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

  /**
   * Configure la détection des changements pour chaque section
   */
  private setupChangeDetection(): void {
    // Détection pour les informations personnelles
    const personalFields = ['firstName', 'lastName', 'cin', 'birthDate', 'email', 'phone', 'address', 'department', 'position'];
    personalFields.forEach(field => {
      const control = this.editEmployeeForm.get(field);
      if (control) {
        const sub = control.valueChanges
          .pipe(debounceTime(300), distinctUntilChanged())
          .subscribe(() => this.checkSectionChanges('personal'));
        this.subscriptions.push(sub);
      }
    });

    // Détection pour les informations bancaires
    const bankInfo = this.editEmployeeForm.get('bankInfo');
    if (bankInfo) {
      const sub = bankInfo.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(() => this.checkSectionChanges('bank'));
      this.subscriptions.push(sub);
    }

    // Détection pour la formation
    const sub1 = this.educationArray.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.checkSectionChanges('education'));
    this.subscriptions.push(sub1);

    // Détection pour l'expérience
    const sub2 = this.experienceArray.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.checkSectionChanges('experience'));
    this.subscriptions.push(sub2);
  }

  /**
   * Capture les valeurs initiales du formulaire pour comparaison
   */
  private captureInitialValues(): void {
    this.initialFormValues = {
      personal: {
        firstName: this.editEmployeeForm.get('firstName')?.value,
        lastName: this.editEmployeeForm.get('lastName')?.value,
        cin: this.editEmployeeForm.get('cin')?.value,
        birthDate: this.editEmployeeForm.get('birthDate')?.value,
        email: this.editEmployeeForm.get('email')?.value,
        phone: this.editEmployeeForm.get('phone')?.value,
        address: this.editEmployeeForm.get('address')?.value,
        department: this.editEmployeeForm.get('department')?.value,
        position: this.editEmployeeForm.get('position')?.value
      },
      bank: JSON.parse(JSON.stringify(this.editEmployeeForm.get('bankInfo')?.value || {})),
      education: JSON.parse(JSON.stringify(this.educationArray.value)),
      experience: JSON.parse(JSON.stringify(this.experienceArray.value))
    };
  }

  /**
   * Vérifie si une section a été modifiée
   */
  private checkSectionChanges(section: keyof SectionStatus): void {
    const currentValues = this.getSectionCurrentValues(section);
    const initialValues = this.initialFormValues[section];
    
    const hasChanges = JSON.stringify(currentValues) !== JSON.stringify(initialValues);
    
    if (hasChanges && this.sectionStatus[section] === 'pristine') {
      this.sectionStatus[section] = 'modified';
    } else if (!hasChanges && this.sectionStatus[section] === 'modified') {
      this.sectionStatus[section] = 'pristine';
    }
  }

  /**
   * Récupère les valeurs actuelles d'une section
   */
  private getSectionCurrentValues(section: keyof SectionStatus): any {
    switch (section) {
      case 'personal':
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
      case 'bank':
        return this.editEmployeeForm.get('bankInfo')?.value;
      case 'education':
        return this.educationArray.value;
      case 'experience':
        return this.experienceArray.value;
    }
  }

  /**
   * Réinitialise les statuts de toutes les sections
   */
  private resetSectionStatuses(): void {
    this.sectionStatus = {
      personal: 'pristine',
      bank: 'pristine',
      education: 'pristine',
      experience: 'pristine'
    };
  }

  /**
   * Récupère uniquement les champs modifiés d'une section
   */
  private getModifiedFields(section: keyof SectionStatus): any {
    const currentValues = this.getSectionCurrentValues(section);
    const initialValues = this.initialFormValues[section];
    const modifiedFields: any = {};

    if (section === 'education' || section === 'experience') {
      // Pour les tableaux, comparer l'ensemble
      if (JSON.stringify(currentValues) !== JSON.stringify(initialValues)) {
        return currentValues;
      }
      return {};
    }

    // Pour les objets, comparer champ par champ
    for (const key in currentValues) {
      if (currentValues.hasOwnProperty(key)) {
        if (JSON.stringify(currentValues[key]) !== JSON.stringify(initialValues[key])) {
          modifiedFields[key] = currentValues[key];
        }
      }
    }

    return modifiedFields;
  }

  /**
   * Navigation directe vers une section via les onglets
   */
  goToStep(step: number): void {
    if (step >= 1 && step <= 4) {
      this.currentStep = step;
    }
  }

  /**
   * Vérifie le statut d'une section (pour affichage dans l'UI)
   */
  getSectionStatus(step: number): 'pristine' | 'modified' | 'saved' {
    const sectionMap: { [key: number]: keyof SectionStatus } = {
      1: 'personal',
      2: 'bank',
      3: 'education',
      4: 'experience'
    };
    return this.sectionStatus[sectionMap[step]];
  }

  /**
   * Sauvegarde la section courante avec uniquement les champs modifiés
   */
  saveCurrentSection(): void {
    const sectionMap: { [key: number]: keyof SectionStatus } = {
      1: 'personal',
      2: 'bank',
      3: 'education',
      4: 'experience'
    };
    
    const currentSection = sectionMap[this.currentStep];
    
    // Vérifier si la section a des modifications
    if (this.sectionStatus[currentSection] !== 'modified') {
      this.showNotification('Aucune modification à enregistrer', 'info');
      return;
    }

    // Valider la section
    if (!this.validateStep(this.currentStep)) {
      this.showNotification('Veuillez corriger les erreurs avant de sauvegarder', 'error');
      return;
    }

    this.isSaving = true;

    // Récupérer uniquement les champs modifiés
    const modifiedData = this.getModifiedFields(currentSection);
    
    if (Object.keys(modifiedData).length === 0) {
      this.isSaving = false;
      this.showNotification('Aucune modification détectée', 'info');
      return;
    }

    // Préparer le payload optimisé
    const payload = {
      employeeId: this.employeeData?.id || this.employeeData?.Id,
      section: currentSection,
      sectionName: this.getStepName(this.currentStep),
      modifiedFields: modifiedData,
      timestamp: new Date().toISOString()
    };

    // Émettre l'événement
    this.onSave.emit(payload);

    // Simuler un délai de sauvegarde (à remplacer par la réponse de l'API)
    setTimeout(() => {
      this.sectionStatus[currentSection] = 'saved';
      // Mettre à jour les valeurs initiales après sauvegarde réussie
      this.initialFormValues[currentSection] = this.getSectionCurrentValues(currentSection);
      this.isSaving = false;
      this.showNotification(`Section "${this.getStepName(this.currentStep)}" enregistrée avec succès!`, 'success');
      
      // Réinitialiser le statut "saved" après 3 secondes
      setTimeout(() => {
        if (this.sectionStatus[currentSection] === 'saved') {
          this.sectionStatus[currentSection] = 'pristine';
        }
      }, 3000);
    }, 500);
  }

  /**
   * Valide un step spécifique
   */
  validateStep(step: number): boolean {
    this.markCurrentStepAsTouched();
    
    switch (step) {
      case 1:
        const personalFields = ['firstName', 'lastName', 'cin', 'birthDate', 'email', 'phone', 'department', 'position'];
        return this.validateFields(personalFields);
      case 2:
        const bankGroup = this.editEmployeeForm.get('bankInfo') as FormGroup;
        return bankGroup.valid;
      case 3:
        return this.educationArray.valid;
      case 4:
        return this.experienceArray.valid;
      default:
        return true;
    }
  }

  /**
   * Valide des champs spécifiques
   */
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

  /**
   * Marque tous les champs du step courant comme touchés
   */
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

  /**
   * Obtient le nom d'un step
   */
  private getStepName(step: number): string {
    const names: { [key: number]: string } = {
      1: 'Informations Personnelles',
      2: 'Informations Bancaires',
      3: 'Formation',
      4: 'Expérience Professionnelle'
    };
    return names[step] || '';
  }

  /**
   * Annule et ferme le modal
   */
  cancelAndClose(): void {
    const hasAnyModifications = Object.values(this.sectionStatus).some(status => status === 'modified');
    
    if (hasAnyModifications) {
      const confirmClose = confirm('Vous avez des modifications non enregistrées. Voulez-vous vraiment fermer ?');
      if (!confirmClose) {
        return;
      }
    }
    
    this.onCancel.emit();
    this.resetForm();
  }

  /**
   * Réinitialise le formulaire
   */
  resetForm(): void {
    this.currentStep = 1;
    this.editEmployeeForm.reset();
    while (this.educationArray.length > 0) {
      this.educationArray.removeAt(0);
    }
    while (this.experienceArray.length > 0) {
      this.experienceArray.removeAt(0);
    }
    this.resetSectionStatuses();
    if (this.employeeData) {
      this.patchFormWithEmployeeData(this.employeeData);
      this.captureInitialValues();
    }
  }

  /**
   * Affiche une notification
   */
  private showNotification(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    const alertClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-danger' : 'alert-info';
    const icon = type === 'success' ? 'ti-check-circle' : type === 'error' ? 'ti-alert-circle' : 'ti-info-circle';
    
    const notification = document.createElement('div');
    notification.className = `alert ${alertClass} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `<i class="ti ${icon} me-2"></i>${message}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  /**
   * Remplit le formulaire avec les données de l'employé
   */
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

    // Charger l'éducation si disponible
    if (employee.education && Array.isArray(employee.education)) {
      employee.education.forEach((edu: any) => {
        this.educationArray.push(this.fb.group(edu));
      });
    }

    // Charger l'expérience si disponible
    if (employee.experience && Array.isArray(employee.experience)) {
      employee.experience.forEach((exp: any) => {
        this.experienceArray.push(this.fb.group(exp));
      });
    }
  }
}