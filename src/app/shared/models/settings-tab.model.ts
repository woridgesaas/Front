export interface SettingsTab {
  label: string;
  icon: string;
  link: string;
  exact: boolean;
  activeWhenStartsWith?: string;
}
