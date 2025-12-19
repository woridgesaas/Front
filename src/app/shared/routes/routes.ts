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
  justifyValidation: '/justify-validation',
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

  //* Settings routes
  profileSettings: '/settings/general-settings/profile-settings',
  securitySettings: '/settings/general-settings/security-settings',
  leaveType: '/settings/app-settings/leave-type',

  comingSoon: '/coming-soon',
  underMaintanance: '/under-maintenance',
  underConstruction: '/under-construction',
};
