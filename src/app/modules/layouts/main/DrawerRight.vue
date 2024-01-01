<script setup lang="ts">
import useAuthUserStore from "@store/auth/user";
import compDrawersRight from "@composables/drawerRight";
import useGlobalStore from "@store/global";

const { hideBtnModeDarkToggle, hideBtnModeDark } = useGlobalStore();
const { status } = compDrawersRight();

const authStore = useAuthUserStore();
</script>

<template>
  <q-drawer v-model="status" side="right" behavior="mobile">
    <q-list>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Ocultar boton modo oscuro</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle color="primary" :model-value="hideBtnModeDark" @click="hideBtnModeDarkToggle()"/>
        </q-item-section>
      </q-item>
    </q-list>
    <q-item class="fixed w-full bottom-2">
      <q-item-section>
        <q-btn
          color="primary"
          icon="logout"
          label="Logout"
          @click="authStore.logout()"
        />
      </q-item-section>
    </q-item>
  </q-drawer>
</template>
