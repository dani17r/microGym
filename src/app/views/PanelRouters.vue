<script setup lang="ts">
import compDrawerLeft from "@composables/drawerLeft";
import { useRoute } from "vue-router";
import { computed } from "vue";

const { superMenu } = compDrawerLeft();
const route = useRoute();

const indexMenuDrawerLeft = computed(() => Number(route.meta.index));
</script>

<template>
  <div class="q-pa-lg flex justify-center items-center q-gutter-lg">
    <q-card
      v-for="(menu, index) in superMenu[indexMenuDrawerLeft].menu"
      class="shadow-none min-w-2/12 cursor-pointer"
      :key="index"
      @click="$router.push({ name: menu.urlName })"
    >
      <q-card-section>
        <q-item-section avatar class="flex justify-center items-center p-0">
          <q-icon :name="menu.icon" />
        </q-item-section>
        <div class="text-h6 text-center">{{ menu.title }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
