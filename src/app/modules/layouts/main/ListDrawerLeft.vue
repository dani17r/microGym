<script setup lang="ts">
import compDrawerLeft from "@composables/drawerLeft.ts";
import { MenuI } from "@/types/global";
import { Router } from "vue-router";

const { superMenu, changeStatusMenu } = compDrawerLeft();

const go = ($router: Router, urlName: string) => {
  setTimeout(()=> $router.replace({ name: urlName }), 300);
};
</script>

<template>
  <q-scroll-area class="fit" style="height: calc(100% - 150px)">
    <q-list padding class="text-grey-8 pb-10">
      <q-expansion-item
        v-for="(menu1, index1) in superMenu"
        :key="index1"
        @update:model-value="() => changeStatusMenu(superMenu, index1)"
        class="hover:backdrop-brightness-125"
        :class="[{ 'backdrop-brightness-110': menu1.active }]"
        @click="go($router, menu1.urlName)"
        v-model="menu1.active"
        :label="menu1.title"
      >
        <q-expansion-item
          v-for="(menu2, index2) in menu1.menu"
          :key="index2"
          @update:model-value="
            () => changeStatusMenu(menu1.menu as MenuI[], index2)
          "
          :class="[{ 'bg-primary': menu2.active && menu2.menu }]"
          @click="go($router, menu2.urlName)"
          :header-inset-level="0.2"
          :hide-expand-icon="!Boolean(menu2.menu)"
          :icon="menu2.icon"
          :label="menu2.title"
          v-model="menu2.active"
        >
          <q-item
            v-for="(menu3, index3) in menu2.menu"
            :key="index3"
            @click="
              [
                changeStatusMenu(menu2.menu as MenuI[], index3),
                go($router, menu3.urlName),
              ]
            "
            class="bg-primary brightness-125"
            clickable
            v-model="menu3.active"
            :inset-level="0.4"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="menu3.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ menu3.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-expansion-item>
    </q-list>
  </q-scroll-area>
</template>
