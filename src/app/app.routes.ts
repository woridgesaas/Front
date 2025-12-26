import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/index',
    pathMatch: 'full',
  },

  //* Auth routes
  {
    path: '',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
        data: { title: 'Connexion' },
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./auth/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
          ),
        data: { title: 'Mot de passe oublié' },
      },
      {
        path: 'email-verification',
        loadComponent: () =>
          import('./auth/email-verification/email-verification.component').then(
            (m) => m.EmailVerificationComponent
          ),
        data: { title: "Vérification de l'adresse email" },
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./auth/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
        data: { title: 'Réinitialisation du mot de passe' },
      },
      {
        path: 'success',
        loadComponent: () =>
          import('./auth/success/success.component').then(
            (m) => m.SuccessComponent
          ),
        data: { title: 'Succès' },
      },
      {
        path: 'lock-screen',
        loadComponent: () =>
          import('./auth/lock-screen/lock-screen.component').then(
            (m) => m.LockScreenComponent
          ),
        data: { title: 'Écran verrouillé' },
      },
      {
        path: 'error-404',
        loadComponent: () =>
          import('./auth/error-404/error-404.component').then(
            (m) => m.Error404Component
          ),
        data: { title: 'Page non trouvée' },
      },
      {
        path: 'error-500',
        loadComponent: () =>
          import('./auth/error-500/error-500.component').then(
            (m) => m.Error500Component
          ),
        data: { title: 'Erreur serveur' },
      },
    ],
  },

  //* Features routes
  {
    path: '',
    loadComponent: () =>
      import('./features/features.component').then((m) => m.FeaturesComponent),
    children: [
      //* Dashboard routes
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: { title: 'Tableau de bord' },
        children: [
          {
            path: 'index',
            loadComponent: () =>
              import(
                './features/dashboard/admin-dashboard/admin-dashboard.component'
              ).then((m) => m.AdminDashboardComponent),
            data: { title: 'Tableau de bord administrateur' },
          },
          {
            path: 'employee',
            loadComponent: () =>
              import(
                './features/dashboard/employee-dashboard/employee-dashboard.component'
              ).then((m) => m.EmployeeDashboardComponent),
            data: { title: 'Tableau de bord employé' },
          },
        ],
      },

      //* Intranet routes
      {
        path: 'intranet',
        loadComponent: () =>
          import('./features/application/application.component').then(
            (m) => m.ApplicationComponent
          ),
        data: { title: 'Intranet' },
        children: [
          {
            path: 'chats',
            loadComponent: () =>
              import('./features/application/chat/chat.component').then(
                (m) => m.ChatComponent
              ),
            data: { title: 'Messagerie' },
          },
          {
            path: 'groups',
            loadComponent: () =>
              import(
                './features/application/chat/groups/groups/groups.component'
              ).then((m) => m.GroupsComponent),
            data: { title: 'Groupes' },
          },
          {
            path: 'calendar',
            loadComponent: () =>
              import('./features/application/calendar/calendar.component').then(
                (m) => m.CalendarComponent
              ),
            data: { title: 'Calendrier' },
          },
          {
            path: 'annonces',
            loadComponent: () =>
              import(
                './features/application/social-feed/social-feed.component'
              ).then((m) => m.SocialFeedComponent),
            data: { title: 'Annonces' },
          },
          {
            path: 'annonces/edit/:id',
            loadComponent: () =>
              import(
                './features/application/social-feed/admin/annonce/edit-annonce/edit-annonce.component'
              ).then((m) => m.EditAnnonceComponent),
            data: { title: 'Modifier une annonce' },
          },
          {
            path: 'sondages',
            loadComponent: () =>
              import(
                './features/application/social-feed/admin/sondage/sondage.component'
              ).then((m) => m.SondageComponent),
            data: { title: 'Sondages' },
          },
          {
            path: 'sondage-details/:id',
            loadComponent: () =>
              import(
                './features/application/social-feed/admin/sondage/sondage-details/sondage-details.component'
              ).then((m) => m.SondageDetailsComponent),
            data: { title: 'Détails du sondage' },
          },
        ],
      },

      //* Settings routes
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        data: { breadcrumb: 'Paramètres', title: 'Paramètres' },
        children: [
          {
            path: 'change-password',
            loadComponent: () =>
              import(
                './features/settings/change-password/change-password.component'
              ).then((m) => m.ChangePasswordComponent),
            data: {
              breadcrumb: 'Changer mot de passe',
              title: 'Changer le mot de passe',
            },
          },
          {
            path: 'app-settings',
            loadComponent: () =>
              import(
                './features/settings/app-settings/app-settings.component'
              ).then((m) => m.AppSettingsComponent),
            data: {
              breadcrumb: "Paramètres d'application",
              title: "Paramètres d'application",
            },
            children: [
              {
                path: 'leave-settings',
                loadComponent: () =>
                  import(
                    './features/settings/app-settings/leave-settings/leave-settings.component'
                  ).then((m) => m.LeaveSettingsComponent),
                data: {
                  breadcrumb: 'Paramétrage des congés',
                  title: 'Paramétrage des congés',
                },
              },
              {
                path: 'presence-absence-settings',
                loadComponent: () =>
                  import(
                    './features/settings/app-settings/presence-absence-settings/presence-absence-settings.component'
                  ).then((m) => m.PresenceAbsenceSettingsComponent),
                data: {
                  breadcrumb: 'Paramétrage de présence et absence',
                  title: 'Présence et absence',
                },
              },
              {
                path: 'documents-template-settings',
                loadComponent: () =>
                  import(
                    './features/settings/app-settings/documents-template-settings/documents-template-settings.component'
                  ).then((m) => m.DocumentsTemplateSettingsComponent),
                data: {
                  breadcrumb:
                    'Paramètrage des modèles de documents administratifs',
                  title: 'Modèles de documents administratifs',
                },
              },
              {
                path: 'recruitment-settings',
                loadComponent: () =>
                  import(
                    './features/settings/app-settings/recruitment-settings/recruitment-settings.component'
                  ).then((m) => m.RecruitmentSettingsComponent),
                data: {
                  breadcrumb: 'Paramétrage de recrutement',
                  title: 'Paramétrage du recrutement',
                },
              },
            ],
          },
        ],
      },

      //* Employees routes
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/hrm/employees/employees.component').then(
            (m) => m.EmployeesComponent
          ),
        data: { title: 'Employés' },
        children: [
          {
            path: 'employee-list',
            loadComponent: () =>
              import(
                './features/hrm/employees/employee-list/employee-list.component'
              ).then((m) => m.EmployeeListComponent),
            data: { title: 'Liste des employés' },
          },
          {
            path: 'employee-details',
            loadComponent: () =>
              import(
                './features/hrm/employees/employee-details/employee-details.component'
              ).then((m) => m.EmployeeDetailsComponent),
            data: { title: "Détails d'employé" },
          },
          {
            path: 'departments',
            loadComponent: () =>
              import(
                './features/hrm/employees/departments/departments.component'
              ).then((m) => m.DepartmentsComponent),
            data: { title: 'Départements' },
          },
          {
            path: 'geenrate/contract',
            loadComponent: () =>
              import('./features/hrm/contract/contract.component').then(
                (m) => m.ContractComponent
              ),
            data: { title: 'Générer un contrat' },
          },
          {
            path: 'documents',
            loadComponent: () =>
              import('./features/hrm/documents/documents.component').then(
                (m) => m.DocumentsComponent
              ),
            data: { title: 'Documents' },
          },
        ],
      },

      //* Tickets routes
      {
        path: 'tickets',
        loadComponent: () =>
          import('./features/hrm/tickets/tickets.component').then(
            (m) => m.TicketsComponent
          ),
        data: { title: 'Tickets' },
        children: [
          {
            path: 'ticket-list',
            loadComponent: () =>
              import('./features/hrm/tickets/ticket/ticket.component').then(
                (m) => m.TicketComponent
              ),
            data: { title: 'Liste des tickets' },
          },
          {
            path: 'ticket-details',
            loadComponent: () =>
              import(
                './features/hrm/tickets/ticket-details/ticket-details.component'
              ).then((m) => m.TicketDetailsComponent),
            data: { title: 'Détails du ticket' },
          },
          {
            path: 'mes-tickets',
            loadComponent: () =>
              import(
                './features/hrm/tickets/employe/tickets/tickets.component'
              ).then((m) => m.TicketsComponent),
            data: { title: 'Mes tickets' },
          },
        ],
      },

      //* Holidays routes
      {
        path: 'holidays',
        loadComponent: () =>
          import('./features/hrm/holidays/holidays.component').then(
            (m) => m.HolidaysComponent
          ),
        data: { title: 'Jours fériés' },
        children: [
          {
            path: 'religious-holidays',
            loadComponent: () =>
              import(
                './features/hrm/holidays/religious-holidays/religious-holidays.component'
              ).then((m) => m.ReligiousHolidaysComponent),
            data: { title: 'Fêtes religieuses' },
          },
          {
            path: 'national-holidays',
            loadComponent: () =>
              import(
                './features/hrm/holidays/national-holidays/national-holidays.component'
              ).then((m) => m.NationalHolidaysComponent),
            data: { title: 'Jours fériés nationaux' },
          },
        ],
      },

      //* Attendance routes
      {
        path: 'attendance',
        loadComponent: () =>
          import('./features/hrm/attendance/attendance.component').then(
            (m) => m.AttendanceComponent
          ),
        data: { title: 'Présence' },
        children: [
          {
            path: 'attendance-admin',
            loadComponent: () =>
              import(
                './features/hrm/attendance/attendance-admin/attendance-admin.component'
              ).then((m) => m.AttendanceAdminComponent),
            data: { title: 'Présence (Admin)' },
          },
          {
            path: 'attendance-employee',
            loadComponent: () =>
              import(
                './features/hrm/attendance/attendance-employee/attendance-employee.component'
              ).then((m) => m.AttendanceEmployeeComponent),
            data: { title: 'Présence (Employé)' },
          },
          {
            path: 'leaves',
            loadComponent: () =>
              import('./features/hrm/attendance/leaves/leaves.component').then(
                (m) => m.LeavesComponent
              ),
            data: { title: 'Congés' },
            children: [
              {
                path: 'leave-employee',
                loadComponent: () =>
                  import(
                    './features/hrm/attendance/leaves/leave-employee/leave-employee.component'
                  ).then((m) => m.LeaveEmployeeComponent),
                data: { title: 'Congés des employés' },
              },
            ],
          },
        ],
      },

      //* Promotion route
      {
        path: 'promotion',
        loadComponent: () =>
          import('./features/hrm/promotion/promotion.component').then(
            (m) => m.PromotionComponent
          ),
        data: { title: 'Promotion' },
      },

      //* Resignation route
      {
        path: 'resignation',
        loadComponent: () =>
          import('./features/hrm/resignation/resignation.component').then(
            (m) => m.ResignationComponent
          ),
        data: { title: 'Démission' },
      },

      //* Validation routes
      {
        path: 'validation',
        data: { title: 'Validation' },
        children: [
          {
            path: 'justify-validation',
            loadComponent: () =>
              import(
                './features/hrm/validation/validate-justification/validate-justification.component'
              ).then((m) => m.ValidateJustificationComponent),
            data: { title: 'Validation des justificatifs' },
          },
          {
            path: 'validate-leave',
            loadComponent: () =>
              import(
                './features/hrm/validation/validate-leave/validate-leave.component'
              ).then((m) => m.ValidateLeaveComponent),
            data: { title: 'Validation des congés' },
          },
          {
            path: 'validate-personal-info',
            loadComponent: () =>
              import(
                './features/hrm/validation/validate-personal-info/validate-personal-info.component'
              ).then((m) => m.ValidateInfoPersonnelComponent),
            data: { title: 'Validation des informations personnelles' },
          },
        ],
      },

      //* Candidates routes
      {
        path: 'candidates',
        loadComponent: () =>
          import('./features/recruitment/candidates/candidates.component').then(
            (m) => m.CandidatesComponent
          ),
        data: { title: 'Candidats' },
        children: [
          {
            path: 'candidates-list',
            loadComponent: () =>
              import(
                './features/recruitment/candidates/candidates-list/candidates-list.component'
              ).then((m) => m.CandidatesListComponent),
            data: { title: 'Liste des candidats' },
          },
        ],
      },

      //* Jobs routes
      {
        path: 'jobs',
        loadComponent: () =>
          import('./features/recruitment/jobs/jobs.component').then(
            (m) => m.JobsComponent
          ),
        data: { title: 'Offres' },
        children: [
          {
            path: 'jobs-list',
            loadComponent: () =>
              import(
                './features/recruitment/jobs/jobs-list/jobs-list.component'
              ).then((m) => m.JobsListComponent),
            data: { title: 'Liste des offres' },
          },
        ],
      },

      //* Filter route
      {
        path: 'filtrage',
        loadComponent: () =>
          import(
            './features/recruitment/filtrage-list/filtrage-list.component'
          ).then((m) => m.FiltrageListComponent),
        children: [],
        data: { title: 'Filtrage (IA)' },
      },

      //* Interview route
      {
        path: 'entretient',
        loadComponent: () =>
          import(
            './features/recruitment/interviews-planning/interviews-planning.component'
          ).then((m) => m.InterviewsPlanningComponent),
        children: [],
        data: { title: 'Planification des entretiens' },
      },

      //* Reports routes
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/administration/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
        data: { title: 'Rapports' },
        children: [
          {
            path: 'attendance-report',
            loadComponent: () =>
              import(
                './features/administration/reports/attendance-report/attendance-report.component'
              ).then((m) => m.AttendanceReportComponent),
            data: { title: 'Rapport de présence' },
          },
          {
            path: 'daily-report',
            loadComponent: () =>
              import(
                './features/administration/reports/daily-report/daily-report.component'
              ).then((m) => m.DailyReportComponent),
            data: { title: 'Rapport quotidien' },
          },
          {
            path: 'employee-report',
            loadComponent: () =>
              import(
                './features/administration/reports/employee-report/employee-report.component'
              ).then((m) => m.EmployeeReportComponent),
            data: { title: 'Rapport des employés' },
          },
          {
            path: 'leave-report',
            loadComponent: () =>
              import(
                './features/administration/reports/leave-report/leave-report.component'
              ).then((m) => m.LeaveReportComponent),
            data: { title: 'Rapport des congés' },
          },
          {
            path: 'payslip-report',
            loadComponent: () =>
              import(
                './features/administration/reports/payslip-report/payslip-report.component'
              ).then((m) => m.PayslipReportComponent),
            data: { title: 'Rapport des fiches de paie' },
          },
        ],
      },
    ],
  },

  //* Pages routes
  {
    path: 'under-maintenance',
    loadComponent: () =>
      import(
        './features/pages/under-maintenance/under-maintenance.component'
      ).then((m) => m.UnderMaintenanceComponent),
    data: { title: 'Maintenance en cours' },
  },
  {
    path: 'under-construction',
    loadComponent: () =>
      import(
        './features/pages/under-construction/under-construction.component'
      ).then((m) => m.UnderConstructionComponent),
    data: { title: 'Page en construction' },
  },

  //* Fallback route
  {
    path: '**',
    redirectTo: '/error-404',
    pathMatch: 'full',
  },
] as const;
