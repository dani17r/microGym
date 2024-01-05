<script setup lang="ts">
import { PermitionI, StatusUpdNewT, TableRequestPropI } from "@/types/global";
import DialogTable from "@modules/permitions/DialogTablePermitions.vue";
import { superModal, superMultiModal } from "@utils/supers";
import DialogConfirm from "@components/DialogConfirm.vue";
import usePermitionsStore from "@store/permitions";
import compTables from "@composables/tables";
import { onMounted } from "vue";

const { permitions, setPermitions, columns, paginated, deletePermition, createPermition, multiDeletePermition, updatePermition, tableName } = usePermitionsStore();

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
} = compTables<PermitionI>({
  tableName: tableName.value,
  setData: setPermitions,
  data: permitions,
  paginated,
});

const getDataTablePermitions = (params: TableRequestPropI) => {
  const filter = params.filter ? `(name~'${params.filter}')` : "";

  getDataTable(params, {
    expand: "permitions",
    filter,
  });
};

const dialog = superMultiModal<StatusUpdNewT>({ status: "new" });
const confirm = superModal({});

const multiRemove = async () => {
  loading.value = true;
  await multiDeletePermition(selected.value)
    .then(() => setTimeout(() => refreshTable(), 300))
    .finally(() => setTimeout(() => loading.value = false, 300));
};

const remove = () => {
  loading.value = true;
  deletePermition(confirm.id)
    .then(() => refreshTable())
    .finally(() => setTimeout(() => (loading.value = false), 300));
};

const update = (data: PermitionI) => {
  loading.value = true;
  updatePermition(data)
    .then(() => refreshTable())
    .finally(() => setTimeout(() => (loading.value = false), 300));
};

const create = (data: PermitionI) => {
  loading.value = true;
  createPermition(data)
    .then(() => refreshTable())
    .finally(() => setTimeout(() => (loading.value = false), 300));
};

onMounted(() => tableRef.value?.requestServerInteraction());
</script>

<template>
  <div class="q-pa-md relative">
    <q-table v-model:pagination="pagination" @request="getDataTablePermitions" :filter="filtering"
      class="shadow-none text-left" :loading="loading" :columns="columns" binary-state-sort virtual-scroll ref="tableRef"
      row-key="id" :rows="permitions" :selection="showSelected ? 'multiple' : 'none'" :selected-rows-label="getSelectedString"
      @selection="onSelection" :selected="selected">
      <template v-slot:top-left>
        <div class="flex flex-col">
          <div class="flex gap-3">
            <q-btn @click="[dialog.changeId(null), dialog.toggle('new')]" class="pr-2 mt-1" color="primary" label="Nuevo"
              unelevated icon="add" dense />
            <q-toggle label="Seleccion" v-model="showSelected" class="pr-2 mt-1" color="primary" unelevated dense />
            <q-btn @click="confirm.toggle()" v-if="selected.length > 0 && showSelected" icon="delete" color="red" fab-mini flat />
          </div>
        </div>
      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="800" v-model="filtering" placeholder="Search">
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
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          {{ `${props.row.name.substring(0, 15)}${props.row.name.length > 15 ? '...' : ''}` }}
          <q-tooltip class="bg-primary text-[14px]" :offset="[0, -10]" v-if="props.row.name.length > 15" :delay="800">
             {{ props.row.name }}
           </q-tooltip>
        </q-td>
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          {{ `${props.row.description.substring(0, 30)}${props.row.description.length > 30 ? '...' : ''}` }}
          <q-tooltip class="bg-primary text-[14px]" :offset="[0, -10]" v-if="props.row.description.length > 30" max-width="400px" :delay="800">
             {{ props.row.description }}
           </q-tooltip>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="w-20">
          <q-btn icon="edit" @click="[dialog.changeId(props.row.id), dialog.toggle('updated')]" fab-mini flat />
          <q-btn icon="delete" :color="'red'" @click="[confirm.changeId(props.row.id), confirm.toggle()]" fab-mini flat />
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing>
          <q-spinner-hourglass color="primary" size="2em" />
        </q-inner-loading>
      </template>
    </q-table>

    <DialogTable @toggle="dialog.toggle(dialog.status)" :status="dialog.status" v-model="dialog.value"
      :loading="loading" @create="create" @update="update" :id="dialog.id" />

    <DialogConfirm @toggle="confirm.toggle()" @yes="selected.length > 0 ? multiRemove() : remove()" v-model="confirm.value" />
  </div>
</template>