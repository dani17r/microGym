<script setup lang="ts">
import compDrawers from "@composables/drawerLeft.js";

const { menuSettingDrawerLeft, changeMenuSettingDrawerLeft } = compDrawers();
</script>

<template>
  <div
    class="h-10 bg-primary w-full fixed bottom-0 flex justify-end items-center"
  >
    <q-btn fab-mini flat icon="settings">
      <q-menu :offset="[-50, -50]" class="shadow-none">
        <q-list>
          <q-item
            clickable
            v-for="(menu, index) in menuSettingDrawerLeft"
            :key="index"
            class="max-w-[280px]"
          >
            <q-item-section>
              <q-item-label>{{ menu.title }}</q-item-label>
              <q-item-label caption :lines="3">
                {{ menu.description }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                @update:model-value="changeMenuSettingDrawerLeft(index, menu.id)"
                v-model="menu.active"
                unchecked-icon="clear"
                checked-icon="check"
                dense
              />
            </q-item-section>
            <q-separator color="red" />
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>