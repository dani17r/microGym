<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import DialogCloseAndSave from "@components/DialogCloseAndSave.vue";
// import { superFormClas } from "@utils/supers";
import { capitalize } from "lodash";
import { pb } from "@services/main";
import * as dayjs from "dayjs";

const emit = defineEmits(["toggle"]);
const { id, status, modelValue } = $defineProps<{
  id: string | null;
  status: "view" | "updated" | "new";
  modelValue: boolean;
}>();

const isModeUpdate = computed(() => (status == "updated" ? true : false));
const isModeAdd = computed(() => (status == "new" ? true : false));
const modeUpdate = ref(isModeUpdate.value);
const modeAdd = ref(isModeAdd.value);
const filterOfPermitions = ref();
const allPermitions = ref();
const role = ref();

// const formExample = new superFormClas({
//   name: {
//     value: '',
//     rules: [(val: string) => (val && val.length > 0) || "No puede estar vacio"],
//   },
//   permitions: {
//     value: <any[]>[],
//     rules: [(val: string) => (val && val.length > 0) || "No puede estar vacio"],
//   }
// });

// console.log(formExample.name.set('a')); //Aqui name no existe
// console.log(formExample.data.a.rules);
// console.log(formExample.a.);

const form = reactive({
  name: {
    value: "",
    copy: "",
    ref: <any>{},
    rules: [(val: string) => (val && val.length > 0) || "No puede estar vacio"],
    set(val: string) {
      this.copy = val;
      this.value = val;
    },
    isChange() {
      let value = JSON.stringify(this.value);
      let copy = JSON.stringify(this.copy);
      return value != copy;
    },
    validate() {
      if(this.ref) return !this.ref.validate();
      else return false;
    },
    isErrors() {
      if(this.ref) {
        return this.ref.hasError || !this.ref.modelValue?.length;
      } else return false
    },
    reset() {
      if (this.ref.resetValidation) this.ref.resetValidation();
      if (this.isChange()) this.value = this.copy;
    },
  },
  permitions: {
    value: <any[]>[],
    copy: <any[]>[],
    ref: <any>{},
    rules: [(val: string) => (val && val.length > 0) || "No puede estar vacio"],
    set(val: any[]) {
      this.copy = val;
      this.value = val;
    },
    isChange() {
      let value = JSON.stringify(this.value);
      let copy = JSON.stringify(this.copy);
      return value !== copy;
    },
    validate() {
      if(this.ref) return !this.ref.validate();
      else return false;
    },
    isErrors() {
      if(this.ref) {
        return this.ref.hasError || !this.ref.modelValue?.length;
      } else return false
    },
    reset() {
      if (this.ref.resetValidation) this.ref.resetValidation();
      if (this.isChange()) this.value = this.copy;
    },
  },
  checkValidation() {
    return this.name.validate() || this.permitions.validate();
  },
  checkIsErrors() {
    return this.name.isErrors() || this.permitions.isErrors();
  },
  reset() {
    this.name.reset();
    this.permitions.reset();
  },
  verifyIsNotChanges() {
    return this.name.isChange() || this.permitions.isChange();
  },
});

const dialog = reactive({
  value: false,
  toggle() {
    this.value = !this.value;
  },
});

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
  modeUpdate.value = isModeUpdate.value;
  modeAdd.value = isModeAdd.value;

  if (!modelValue) {
    /* Cuando se cierre el modal modelValue == false 
      Entonces desacticamos los campos en modo edicion */
    modeUpdate.value = false;
  }

  if (id) {
    pb.collection("roles")
      .getOne(id, { expand: "permitions" })
      .then((data: any) => {
        data.created = dayjs(data.created).format("YYYY/MM/DD hh:mmA");
        data.updated = dayjs(data.updated).format("YYYY/MM/DD hh:mmA");
        data.name = capitalize(data.name);

        form.permitions.set(data.expand.permitions);
        form.name.set(data.name);
        role.value = data;
      });
  } else {
    form.permitions.set([]);
    form.name.set("");
    role.value = null;
  }
});
</script>

<template>
  <q-dialog
    @shake="[dialog.toggle(), form.checkValidation()]"
    :persistent="form.verifyIsNotChanges()"
    @update:model-value="emit('toggle')"
    :model-value="modelValue"
  >
    <q-card class="shadow-none min-w-[510px]">
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
            :ref="(el) => (form.name.ref = el)"
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
          popup-content-class="shadow-none scroll"
          :ref="(el) => (form.permitions.ref = el)"
          :disable="!modeUpdate && !modeAdd"
          v-model="form.permitions.value"
          :rules="form.permitions.rules"
          :options="filterOfPermitions"
          input-class="cursor-default"
          option-label="name"
          display-value-html
          @filter="filter"
          label="Permisos"
          use-chips
          clearable
          use-input
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
            @click=""
            :color="'green'"
            label="Aceptar"
            flat
            :disabled="form.checkIsErrors()"
          />
        </template>
        <template v-else>
          <q-btn
            @click="modeUpdate = true"
            v-if="!modeUpdate"
            :color="'white'"
            label="Editar"
            flat
          />
          <div v-else>
            <q-btn
              flat
              :color="'red'"
              label="Cancelar"
              @click="
                [
                  !isModeUpdate ? (modeUpdate = false) : null,
                  form.reset(),
                ]
              "
              v-close-popup="isModeUpdate"
            />
            <q-btn
              flat
              :color="'green'"
              label="Guardar"
              @click="[form.checkValidation(), form.verifyIsNotChanges()]"
              :disabled="form.checkIsErrors() || !form.verifyIsNotChanges()"
            />
          </div>
        </template>
      </q-card-actions>
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
