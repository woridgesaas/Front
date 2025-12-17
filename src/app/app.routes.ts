import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/index',
    pathMatch: 'full'
  },

  //* Auth routes
 {
  path: '', loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
  children: [

    { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'forgot-password', loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
    { path: 'email-verification', loadComponent: () => import('./auth/email-verification/email-verification.component').then(m => m.EmailVerificationComponent) },
    { path: 'reset-password', loadComponent: () => import('./auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
    { path: 'success', loadComponent: () => import('./auth/success/success.component').then(m => m.SuccessComponent) },
    { path: 'lock-screen', loadComponent: () => import('./auth/lock-screen/lock-screen.component').then(m => m.LockScreenComponent) },
    { path: 'error-404', loadComponent: () => import('./auth/error-404/error-404.component').then(m => m.Error404Component) },
    { path: 'error-500', loadComponent: () => import('./auth/error-500/error-500.component').then(m => m.Error500Component) }
  ]
}
  ,
  //Features Routes//
  { path: '', loadComponent: () => import('./features/features.component').then(m => m.FeaturesComponent),
    children: [
      {
        path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
          { path: 'index', loadComponent: () => import('./features/dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
          { path: 'employee', loadComponent: () => import('./features/dashboard/employee-dashboard/employee-dashboard.component').then(m => m.EmployeeDashboardComponent) },
        ]
      },
      //Application//
      { path: 'application', loadComponent: () => import('./features/application/application.component').then(m => m.ApplicationComponent),
          children: [
            { path: 'chats', loadComponent: () => import('./features/application/chat/chat.component').then(m => m.ChatComponent) },
            { path: 'calendar', loadComponent: () => import('./features/application/calendar/calendar.component').then((m) => m.CalendarComponent),},
            { path: 'calls/call-history', loadComponent: () => import('./features/application/call/call-history/call-history.component').then(m => m.CallHistoryComponent) },
            { path: 'calls/voice-call', loadComponent: () => import('./features/application/call/voice-call/voice-call.component').then(m => m.VoiceCallComponent) },
            { path: 'calls/video-call', loadComponent: () => import('./features/application/call/video-call/video-call.component').then(m => m.VideoCallComponent) },
            { path: 'calls/outgoing-call', loadComponent: () => import('./features/application/call/outgoing-call/outgoing-call.component').then(m => m.OutgoingCallComponent) },
            { path: 'calls/incoming-call', loadComponent: () => import('./features/application/call/incoming-call/incoming-call.component').then(m => m.IncomingCallComponent) },
           
            { path: 'social-feed', loadComponent: () => import('./features/application/social-feed/social-feed.component').then(m => m.SocialFeedComponent) },
          ]
        },
       //Settings//
        { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
          children:[
            { path: 'general-settings', loadComponent: () => import('./features/settings/general-settings/general-settings.component').then(m => m.GeneralSettingsComponent),
              children:[
                { path: 'connected-apps', loadComponent: () => import('./features/settings/general-settings/connected-apps/connected-apps.component').then(m => m.ConnectedAppsComponent) },
                { path: 'notification-settings', loadComponent: () => import('./features/settings/general-settings/notification-settings/notification-settings.component').then(m => m.NotificationSettingsComponent) },
                { path: 'security-settings', loadComponent: () => import('./features/settings/general-settings/security-settings/security-settings.component').then(m => m.SecuritySettingsComponent) },
                { path: 'profile-settings', loadComponent: () => import('./features/settings/general-settings/profile-settings/profile-settings.component').then(m => m.ProfileSettingsComponent) },
              ]
             },
            { path: 'website-settings', loadComponent: () => import('./features/settings/website-settings/website-settings.component').then(m => m.WebsiteSettingsComponent),
              children:[
                { path: 'ai-settings', loadComponent: () => import('./features/settings/website-settings/ai-settings/ai-settings.component').then(m => m.AiSettingsComponent) },
                { path: 'authentication-settings', loadComponent: () => import('./features/settings/website-settings/authentication-settings/authentication-settings.component').then(m => m.AuthenticationSettingsComponent) },
                { path: 'add-language', loadComponent: () => import('./features/settings/website-settings/add-language/add-language.component').then(m => m.AddLanguageComponent) },
                { path: 'language', loadComponent: () => import('./features/settings/website-settings/language/language.component').then(m => m.LanguageComponent) },
                { path: 'language-web', loadComponent: () => import('./features/settings/website-settings/language-web/language-web.component').then(m => m.LanguageWebComponent) },
                { path: 'appearance', loadComponent: () => import('./features/settings/website-settings/appearance/appearance.component').then(m => m.AppearanceComponent) },
                { path: 'preferences', loadComponent: () => import('./features/settings/website-settings/preferences/preferences.component').then(m => m.PreferencesComponent) },
                { path: 'prefixes', loadComponent: () => import('./features/settings/website-settings/prefixes/prefixes.component').then(m => m.PrefixesComponent) },
                { path: 'localization-settings', loadComponent: () => import('./features/settings/website-settings/localization-settings/localization-settings.component').then(m => m.LocalizationSettingsComponent) },
                { path: 'seo-settings', loadComponent: () => import('./features/settings/website-settings/seo-settings/seo-settings.component').then(m => m.SeoSettingsComponent) },
                { path: 'bussiness-settings', loadComponent: () => import('./features/settings/website-settings/bussiness-settings/bussiness-settings.component').then(m => m.BussinessSettingsComponent) },

              ]
             },
            { path: 'app-settings', loadComponent: () => import('./features/settings/app-settings/app-settings.component').then(m => m.AppSettingsComponent),
              children:[
                { path: 'custom-fields', loadComponent: () => import('./features/settings/app-settings/custom-fields/custom-fields.component').then(m => m.CustomFieldsComponent) },
                { path: 'leave-type', loadComponent: () => import('./features/settings/app-settings/leave-type/leave-type.component').then(m => m.LeaveTypeComponent) },
                { path: 'invoice-settings', loadComponent: () => import('./features/settings/app-settings/invoice-settings/invoice-settings.component').then(m => m.InvoiceSettingsComponent) },
                { path: 'approval-settings', loadComponent: () => import('./features/settings/app-settings/approval-settings/approval-settings.component').then(m => m.ApprovalSettingsComponent) },
                { path: 'salary-settings', loadComponent: () => import('./features/settings/app-settings/salary-settings/salary-settings.component').then(m => m.SalarySettingsComponent) },
              ]
             },
            { path: 'system-settings', loadComponent: () => import('./features/settings/system-settings/system-settings.component').then(m => m.SystemSettingsComponent),
              children:[
                { path: 'maintenance-mode', loadComponent: () => import('./features/settings/system-settings/maintenance-mode/maintenance-mode.component').then(m => m.MaintenanceModeComponent) },
                { path: 'gdpr', loadComponent: () => import('./features/settings/system-settings/gdpr/gdpr.component').then(m => m.GdprComponent) },
                { path: 'otp-settings', loadComponent: () => import('./features/settings/system-settings/otp-settings/otp-settings.component').then(m => m.OtpSettingsComponent) },
                { path: 'sms-template', loadComponent: () => import('./features/settings/system-settings/sms-template/sms-template.component').then(m => m.SmsTemplateComponent) },
                { path: 'sms-settings', loadComponent: () => import('./features/settings/system-settings/sms-settings/sms-settings.component').then(m => m.SmsSettingsComponent) },
                { path: 'email-template', loadComponent: () => import('./features/settings/system-settings/email-template/email-template.component').then(m => m.EmailTemplateComponent) },
                { path: 'email-settings', loadComponent: () => import('./features/settings/system-settings/email-settings/email-settings.component').then(m => m.EmailSettingsComponent) },
              ]
             },
            { path: 'financial-settings', loadComponent: () => import('./features/settings/financial-settings/financial-settings.component').then(m => m.FinancialSettingsComponent),
              children:[
                { path: 'currencies', loadComponent: () => import('./features/settings/financial-settings/currencies/currencies.component').then(m => m.CurrenciesComponent) },
                { path: 'tax-rates', loadComponent: () => import('./features/settings/financial-settings/tax-rates/tax-rates.component').then(m => m.TaxRatesComponent) },
                { path: 'payment-gateways', loadComponent: () => import('./features/settings/financial-settings/payment-gateways/payment-gateways.component').then(m => m.PaymentGatewaysComponent) },

              ]
             },
            { path: 'other-settings', loadComponent: () => import('./features/settings/other-settings/other-settings.component').then(m => m.OtherSettingsComponent),
              children:[
                { path: 'clear-cache', loadComponent: () => import('./features/settings/other-settings/clear-cache/clear-cache.component').then(m => m.ClearCacheComponent) },
                { path: 'backup', loadComponent: () => import('./features/settings/other-settings/backup/backup.component').then(m => m.BackupComponent) },
                { path: 'ban-ip-address', loadComponent: () => import('./features/settings/other-settings/ban-ip-address/ban-ip-address.component').then(m => m.BanIpAddressComponent) },
                { path: 'storage-settings', loadComponent: () => import('./features/settings/other-settings/storage-settings/storage-settings.component').then(m => m.StorageSettingsComponent) },
                { path: 'cronjob', loadComponent: () => import('./features/settings/other-settings/cronjob/cronjob.component').then(m => m.CronjobComponent) },
                { path: 'cronjob-schedule', loadComponent: () => import('./features/settings/other-settings/cronjob-schedule/cronjob-schedule.component').then(m => m.CronjobScheduleComponent) },
                { path: 'custom-js', loadComponent: () => import('./features/settings/other-settings/custom-js/custom-js.component').then(m => m.CustomJsComponent) },
                { path: 'custom-css', loadComponent: () => import('./features/settings/other-settings/custom-css/custom-css.component').then(m => m.CustomCssComponent) },

              ]
             },
          ]
        },
        

      {
        path: 'employees' , loadComponent: () => import('./features/hrm/employees/employees.component').then(m => m.EmployeesComponent),
        children: [
          {path: 'employee-list', loadComponent: () => import('./features/hrm/employees/employee-list/employee-list.component').then(m => m.EmployeeListComponent),},
          {path: 'employee-grid', loadComponent: () => import('./features/hrm/employees/employee-grid/employee-grid.component').then(m => m.EmployeeGridComponent),},
          {path: 'employee-details', loadComponent: () => import('./features/hrm/employees/employee-details/employee-details.component').then(m => m.EmployeeDetailsComponent),},
          {path: 'departments', loadComponent: () => import('./features/hrm/employees/departments/departments.component').then(m => m.DepartmentsComponent),},
      
        ]
      },
      {
        path: 'tickets' , loadComponent: () => import('./features/hrm/tickets/tickets.component').then(m => m.TicketsComponent),
        children: [
          {path: 'ticket-grid', loadComponent: () => import('./features/hrm/tickets/ticket-grid/ticket-grid.component').then(m => m.TicketGridComponent),},
          {path: 'ticket-list', loadComponent: () => import('./features/hrm/tickets/ticket/ticket.component').then(m => m.TicketComponent),},
          {path: 'ticket-details', loadComponent: () => import('./features/hrm/tickets/ticket-details/ticket-details.component').then(m => m.TicketDetailsComponent),},
        ]
      },
  {
  path: 'holidays',
  loadComponent: () =>
    import('./features/hrm/holidays/holidays.component')
      .then(m => m.HolidaysComponent),
  children: [
    {
      path: 'religious-holidays',
      loadComponent: () =>
        import('./features/hrm/holidays/religious-holidays/religious-holidays.component')
          .then(m => m.ReligiousHolidaysComponent),
    },
    {
      path: 'national-holidays',  
      loadComponent: () =>
        import('./features/hrm/holidays/national-holidays/national-holidays.component')
          .then(m => m.NationalHolidaysComponent)
    }
  ]
},


      {
        path: 'attendance' , loadComponent: () => import('./features/hrm/attendance/attendance.component').then(m => m.AttendanceComponent),
        children: [
          {path: 'attendance-admin', loadComponent: () => import('./features/hrm/attendance/attendance-admin/attendance-admin.component').then(m => m.AttendanceAdminComponent),},
          {path: 'attendance-employee', loadComponent: () => import('./features/hrm/attendance/attendance-employee/attendance-employee.component').then(m => m.AttendanceEmployeeComponent),},
          {path: 'leaves', loadComponent: () => import('./features/hrm/attendance/leaves/leaves.component').then(m => m.LeavesComponent),
            children: [
              {path: 'leave-admin', loadComponent: () => import('./features/hrm/attendance/leaves/leave-admin/leave-admin.component').then(m => m.LeaveAdminComponent),},
              {path: 'leave-employee', loadComponent: () => import('./features/hrm/attendance/leaves/leave-employee/leave-employee.component').then(m => m.LeaveEmployeeComponent),},
              {path: 'leave-settings', loadComponent: () => import('./features/hrm/attendance/leaves/leave-settings/leave-settings.component').then(m => m.LeaveSettingsComponent),},
            ]
          },
        ]
      },
     
      { path: 'promotion' , loadComponent: () => import('./features/hrm/promotion/promotion.component').then(m => m.PromotionComponent),},
      { path: 'resignation' , loadComponent: () => import('./features/hrm/resignation/resignation.component').then(m => m.ResignationComponent),},
      // candidat
      { path: 'candidates' , loadComponent: () => import('./features/recruitment/candidates/candidates.component').then(m => m.CandidatesComponent),
        children: [
          {path: 'candidates-list', loadComponent: () => import('./features/recruitment/candidates/candidates-list/candidates-list.component').then(m => m.CandidatesListComponent),},
          // {path: 'candidates-grid', loadComponent: () => import('./features/recruitment/candidates/candidates-grid/candidates-grid.component').then(m => m.CandidatesGridComponent),},
          // {path: 'candidates-kanban', loadComponent: () => import('./features/recruitment/candidates/candidates-kanban/candidates-kanban.component').then(m => m.CandidatesKanbanComponent),},
        ]
      },
      { path: 'jobs' , loadComponent: () => import('./features/recruitment/jobs/jobs.component').then(m => m.JobsComponent),
        children: [
          {path: 'jobs-list', loadComponent: () => import('./features/recruitment/jobs/jobs-list/jobs-list.component').then(m => m.JobsListComponent),},
          {path: 'jobs-grid', loadComponent: () => import('./features/recruitment/jobs/jobs-grid/jobs-grid.component').then(m => m.JobsGridComponent),},
        ]
      },

      //filtrage test
      { path: 'filtrage' , loadComponent: () => import('./features/recruitment/filtrage-list/filtrage-list.component').then(m => m.FiltrageListComponent),
        children: []
      },

      // test entretient

      { path: 'entretient' , loadComponent: () => import('./features/recruitment/interviews-planning/interviews-planning.component').then(m => m.InterviewsPlanningComponent),
        children: []
      },

      { path: 'payroll' , loadComponent: () => import('./features/finance/payroll/payroll.component').then(m => m.PayrollComponent),
        children: [
          {path: 'employee-salary', loadComponent: () => import('./features/finance/payroll/employee-salary/employee-salary.component').then(m => m.EmployeeSalaryComponent),},
          {path: 'payslip', loadComponent: () => import('./features/finance/payroll/payslip/payslip.component').then(m => m.PayslipComponent),},
        ]
      },
     
      { path: 'reports' , loadComponent: () => import('./features/administration/reports/reports.component').then(m => m.ReportsComponent),
        children: [
      
          {path: 'attendance-report', loadComponent: () => import('./features/administration/reports/attendance-report/attendance-report.component').then(m => m.AttendanceReportComponent),},
          {path: 'daily-report', loadComponent: () => import('./features/administration/reports/daily-report/daily-report.component').then(m => m.DailyReportComponent),},
          {path: 'employee-report', loadComponent: () => import('./features/administration/reports/employee-report/employee-report.component').then(m => m.EmployeeReportComponent),},
          {path: 'leave-report', loadComponent: () => import('./features/administration/reports/leave-report/leave-report.component').then(m => m.LeaveReportComponent),},
          {path: 'payslip-report', loadComponent: () => import('./features/administration/reports/payslip-report/payslip-report.component').then(m => m.PayslipReportComponent),},
        ]
      },

    ]

  },
  { path: 'under-maintenance', loadComponent: () => import('./features/pages/under-maintenance/under-maintenance.component').then(m => m.UnderMaintenanceComponent) },
  { path: 'under-construction', loadComponent: () => import('./features/pages/under-construction/under-construction.component').then(m => m.UnderConstructionComponent) },

  {
    path:"**",
    redirectTo:'/error-404'  ,
    pathMatch:'full'
  }
  
]as const;
