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
  error: '/error-404',
  errors: '/error-500',

  //* Dashboard routes
  index: '/dashboard/index',
  employee: '/dashboard/employee',

  //* Layouts routes
  Horizontal: '/layout-horizontal',
  MenuAside: '/layout-horizontal-sidemenu',

  //* Intranet routes
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
  departments: '/employees/departments',
  contract: 'employees/geenrate/contract',
  documentsEmployee: 'employees/documents',

  //* Validation routes
  validateLeave: '/validation/validate-leave',
  justifyValidation: '/validation/justify-validation',
  validatePersonalInfo: '/validation/validate-personal-info',

  //* Holidays routes
  holidays: '/employees/holidays',

  //* Leaves routes
  leaveemployee: '/leaves/leave-employee',

  //* Attendance routes
  attendanceadmin: '/attendance/attendance-admin',
  attendanceemployee: '/attendance/attendance-employee',

  //* Reports routes
  employeereport: '/reports/employee-report',
  payslipreport: '/reports/payslip-report',
  attendancereport: '/reports/attendance-report',
  leavereport: '/reports/leave-report',
  dailyreport: '/reports/daily-report',

  //* Promotion route
  promotion: '/promotion',

  //* Resignation route
  resignation: '/resignation',

  //* Jobs route
  jobList: 'jobs-list',

  //* Candidates route
  candidateslist: '/candidates',

  //* filter AI route
  FiltrageList: '/filtrage',

  //* Interview route
  Entretient: '/entretiens',

  //* Settings routes
  changePassword: '/settings/change-password',
  leaveSettings: '/settings/app-settings/leave-settings',
  presenceAbsenceSettings: '/settings/app-settings/presence-absence-settings',
  documentsTemplateSettings:
    '/settings/app-settings/documents-template-settings',
  recruitmentSettings: '/settings/app-settings/recruitment-settings',

  //* Pages routes
  comingSoon: '/coming-soon',
  underMaintanance: '/under-maintenance',
  underConstruction: '/under-construction',
};
