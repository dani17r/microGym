<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(['toggle', 'yes']);
const { modelValue, hideSaveAndClose } = $defineProps<{
  modelValue: boolean;
  hideSaveAndClose?: boolean;
}>();

const closeAnSave = ref(false);
</script>
<template>
  <q-dialog :model-value="modelValue" @update:model-value="emit('toggle')">
    <q-card class="shadow-none min-w-[300px]">
      <q-card-section>
        <h1 class="text-h6">¿Estas seguro que quiere salir?</h1>
        <p>Puedes perder los cambios realizados.</p>
        <q-checkbox
          label="Quiero guardar al cerrar"
          v-if="hideSaveAndClose"
          v-model="closeAnSave"
          color="orange"
          class="-ml-2"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          @click="[emit('yes'), emit('toggle')]"
          :color="'green'"
          icon="save"
          label="Si"
          dense
          flat
        />
        <q-btn
          @click="emit('toggle')"
          :color="'red'"
          icon="cancel"
          label="No"
          dense
          flat
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
