export interface MenuI {
  title: string;
  urlName: string;
  icon?: string;
  index: number;
  active: boolean;
  menu?: MenuI[];
}

export interface UserPreferencesI {
  drawerLeft: Partial<{
    savePositionItems: boolean;
    contractWhenExpanding: boolean;
    auxiliaryButtons: boolean;
  }>;
}

interface SettingDrawerLeft {
  description: string;
  id: keyof UserPreferencesI["drawerLeft"];
  actions: () => void;
}

export type MenuSettingDrawerlefT = Omit<
  MenuI & SettingDrawerLeft,
  "menu" | "icon" | "index" | "urlName"
>[];

export interface PermitionI {
  id: string;
  name: string;
  status: boolean;
  created: string;
  updated: string;
}

export interface RoleI {
  id: string;
  name: string;
  created: string;
  updated: string;
  expand: {
    permitions: PermitionI[];
  };
  permitions: string[];
}

export interface columnI {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean | undefined;
  align?: "left" | "right" | "center" | undefined;
  sortable?: boolean | undefined;
  sort?: ((a: any, b: any, rowA: any, rowB: any) => number) | undefined;
  headerClasses?: string | undefined;
  format?: () => string | number;
}

export interface PaginateI {
  page: number;
  perPage: number;
  totalItems: number;
  TotalPages?: number;
}

export interface TableRequestPropI {
  pagination: {
    sortBy: string;
    descending: boolean;
    page: number;
    rowsPerPage: number;
  };
  filter?: any;
  getCellValue: (col: any, row: any) => any;
}

export interface DialogI {
  value: boolean;
  id: string | null;
  status: "view" | "updated" | 'new';
  changeId: (id: string|null) => void;
  toggle: (value?: "view" | "updated" | 'new') => void;
}