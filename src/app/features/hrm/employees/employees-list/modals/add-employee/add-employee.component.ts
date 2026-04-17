import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Department } from '../../../../../../shared/models/models';
import { Post } from '../../../../models/post/post.model';
import { Role } from '../../../../models/role.enum';
import { UserService } from '../../../../services/user/user.service';
import { ToastService } from '../../../../../../shared/services/toast.service';
import { FormValidationService } from '../../../../../../core/services/form-validation.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BsDatepickerModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  form!: FormGroup;

  roles = Object.values(Role);
  departments: Department[] = [];
  posts: Post[] = [];

  selectedFileName: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userApi: UserService,
    private toastService: ToastService,
    public validationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepartments();
    this.loadPosts();
  }

  // ================= FORM INIT =================

  initForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      role: ['', [Validators.required, Validators.maxLength(30)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$'
          ),
          Validators.maxLength(50),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^(\\+212|0)[5-7][0-9]{8}$')],
      ],
      CIN: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z]{1,2}[0-9]{4,8}$')],
      ],
      departmentId: [null, Validators.required],
      postId: [null, Validators.required],
      picturePath: ['', Validators.maxLength(500)],
    });
  }

  // ================= FILE =================

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      this.toastService.warning("L'image doit être inférieure à 4 Mo.");
      return;
    }

    this.selectedFileName = file.name;
    this.form.patchValue({ picturePath: file.name });
  }

  // ================= LOAD DATA =================

  loadDepartments() {
    this.userApi.getDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  loadPosts() {
    this.userApi.getPosts().subscribe((res) => {
      this.posts = res;
    });
  }

  // ================= SUBMIT =================

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.warning('Veuillez corriger les erreurs du formulaire.');
      return;
    }

    this.isSubmitting = true;

    this.userApi.createUser(this.form.value).subscribe({
      next: () => {
        this.toastService.success('Employé créé avec succès.');

        this.form.reset();
        this.selectedFileName = null;
        this.isSubmitting = false;
      },

      error: (err) => {
        this.isSubmitting = false;

        const status = err.status;
        const errorCode = err.error?.errorCode;

        // ================= AUTH =================

        if (status === 401) {
          this.toastService.error(
            'Session expirée. Veuillez vous reconnecter.'
          );
          return;
        }

        if (status === 403) {
          this.toastService.warning(' Accès refusé ');
          return;
        }

        // ================= USER ERRORS =================

        if (status === 409) {
          switch (errorCode) {
            case 'EMAIL_DUPLICATED':
              this.toastService.error('Un compte avec cet email existe déjà.');
              return;

            case 'CIN_DUPLICATED':
              this.toastService.error('Ce CIN est déjà utilisé.');
              return;

            case 'USER_OPERATION_FAILED':
              this.toastService.error('Opération utilisateur impossible.');
              return;

            default:
              this.toastService.error('Conflit détecté lors de la création.');
              return;
          }
        }

        if (status === 404) {
          switch (errorCode) {
            case 'DEPARTMENT_NOT_FOUND':
              this.toastService.error('Département introuvable.');
              return;

            case 'POST_NOT_FOUND':
              this.toastService.error('Poste introuvable.');
              return;

            default:
              this.toastService.error('Ressource introuvable.');
              return;
          }
        }

        if (status === 422) {
          this.toastService.warning('Certaines données sont invalides.');
          return;
        }

        // ================= FALLBACK =================

        this.toastService.error('Une erreur inattendue est survenue.');
      },
    });
  }
}
