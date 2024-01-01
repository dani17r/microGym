<script setup lang="ts">
import DialogCloseAndSave from "@components/DialogCloseAndSave.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { superForm, superToggle } from "@utils/supers";
import { PermitionI, RoleI } from "@/types/global";
import { capitalize } from "lodash";
import { pb } from "@services/main";
import dayjs from "dayjs";

const emit = defineEmits(["toggle", "create", "update"]);
const props = $defineProps<{
  id: string | null;
  status: "view" | "updated" | "new";
  modelValue: boolean;
  loading: boolean;
}>();

const isModeUpdate = computed(() => (props.status == "updated" ? true : false));
const isModeAdd = computed(() => (props.status == "new" ? true : false));
const modeUpdate = ref(isModeUpdate.value);
const modeAdd = ref(isModeAdd.value);
const filterOfPermitions = ref();

const allPermitions = ref();
const role = ref<RoleI>();

const form = superForm({
  name: {
    value: "",
    rules: [(val: string) => (val && val.length > 0) || "No puede estar vacio"],
  },
  permitions: {
    value: <PermitionI[]>[],
    rules: [(val: string) => (val && val.length > 0) || "No puede estar vacio"],
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

const edite = () => {
  modeUpdate.value = true;
};

const save = () => {
  if(!form.verifyIsNotChanges() || !form.checkValidation()) {
    let data = {
      permitions: form.permitions.value.map(({ id }: PermitionI) => id),
      name: form.name.value,
      id: props.id,
    }
    emit('update', data);
    form.update();
  }
};

const newSave = () => {
  emit('create', {
    name: form.name.value,
    permitions: form.permitions.value.map(({ id }: PermitionI) => id),
  })
  form.reset();
};

const dialog = superToggle();

const filter = (val: string, update: (arg: any) => void) => {
  if (val === "") {
    update(() => (filterOfPermitions.value = allPermitions.value));
    return;
  }

  update(() => {
    filterOfPermitions.value = allPermitions.value.filter((v: any) =>
      v.name.toLowerCase().includes(val.toLowerCase())
    );
  });
};

onMounted(() => {
  pb.collection("permitions")
    .getFullList()
    .then((data) => {
      filterOfPermitions.value = data;
      allPermitions.value = data;
    });
});

watchEffect(() => {
  if (props.modelValue) {
    /** Solo cuando el modal se abra */
    
    modeUpdate.value = isModeUpdate.value;
    modeAdd.value = isModeAdd.value;
    
    if (props.status=='new') {
      form.permitions.set([]);
      form.name.set("");
    }
    
    if (props.id) {
      pb.collection("roles")
        .getOne<RoleI>(props.id, { expand: "permitions" })
        .then((data) => {
          data.created = dayjs(data.created).format("YYYY/MM/DD hh:mmA");
          data.updated = dayjs(data.updated).format("YYYY/MM/DD hh:mmA");
          data.name = capitalize(data.name);
  
          form.permitions.set(data.expand.permitions);
          form.name.set(data.name);
          role.value = data;
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
  <q-dialog
    @shake="[dialog.toggle(), form.checkValidation()]"
    :persistent="form.verifyIsNotChanges()"
    @update:model-value="emit('toggle')"
    :model-value="props.modelValue"
  >
    <q-card class="shadow-none min-w-[510px] relative">
      <q-card-section>
        <div v-if="role" class="text-xs float-right text-right">
          <p>creado:{{ role.created }}</p>
          <p>Actualizado:{{ role.updated }}</p>
        </div>
        <h1 class="text-h6">
          {{ !modeUpdate ? (modeAdd ? "Nuevo" : "Ver") : "Actualizar" }} Rol
        </h1>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          <q-input
            :class="{ 'q-input-modify': !modeUpdate && !modeAdd }"
            :ref="(el: any) => (form.name.ref = el)"
            :disable="!modeUpdate && !modeAdd"
            v-model="form.name.value"
            :rules="form.name.rules"
            label="Rol"
            type="text"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          :class="{ 'q-input-modify': !modeUpdate && !modeAdd }"
          :ref="(el: any) => (form.permitions.ref = el)"
          popup-content-class="shadow-none scroll"
          :disable="!modeUpdate && !modeAdd"
          v-model="form.permitions.value"
          :rules="form.permitions.rules"
          :options="filterOfPermitions"
          input-class="cursor-default"
          option-label="name"
          display-value-html
          @filter="filter"
          label="Permisos"
          use-input
          use-chips
          clearable
          multiple
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <q-chip
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
              :removable="modeUpdate"
              text-color="white"
              color="primary"
            >
              {{ scope.opt.name }}
            </q-chip>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right">
        <template v-if="modeAdd">
          <q-btn @click="form.reset()" label="Limpiar" flat />
          <q-btn
            :disabled="form.checkIsErrors()"
            @click="newSave()"
            :color="'green'"
            label="Aceptar"
            flat
          />
        </template>
        <template v-else>
          <q-btn
            @click="edite()"
            v-if="!modeUpdate"
            :color="'white'"
            label="Editar"
            flat
          />
          <div v-else>
            <q-btn
              @click="cancel()"
              label="Cancelar"
              :color="'red'"
              flat
            />
            <q-btn
              :disabled="form.checkIsErrors() || !form.verifyIsNotChanges()"
              :color="'green'"
              @click="save()"
              label="Guardar"
              flat
            />
          </div>
        </template>
      </q-card-actions>

       <q-inner-loading :showing="props.loading">
        <q-spinner-hourglass color="primary" size="2em" />
      </q-inner-loading>
    </q-card>
  </q-dialog>

  <DialogCloseAndSave
    :hide-save-and-close="!form.checkIsErrors()"
    @toggle="dialog.toggle()"
    v-model="dialog.value"
    @yes="emit('toggle')"
  />
</template>

<style>
.q-input-modify.q-field--disabled .q-field__inner {
  cursor: default !important;
}
.q-input-modify.q-field--disabled .q-field__control > div {
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
