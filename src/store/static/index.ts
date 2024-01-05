import { MenuI, MenuSettingDrawerlefT } from "@/types/global";
import { formatDateOne } from "@utils/index";
import { LocalStorage } from "quasar";
import { reactive } from "vue";
import dayjs from "dayjs";

export let superMenuDefault = <MenuI[]>[
  {
    title: "Sistema",
    urlName: "sistem",
    active: false,
    index: 0,
    menu: [
      {
        icon: "manage_accounts",
        title: "Roles",
        urlName: "roles",
        active: false,
        index: 0,
      },
      {
        icon: "lock_person",
        title: "Permisos",
        urlName: "permitions",
        active: false,
        index: 1,
      },
      {
        icon: "admin_panel_settings",
        title: "Servicios",
        urlName: "",
        active: false,
        index: 2,
        menu: [
          {
            icon: "poll",
            title: "Planes",
            active: false,
            urlName: "",
            index: 0,
          },
          {
            icon: "event_available",
            title: "Eventos",
            urlName: "",
            active: false,
            index: 1,
          },
          {
            icon: "whatshot",
            title: "Menbrecias",
            active: false,
            urlName: "",
            index: 2,
          },
          {
            icon: "nordic_walking",
            title: "Entrenamientos",
            active: false,
            urlName: "",
            index: 3,
          },
          {
            icon: "heart_broken",
            title: "Rutinas",
            active: false,
            urlName: "",
            index: 4,
          },
        ],
      },
      {
        icon: "person",
        title: "Cuentas",
        urlName: "",
        active: false,
        index: 0,
      },
      {
        icon: "settings",
        title: "Settings",
        active: false,
        index: 1,
        urlName: "",
      },
    ],
  },
  {
    title: "Tienda",
    active: false,
    urlName: "store",
    index: 1,
    menu: [
      {
        icon: "list",
        title: "Categorias",
        urlName: "",
        active: false,
        index: 0,
      },
      {
        icon: "branding_watermark",
        title: "Productos",
        urlName: "",
        active: false,
        index: 1,
      },
      {
        icon: "build",
        title: "Opciones",
        urlName: "",
        active: false,
        index: 2,
      }, //IVA, Descuentos, Porcentajes, etc
      {
        icon: "local_shipping",
        title: "Compras",
        urlName: "",
        active: false,
        index: 3,
      },
      {
        icon: "add_card",
        title: "Ventas",
        urlName: "",
        active: false,
        index: 4,
      },
    ],
  },
  {
    title: "Administracion",
    urlName: "administration",
    active: false,
    index: 2,
    menu: [
      {
        icon: "assignment_ind",
        title: "Entrenadores",
        active: false,
        urlName: "",
        index: 0,
        menu: [
          {
            icon: "task_alt",
            title: "Asistencias",
            urlName: "",
            active: false,
            index: 0,
          },
          {
            icon: "list",
            title: "Categorias",
            urlName: "",
            active: false,
            index: 1,
          },
          {
            icon: "assured_workload",
            urlName: "",
            title: "Pagos",
            active: false,
            index: 2,
          },
        ],
      },
      {
        icon: "supervisor_account",
        urlName: "",
        title: "Clientes",
        active: false,
        index: 1,
        menu: [
          {
            icon: "task_alt",
            title: "Asistencias",
            urlName: "",
            active: false,
            index: 0,
          },
          {
            icon: "list",
            title: "Categorias",
            urlName: "",
            active: false,
            index: 1,
          },
          {
            icon: "assured_workload",
            title: "Pagos",
            urlName: "",
            active: false,
            index: 2,
          },
        ],
      },
    ],
  },
];

export let menuSettingDrawerLeft = reactive<MenuSettingDrawerlefT>([
  {
    title: "Guardar posicion",
    id: "savePositionItems",
    active: false,
    description:
      "Guardara la ultima posicion/estado que se encuentre selecciono, sea expandido o contraido.",
    actions() {
      // resetChangeStatusMenu
      LocalStorage.set("super_menu", superMenuDefault);
    },
  },
  {
    title: "Contraer al expandir",
    id: "contractWhenExpanding",
    active: false,
    description:
      "Cuando se expanda un item, automaticamente se contraeran los demas items expandidos.",
    actions() {},
  },
  {
    title: "Bontones auxiliares",
    id: "auxiliaryButtons",
    active: false,
    description:
      "Botones para expandir y contraer los items respectivos no importando como esten.",
    actions() {},
  },
]);

export const columnsRoles = [
  {
    name: "count",
    label: "#",
    field: "id",
    sortable: true,
    style: "width: 5px;",
    align: "left",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    format: (val: string) => `${val.substring(0, 15)}${val.length > 15 ? '...' : ''}`,
    sortable: true,
    style: "width: 20px;",
    align: "left",
  },
  {
    name: "permitions",
    label: "Permisos",
    style: "width: 100px;",
    align: "left",
  },
  {
    name: "created",
    label: "Creado el",
    sortable: true,
    field: "created",
    format: (val: string) => dayjs(val).format(formatDateOne),
    style: "width: 60px;",
    align: "left",
  },
  {
    name: "updated",
    label: "Actualizado el",
    field: "updated",
    sortable: true,
    format: (val: string) => dayjs(val).format(formatDateOne),
    style: "width: 60px;",
    align: "left",
  },
  {
    name: "actions",
    field: "id",
    sortable: false,
    align: "center",
  },
];

export const columnsPermitions = [
  {
    name: "count",
    label: "#",
    field: "id",
    sortable: true,
    style: "width: 5px;",
    align: "left",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    format: (val: string) => `${val.substring(0, 15)}${val.length > 15 ? '...' : ''}`,
    style: "width: 20px;",
    sortable: true,
    align: "left",
  },
  {
    name: "description",
    label: "Descripcion",
    field: "description",
    format: (val: string) => `${val.substring(0, 30)}${val.length > 30 ? '...':''}`,
    style: "width: 30px;",
    align: "left",
  },
  {
    name: "status",
    label: "estado",
    field: "status",
    format: (val: boolean) => val ? 'Activo':'Desactivo',
    align: "left",
  },
  {
    name: "created",
    label: "Creado el",
    sortable: true,
    field: "created",
    format: (val: string) => dayjs(val).format(formatDateOne),
    style: "width: 60px;",
    align: "left",
  },
  {
    name: "updated",
    label: "Actualizado el",
    field: "updated",
    sortable: true,
    format: (val: string) => dayjs(val).format(formatDateOne),
    style: "width: 60px;",
    align: "left",
  },
  {
    name: "actions",
    field: "id",
    sortable: false,
    align: "center",
  },
];