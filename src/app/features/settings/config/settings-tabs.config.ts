import { SettingsTab } from '../../../shared/models/settings-tab.model';
import { routes } from '../../../shared/routes/routes';

export const SETTINGS_TABS: SettingsTab[] = [
 
  {
    label: "Paramètres d'application",
    icon: 'fa-solid fa-screwdriver-wrench',
    link: routes.leaveSettings,
    exact: false,
    activeWhenStartsWith: '/settings/app-settings/',
  },
];
