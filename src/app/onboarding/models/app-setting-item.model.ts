import { AppSettingKey } from '../enum/app-setting-key.enum';

export interface AppSettingItem {
  label: string;
  description: string;
  icon: string;
  key: AppSettingKey;
}
