<script setup lang="ts">
import compDrawerLeft from "@composables/drawerLeft";
import compDrawerRight from "@composables/drawerRight";

const { toggleDrawer:toggleLeftDrawer } = compDrawerLeft();
const { toggleDrawer:toggleRightDrawer } = compDrawerRight();
</script>

<template>
  <q-header class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title>
        <q-avatar>
          <img src="@assets/vue.svg" />
        </q-avatar>
        Dagym
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>
</template>