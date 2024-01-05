<script setup lang="ts">
import DialogCloseAndSave from "@components/DialogCloseAndSave.vue";
import { superForm, superToggle } from "@utils/supers";
import { computed, ref, watchEffect } from "vue";
import { PermitionI } from "@/types/global";
import { capitalize } from "lodash";
import { pb } from "@services/main";
import dayjs from "dayjs";

const emit = defineEmits(["toggle", "create", "update"]);
const props = $defineProps<{
  id: string | null;
  status: "updated" | "new";
  modelValue: boolean;
  loading: boolean;
}>();

const isModeUpdate = computed(() => (props.status == "updated" ? true : false));
const modeUpdate = ref(isModeUpdate.value);

const permition = ref<PermitionI>();

const form = superForm({
  name: {
    value: "",
    rules: [(val: string) => (val && val.length > 0) || "No puede estar vacio"],
  },
  description: {
    value: "",
    rules: [(val: string) => (val && val.length > 0) || "No puede estar vacio"],
  },
  status: {
    value: false,
    rules: [(val: boolean) => (val == null) || "No puede ser nulo"],
  },
});

const cancel = () => {
  if (isModeUpdate.value) {
    emit('toggle');
  }
  else {
    modeUpdate.value = false;
    form.reset();
  }
};

const save = () => {
  if (!form.verifyIsNotChanges() || !form.checkValidation()) {
    let data = {
      description: form.description.value,
      status: form.status.value,
      name: form.name.value,
      id: props.id,
    }
    emit('update', data);
    form.update();
  }
};

const newSave = () => {
  emit('create', {
    description: form.description.value,
    status: form.status.value,
    name: form.name.value,
  })
  form.reset();
};

const dialog = superToggle();

watchEffect(() => {
  if (props.modelValue) {
    /** Solo cuando el modal se abra */

    modeUpdate.value = isModeUpdate.value;

    if (props.status == 'new') {
      form.description.set("");
      form.status.set(false);
      form.name.set("");
    }

    if (props.id) {
      pb.collection("permitions")
        .getOne<PermitionI>(props.id)
        .then((data) => {
          data.created = dayjs(data.created).format("YYYY/MM/DD hh:mmA");
          data.updated = dayjs(data.updated).format("YYYY/MM/DD hh:mmA");
          data.name = capitalize(data.name);

          form.description.set(data.description);
          form.status.set(data.status);
          form.name.set(data.name);
          permition.value = data;
          form.update();
        });
    }
  }
  else {
    /* Cuando se cierre el modal modelValue == false 
      Entonces desacticamos los campos en modo edicion */
    modeUpdate.value = false;
  }
});
</script>

<template>
  <q-dialog @shake="[dialog.toggle(), form.checkValidation()]" :persistent="form.verifyIsNotChanges()"
    @update:model-value="emit('toggle')" :model-value="props.modelValue">
    <q-card class="shadow-none min-w-[510px] relative">
      <q-card-section>
        <div v-if="permition" class="text-xs float-right text-right">
          <p>creado:{{ permition.created }}</p>
          <p>Actualizado:{{ permition.updated }}</p>
        </div>
        <h1 class="text-h6">
          {{ !modeUpdate ? "Nuevo" : "Actualizar" }} Rol
        </h1>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          <q-input :ref="(el: any) => (form.name.ref = el)" v-model="form.name.value" :rules="form.name.rules"
            label="Name" type="text" />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input :ref="(el: any) => (form.description.ref = el)" v-model="form.description.value"
          :rules="form.description.rules" label="Description" type="text" />
      </q-card-section>

      <q-card-section>
        <q-toggle :ref="(el: any) => (form.status.ref = el)" v-model="form.status.value" :rules="form.status.rules" label="Status" color="primary" />
      </q-card-section>

      <q-card-actions align="right">
        <template v-if="!isModeUpdate">
          <q-btn @click="form.reset()" label="Limpiar" flat />
          <q-btn :disabled="form.checkIsErrors()" @click="newSave()" :color="'green'" label="Aceptar" flat />
        </template>
        <template v-else>
          <q-btn @click="cancel()" label="Cancelar" :color="'red'" flat />
          <q-btn :disabled="form.checkIsErrors() || !form.verifyIsNotChanges()" :color="'green'" @click="save()"
            label="Guardar" flat />
        </template>
      </q-card-actions>

      <q-inner-loading :showing="props.loading">
        <q-spinner-hourglass color="primary" size="2em" />
      </q-inner-loading>
    </q-card>
  </q-dialog>

  <DialogCloseAndSave :hide-save-and-close="!form.checkIsErrors()" @toggle="dialog.toggle()" v-model="dialog.value"
    @yes="emit('toggle')" />
</template>

<style>
.q-input-modify.q-field--disabled .q-field__inner {
  cursor: default !important;
}

.q-input-modify.q-field--disabled .q-field__control>div {
  opacity: 1 !important;
}

.q-input-modify .q-field__control:before {
  border: none;
}

.q-input-modify .q-field--standard .q-field__control:before {
  border: none;
}

.q-input-modify .q-select__dropdown-icon {
  opacity: 0;
}
</style>
