<script setup lang="ts">
import useGlobalStore from "@store/global.ts";

const globalStore = useGlobalStore();
</script>

<template>
  <q-btn
    color="primary"
    fab-mini
    :icon="globalStore.isDark.value ? 'light_mode' : 'mode_night'"
    @click="globalStore.modeDarkToggle()"
    class="fixed bottom-4 right-4"
  />
</template>
