import { UserPreferencesI, MenuI } from "@/types/global";
import compPreferences from "@composables/preferences";
import { filterNestedMenuByTitle } from "@utils/index";
import { LocalStorage } from "quasar";
import { cloneDeep } from "lodash";
import { reactive, ref } from "vue";
import {
  menuSettingDrawerLeft,
  superMenuDefault,
} from "@store/static";

const status = ref(Boolean(LocalStorage.getItem("drawerLeft")));
let superMenu = ref(superMenuDefault);
const searchInput = ref("");
const lifecycle = reactive({
  onMount: false
})

export default () => {
  const { changeUserPreferences, userPreferences } = compPreferences();
  const copySuperMenu = cloneDeep(superMenu.value);

  const runMenuDrawer = () =>{
    if (userPreferences.value?.drawerLeft.savePositionItems) {
      let current = LocalStorage.getItem<MenuI[]>("super_menu");
      if (current) superMenu.value = current;
    }
  }

  const runMenuDrawerSetting = () => {
    menuSettingDrawerLeft.map((menu) => {
      const drawerLeftArray = Object.keys(userPreferences.value.drawerLeft);
      if (drawerLeftArray.includes(menu.id)) {
        menu.active = Boolean(userPreferences.value.drawerLeft[menu.id]);
      }
      return menu;
    });
  }

  const toggleDrawer = () => {
    status.value = !status.value;
    LocalStorage.set("drawerLeft", status.value);
  };

  const changeMenuSettingDrawerLeft = (
    index: number,
    field: keyof UserPreferencesI["drawerLeft"]
  ) => {
    setTimeout(() => {
      menuSettingDrawerLeft[index].actions();

      const drawerLeft = { [field]: menuSettingDrawerLeft[index].active };
      changeUserPreferences({
        drawerLeft: { ...userPreferences.value.drawerLeft, ...drawerLeft },
      });
    }, 100);
  };

  const searchItemsInDrawerLeft = () => {
    if (searchInput.value) {
      superMenu.value = filterNestedMenuByTitle(
        superMenuDefault,
        searchInput.value
      );
    } else superMenu.value = copySuperMenu;
  };

  const autoContractItems = (menu: MenuI[], index: number) => {
    menu.map((item: MenuI) => {
      const condition = item.index != index && item.active && item.menu?.length;
      if (condition) item.active = false;
      return item;
    });
  };

  const changeStatusMenu = (menu: MenuI[], index: number) => {
    if (searchInput.value.length < 1) {
      setTimeout(() => {
        if (userPreferences.value?.drawerLeft.contractWhenExpanding) {
          autoContractItems(menu, index);
        }
        if (userPreferences.value?.drawerLeft.savePositionItems) {
          setTimeout(
            () => LocalStorage.set("super_menu", superMenu.value),
            100
          );
        }
      }, 100);
    }
  };

  //------------------
  const run = () => {
    if (!lifecycle.onMount) {
      runMenuDrawer();
      runMenuDrawerSetting();
      lifecycle.onMount = true;
    }
  };

  run();

  return {
    changeMenuSettingDrawerLeft,
    searchItemsInDrawerLeft,
    menuSettingDrawerLeft,
    changeStatusMenu,
    superMenuDefault,
    toggleDrawer,
    searchInput,
    superMenu,
    status,
  };
};
