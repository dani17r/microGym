<script setup lang="ts">
import compTables from "@composables/tables";
import { onMounted, reactive } from "vue";
import useRolesStore from "@store/roles";

import DialogRoleViewUpdateDelete from "@modules/roles/DialogRoleViewUpdateDelete.vue";
import { DialogI } from "@/types/global";

const { roles, columns, pagination: paginated } = useRolesStore();
const { tableRef, filtering, loading, pagination, rows, onRequest } =
  compTables("roles", roles, paginated);

const dialog = reactive({
  value: false,
  id: null,
  status: "view",
  toggle: (value = "view") => {
    dialog.status = value;
    dialog.value = !dialog.value;
  },
  changeId: (id: string|null) => {
    if (id == null) dialog.id = id;
    else if (id != dialog.id) dialog.id = id;
  },
}) as DialogI;

onMounted(() => tableRef.value.requestServerInteraction());
</script>

<template>
  <div class="q-pa-md">
    <q-table
      :pagination="pagination"
      @request="onRequest"
      :filter="filtering"
      class="shadow-none"
      :loading="loading"
      :columns="columns"
      binary-state-sort
      virtual-scroll
      ref="tableRef"
      row-key="name"
      :rows="rows"
    >
      <template v-slot:top-left>
        <div class="flex flex-col -mb-3">
          <h1 class="text-h6">Roles</h1>
          <q-btn unelevated dense color="primary" class="pr-2 mt-1" icon="add" label="Nuevo" @click="[dialog.changeId(null), dialog.toggle('new')]" />
        </div>
      </template>
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="800"
          v-model="filtering"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-count="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>
      <template v-slot:body-cell-permitions="props">
        <q-td :props="props" class="w-20">
          <q-btn
            text-color="white"
            icon="visibility"
            color="primary"
            @click="[dialog.changeId(props.row.id), dialog.toggle()]"
            fab-mini
            flat
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="w-20">
          <q-btn
            icon="edit"
            @click="[dialog.changeId(props.row.id), dialog.toggle('updated')]"
            fab-mini
            flat
          />
          <q-btn
            icon="delete"
            :color="'red'"
            @click=""
            fab-mini
            flat
          />
        </q-td>
      </template>
    </q-table>

    <DialogRoleViewUpdateDelete
      @toggle="dialog.toggle(dialog.status)"
      :status="dialog.status"
      v-model="dialog.value"
      :id="dialog.id"
    />
  </div>
</template>
