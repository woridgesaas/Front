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
           
            { path: 'annonces', loadComponent: () => import('./features/application/social-feed/social-feed.component').then(m => m.SocialFeedComponent) },
          ]
        },

       //* Settings routes 
        { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
          children:[
            { path: 'general-settings', loadComponent: () => import('./features/settings/general-settings/general-settings.component').then(m => m.GeneralSettingsComponent),
              children:[
                { path: 'security-settings', loadComponent: () => import('./features/settings/general-settings/security-settings/security-settings.component').then(m => m.SecuritySettingsComponent) },
                { path: 'profile-settings', loadComponent: () => import('./features/settings/general-settings/profile-settings/profile-settings.component').then(m => m.ProfileSettingsComponent) },
              ]
            },
            { path: 'app-settings', loadComponent: () => import('./features/settings/app-settings/app-settings.component').then(m => m.AppSettingsComponent),
              children:[
                { path: 'leave-type', loadComponent: () => import('./features/settings/app-settings/leave-type/leave-type.component').then(m => m.LeaveTypeComponent) },
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
{
  path: 'validation',
  children: [
    {
      path: 'justify-validation',
      loadComponent: () =>
        import(
          './features/hrm/validation/validate-justification/validate-justification.component'
        ).then(m => m.ValidateJustificationComponent),
    },
    {
      path: 'validate-leave',
      loadComponent: () =>
        import(
          './features/hrm/validation/validate-leave/validate-leave.component'
        ).then(m => m.ValidateLeaveComponent),
    },
  
  ],
},


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
