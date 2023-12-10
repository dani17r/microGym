<script setup lang="ts">
import ButtonModeDark from "@components/ButtonModeDark.vue";
import LayoutMain from "@modules/layouts/main";
</script>

<template>
  <q-layout view="lhh LpR lfr">
    <LayoutMain.Header />

    <LayoutMain.DrawerLeft />
    <LayoutMain.DrawerRight />

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>

    <ButtonModeDark/>
  </q-layout>
</template>
