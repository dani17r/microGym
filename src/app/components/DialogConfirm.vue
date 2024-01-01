<script setup lang="ts">
const emit = defineEmits(['toggle', 'yes']);
const { modelValue } = $defineProps<{
  modelValue: boolean;
}>();
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="emit('toggle')">
    <q-card class="shadow-none min-w-[300px]">
      <q-card-section>
        <h1 class="text-h6">¿ Estas seguro de esta accion ?</h1>
        <p>Confirmar para continuar.</p>
        
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          @click="[emit('yes'), emit('toggle')]"
          icon="save"
          label="Si"
          dense
          flat
        />
        <q-btn
          @click="emit('toggle')"
          icon="cancel"
          label="No"
          dense
          flat
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
