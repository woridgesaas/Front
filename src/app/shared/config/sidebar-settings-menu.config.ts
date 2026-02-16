import { SidebarSettingsItem } from '../models/sidebar-settings-item.model';
import { routes } from '../routes/routes';

export const SETTINGS_MENU: SidebarSettingsItem[] = [
  {
    icon: 'fa fa-person-walking',
    label: 'Congés',
    route: routes.leaveSettings,
  },
  {
    icon: 'fa fa-clock',
    label: 'Présence et absence',
    route: routes.attendanceSettings,
  },
  {
    icon: 'fa-solid fa-file-pen',
    label: 'Documents administratifs',
    route: routes.documentsTemplateSettings,
  },
  {
    icon: 'fa-solid fa-user-gear',
    label: 'Recrutement',
    route: routes.recruitmentSettings,
  },
];
