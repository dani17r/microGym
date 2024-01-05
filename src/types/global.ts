import { Ref } from "vue";

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
  description: string;
  updated: string;
  status: boolean;
  created: string;
  name: string;
  id: string;
}

export interface PermitionParamsI {
  create: {
    description: string;
    status: boolean;
    name: string;
  };
}

interface OptionsI {
  last?: boolean,
}

export interface RoleI extends OptionsI {
  id: string;
  name: string;
  created: string;
  updated: string;
  expand: {
    permitions: PermitionI[];
  };
  permitions: string[];
}

export interface RoleParamsI {
  create: {
    name: string;
    permitions: string[];
  };
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
  TotalPages: number;
  sort: {
    field: string;
    order: "asc" | "desc";
  };
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

export type StatusVieUpdNewT = "view" | "updated" | "new";
export type StatusUpdNewT = "updated" | "new";

export interface DialogI <Status>{
  value: boolean;
  id: string | null;
  status: Status;
  changeId: (id: string|null) => void;
  toggle: (value?: Status) => void;
}

interface BasicInputI {
  value: any
  rules: ((val: string) => true | string)[];
}

interface InputI {
  set(val: any): void;
  isChange(): boolean;
  validate(): boolean;
  isErrors(): boolean;
  reset(): void;
  ref?: Object|any;
  copy: any;
}

interface FormI <T>{
  verifyIsNotChanges(): boolean;
  checkValidation(): boolean;
  checkIsErrors(): boolean;
  getValues(): { [key in keyof T]: keyof T };
  update(): void;
  reset(): void;
}

export type SuperInputUnionT = InputI & BasicInputI;
export type SuperInputT<T> = { [key in keyof T]: SuperInputUnionT };
export type SuperFormT<T> = SuperInputT<T> & FormI<T>;

export interface CompTableParamsI<T> {
  setData: (...args: any) => void;
  paginated: Ref<PaginateI>;
  tableName: string;
  data: Ref<T[]>;
}
export interface QueryDataTableI {
  expand?: string;
  filter?: string;
  sort?: string;
}

export interface EventSelectionTable {
  rows: readonly any[];
  keys: readonly any[];
  added: boolean;
  evt: Event & {
    ctrlKey?: Boolean;
    shiftKey?: boolean;
  };
}