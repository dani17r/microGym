<script setup lang="ts">
import DialogRoleViewCreateUpdate from "@modules/roles/DialogRoleViewCreateUpdate.vue";
import { RoleI, StatusVieUpdNewT, TableRequestPropI } from "@/types/global";
import { superModal, superMultiModal } from "@utils/supers";
import DialogConfirm from "@components/DialogConfirm.vue";
import compTables from "@composables/tables";
import useRolesStore from "@store/roles";
import { onMounted } from "vue";

const { roles, setRoles, columns, paginated, deleteRole, createRole, multiDeleteRole, updateRole,tableName } = useRolesStore();

const {
  getSelectedString,
  getDataTable,
  refreshTable,
  showSelected,
  onSelection,
  pagination,
  filtering,
  tableRef,
  selected,
  loading,
} = compTables<RoleI>({
  tableName: tableName.value,
  setData: setRoles,
  data: roles,
  paginated,
});

const getDataTableRoles = (params: TableRequestPropI) => {
  const filter = params.filter ? `(name~'${params.filter}')` : "";

  getDataTable(params, {
    expand: "permitions",
    filter,
  });
};

const dialog = superMultiModal<StatusVieUpdNewT>({ status: "view" });
const confirm = superModal({});

const multiRemove = async (roles: RoleI[]) => {
  loading.value = true;
  await multiDeleteRole(roles)
    .then(() => setTimeout(() => refreshTable(), 300))
    .finally(() => setTimeout(() => loading.value = false, 300));
};

const remove = (id: string) => {
  loading.value = true;
  deleteRole(id)
    .then(() => refreshTable())
    .finally(() => setTimeout(() => (loading.value = false), 300));
};

const update = (data: RoleI) => {
  loading.value = true;
  updateRole(data)
    .then(() => refreshTable())
    .finally(() => setTimeout(() => (loading.value = false), 300));
};
const create = (data: RoleI) => {
  loading.value = true;
  createRole(data)
    .then(() => refreshTable())
    .finally(() => setTimeout(() => (loading.value = false), 300));
};

onMounted(() => tableRef.value?.requestServerInteraction());
</script>

<template>
  <div class="q-pa-md relative">
    <q-table
      v-model:pagination="pagination"
      @request="getDataTableRoles"
      :filter="filtering"
      class="shadow-none text-left"
      :loading="loading"
      :columns="columns"
      binary-state-sort
      virtual-scroll
      ref="tableRef"
      row-key="id"
      :rows="roles"

      :selection="showSelected ? 'multiple' : 'none'"
      :selected-rows-label="getSelectedString"
      @selection="onSelection"
      :selected="selected"
      >
      <template v-slot:top-left>
        <div class="flex flex-col">
          <div class="flex gap-3">
            <q-btn
              @click="[dialog.changeId(null), dialog.toggle('new')]"
              class="pr-2 mt-1"
              color="primary"
              label="Nuevo"
              unelevated
              icon="add"
              dense
            />
            <q-toggle
              label="Seleccion"
              v-model="showSelected"
              class="pr-2 mt-1"
              color="primary"
              unelevated
              dense
            />
             <q-btn
                @click="multiRemove(selected)"
                v-if="selected.length > 0"
                icon="delete"
                color="red"
                fab-mini
                flat
              />
          </div>
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
        <q-td :props="props" >
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
              @click="[confirm.changeId(props.row.id), confirm.toggle()]"
              fab-mini
              flat
            />
          </q-td>
      </template>
    </q-table>
    <q-inner-loading :showing="loading">
      <q-spinner-hourglass color="primary" size="2em" />
    </q-inner-loading>

    <DialogRoleViewCreateUpdate
      @toggle="dialog.toggle(dialog.status)"
      :status="dialog.status"
      v-model="dialog.value"
      :loading="loading"
      @create="create"
      @update="update"
      :id="dialog.id"
    />

    <DialogConfirm
      @toggle="confirm.toggle()"
      @yes="remove(confirm.id)"
      v-model="confirm.value"
    />
  </div>
</template>
