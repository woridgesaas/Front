import { routes } from '../../../shared/routes/routes';
import {
  AppRole,
  HorizontalMenuSection,
} from '../models/horizontal-sidebar.model';

const CEO_HR: AppRole[] = ['CEO', 'HR'];
const CEO_HR_MGR: AppRole[] = ['CEO', 'HR', 'MANAGER'];
const CEO_ONLY: AppRole[] = ['CEO'];
const EMPLOYEE_ONLY: AppRole[] = ['EMPLOYEE'];
const MANAGER_ONLY: AppRole[] = ['MANAGER'];

export const HORIZONTAL_SIDEBAR_DATA: HorizontalMenuSection[] = [
  {
    title: 'Main',
    showAsTab: false,
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

      //* Layout
      {
        menuValue: 'Menu latérale',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'layout-sidebar',
        base: 'layout-aside',
        route: null,
        action: 'layoutChange',
        subMenus: [],
      },

      //* Employee
      {
        menuValue: 'Employé',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'users',
        base: 'employee',
        roles: CEO_HR_MGR,
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
        roles: EMPLOYEE_ONLY,
      },
      {
        menuValue: 'Absence / Présence',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'clock',
        base: 'attendance-employee',
        route: routes.attendanceemployee,
        subMenus: [],
        roles: EMPLOYEE_ONLY,
      },
      {
        menuValue: 'Documents administratifs',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'file-text',
        base: 'documents',
        route: routes.documentsEmployee,
        subMenus: [],
        roles: EMPLOYEE_ONLY,
      },
      {
        menuValue: 'Mes tickets',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'ticket',
        base: 'mes-tickets',
        route: routes.myTickets,
        subMenus: [],
        roles: EMPLOYEE_ONLY,
      },
      {
        menuValue: 'Jours fériés',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'beach',
        base: 'holidays',
        route: routes.holidays,
        subMenus: [],
        roles: EMPLOYEE_ONLY,
      },

      //* Internal HR
      {
        menuValue: 'RH interne',
        hasSubRouteTwo: true,
        showSubRoute: false,
        icon: 'briefcase',
        base: 'employees',
        roles: CEO_HR,
        subMenus: [
          {
            menuValue: 'Liste des employés',
            route: routes.employeeList,
            base: 'employee-list',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Tickets',
            route: routes.ticketList,
            base: 'ticket-list',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Départements',
            route: routes.departments,
            base: 'departments',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Postes',
            route: routes.posts,
            base: 'posts',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Présence / Absence',
            route: routes.attendanceadmin,
            base: 'attendance-admin',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Promotion',
            route: routes.promotion,
            base: 'promotion',
            customSubmenuTwo: false,
          },
          {
            menuValue: 'Validation',
            base: 'validation',
            customSubmenuTwo: true,
            subMenusTwo: [
              {
                menuValue: 'Justifications',
                route: routes.justifyValidation,
                base: 'justify-validation',
              },
              {
                menuValue: 'Congés',
                route: routes.validateLeave,
                base: 'validate-leave',
              },
              {
                menuValue: 'Informations personnelles',
                route: routes.validatePersonalInformation,
                base: 'validate-personal-information',
              },
              {
                menuValue: 'Documents administratifs',
                route: routes.validateAdministrativDocuments,
                base: 'validate-documents',
              },
            ],
          },
          {
            menuValue: 'Démission',
            route: routes.resignation,
            base: 'resignation',
            customSubmenuTwo: false,
          },
        ],
      },
      {
        menuValue: 'Liste des employés',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'users',
        base: 'employee-list',
        route: routes.employeeList,
        subMenus: [],
        roles: MANAGER_ONLY,
      },
      {
        menuValue: 'Présence / Absence',
        hasSubRoute: false,
        showSubRoute: false,
        icon: 'clock',
        base: 'attendance-admin',
        route: routes.attendanceadmin,
        subMenus: [],
        roles: MANAGER_ONLY,
      },

      //* External HR
      {
        menuValue: 'RH externe',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'clipboard-list',
        base: 'rh-externe',
        roles: CEO_HR,
        subMenus: [
          {
            menuValue: 'Offres',
            route: routes.jobList,
            base: 'jobs',
          },
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
            menuValue: 'Entretiens',
            route: routes.Entretient,
            base: 'entretiens',
          },
          {
            menuValue: 'Contrats',
            route: routes.contract,
            base: 'contrats',
          },
        ],
      },

      //* Administration
      {
        menuValue: 'Administration',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'shield',
        base: 'audits',
        roles: CEO_ONLY,
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

      //* Settings
      {
        menuValue: 'Paramètres',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'settings',
        base: 'settings',
        roles: CEO_HR,
        subMenus: [
          {
            menuValue: 'Congés',
            route: routes.leaveSettings,
            base: 'leave-settings',
          },
          {
            menuValue: 'Présence et absence',
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
