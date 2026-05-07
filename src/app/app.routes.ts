import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { emailVerificationGuard } from './core/guards/email-verification.guard';
import { resetPasswordGuard } from './core/guards/reset-password.guard';
import { roleGuard } from './core/guards/role-guard.guard';
import { defaultRedirectGuard } from './core/guards/default-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard, defaultRedirectGuard],
    children: [],
  },

  //* Auth
  {
    path: '',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        canActivate: [NoAuthGuard],
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
        data: { title: 'Connexion' },
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./auth/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent,
          ),
        data: { title: 'Mot de passe oublié' },
      },
      {
        path: 'email-verification',
        canActivate: [emailVerificationGuard],
        loadComponent: () =>
          import('./auth/email-verification/email-verification.component').then(
            (m) => m.EmailVerificationComponent,
          ),
        data: { title: "Vérification de l'adresse email" },
      },
      {
        path: 'reset-password',
        canActivate: [resetPasswordGuard],
        loadComponent: () =>
          import('./auth/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent,
          ),
        data: { title: 'Réinitialisation du mot de passe' },
      },
      {
        path: 'success',
        loadComponent: () =>
          import('./auth/success/success.component').then(
            (m) => m.SuccessComponent,
          ),
        data: { title: 'Succès' },
      },
      {
        path: 'lock-screen',
        loadComponent: () =>
          import('./auth/lock-screen/lock-screen.component').then(
            (m) => m.LockScreenComponent,
          ),
        data: { title: 'Écran verrouillé' },
      },
    ],
  },

  //* Features
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/features.component').then((m) => m.FeaturesComponent),
    children: [
      //* Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        data: { breadcrumb: 'Dashboard', title: 'Dashboard' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'admin' },
          {
            path: 'admin',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/dashboard/admin/pages/admin-dashboard/admin-dashboard.component').then(
                (m) => m.AdminDashboardComponent,
              ),
            data: {
              breadcrumb: 'Dashboard administrateur',
              title: 'Dashboard administrateur',
              roles: ['CEO', 'HR', 'MANAGER'],
            },
          },
          {
            path: 'employee',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/dashboard/employee/pages/employee-dashboard/employee-dashboard.component').then(
                (m) => m.EmployeeDashboardComponent,
              ),
            data: {
              breadcrumb: 'Dashboard employé',
              title: 'Dashboard employé',
              roles: ['EMPLOYEE'],
            },
          },
        ],
      },

      //* Internal communication
      {
        path: 'intranet',
        loadComponent: () =>
          import('./features/application/application.component').then(
            (m) => m.ApplicationComponent,
          ),
        data: { breadcrumb: 'Intranet', title: 'Intranet' },
        children: [
          {
            path: 'chats',
            loadComponent: () =>
              import('./features/application/chat/chat.component').then(
                (m) => m.ChatComponent,
              ),
            data: { breadcrumb: 'Messagerie', title: 'Messagerie' },
          },
          {
            path: 'groups',
            loadComponent: () =>
              import('./features/application/chat/groups/groups/groups.component').then(
                (m) => m.GroupsComponent,
              ),
            data: { breadcrumb: 'Groupes', title: 'Groupes' },
          },
          {
            path: 'calendar',
            loadComponent: () =>
              import('./features/application/calendar/calendar.component').then(
                (m) => m.CalendarComponent,
              ),
            data: { breadcrumb: 'Calendrier', title: 'Calendrier' },
          },
          {
            path: 'annonces',
            loadComponent: () =>
              import('./features/application/social-feed/social-feed.component').then(
                (m) => m.SocialFeedComponent,
              ),
            data: { breadcrumb: 'Annonces', title: 'Annonces' },
          },
          {
            path: 'annonces/edit/:id',
            loadComponent: () =>
              import('./features/application/social-feed/admin/annonce/edit-annonce/edit-annonce.component').then(
                (m) => m.EditAnnonceComponent,
              ),
            data: {
              breadcrumb: 'Modifier une annonce',
              title: 'Modifier une annonce',
            },
          },
          {
            path: 'sondages',
            loadComponent: () =>
              import('./features/application/social-feed/admin/sondage/sondage.component').then(
                (m) => m.SondageComponent,
              ),
            data: { breadcrumb: 'Sondages', title: 'Sondages' },
          },
          {
            path: 'sondage-details/:id',
            loadComponent: () =>
              import('./features/application/social-feed/admin/sondage/sondage-details/sondage-details.component').then(
                (m) => m.SondageDetailsComponent,
              ),
            data: {
              breadcrumb: 'Détails du sondage',
              title: 'Détails du sondage',
            },
          },
        ],
      },
      {
        path: 'tickets',
        loadComponent: () =>
          import('./features/application/tickets/tickets.component').then(
            (m) => m.TicketsComponent,
          ),
        data: { breadcrumb: 'Tickets', title: 'Tickets' },
        children: [
          {
            path: 'ticket-list',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/application/tickets/ticket/ticket.component').then(
                (m) => m.TicketComponent,
              ),
            data: {
              breadcrumb: 'Liste des tickets',
              title: 'Liste des tickets',
              roles: ['CEO', 'HR'],
            },
          },
          {
            path: 'ticket-details',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/application/tickets/ticket-details/ticket-details.component').then(
                (m) => m.TicketDetailsComponent,
              ),
            data: { title: 'Détails du ticket', roles: ['CEO', 'HR'] },
          },
          {
            path: 'mes-tickets',
            loadComponent: () =>
              import('./features/application/tickets/employe/tickets/tickets.component').then(
                (m) => m.TicketsComponent,
              ),
            data: { breadcrumb: 'Mes tickets', title: 'Mes tickets' },
          },
        ],
      },

      //* Employees
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/hrm/employees/employees.component').then(
            (m) => m.EmployeesComponent,
          ),
        data: { breadcrumb: 'Employés', title: 'Employés' },
        children: [
          {
            path: 'employee-list',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/hrm/employees/employees-list/employee-list/employee-list.component').then(
                (m) => m.EmployeeListComponent,
              ),
            data: {
              breadcrumb: 'Liste des employés',
              title: 'Liste des employés',
              roles: ['CEO', 'HR', 'MANAGER'],
            },
          },
          {
            path: 'employee-details/:id',
            loadComponent: () =>
              import('./features/hrm/employees/profilemployee/employee-details/employee-details.component').then(
                (m) => m.EmployeeDetailsComponent,
              ),
            data: { title: "Détails d'employé" },
          },
          {
            path: 'departments',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/hrm/departments/departments.component').then(
                (m) => m.DepartmentsComponent,
              ),
            data: {
              breadcrumb: 'Départements',
              title: 'Départements',
              roles: ['CEO', 'HR'],
            },
          },
          {
            path: 'posts',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/hrm/post/post.component').then(
                (m) => m.PostComponent,
              ),
            data: {
              breadcrumb: 'Postes',
              title: 'Postes',
              roles: ['CEO', 'HR'],
            },
          },
          {
            path: 'generate/contract',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/hrm/contract/contract.component').then(
                (m) => m.ContractComponent,
              ),
            data: {
              breadcrumb: 'Générer un contrat',
              title: 'Générer un contrat',
              roles: ['CEO', 'HR'],
            },
          },
          {
            path: 'documents',
            loadComponent: () =>
              import('./features/hrm/documents/documents.component').then(
                (m) => m.DocumentsComponent,
              ),
            data: {
              breadcrumb: 'Documents administratifs',
              title: 'Documents administratifs',
            },
          },
          {
            path: 'holidays',
            loadComponent: () =>
              import('./features/hrm/holidays/holidays.component').then(
                (m) => m.HolidaysComponent,
              ),
            data: { breadcrumb: 'Jours fériés', title: 'Jours fériés' },
          },
        ],
      },

      //* Internal HR
      {
        path: 'attendance',
        loadComponent: () =>
          import('./features/hrm/attendance/attendance.component').then(
            (m) => m.AttendanceComponent,
          ),
        data: { breadcrumb: 'Présence/Absence', title: 'Présence/Absence' },
        children: [
          {
            path: 'attendance-admin',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/hrm/attendance/attendance-admin/attendance-admin.component').then(
                (m) => m.AttendanceAdminComponent,
              ),
            data: {
              breadcrumb: 'Liste présence/absence',
              title: 'Liste présence/absence',
              roles: ['CEO', 'HR', 'MANAGER'],
            },
          },
          {
            path: 'attendance-employee',
            loadComponent: () =>
              import('./features/hrm/attendance/attendance-employee/attendance-employee.component').then(
                (m) => m.AttendanceEmployeeComponent,
              ),
            data: {
              breadcrumb: 'Mes présences/absences',
              title: 'Mes présences/absences',
            },
          },
        ],
      },
      {
        path: 'leaves',
        loadComponent: () =>
          import('./features/hrm/leaves/leaves.component').then(
            (m) => m.LeavesComponent,
          ),
        data: { breadcrumb: 'Congés', title: 'Congés' },
        children: [
          {
            path: 'leave-employee',
            loadComponent: () =>
              import('./features/hrm/leaves/leave-employee/leave-employee.component').then(
                (m) => m.LeaveEmployeeComponent,
              ),
            data: { breadcrumb: 'Mes congés', title: 'Mes congés' },
          },
        ],
      },
      {
        path: 'promotion',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/hrm/promotion/promotion.component').then(
            (m) => m.PromotionsComponent,
          ),
        data: {
          breadcrumb: 'Promotion',
          title: 'Promotion',
          roles: ['CEO', 'HR'],
        },
      },
      {
        path: 'resignation',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/hrm/resignation/resignation.component').then(
            (m) => m.ResignationComponent,
          ),
        data: {
          breadcrumb: 'Démission',
          title: 'Démission',
          roles: ['CEO', 'HR'],
        },
      },
      {
        path: 'payroll',
        loadComponent: () =>
          import('./features/hrm/payroll/payroll.component').then(
            (m) => m.PayrollComponent,
          ),
        data: { breadcrumb: 'Fiches de paie', title: 'Fiches de paie' },
        children: [
          {
            path: 'mes-fiches',
            loadComponent: () =>
              import('./features/hrm/payroll/components/employee-payroll/employee-payroll.component').then(
                (m) => m.EmployeePayrollComponent,
              ),
            data: {
              breadcrumb: 'Mes fiches de paie',
              title: 'Mes fiches de paie',
            },
          },
          {
            path: 'gestion-fiches',
            canActivate: [roleGuard],
            loadComponent: () =>
              import('./features/hrm/payroll/components/rh-payroll/rh-payroll.component').then(
                (m) => m.RhPayrollComponent,
              ),
            data: {
              breadcrumb: 'Gestion des fiches de paie',
              title: 'Gestion des fiches de paie',
              roles: ['CEO', 'HR'],
            },
          },
        ],
      },
      {
        path: 'validation',
        canActivate: [roleGuard],
        data: {
          breadcrumb: 'Validation',
          title: 'Validation',
          roles: ['CEO', 'HR'],
        },
        children: [
          {
            path: 'justify-validation',
            loadComponent: () =>
              import('./features/hrm/validation/validate-justification/validate-justification.component').then(
                (m) => m.ValidateJustificationComponent,
              ),
            data: {
              breadcrumb: 'Justificatifs',
              title: 'Justificatifs',
            },
          },
          {
            path: 'validate-leave',
            loadComponent: () =>
              import('./features/hrm/validation/validate-leave/validate-leave.component').then(
                (m) => m.ValidateLeaveComponent,
              ),
            data: {
              breadcrumb: 'Congés',
              title: 'Congés',
            },
          },
          {
            path: 'validate-personal-information',
            loadComponent: () =>
              import('./features/hrm/validation/validate-personal-information/validate-personal-information.component').then(
                (m) => m.ValidatePersonalInformationComponent,
              ),
            data: {
              breadcrumb: 'Informations personnelles',
              title: 'Informations personnelles',
            },
          },
          {
            path: 'validate-documents',
            loadComponent: () =>
              import('./features/hrm/validation/validate-administrativ-documents/validate-administrativ-documents.component').then(
                (m) => m.ValidateAdministrativDocumentsComponent,
              ),
            data: {
              breadcrumb: 'Documents administratifs',
              title: 'Documents administratifs',
            },
          },
        ],
      },

      //* External RH
      {
        path: 'candidates',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/rhextern/candidates/components/candidates-list/candidates-list.component').then(
            (m) => m.CandidatesListComponent,
          ),
        data: {
          breadcrumb: 'Candidats',
          title: 'Liste des candidats',
          roles: ['CEO', 'HR'],
        },
      },
      {
        path: 'jobs-list',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/rhextern/jobs/components/jobs-list/jobs-list.component').then(
            (m) => m.JobsListComponent,
          ),
        data: {
          breadcrumb: "Offres d'emploi",
          title: "Offres d'emploi",
          roles: ['CEO', 'HR'],
        },
      },
      {
        path: 'filtrage',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/rhextern/filtering/pages/filtering-page/filtering-page.component').then(
            (m) => m.FilteringPageComponent,
          ),
        data: {
          breadcrumb: 'Filtrage',
          title: 'Filtrage',
          roles: ['CEO', 'HR'],
        },
      },
      {
        path: 'entretiens',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/rhextern/interviews/pages/interviews-planning/interviews-planning.component').then(
            (m) => m.InterviewsPlanningComponent,
          ),
        data: {
          breadcrumb: 'Planification des entretiens',
          title: 'Planification des Entretiens',
          roles: ['CEO', 'HR'],
        },
      },

      //* Administration
      {
        path: 'reports',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/administration/reports/reports.component').then(
            (m) => m.ReportsComponent,
          ),
        data: { breadcrumb: 'Rapports', title: 'Rapports', roles: ['CEO'] },
        children: [
          {
            path: 'attendance-report',
            loadComponent: () =>
              import('./features/administration/reports/attendance-report/attendance-report.component').then(
                (m) => m.AttendanceReportComponent,
              ),
            data: {
              breadcrumb: 'Rapport présences/absences',
              title: 'Rapport présences/absences',
            },
          },
          {
            path: 'daily-report',
            loadComponent: () =>
              import('./features/administration/reports/daily-report/daily-report.component').then(
                (m) => m.DailyReportComponent,
              ),
            data: {
              breadcrumb: 'Rapport quotidien',
              title: 'Rapport quotidien',
            },
          },
          {
            path: 'employee-report',
            loadComponent: () =>
              import('./features/administration/reports/employee-report/employee-report.component').then(
                (m) => m.EmployeeReportComponent,
              ),
            data: {
              breadcrumb: 'Rapport des employés',
              title: 'Rapport des employés',
            },
          },
          {
            path: 'leave-report',
            loadComponent: () =>
              import('./features/administration/reports/leave-report/leave-report.component').then(
                (m) => m.LeaveReportComponent,
              ),
            data: {
              breadcrumb: 'Rapport des congés',
              title: 'Rapport des congés',
            },
          },
          {
            path: 'payslip-report',
            loadComponent: () =>
              import('./features/administration/reports/payslip-report/payslip-report.component').then(
                (m) => m.PayslipReportComponent,
              ),
            data: {
              breadcrumb: 'Rapport des fiches de paie',
              title: 'Rapport des fiches de paie',
            },
          },
        ],
      },
      {
        path: 'audits',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/administration/audits/audits.component').then(
            (m) => m.AuditsComponent,
          ),
        data: {
          breadcrumb: 'Journal des événements',
          title: 'Journal des événements',
          roles: ['CEO'],
        },
      },

      //* Settings
      {
        path: 'settings',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./features/settings/settings.component').then(
            (m) => m.SettingsComponent,
          ),
        data: {
          breadcrumb: 'Paramètres',
          title: 'Paramètres',
          roles: ['CEO', 'HR'],
        },
        children: [
          {
            path: 'app-settings',
            loadComponent: () =>
              import('./features/settings/app-settings/app-settings.component').then(
                (m) => m.AppSettingsComponent,
              ),
            data: {
              breadcrumb: "Paramètres d'application",
              title: "Paramètres d'application",
            },
            children: [
              {
                path: 'leave-settings',
                loadComponent: () =>
                  import('./features/settings/app-settings/leave-settings/leave-settings.component').then(
                    (m) => m.LeaveSettingsComponent,
                  ),
                data: {
                  breadcrumb: 'Paramétrage des congés',
                  title: 'Paramétrage des congés',
                },
              },
              {
                path: 'attendance-settings',
                loadComponent: () =>
                  import('./features/settings/app-settings/attendance-settings/attendance-settings.component').then(
                    (m) => m.AttendanceSettingsComponent,
                  ),
                data: {
                  breadcrumb: 'Paramétrage présence et absence',
                  title: 'Paramétrage présence et absence',
                },
              },
              {
                path: 'documents-template-settings',
                loadComponent: () =>
                  import('./features/settings/app-settings/documents-template-settings/documents-template-settings.component').then(
                    (m) => m.DocumentsTemplateSettingsComponent,
                  ),
                data: {
                  breadcrumb: 'Paramétrage modèles documents',
                  title: 'Paramétrage modèles documents',
                },
              },
              {
                path: 'recruitment-settings',
                loadComponent: () =>
                  import('./features/settings/app-settings/recruitment-settings/recruitment-settings.component').then(
                    (m) => m.RecruitmentSettingsComponent,
                  ),
                data: {
                  breadcrumb: 'Paramétrage recrutement',
                  title: 'Paramétrage recrutement',
                },
              },
            ],
          },
        ],
      },

      //* Onboarding
      {
        path: 'onboarding',
        loadComponent: () =>
          import('./onboarding/onboarding.component').then(
            (m) => m.OnboardingComponent,
          ),
        data: { title: 'Onboarding' },
      },
    ],
  },

  //* Pages
  {
    path: 'under-maintenance',
    loadComponent: () =>
      import('./features/pages/under-maintenance/under-maintenance.component').then(
        (m) => m.UnderMaintenanceComponent,
      ),
    data: { title: 'Maintenance en cours' },
  },
  {
    path: 'under-construction',
    loadComponent: () =>
      import('./features/pages/under-construction/under-construction.component').then(
        (m) => m.UnderConstructionComponent,
      ),
    data: { title: 'Page en construction' },
  },
  {
    path: 'error-404',
    loadComponent: () =>
      import('./features/pages/error-404/error-404.component').then(
        (m) => m.Error404Component,
      ),
    data: { title: 'Page non trouvée' },
  },
  {
    path: 'error-500',
    loadComponent: () =>
      import('./features/pages/error-500/error-500.component').then(
        (m) => m.Error500Component,
      ),
    data: { title: 'Erreur serveur' },
  },

  //* Fallback
  { path: '**', redirectTo: '/error-404', pathMatch: 'full' },
] as const;
