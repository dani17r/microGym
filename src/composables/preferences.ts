import { UserPreferencesI } from "@/types/global";
import { LocalStorage } from "quasar";
import { ref } from "vue";

let storageUserPreferences = LocalStorage.getItem<UserPreferencesI>("user_preferences");

let userPreferences = ref<UserPreferencesI>(
  storageUserPreferences ?? {
    drawerLeft: {
      savePositionItems: true,
      contractWhenExpanding: false,
      auxiliaryButtons: false,
    },
  }
);

export default () => {

  const changeUserPreferences = (newUserPreferences: Partial<UserPreferencesI>) => {
    const newResultUserPreferences = { ...userPreferences.value, ...newUserPreferences };
    LocalStorage.set("user_preferences", newResultUserPreferences);
    userPreferences.value = newResultUserPreferences;
  };

  return {
    changeUserPreferences,
    userPreferences,
  };
}