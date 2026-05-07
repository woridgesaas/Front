import { routes } from '../../../shared/routes/routes';
import { AppRole, SidebarSection } from '../models/default-sidebar.model';

const CEO_HR: AppRole[] = ['CEO', 'HR'];
const CEO_HR_MGR: AppRole[] = ['CEO', 'HR', 'MANAGER'];
const CEO_ONLY: AppRole[] = ['CEO'];

export const DEFAULT_SIDEBAR_DATA: SidebarSection[] = [
  //* ── Main
  {
    tittle: 'Main',
    icon: 'airplay',
    showAsTab: true,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Dashboard',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'layout-dashboard',
        base: 'dashboard',
        route: routes.index,
        subMenus: [],
      },

      //* Internal communication
      {
        menuValue: 'Intranet',
        hasSubRouteTwo: true,
        showSubRoute: false,
        icon: 'building-community',
        base: 'intranet',
        subMenus: [
          {
            menuValue: 'Chat',
            route: routes.chat,
            base: 'chats',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Groupes',
            route: routes.groups,
            base: 'groups',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Calendar',
            route: routes.calendar,
            base: 'calendar',
            customSubmenuTwo: false,
          },
          {
            menuValue: "Fil d'actualité",
            route: routes.socialFeed,
            base: 'annonces',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Sondages',
            route: routes.sondageList,
            base: 'sondages',
            customSubmenuTwo: false,
          },
        ],
      },
    ],
  },

  //* Layout
  {
    tittle: 'Layout',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Horizontal',
        route: null,
        action: 'layoutChange',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'layout-navbar',
        base: 'layout-horizontal',
        subMenus: [],
        hideOnMobile: true,
      },
    ],
  },

  //* Employee
  {
    tittle: 'Employés',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Employé',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'users',
        base: 'employee',
        roles: ['CEO', 'HR'] as AppRole[],
        subMenus: [
          {
            menuValue: 'Congés',
            route: routes.leaveemployee,
            base: 'leave-employee',
          },
          {
            menuValue: 'Absence / Présence',
            route: routes.attendanceemployee,
            base: 'attendance-employee',
          },
          {
            menuValue: 'Documents administratifs',
            route: routes.documentsEmployee,
            base: 'documents',
          },
          {
            menuValue: 'Mes tickets',
            route: routes.myTickets,
            base: 'mes-tickets',
          },
          {
            menuValue: 'Jours fériés',
            route: routes.holidays,
            base: 'holidays',
          },
        ],
      },
      {
        menuValue: 'Congés',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'calendar-off',
        base: 'leave-employee',
        route: routes.leaveemployee,
        subMenus: [],
        roles: ['MANAGER', 'EMPLOYEE'] as AppRole[],
      },
      {
        menuValue: 'Absence / Présence',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'clock',
        base: 'attendance-employee',
        route: routes.attendanceemployee,
        subMenus: [],
        roles: ['MANAGER', 'EMPLOYEE'] as AppRole[],
      },
      {
        menuValue: 'Documents administratifs',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'file-text',
        base: 'documents',
        route: routes.documentsEmployee,
        subMenus: [],
        roles: ['MANAGER', 'EMPLOYEE'] as AppRole[],
      },
      {
        menuValue: 'Mes tickets',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'ticket',
        base: 'mes-tickets',
        route: routes.myTickets,
        subMenus: [],
        roles: ['MANAGER', 'EMPLOYEE'] as AppRole[],
      },
      {
        menuValue: 'Jours fériés',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'beach',
        base: 'holidays',
        route: routes.holidays,
        subMenus: [],
        roles: ['MANAGER', 'EMPLOYEE'] as AppRole[],
      },
    ],
  },

  //* Internal RH
  {
    tittle: 'RH interne',
    showAsTab: false,
    separateRoute: false,
    roles: CEO_HR_MGR,
    menu: [
      {
        menuValue: 'RH interne',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'briefcase-2',
        base: 'rh-intern',
        subMenus: [
          {
            menuValue: 'Liste des employés',
            route: routes.employeeList,
            base: 'employee-list',
          },
          {
            menuValue: 'Tickets',
            route: routes.ticketList,
            base: 'ticket-list',
          },
          {
            menuValue: 'Départements',
            route: routes.departments,
            base: 'departments',
          },
          { menuValue: 'Postes', route: routes.posts, base: 'posts' },
          {
            menuValue: 'Présence / Absence',
            route: routes.attendanceadmin,
            base: 'attendance-admin',
          },
          {
            menuValue: 'Promotion',
            route: routes.promotion,
            base: 'promotion',
          },
          {
            menuValue: 'Valider justifications',
            route: routes.justifyValidation,
            base: 'justify-validation',
          },
          {
            menuValue: 'Valider congés',
            route: routes.validateLeave,
            base: 'validate-leave',
          },
          {
            menuValue: 'Valider informations personnelles',
            route: routes.validatePersonalInformation,
            base: 'validate-personal-information',
          },
          {
            menuValue: 'Valider documents administratifs',
            route: routes.validateAdministrativDocuments,
            base: 'validate-documents',
          },
          {
            menuValue: 'Démission',
            route: routes.resignation,
            base: 'resignation',
          },
        ],
        roles: CEO_HR,
      },
      //* Employee list
      {
        menuValue: 'Liste des employés',
        route: routes.employeeList,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'users',
        base: 'employee-list',
        subMenus: [],
        roles: ['MANAGER'],
      },
      {
        menuValue: 'Présence / Absence',
        route: routes.attendanceadmin,
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'clock',
        base: 'attendance-admin',
        subMenus: [],
        roles: ['MANAGER'],
      },
    ],
  },

  //* External HR
  {
    tittle: 'RH externe',
    showAsTab: false,
    separateRoute: false,
    roles: CEO_HR,
    menu: [
      {
        menuValue: 'RH externe',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'user-search',
        base: 'rh-extern',
        subMenus: [
          { menuValue: 'Offres', route: routes.jobList, base: 'jobs' },
          {
            menuValue: 'Candidats',
            route: routes.candidateslist,
            base: 'candidates',
          },
          {
            menuValue: 'Filtrage',
            route: routes.FiltrageList,
            base: 'filtrage',
          },
          {
            menuValue: 'Entretien',
            route: routes.Entretient,
            base: 'entretiens',
          },
          { menuValue: 'Contrats', route: routes.contract, base: 'contrats' },
        ],
      },
    ],
  },

  //* Administration
  {
    tittle: 'Administration',
    showAsTab: false,
    separateRoute: false,
    roles: CEO_ONLY,
    menu: [
      {
        menuValue: 'Administration',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'shield',
        base: 'administration',
        subMenus: [
          {
            menuValue: 'Traçabilité',
            route: routes.auditsUser,
            base: 'audits',
          },
          {
            menuValue: 'Rapport des employés',
            route: routes.employeereport,
            base: 'employee-report',
          },
          {
            menuValue: 'Rapport de paiement',
            route: routes.payslipreport,
            base: 'payslip-report',
          },
          {
            menuValue: 'Rapport présences / absences',
            route: routes.attendancereport,
            base: 'attendance-report',
          },
          {
            menuValue: 'Rapport des congés',
            route: routes.leavereport,
            base: 'leave-report',
          },
          {
            menuValue: 'Rapport quotidien',
            route: routes.dailyreport,
            base: 'daily-report',
          },
        ],
      },
    ],
  },

  //* Settings
  {
    tittle: 'Paramètres',
    showAsTab: false,
    separateRoute: false,
    roles: CEO_HR,
    menu: [
      {
        menuValue: 'Paramètres',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'settings',
        base: 'settings',
        subMenus: [
          {
            menuValue: 'Congés',
            route: routes.leaveSettings,
            base: 'leave-settings',
          },
          {
            menuValue: 'Présence / absence',
            route: routes.attendanceSettings,
            base: 'attendance-settings',
          },
          {
            menuValue: 'Documents administratifs',
            route: routes.documentsTemplateSettings,
            base: 'documents-template-settings',
          },
          {
            menuValue: 'Recrutement',
            route: routes.recruitmentSettings,
            base: 'recruitment-settings',
          },
        ],
      },
    ],
  },
];
