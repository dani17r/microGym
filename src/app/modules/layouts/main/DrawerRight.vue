<script setup lang="ts">
import useAuthUserStore from "@store/auth/user";
import compDrawersRight from "@composables/drawerRight";

const { status } = compDrawersRight();

const authStore = useAuthUserStore();
</script>

<template>
  <q-drawer v-model="status" side="right" behavior="mobile">
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