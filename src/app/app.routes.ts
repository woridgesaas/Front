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
        data: { breadcrumb: 'Tableau de bord', title: 'Tableau de bord' },
        children: [
          {
            path: 'index',
            loadComponent: () =>
              import(
                './features/dashboard/admin-dashboard/admin-dashboard.component'
              ).then((m) => m.AdminDashboardComponent),
            data: {
              breadcrumb: 'Tableau de bord administrateur',
              title: 'Tableau de bord administrateur',
            },
          },
          {
            path: 'employee',
            loadComponent: () =>
              import(
                './features/dashboard/employee-dashboard/employee-dashboard.component'
              ).then((m) => m.EmployeeDashboardComponent),
            data: {
              breadcrumb: 'Tableau de bord employé',
              title: 'Tableau de bord employé',
            },
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
        data: { breadcrumb: 'Intranet', title: 'Intranet' },
        children: [
          {
            path: 'chats',
            loadComponent: () =>
              import('./features/application/chat/chat.component').then(
                (m) => m.ChatComponent
              ),
            data: { breadcrumb: 'Messagerie', title: 'Messagerie' },
          },
          {
            path: 'groups',
            loadComponent: () =>
              import(
                './features/application/chat/groups/groups/groups.component'
              ).then((m) => m.GroupsComponent),
            data: { breadcrumb: 'Groupes', title: 'Groupes' },
          },
          {
            path: 'calendar',
            loadComponent: () =>
              import('./features/application/calendar/calendar.component').then(
                (m) => m.CalendarComponent
              ),
            data: { breadcrumb: 'Calendrier', title: 'Calendrier' },
          },
          {
            path: 'annonces',
            loadComponent: () =>
              import(
                './features/application/social-feed/social-feed.component'
              ).then((m) => m.SocialFeedComponent),
            data: { breadcrumb: 'Annonces', title: 'Annonces' },
          },
          {
            path: 'annonces/edit/:id',
            loadComponent: () =>
              import(
                './features/application/social-feed/admin/annonce/edit-annonce/edit-annonce.component'
              ).then((m) => m.EditAnnonceComponent),
            data: {
              breadcrumb: 'Modifier une annonce',
              title: 'Modifier une annonce',
            },
          },
          {
            path: 'sondages',
            loadComponent: () =>
              import(
                './features/application/social-feed/admin/sondage/sondage.component'
              ).then((m) => m.SondageComponent),
            data: { breadcrumb: 'Sondages', title: 'Sondages' },
          },
          {
            path: 'sondage-details/:id',
            loadComponent: () =>
              import(
                './features/application/social-feed/admin/sondage/sondage-details/sondage-details.component'
              ).then((m) => m.SondageDetailsComponent),
            data: {
              breadcrumb: 'Détails du sondage',
              title: 'Détails du sondage',
            },
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
              title: 'Changer mot de passe',
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
                path: 'attendance-settings',
                loadComponent: () =>
                  import(
                    './features/settings/app-settings/attendance-settings/attendance-settings.component'
                  ).then((m) => m.AttendanceSettingsComponent),
                data: {
                  breadcrumb: 'Paramétrage de présence et absence',
                  title: 'Paramétrage de présence et absence',
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
                  title: 'Paramètrage des modèles de documents administratifs',
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
                  title: 'Paramétrage de recrutement',
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
        data: { breadcrumb: 'Employés', title: 'Employés' },
        children: [
          {
            path: 'employee-list',
            loadComponent: () =>
              import(
                './features/hrm/employees/employee-list/employee-list.component'
              ).then((m) => m.EmployeeListComponent),
            data: {
              breadcrumb: 'Liste des employés',
              title: 'Liste des employés',
            },
          },
          {
            path: 'employee-details',
            loadComponent: () =>
              import(
                './features/hrm/employees/profilemployee/employee-details/employee-details.component'
              ).then((m) => m.EmployeeDetailsComponent),
            data: {
              title: "Détails d'employé",
            },
          },
          {
            path: 'departments',
            loadComponent: () =>
              import(
                './features/hrm/departments/departments.component'
              ).then((m) => m.DepartmentsComponent),
            data: { breadcrumb: 'Départements', title: 'Départements' },
          },
          {
            path: 'geenrate/contract',
            loadComponent: () =>
              import('./features/hrm/contract/contract.component').then(
                (m) => m.ContractComponent
              ),
            data: {
              breadcrumb: 'Générer un contrat',
              title: 'Générer un contrat',
            },
          },
          {
            path: 'documents',
            loadComponent: () =>
              import('./features/hrm/documents/documents.component').then(
                (m) => m.DocumentsComponent
              ),
            data: {
              breadcrumb: 'Documents administratifs',
              title: 'Documents administratifs',
            },
          },
          //* Holidays routes
          {
            path: 'holidays',
            loadComponent: () =>
              import('./features/hrm/holidays/holidays.component').then(
                (m) => m.HolidaysComponent
              ),
            data: {
              breadcrumb: 'Jours fériés',
              title: 'Jours fériés',
            },
          },
        ],
      },

      //* Tickets routes
      {
        path: 'tickets',
        loadComponent: () =>
          import('./features/application/tickets/tickets.component').then(
            (m) => m.TicketsComponent
          ),
        data: { breadcrumb: 'Tickets', title: 'Tickets' },
        children: [
          {
            path: 'ticket-list',
            loadComponent: () =>
              import('./features/application/tickets/ticket/ticket.component').then(
                (m) => m.TicketComponent
              ),
            data: {
              breadcrumb: 'Liste des tickets',
              title: 'Liste des tickets',
            },
          },
          {
            path: 'ticket-details',
            loadComponent: () =>
              import(
                './features/application/tickets/ticket-details/ticket-details.component'
              ).then((m) => m.TicketDetailsComponent),
            data: { title: 'Détails du ticket' },
          },
          {
            path: 'mes-tickets',
            loadComponent: () =>
              import(
                './features/application/tickets/employe/tickets/tickets.component'
              ).then((m) => m.TicketsComponent),
            data: { breadcrumb: 'Mes tickets', title: 'Mes tickets' },
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
        data: { breadcrumb: 'Présence/Absence', title: 'Présence/Absence' },
        children: [
          {
            path: 'attendance-admin',
            loadComponent: () =>
              import(
                './features/hrm/attendance/attendance-admin/attendance-admin.component'
              ).then((m) => m.AttendanceAdminComponent),
            data: {
              breadcrumb: 'Liste de présence/absence',
              title: 'Liste de présence/absence',
            },
          },
          {
            path: 'attendance-employee',
            loadComponent: () =>
              import(
                './features/hrm/attendance/attendance-employee/attendance-employee.component'
              ).then((m) => m.AttendanceEmployeeComponent),
            data: {
              breadcrumb: 'Mes présence/absence',
              title: 'Mes présence/absence',
            },
          },

        ],
      },
//* Leave routes
           {
            path: 'leaves',
            loadComponent: () =>
              import('./features/hrm/leaves/leaves.component').then(
                (m) => m.LeavesComponent
              ),
            data: { breadcrumb: 'Congés', title: 'Congés' },
            children: [
              {
                path: 'leave-employee',
                loadComponent: () =>
                  import(
                    './features/hrm//leaves/leave-employee/leave-employee.component'
                  ).then((m) => m.LeaveEmployeeComponent),
                data: {
                  breadcrumb: 'Mes congés',
                  title: 'Mes congés',
                },
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
        data: { breadcrumb: 'Promotion', title: 'Promotion' },
      },

      //* Resignation route
      {
        path: 'resignation',
        loadComponent: () =>
          import('./features/hrm/resignation/resignation.component').then(
            (m) => m.ResignationComponent
          ),
        data: { breadcrumb: 'Démission', title: 'Démission' },
      },

      //* Validation routes
      {
        path: 'validation',
        data: { breadcrumb: 'Validation', title: 'Validation' },
        children: [
          {
            path: 'justify-validation',
            loadComponent: () =>
              import(
                './features/hrm/validation/validate-justification/validate-justification.component'
              ).then((m) => m.ValidateJustificationComponent),
            data: {
              breadcrumb: 'Validation des justificatifs',
              title: 'Validation des justificatifs',
            },
          },
          {
            path: 'validate-leave',
            loadComponent: () =>
              import(
                './features/hrm/validation/validate-leave/validate-leave.component'
              ).then((m) => m.ValidateLeaveComponent),
            data: {
              breadcrumb: 'Validation des congés',
              title: 'Validation des congés',
            },
          },
          {
            path: 'validate-personal-info',
            loadComponent: () =>
              import(
                './features/hrm/validation/validate-personal-info/validate-personal-info.component'
              ).then((m) => m.ValidateInfoPersonnelComponent),
            data: {
              breadcrumb: 'Validation des informations personnelles',
              title: 'Validation des informations personnelles',
            },
          },
        ],
      },

      //* Candidates routes
     
      {
        path: 'candidates',
        loadComponent: () =>
          import('./features/rhextern/candidates/components/candidates-list/candidates-list.component')
            .then((m) => m.CandidatesListComponent),
        data: {
          breadcrumb: 'Candidats',
          title: 'Liste des candidats',
        },
      },

      //* Jobs routes
      {
        path: 'jobs-list',
        loadComponent: () =>
          import(
            './features/rhextern/jobs/components/jobs-list/jobs-list.component'
          ).then((m) => m.JobsListComponent),
        data: { breadcrumb: 'Offres d\'emploi', title: 'Offres d\'emploi' },
      },

      //* Filter route
      
      {
        path: 'filtrage',
        loadComponent: () =>
          import(
            './features/rhextern/filtering/pages/filtering-page/filtering-page.component'
          ).then((m) => m.FilteringPageComponent),
        children: [],
        data: { breadcrumb: 'Filtrage', title: 'Filtrage' },
      },


      //* Interview route
      {
        path: 'entretiens',  
        loadComponent: () =>
          import(
            './features/rhextern/interviews/pages/interviews-planning/interviews-planning.component'
          ).then((m) => m.InterviewsPlanningComponent),
        children: [],
        data: {
          breadcrumb: 'Planification des entretiens',
          title: 'Planification des Entretiens',
        }
      },

      //* Reports routes
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/administration/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
        data: { breadcrumb: 'Rapports', title: 'Rapports' },
        children: [
          {
            path: 'attendance-report',
            loadComponent: () =>
              import(
                './features/administration/reports/attendance-report/attendance-report.component'
              ).then((m) => m.AttendanceReportComponent),
            data: {
              breadcrumb: 'Rapport des présences/absences',
              title: 'Rapport des présences/absences',
            },
          },
          {
            path: 'daily-report',
            loadComponent: () =>
              import(
                './features/administration/reports/daily-report/daily-report.component'
              ).then((m) => m.DailyReportComponent),
            data: {
              breadcrumb: 'Rapport quotidien',
              title: 'Rapport quotidien',
            },
          },
          {
            path: 'employee-report',
            loadComponent: () =>
              import(
                './features/administration/reports/employee-report/employee-report.component'
              ).then((m) => m.EmployeeReportComponent),
            data: {
              breadcrumb: 'Rapport des employés',
              title: 'Rapport des employés',
            },
          },
          {
            path: 'leave-report',
            loadComponent: () =>
              import(
                './features/administration/reports/leave-report/leave-report.component'
              ).then((m) => m.LeaveReportComponent),
            data: {
              breadcrumb: 'Rapport des congés',
              title: 'Rapport des congés',
            },
          },
          {
            path: 'payslip-report',
            loadComponent: () =>
              import(
                './features/administration/reports/payslip-report/payslip-report.component'
              ).then((m) => m.PayslipReportComponent),
            data: {
              breadcrumb: 'Rapport des fiches de paie',
              title: 'Rapport des fiches de paie',
            },
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
   {
        path: 'error-404',
        loadComponent: () =>
          import('./features/pages/error-404/error-404.component').then(
            (m) => m.Error404Component
          ),
        data: { title: 'Page non trouvée' },
      },
      {
        path: 'error-500',
        loadComponent: () =>
          import('./features/pages/error-500/error-500.component').then(
            (m) => m.Error500Component
          ),
        data: { title: 'Erreur serveur' },
      },

  //* Fallback route
  {
    path: '**',
    redirectTo: '/error-404',
    pathMatch: 'full',
  },
] as const;
