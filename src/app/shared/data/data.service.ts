import { Injectable } from '@angular/core';
import { routes } from '../routes/routes';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  apiResultFormat,
  MainMenu,
  SideBar,
  SideBarMenu,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private collapseSubject = new BehaviorSubject<boolean>(false);
  collapse$ = this.collapseSubject.asObservable();

  toggleCollapse() {
    this.collapseSubject.next(!this.collapseSubject.value);
  }
  constructor(private http: HttpClient) {}
  public getDataTable(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/data-tables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getApiData(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/api-data.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCandidatesList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/candidates.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getJobList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/job-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getContactlist(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/contact-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getChat(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/chat.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getReportUser(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/report-user.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getLanguageTranslate(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/language-translate.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getLanguageWeb(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/language-web.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCall(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/admin-call.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStories(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/stories.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBlockUser(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/block-user.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBackup(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/backup.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getUserList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/user-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInviteUser(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invite-user.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAbuseMessage(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/abuse-message.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getEmployeeList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/employee-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getdepartments(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/department.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getattendanceadmin(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/attendance-admin.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getattendanceemployee(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/attendance-employee.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getpromotion(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/promotion.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getresignation(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/resignation.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getleaveAdmin(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/leave-admin.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getleaveEmployee(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/leave-employee.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getemployeeSalary(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/employee-salary.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getattendanceReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/attendance-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getdailyReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/daily-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getemployeeReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/employee-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getleaveReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/leave-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getpayslipReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/payslip-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getpage(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/page.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getcallHistory(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/call-history.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  /** -------------------------------- ce la c'est aside menu links ------------------------------------------ */
  public sideBar: SideBar[] = [
    {
      tittle: 'Main',
      icon: 'airplay',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'smart-home',
          base: 'dashboard',
          materialicons: 'start',
          dot: true,
          subMenus: [
            {
              menuValue: 'Dashboard',
              route: routes.index,
              base: 'index',
            },
            {
              menuValue: 'Dashboard',
              route: routes.employee,
              base: 'employee',
            },
          ],
        },
        {
          menuValue: 'Application',
          route: routes.apps,
          hasSubRouteTwo: true,
          showSubRoute: false,
          icon: 'layout-grid-add',
          base: 'application',
          materialicons: 'dashboard',
          subMenus: [
            {
              menuValue: 'Chat',
              route: routes.chat,
              base: 'chats',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Calls',
              customSubmenuTwo: true,
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.calendar,
              page1: 'voice-call',
              page2: 'videocall',
              base: 'calls',
              subMenusTwo: [
                {
                  menuValue: 'Voice Call',
                  route: routes.voicecall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'voice-call',
                },
                {
                  menuValue: 'Video Call',
                  route: routes.videocall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'video-call',
                },
                {
                  menuValue: 'Outgoing Call',
                  route: routes.outgoingcall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'outgoing-call',
                },
                {
                  menuValue: 'Incoming Call',
                  route: routes.incomingcall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'incoming-call',
                },
                {
                  menuValue: 'Call History',
                  route: routes.callhistory,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'call-history',
                },
              ],
            },
            {
              menuValue: 'Calendar',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.calendar,
              customSubmenuTwo: false,
              base: 'calendar',
            },

            {
              menuValue: 'Événements',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.socialFeed,
              customSubmenuTwo: false,
              base: 'social-feed',
            },
          ],
        },
      ],
    },
    {
      tittle: 'LAYOUT',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Horizontal',
          route: null,
          action: 'layoutChange',
          hasSubRoute: false,
          showSubRoute: false,
          base: 'layout-horizontal',
          icon: 'layout-navbar',
          materialicons: 'confirmation_number',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Employee',
      icon: 'users',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Employees',
          route: routes.employeeList,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'users',
          base: 'employees',
          materialicons: 'people',
          subMenus: [
            {
              menuValue: 'liste des employés',
              route: routes.employeeList,
              base: 'employees',
              base2: 'employee-list',
            },
            {
              menuValue: 'Congés',
              route: routes.leaveemployee,
              base: 'leave-employee',
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Absence/Présence',
              route: routes.attendanceemployee,
              base: 'attendance-employee',
              customSubmenuTwo: false,
            },
          ],
        },
      ],
    },
    {
      tittle: 'RH Intern',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Tickets',
          route: routes.ticketList,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'ticket',
          base: 'tickets',
          materialicons: 'leaderboard',
          subMenus: [
            {
              menuValue: 'Tickets',
              route: routes.ticketList,
              base: 'ticket-list',
            },
            {
              menuValue: 'Tickets Detail',
              route: routes.ticketDetails,
              base: 'ticket-details',
            },
          ],
        },
        {
          menuValue: 'Jours fériés',
          base: 'holidays',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'calendar-event',
          materialicons: 'confirmation_number',
          subMenus: [
            {
              menuValue: 'Jours fériés nationaux',
              route: routes.nationalHolidays,
              base: 'national-holidays',
            },
            {
              menuValue: 'Jours fériés religieux',
              route: routes.religiousHolidays,
              base: 'religious-holidays',
            },
          ],
        },

        {
          menuValue: 'Departments',
          route: routes.departments,
          base: 'departments',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'users-group',
          materialicons: 'confirmation_number',
          subMenus: [],
        },
        {
          menuValue: 'Attendance',
          route: routes.sales,
          hasSubRouteTwo: true,
          showSubRoute: false,
          icon: 'file-time',
          base: 'sales',
          materialicons: 'track_changes',
          subMenus: [
            {
              menuValue: 'Leaves',
              customSubmenuTwo: true,
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.leaveadmin,
              base: 'leaves',
              subMenusTwo: [
                {
                  menuValue: 'Leaves (Admin)',
                  route: routes.leaveadmin,
                  base: 'leave-admin',
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Leaves (Employee)',
                  route: routes.leaveemployee,
                  base: 'leave-employee',
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Leave Settings',
                  route: routes.leavesettings,
                  base: 'leave-settings',
                  hasSubRoute: false,
                  showSubRoute: false,
                },
              ],
            },

            {
              menuValue: 'Attendance (Admin)',
              route: routes.attendanceadmin,
              base: 'attendance-admin',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Attendance (Employee)',
              route: routes.attendanceemployee,
              base: 'attendance-employee',
              customSubmenuTwo: false,
            },
          ],
        },
        {
          menuValue: 'Promotion',
          route: routes.promotion,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'speakerphone',
          base: 'promotion',
          materialicons: 'group_add',
          subMenus: [],
        },
        {
          menuValue: 'Valider justification',
          route: routes.justifyValidation,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'external-link',
          base: 'justify-validation',
          materialicons: 'fact_check',
          subMenus: [],
        },

        {
          menuValue: 'Resignation',
          route: routes.resignation,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'external-link',
          base: 'resignation',
          materialicons: 'settings',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'RH-Extern',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Offres',
          route: routes.jobsGrid,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'timeline',
          base: 'jobs',
          materialicons: 'confirmation_number',
          subMenus: [],
        },
        {
          menuValue: 'Candidats',
          route: routes.candidateslist,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'user-shield',
          base: 'candidates',
          materialicons: 'shopping_bag',
          subMenus: [],
        },
        {
          menuValue: 'Filtrage',
          route: routes.FiltrageList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'user-shield',
          base: 'filtrage-list',
          materialicons: 'shopping_bag',
          subMenus: [],
        },
        {
          menuValue: 'Entretient',
          route: routes.Entretient,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'user-shield',
          base: 'interviews-planning',
          materialicons: 'shopping_bag',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Finance & Accounts',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Payroll',
          base: 'payroll',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'cash',
          subMenus: [
            {
              menuValue: 'Employee Salary',
              route: '/payroll/employee-salary',
              base: 'employee-salary',
            },
            {
              menuValue: 'Payslip',
              route: '/payroll/payslip',
              base: 'payslip',
            },
          ],
        },
      ],
    },
    {
      tittle: 'Administration',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Reports',
          base: 'reports',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-star',
          subMenus: [
            {
              menuValue: 'Employee Report',
              route: '/reports/employee-report',
              base: 'employee-report',
            },
            {
              menuValue: 'Payslip Report',
              route: '/reports/payslip-report',
              base: 'payslip-report',
            },
            {
              menuValue: 'Attendance Report',
              route: '/reports/attendance-report',
              base: 'attendance-report',
            },
            {
              menuValue: 'Leave Report',
              route: '/reports/leave-report',
              base: 'leave-report',
            },
            {
              menuValue: 'Daily Report',
              route: '/reports/daily-report',
              base: 'daily-report',
            },
          ],
        },

        //* Settings
        {
          menuValue: 'Settings',
          hasSubRouteTwo: true,
          showSubRoute: false,
          icon: 'settings',
          base: 'settings',
          subMenus: [
            {
              menuValue: 'General Settings',
              customSubmenuTwo: true,
              base: 'general-settings',
              subMenusTwo: [
                {
                  menuValue: 'Profile',
                  route: routes.profileSettings,
                  base: 'profile-settings',
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Security',
                  route: routes.securitySettings,
                  base: 'security-settings',
                  hasSubRoute: false,
                  showSubRoute: false,
                },
              ],
            },
            {
              menuValue: 'App Settings',
              customSubmenuTwo: true,
              base: 'app-settings',
              subMenusTwo: [
                {
                  menuValue: 'Leave Type',
                  route: routes.leaveType,
                  base: 'leave-type',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  // ----------------------- finito sidebar --------------------------------------------------------------------------------------------
  public getSideBarData: BehaviorSubject<SideBar[]> = new BehaviorSubject<
    SideBar[]
  >(this.sideBar);
  public resetData(): void {
    this.sideBar.map((res: SideBar) => {
      res.showAsTab = false;
      res.menu.map((menus: SideBarMenu) => {
        menus.showSubRoute = false;
      });
    });
  }
  /** -------------------- menu horizentale ----------------------------------- */
  public horizontalSidebar: MainMenu[] = [
    {
      title: 'Main',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'smart-home',
          base: 'dashboard',
          subMenus: [
            {
              menuValue: 'Admin Dashboard',
              route: routes.index,
              base: 'index',
            },
            {
              menuValue: 'Employee Dashboard',
              route: routes.employee,
              base: 'employee',
            },
          ],
        },
        {
          menuValue: 'Application',
          hasSubRouteTwo: true,
          showSubRoute: false,
          icon: 'layout-grid-add',
          base: 'application',
          subMenus: [
            {
              menuValue: 'Chat',
              route: routes.chat,
              base: 'chats',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Calls',
              customSubmenuTwo: true,
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.calendar,
              base: 'calls',
              subMenusTwo: [
                {
                  menuValue: 'Voice Call',
                  route: routes.voicecall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'voice-call',
                },
                {
                  menuValue: 'Video Call',
                  route: routes.videocall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'video-call',
                },
                {
                  menuValue: 'Outgoing Call',
                  route: routes.outgoingcall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'outgoing-call',
                },
                {
                  menuValue: 'Incoming Call',
                  route: routes.incomingcall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'incoming-call',
                },
                {
                  menuValue: 'Call History',
                  route: routes.callhistory,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'call-history',
                },
              ],
            },
            {
              menuValue: 'Calendar',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.calendar,
              customSubmenuTwo: false,
              base: 'calendar',
            },

            {
              menuValue: 'Événements',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.socialFeed,
              customSubmenuTwo: false,
              base: 'social-feed',
            },
          ],
        },
        {
          menuValue: 'Layouts',
          hasSubRoute: true,
          showSubRoute: false,

          base: 'layout-horizontal',
          subMenus: [
            {
              menuValue: 'Menu Aside',
              route: null,
              action: 'layoutChange',
              hasSubRoute: false,
              showSubRoute: false,
              base: 'layout-horizontal-sidemenu',
            },
          ],
        },
        {
          menuValue: 'Employé',
          hasSubRouteTwo: true,
          showSubRoute: false,
          icon: 'users',
          base: 'employee',
          subMenus: [
            {
              menuValue: 'Gestion Employé',
              base: 'employee',
              customSubmenuTwo: true,
              subMenusTwo: [
                {
                  menuValue: 'Liste des Employés',
                  route: routes.employeeList,
                  base: 'employee-list',
                },
                {
                  menuValue: 'Présence',
                  route: routes.attendanceemployee,
                  base: 'attendance-employee',
                },
                {
                  menuValue: 'Congés',
                  route: routes.leaveemployee,
                  base: 'leave-employee',
                },
              ],
            },
          ],
        },

        {
          menuValue: 'RH Inetrn',
          hasSubRouteTwo: true,
          showSubRoute: false,
          icon: 'user-star',
          base: 'client',
          base2: 'project',
          base3: 'crm',
          base5: 'ticket',
          subMenus: [
            {
              menuValue: 'Tickets',
              base: 'ticket',
              customSubmenuTwo: true,
              subMenusTwo: [
                {
                  menuValue: 'Tickets',
                  route: routes.ticketList,
                  base: 'ticket-list',
                },
                {
                  menuValue: 'Tickets Detail',
                  route: routes.ticketDetails,
                  base: 'ticket-details',
                },
              ],
            },
            {
              menuValue: 'Jours fériés',
              base: 'holidays',
              customSubmenuTwo: true,

              subMenusTwo: [
                {
                  menuValue: 'Jours fériés nationaux',
                  route: routes.nationalHolidays,
                  base: 'national-holidays',
                },
                {
                  menuValue: 'Jours fériés religieux',
                  route: routes.religiousHolidays,
                  base: 'religious-holidays',
                },
              ],
            },

            {
              menuValue: 'Departments',
              route: routes.departments,
              base: 'departments',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Attendance',
              base: 'attendance',
              customSubmenuTwo: true,
              subMenusTwo: [
                {
                  menuValue: 'Leaves (Admin)',
                  route: routes.leaveadmin,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Leaves (Employee)',
                  route: routes.leaveemployee,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Leave Settings',
                  route: routes.leavesettings,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Attendance (Admin)',
                  route: routes.attendanceadmin,
                  base: 'attendance-admin',
                },
                {
                  menuValue: 'Attendance (Employee)',
                  route: routes.attendanceemployee,
                  base: 'attendance-employee',
                },
              ],
            },

            {
              menuValue: 'Promotion',
              route: routes.promotion,
              base: 'promotion',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Valider justification',
              route: routes.justifyValidation,
              base: 'justify-validation',
              customSubmenuTwo: false,
            },

            {
              menuValue: 'Resignation',
              route: routes.resignation,
              base: 'resignation',
              customSubmenuTwo: false,
            },
          ],
        },
        {
          menuValue: 'RH Externe',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'users',
          base: 'rh-externe',
          subMenus: [
            {
              menuValue: 'Offres',
              route: routes.jobsGrid,
              base: 'jobs-grid',
            },
            {
              menuValue: 'Candidats',
              route: routes.candidateslist,
              base: 'candidates-grid',
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
          ],
        },

        {
          menuValue: 'Administration',
          hasSubRouteTwo: true,
          showSubRoute: false,
          icon: 'user-star',
          base: 'jobs',
          base2: 'candidates',

          base4: 'sales',

          base6: 'payroll',

          base10: 'reports',
          subMenus: [
            {
              menuValue: 'Payroll',
              base: 'payroll',
              customSubmenuTwo: true,
              subMenusTwo: [
                {
                  menuValue: 'Employee Salary',
                  route: '/payroll/employee-salary',
                  base: 'employee-salary',
                },
                {
                  menuValue: 'Payslip',
                  route: '/payroll/payslip',
                  base: 'payslip',
                },
              ],
            },

            {
              menuValue: 'Reports',
              base: 'reports',
              customSubmenuTwo: true,
              subMenusTwo: [
                {
                  menuValue: 'Employee Report',
                  route: routes.employeereport,
                  base: 'employee-report',
                },
                {
                  menuValue: 'Payslip Report',
                  route: '/reports/payslip-report',
                  base: 'payslip-report',
                },
                {
                  menuValue: 'Attendance Report',
                  route: '/reports/attendance-report',
                  base: 'attendance-report',
                },
                {
                  menuValue: 'Leave Report',
                  route: '/reports/leave-report',
                  base: 'leave-report',
                },
                {
                  menuValue: 'Daily Report',
                  route: routes.dailyreport,
                  base: 'daily-report',
                },
              ],
            },
            {
              menuValue: 'General Settings',
              customSubmenuTwo: true,
              base: 'general-settings',
              subMenusTwo: [
                {
                  menuValue: 'Profile',
                  route: routes.profileSettings,
                  base: 'profile-settings',
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Security',
                  route: routes.securitySettings,
                  base: 'security-settings',
                  hasSubRoute: false,
                  showSubRoute: false,
                },
              ],
            },
            {
              menuValue: 'App Settings',
              customSubmenuTwo: true,
              base: 'app-settings',
              subMenusTwo: [
                {
                  menuValue: 'Leave Type',
                  route: routes.leaveType,
                  base: 'leave-type',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  /** --------------------------------- finitooo menu horizentale ---------------------------------------------------------*/
  public getSideBarData3: BehaviorSubject<MainMenu[]> = new BehaviorSubject<
    MainMenu[]
  >(this.horizontalSidebar);
  public resetData3(): void {
    this.sideBar.map((res: SideBar) => {
      res.showAsTab = false;
      res.menu.map((menus: SideBarMenu) => {
        menus.showSubRoute = false;
      });
    });
  }
}
