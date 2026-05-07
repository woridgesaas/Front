export const routes = {
  Url: '',

  get baseUrl(): string {
    return this.Url;
  },

  //* Auth routes
  login: '/login',
  forgotPassword: '/forgot-password',
  emailVerification: '/email-verification',
  resetPassword: '/reset-password',
  success: '/success',

  //* Pages routes
  error: '/error-404',
  errors: '/error-500',
  comingSoon: '/coming-soon',
  underMaintanance: '/under-maintenance',
  underConstruction: '/under-construction',

  //* Dashboard routes
  index: '/dashboard/admin',
  employee: '/dashboard/employee',

  //* Layouts routes
  Horizontal: '/layout-horizontal',
  MenuAside: '/layout-horizontal-sidemenu',

  //* Internal communication routes
  apps: '/intranet',
  chat: '/intranet/chats',
  groups: '/intranet/groups',
  contacts: '/intranet/contacts',
  calendar: '/intranet/calendar',
  socialFeed: '/intranet/annonces',
  socialFeedEdit: '/intranet/annonces/edit/', //! Angular va injecter le id par le tableau param de [routerLink]
  sondageList: '/intranet/sondages',
  sondageDetails: '/intranet/sondage-details/:id',
  ticketList: '/tickets/ticket-list',
  myTickets: '/tickets/mes-tickets',
  ticketDetails: '/tickets/ticket-details',

  //* Employee routes
  employeeList: '/employees/employee-list',
  employeeDetails: '/employees/employee-details',
  documentsEmployee: '/employees/documents',
  holidays: '/employees/holidays',
  leaveemployee: '/leaves/leave-employee',
  attendanceemployee: '/attendance/attendance-employee',

  //* Administration routes
  auditsUser: '/audits',
  employeereport: '/reports/employee-report',
  payslipreport: '/reports/payslip-report',
  attendancereport: '/reports/attendance-report',
  leavereport: '/reports/leave-report',
  dailyreport: '/reports/daily-report',

  //* Internal HR routes
  promotion: '/promotion',
  resignation: '/resignation',
  departments: '/employees/departments',
  posts: '/employees/posts',
  attendanceadmin: '/attendance/attendance-admin',
  validateLeave: '/validation/validate-leave',
  justifyValidation: '/validation/justify-validation',
  validatePersonalInformation: '/validation/validate-personal-information',
  validateAdministrativDocuments: '/validation/validate-documents',

  //* External RH routes
  jobList: '/jobs-list',
  candidateslist: '/candidates',
  FiltrageList: '/filtrage',
  Entretient: '/entretiens',
  contract: '/employees/generate/contract',

  //* Settings routes
  changePassword: '/settings/change-password',
  leaveSettings: '/settings/app-settings/leave-settings',
  attendanceSettings: '/settings/app-settings/attendance-settings',
  documentsTemplateSettings:
    '/settings/app-settings/documents-template-settings',
  recruitmentSettings: '/settings/app-settings/recruitment-settings',
};
