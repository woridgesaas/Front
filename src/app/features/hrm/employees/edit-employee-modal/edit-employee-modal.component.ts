import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    MatSelectModule
  ]
})
export class EditEmployeeModalComponent implements OnInit, OnDestroy {
  private _employeeData: any = null;
  
  @Input() 
  set employeeData(data: any) {
    this._employeeData = data;
    if (data && this.editEmployeeForm) {
      // Charger les données dès qu'elles sont disponibles
      setTimeout(() => this.patchFormWithEmployeeData(data), 0);
    }
  }
  
  get employeeData(): any {
    return this._employeeData;
  }
  
  @Output() onSave = new EventEmitter<any>(); // Émission lors de la sauvegarde
  @Output() onCancel = new EventEmitter<void>(); // Émission lors de l'annulation
  
  editEmployeeForm!: FormGroup;
  currentStep: number = 1;
  currentYear: number = new Date().getFullYear();
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /**
   * Initialisation du formulaire avec tous les champs
   */
  initializeForm(): void {
    this.editEmployeeForm = this.fb.group({
      // Étape 1: Informations Personnelles
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      cin: ['', [Validators.required, Validators.pattern(/^[A-Z]{1,2}[0-9]{6}$/)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0[5-7][0-9]{8}$/)]],
      address: [''],
      department: ['', Validators.required],
      position: ['', Validators.required],
      
      // Étape 2: Informations Bancaires
      bankInfo: this.fb.group({
        bankName: ['', Validators.required],
        rib: ['', [Validators.required, Validators.pattern(/^[0-9]{24}$/)]],
        iban: ['', [Validators.pattern(/^MA[0-9]{2}[0-9A-Z]{24}$/)]],
        branch: [''],
        branchCode: [''],
        branchCity: ['']
      }),
      
      // Étape 3: Formation (FormArray)
      education: this.fb.array([this.createEducationGroup()]),
      
      // Étape 4: Expérience (FormArray)
      experience: this.fb.array([this.createExperienceGroup()])
    });
  }

  /**
   * Crée un groupe de formulaire pour une formation
   */
  createEducationGroup(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      institution: ['', Validators.required],
      city: [''],
      country: ['Maroc'],
      startYear: ['', [Validators.required, Validators.min(1970), Validators.max(this.currentYear)]],
      endYear: ['', [Validators.required, Validators.min(1970), Validators.max(this.currentYear + 10)]],
      grade: ['']
    });
  }

  /**
   * Crée un groupe de formulaire pour une expérience
   */
  createExperienceGroup(): FormGroup {
    return this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      industry: [''],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      isCurrent: [false]
    });
  }

  /**
   * Getters pour les FormArrays
   */
  get educationArray(): FormArray {
    return this.editEmployeeForm.get('education') as FormArray;
  }

  get experienceArray(): FormArray {
    return this.editEmployeeForm.get('experience') as FormArray;
  }

  /**
   * Ajouter une formation
   */
  addEducation(): void {
    this.educationArray.push(this.createEducationGroup());
  }

  /**
   * Supprimer une formation
   */
  removeEducation(index: number): void {
    if (this.educationArray.length > 1) {
      this.educationArray.removeAt(index);
    }
  }

  /**
   * Ajouter une expérience
   */
  addExperience(): void {
    this.experienceArray.push(this.createExperienceGroup());
  }

  /**
   * Supprimer une expérience
   */
  removeExperience(index: number): void {
    if (this.experienceArray.length > 1) {
      this.experienceArray.removeAt(index);
    }
  }

  /**
   * Navigation - Étape suivante (sans validation stricte)
   */
  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  /**
   * Navigation - Étape précédente
   */
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  /**
   * Navigation - Aller à une étape spécifique (navigation libre sans validation)
   */
  goToStep(step: number): void {
    // Navigation libre : on peut aller à n'importe quelle étape
    if (step >= 1 && step <= 4) {
      this.currentStep = step;
    }
  }

  /**
   * Valide l'étape actuelle
   */
  validateCurrentStep(): boolean {
    return this.validateStep(this.currentStep);
  }

  /**
   * Valide une étape spécifique
   */
  validateStep(step: number): boolean {
    switch (step) {
      case 1:
        // Valider les informations personnelles
        const personalFields = [
          'firstName', 'lastName', 'cin', 'birthDate', 
          'email', 'phone', 'department', 'position'
        ];
        return this.validateFields(personalFields);
      
      case 2:
        // Valider les informations bancaires
        const bankGroup = this.editEmployeeForm.get('bankInfo') as FormGroup;
        return bankGroup.valid;
      
      case 3:
        // Valider la formation (au moins une entrée valide)
        return this.educationArray.length > 0 && this.educationArray.valid;
      
      case 4:
        // Valider l'expérience (au moins une entrée valide)
        return this.experienceArray.length > 0 && this.experienceArray.valid;
      
      default:
        return true;
    }
  }

  /**
   * Valide une liste de champs
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
   * Vérifie si un champ est invalide et a été touché
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.editEmployeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Gestion de la sélection de fichier (photo de profil)
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Vérifier la taille (max 4MB)
      if (file.size > 4 * 1024 * 1024) {
        alert('La taille de l\'image ne doit pas dépasser 4 MB');
        return;
      }
      
      // Vérifier le type
      if (!file.type.match(/image\/(jpg|jpeg|png)/)) {
        alert('Seuls les fichiers JPG et PNG sont acceptés');
        return;
      }
      
      this.selectedFile = file;
      console.log('Fichier sélectionné:', file.name);
    }
  }

  /**
   * Réinitialiser le formulaire
   */
  resetForm(): void {
    this.currentStep = 1;
    this.selectedFile = null;
    this.editEmployeeForm.reset();
    
    // Réinitialiser les FormArrays avec une seule entrée
    while (this.educationArray.length > 1) {
      this.educationArray.removeAt(1);
    }
    while (this.experienceArray.length > 1) {
      this.experienceArray.removeAt(1);
    }
    
    // Recharger les données si elles existent
    if (this.employeeData) {
      this.patchFormWithEmployeeData(this.employeeData);
    }
  }

  /**
   * Annuler et fermer le modal
   */
  cancelAndClose(): void {
    this.onCancel.emit();
    this.resetForm();
    this.closeModal();
  }

  /**
   * Soumission du formulaire (validation complète)
   */
  onSubmit(): void {
    // Marquer tous les champs comme touchés pour afficher toutes les erreurs
    this.markFormGroupTouched(this.editEmployeeForm);
    
    if (this.editEmployeeForm.valid) {
      const formData = this.editEmployeeForm.value;
      
      // Préparer les données pour l'envoi
      const employeeData = {
        ...formData,
        profilePhoto: this.selectedFile,
        updatedAt: new Date().toISOString()
      };
      
      console.log('Données de l\'employé à enregistrer:', employeeData);
      
      // Ici, vous ajouteriez l'appel à votre service pour sauvegarder les données
      // this.employeeService.updateEmployee(employeeData).subscribe(
      //   response => {
      //     console.log('Employé mis à jour avec succès', response);
      //     // Fermer le modal et afficher un message de succès
      //     this.closeModal();
      //   },
      //   error => {
      //     console.error('Erreur lors de la mise à jour', error);
      //   }
      // );
      
      // Pour la démo, on affiche juste un message
      alert('Employé mis à jour avec succès!');
      this.onSave.emit(employeeData);
      this.closeModal();
      this.resetForm();
    } else {
      // Identifier quelle étape contient des erreurs
      const invalidStep = this.findFirstInvalidStep();
      if (invalidStep) {
        this.currentStep = invalidStep;
        alert(`Veuillez vérifier les champs obligatoires dans la section "${this.getStepName(invalidStep)}"`);
      }
    }
  }

  /**
   * Sauvegarde la section courante uniquement
   */
  saveCurrentSection(): void {
    // Marquer les champs de la section courante comme touchés
    this.markCurrentStepAsTouched();
    
    // Valider la section courante
    const isValid = this.validateStep(this.currentStep);
    
    if (isValid) {
      const sectionData = this.getCurrentSectionData();
      
      console.log(`Section ${this.currentStep} sauvegardée:`, sectionData);
      
      // Émettre l'événement avec les données de la section
      this.onSave.emit({
        section: this.currentStep,
        sectionName: this.getStepName(this.currentStep),
        data: sectionData,
        timestamp: new Date().toISOString()
      });
      
      // Afficher un message de succès
      this.showSuccessNotification(`Section "${this.getStepName(this.currentStep)}" enregistrée avec succès!`);
      
      // Optionnel : passer à la section suivante
      // if (this.currentStep < 4) {
      //   this.nextStep();
      // }
    } else {
      alert(`Veuillez remplir tous les champs obligatoires de la section "${this.getStepName(this.currentStep)}"`);
    }
  }

  /**
   * Marque tous les champs de la section courante comme touchés
   */
  private markCurrentStepAsTouched(): void {
    switch (this.currentStep) {
      case 1:
        // Informations personnelles
        ['firstName', 'lastName', 'cin', 'birthDate', 'email', 'phone', 'address', 'department', 'position']
          .forEach(field => this.editEmployeeForm.get(field)?.markAsTouched());
        break;
      
      case 2:
        // Informations bancaires
        const bankGroup = this.editEmployeeForm.get('bankInfo') as FormGroup;
        if (bankGroup) {
          Object.keys(bankGroup.controls).forEach(key => {
            bankGroup.get(key)?.markAsTouched();
          });
        }
        break;
      
      case 3:
        // Formation
        this.educationArray.controls.forEach((group: any) => {
          Object.keys(group.controls).forEach(key => {
            group.get(key)?.markAsTouched();
          });
        });
        break;
      
      case 4:
        // Expérience
        this.experienceArray.controls.forEach((group: any) => {
          Object.keys(group.controls).forEach(key => {
            group.get(key)?.markAsTouched();
          });
        });
        break;
    }
  }

  /**
   * Récupère les données de la section courante
   */
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
        return {
          bankInfo: this.editEmployeeForm.get('bankInfo')?.value
        };
      
      case 3:
        return {
          education: this.educationArray.value
        };
      
      case 4:
        return {
          experience: this.experienceArray.value
        };
      
      default:
        return {};
    }
  }

  /**
   * Affiche une notification de succès
   */
  private showSuccessNotification(message: string): void {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
      <i class="ti ti-check-circle me-2"></i>${message}
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  /**
   * Trouve la première étape qui contient des erreurs
   */
  private findFirstInvalidStep(): number | null {
    for (let i = 1; i <= 4; i++) {
      if (!this.validateStep(i)) {
        return i;
      }
    }
    return null;
  }

  /**
   * Retourne le nom d'une étape
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
   * Ferme le modal
   */
  private closeModal(): void {
    const modalElement = document.getElementById('edit_employee_multistep');
    if (modalElement) {
      const modalBackdrop = document.querySelector('.modal-backdrop');
      modalElement.classList.remove('show');
      document.body.classList.remove('modal-open');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }

  /**
   * Marque tous les champs d'un FormGroup comme touchés
   */
  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  /**
   * Charge les données d'un employé existant (pour l'édition)
   */
  loadEmployeeData(employeeId: string): void {
    // EXEMPLE DE DONNÉES - Remplacer par votre appel API
    // this.employeeService.getEmployee(employeeId).subscribe(
    //   employee => {
    //     this.patchFormWithEmployeeData(employee);
    //   }
    // );
    
    // Pour la démo, on charge des données d'exemple
    const mockEmployee = {
      firstName: 'Ahmed',
      lastName: 'Bennani',
      cin: 'AB123456',
      birthDate: new Date('1990-05-15'),
      email: 'ahmed.bennani@entreprise.ma',
      phone: '0612345678',
      address: '123 Avenue Hassan II, Quartier Maarif, Casablanca',
      department: 'it',
      position: 'developer',
      bankInfo: {
        bankName: 'attijariwafa',
        rib: '123456789012345678901234',
        iban: 'MA64011519000001205000534921',
        branch: 'Agence Maarif',
        branchCode: '0115',
        branchCity: 'Casablanca'
      },
      education: [
        {
          degree: 'ingenieur',
          fieldOfStudy: 'Informatique',
          institution: 'École Nationale Supérieure d\'Informatique et d\'Analyse des Systèmes (ENSIAS)',
          city: 'Rabat',
          country: 'Maroc',
          startYear: 2010,
          endYear: 2015,
          grade: 'tres_bien'
        }
      ],
      experience: [
        {
          jobTitle: 'Développeur Full Stack',
          company: 'TechCorp Maroc',
          industry: 'it',
          location: 'Casablanca',
          startDate: new Date('2015-09-01'),
          endDate: null,
          isCurrent: true,
          description: 'Développement d\'applications web avec Angular et Node.js',
          contractType: 'cdi'
        }
      ]
    };
    
    this.patchFormWithEmployeeData(mockEmployee);
  }

  /**
   * Remplit le formulaire avec les données d'un employé
   */
  private patchFormWithEmployeeData(employee: any): void {
    if (!employee) {
      console.warn('Aucune donnée d\'employé fournie');
      return;
    }

    console.log('Chargement des données de l\'employé:', employee);

    // Informations personnelles
    this.editEmployeeForm.patchValue({
      firstName: employee.firstName || employee.Name?.split(' ')[0] || '',
      lastName: employee.lastName || employee.Name?.split(' ').slice(1).join(' ') || '',
      cin: employee.cin || employee.CIN || '',
      birthDate: employee.birthDate || employee.BirthDate || '',
      email: employee.email || employee.Email || '',
      phone: employee.phone || employee.Phone || '',
      address: employee.address || employee.Address || '',
      department: employee.department || employee.Department || employee.Designation || '',
      position: employee.position || employee.Position || employee.CurrentRole || ''
    });

    // Informations bancaires
    if (employee.bankInfo) {
      this.editEmployeeForm.get('bankInfo')?.patchValue({
        bankName: employee.bankInfo.bankName || '',
        rib: employee.bankInfo.rib || '',
        iban: employee.bankInfo.iban || '',
        branch: employee.bankInfo.branch || '',
        branchCode: employee.bankInfo.branchCode || '',
        branchCity: employee.bankInfo.branchCity || ''
      });
    }

    // Formation
    if (employee.education && employee.education.length > 0) {
      // Vider le tableau existant
      while (this.educationArray.length > 0) {
        this.educationArray.removeAt(0);
      }
      
      // Ajouter les formations
      employee.education.forEach((edu: any) => {
        const eduGroup = this.createEducationGroup();
        eduGroup.patchValue({
          degree: edu.degree || '',
          fieldOfStudy: edu.fieldOfStudy || '',
          institution: edu.institution || '',
          city: edu.city || '',
          country: edu.country || 'Maroc',
          startYear: edu.startYear || '',
          endYear: edu.endYear || '',
          grade: edu.grade || ''
        });
        this.educationArray.push(eduGroup);
      });
    }

    // Expérience
    if (employee.experience && employee.experience.length > 0) {
      // Vider le tableau existant
      while (this.experienceArray.length > 0) {
        this.experienceArray.removeAt(0);
      }
      
      // Ajouter les expériences
      employee.experience.forEach((exp: any) => {
        const expGroup = this.createExperienceGroup();
        expGroup.patchValue({
          jobTitle: exp.jobTitle || '',
          company: exp.company || '',
          industry: exp.industry || '',
          location: exp.location || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          isCurrent: exp.isCurrent || false
        });
        this.experienceArray.push(expGroup);
      });
    }

    console.log('Formulaire après chargement:', this.editEmployeeForm.value);
  }
}