import { AppSettingKey } from '../enum/app-setting-key.enum';
import { AppSettingItem } from '../models/app-setting-item.model';

export const APP_SETTINGS_ITEMS: AppSettingItem[] = [
  {
    label: 'Congés',
    description: 'Congés annuels et exceptionnels',
    icon: 'fa-solid fa-person-walking',
    key: AppSettingKey.LEAVE,
  },
  {
    label: 'Présence & Absence',
    description: 'Horaires, justifications, seuils',
    icon: 'fa-solid fa-clock',
    key: AppSettingKey.ATTENDANCE,
  },
  {
    label: 'Documents administratifs',
    description: 'Modèles de documents RH',
    icon: 'fa-solid fa-file-pen',
    key: AppSettingKey.DOCUMENTS,
  },
  {
    label: 'Recrutement',
    description: 'Site vitrine et canaux de dépôt',
    icon: 'fa-solid fa-user-gear',
    key: AppSettingKey.RECRUITMENT,
  },
];
