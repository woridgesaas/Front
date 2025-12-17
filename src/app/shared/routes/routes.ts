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
  
  // page routes
  index: '/dashboard/index',
  baseUi: '/dashboard/base-ui',
  admin: '/dashboard/admin',
  employee: '/dashboard/employee',
  //Layouts
  Horizontal: '/layout-horizontal',

  MenuAside: '/layout-horizontal-sidemenu',
  apps: '/application',
  chat: '/application/chats',
  voicecall: '/application/calls/voice-call',
  videocall: '/application/calls/video-call',
  outgoingcall: '/application/calls/outgoing-call',
  incomingcall: '/application/calls/incoming-call',
  callhistory: '/application/calls/call-history',
  contacts: '/application/contacts',
  calendar: '/application/calendar',

  socialFeed: '/application/social-feed',

  employeeList: '/employees/employee-list',
  employeeGrid: '/employees/employee-grid',
  employeeDetails: '/employees/employee-details',
  employeePage: '/employees/employee-page',
  departments: '/employees/departments',
  profile: '/profile',

// Holidays
holidays: '/holidays',
nationalHolidays: '/holidays/national-holidays',
religiousHolidays: '/holidays/religious-holidays',

   

  // Leaves
  sales: '/sales',
  leaveadmin: '/attendance/leaves/leave-admin',
  leaveemployee: '/attendance/leaves/leave-employee',
  leavesettings: '/attendance/leaves/leave-settings',

  // Attendance
  attendanceadmin: '/attendance/attendance-admin',
  attendanceemployee: '/attendance/attendance-employee',

  clientGrid: '/client/client-grid',
  clientList: '/client/client-list',

  ticketList: '/tickets/ticket-list',
  ticketGrid: '/tickets/ticket-grid',

  payments: '/sales/payments',
  expenses: '/sales/expenses',
  providentfund: '/sales/provident-fund',
  taxes: '/sales/taxes',

  employeesalary: '/payroll/employee-salary',
  payslip: '/payroll/payslip',
  policies: '/policies/main',

  employeereport: '/reports/employee-report',
  payslipreport: '/reports/payslip-report',
  attendancereport: '/reports/attendance-report',
  leavereport: '/reports/leave-report',
  dailyreport: '/reports/daily-report',

  promotion: '/promotion',
  resignation: '/resignation',

  jobsList: '/jobs/jobs-list',
  jobsGrid: '/jobs/jobs-grid',
  userDashboard: '/jobs/user-dashboard',
  jobsdashboard: '/jobs/jobs-dashboard',
  managejobs: '/jobs/manage-jobs',
  manageresumes: '/jobs/manage-resumes',
  shortlist: '/jobs/shortlist',
  jobview: '/jobs/job-view',
  interviewquestions: '/jobs/interview-questions',
  offerapproval: '/jobs/offer-approval',
  experiencelevel: '/jobs/experience-level',
  candidateslist: '/candidates/candidates-list',
  // candidatesGrid: '/candidates/candidates-grid',
  // candidatesKanban: '/candidates/candidates-kanban',
  scheduletiming: '/jobs/schedule-timing',
  aptituderesult: '/jobs/aptitude-result',
  appliedcandidates: '/jobs/applied-candidates',
  companysettings: '/settings/company-settings',
  employeeProfile: '/employees/employee-profile',
  clientProfile: '/clients/client-profile',


  //filtrage IA recrutement
  FiltrageList: '/filtrage',
//gestion entretiens 
  Entretient: '/entretient',


  subscriptions: '/subscriptions',
  subadmin: '/subscriptions/admins',
  subscribedcompanies: '/subscriptions/subscribed-companies',

  search: '/pages/search',
  blankpage: '/pages/blank-page',
  components: '/components',
  userAssetsDetails: '/assets/user-assets-details',
  assetsDetails: '/assets/assets-details',
  adminDashboard: '/dashboard/admin',
  jobAptitude: '/jobs/job-aptitude',
  mailView: '/application/mailview',
  compose: '/application/compose',
  projectView: '/projects/project-view',
  jobDetails: '/jobs/jobs-details',
  userAllJobs: '/jobs/user-all-jobs',
  savedJobs: '/jobs/saved-jobs',
  appliedJobs: '/jobs/applied-jobs',
  interviewJobs: '/jobs/interview-jobs',
  offeredJobs: '/jobs/offered-jobs',
  visitedJobs: '/jobs/visited-jobs',
  archivedJobs: '/jobs/archived-jobs',
  projectList: '/projects/project-list',
  projectGrid: '/projects/project-grid',
  projectDetails: '/projects/project-details',
  jobList: '/jobs/jobs-list',
  jobGrid: '/jobs/jobs-grid',

  ticketDetails: '/tickets/ticket-details',

  horizontalTimeline: '/horizontal-timeline',
  changePassword: '/change-password',
  layoutDark: '/layout-dark',

  profileSettings: '/settings/general-settings/profile-settings',
  securitySettings: '/settings/general-settings/security-settings',
  notificationSettings: '/settings/general-settings/notification-settings',
  connectedApps: '/settings/general-settings/connected-apps',
  bussinessSettings: '/settings/website-settings/bussiness-settings',
  seoSettings: '/settings/website-settings/seo-settings',
  localizationSettings: '/settings/website-settings/localization-settings',
  prefixes: '/settings/website-settings/prefixes',
  preferences: '/settings/website-settings/preferences',
  appearance: '/settings/website-settings/appearance',
  language: '/settings/website-settings/language',
  addLanguage: '/settings/website-settings/add-language',
  languageWeb: '/settings/website-settings/language-web',
  authenticationSettings: '/settings/website-settings/authentication-settings',
  aiSettings: '/settings/website-settings/ai-settings',
  salarySettings: '/settings/app-settings/salary-settings',
  approvalSettings: '/settings/app-settings/approval-settings',
  invoiceSettings: '/settings/app-settings/invoice-settings',
  leaveType: '/settings/app-settings/leave-type',
  customFields: '/settings/app-settings/custom-fields',
  emailSettings: '/settings/system-settings/email-settings',
  emailTemplate: '/settings/system-settings/email-template',
  smsSettings: '/settings/system-settings/sms-settings',
  smsTemplate: '/settings/system-settings/sms-template',
  otpSettings: '/settings/system-settings/otp-settings',
  gdpr: '/settings/system-settings/gdpr',
  maintenanceMode: '/settings/system-settings/maintenance-mode',
  paymentGateways: '/settings/financial-settings/payment-gateways',
  taxRates: '/settings/financial-settings/tax-rates',
  currencies: '/settings/financial-settings/currencies',
  customCss: '/settings/other-settings/custom-css',
  customjs: '/settings/other-settings/custom-js',
  cronjob: '/settings/other-settings/cronjob',
  cronjobSchedule: '/settings/other-settings/cronjob-schedule',
  storagesettings: '/settings/other-settings/storage-settings',
  banIpaddress: '/settings/other-settings/ban-ip-address',
  backup: '/settings/other-settings/backup',
  clearcache: '/settings/other-settings/clear-cache',

  comingSoon: '/coming-soon',
  underMaintanance: '/under-maintenance',
  underConstruction: '/under-construction',
};
