<script setup lang="ts">
import compDrawersLeft from "@composables/drawerLeft";
import LayoutMain from "@modules/layouts/main";

const { status, searchInput, searchItemsInDrawerLeft } = compDrawersLeft();
</script>

<template>
  <q-drawer
    show-if-above
    v-model="status"
    side="left"
    behavior="desktop"
    :width="250"
  >
    <div style="width: 100%; height: calc(100vh - 60px)">
      <q-toolbar>
        <q-input
          flat
          class="full-width"
          placeholder="Search Menu"
          v-model="searchInput"
          :dark="$q.dark.isActive"
          @update:model-value="() => searchItemsInDrawerLeft()"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
      <LayoutMain.ListDrawerLeft />
      <LayoutMain.ButtonConfigDrawerLeft />
    </div>
  </q-drawer>
</template>