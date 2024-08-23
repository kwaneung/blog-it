import { Icons } from '@/components/icons';

export interface INavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface INavItemWithChildren extends INavItem {
  items: INavItemWithChildren[];
}

export interface IMainNavItem extends INavItem {}

export interface ISidebarNavItem extends INavItemWithChildren {}
