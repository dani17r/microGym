import compPagination from "@composables/pagination";
import { pb } from "@services/main";
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import {
  CompTableParamsI,
  EventSelectionTable,
  QueryDataTableI,
  TableRequestPropI,
} from "@/types/global";


export default <T>(params: CompTableParamsI<T>) => {
  const { changePagination } = compPagination(params.tableName);
  const showSelected = ref(false);
  const selected = ref<any>([]);
  const lastIndex = ref(null);
  const loading = ref(false);
  const filtering = ref("");
  const tableRef = ref();
  const $q = useQuasar()

  const pagination = ref({
    descending: params.paginated.value.sort.order == "desc",
    rowsNumber: params.paginated.value.totalItems,
    rowsPerPage: params.paginated.value.perPage,
    sortBy: params.paginated.value.sort.field,
    page: params.paginated.value.page,
  });

  async function getDataTable(
    props: TableRequestPropI,
    querys: QueryDataTableI
  ) {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    const sort = String(descending ? `-${sortBy}` : sortBy);
    const order = descending ? "desc" : "asc";

    loading.value = true;

    let record = await pb
      .collection<T>(params.tableName)
      .getList(page, rowsPerPage, { sort, ...querys })
      .finally(() => setTimeout(() => (loading.value = false), 300));

    params.setData(record.items);
    pagination.value.rowsNumber = record.totalItems;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.descending = descending;
    pagination.value.sortBy = sortBy;
    pagination.value.page = page;

    params.paginated.value.TotalPages = record.totalPages;
    params.paginated.value.totalItems = record.totalItems;
    params.paginated.value.perPage = record.perPage;
    params.paginated.value.sort.order = order;

    changePagination({
      TotalPages: record.totalPages,
      totalItems: record.totalItems,
      perPage: record.perPage,
      page: record.page,
      sort: {
        field: sortBy,
        order: order,
      },
    });
  }

  const refreshTable = () => tableRef.value?.requestServerInteraction();

  // -----------------------------------------------
  const getSelectedString = function () {
    const countSelect = computed(() => selected.value.length);
    const countRows = computed(() => params.data.value?.length);
    const isletterS = countSelect.value > 1 ? "s" : "";

    const text = `${countSelect.value} record${isletterS} selected of ${countRows.value}`;

    if (countSelect.value != 0) return text;
    return "";
  };

  const onSelection = function ({ rows, added, evt }: EventSelectionTable) {
    if (rows.length == 0 || tableRef.value == void 0) return;

    const row = rows[0];
    const filteredSortedRows = tableRef.value.filteredSortedRows;
    const rowIndex = filteredSortedRows.indexOf(row);
    const localLastIndex = lastIndex.value;

    lastIndex.value = rowIndex;
    document.getSelection()?.removeAllRanges();

    if ($q.platform.is.mobile === true) evt.ctrlKey = true;
    else if (evt !== Object(evt)) {
      selected.value = added === true ? rows : []
      return
    }

    const operateSelection = (selRow: string[]) => {
      if (added === true) {
        const selectedIndex = selected.value.indexOf(selRow);
        if (selectedIndex === -1) {
          selected.value = selected.value.concat(selRow);
        }
      }
      else {
        const selectedIndex = selected.value.indexOf(selRow);
        if (selectedIndex > -1) {
          selected.value = selected.value
            .slice(0, selectedIndex)
            .concat(selected.value.slice(selectedIndex + 1));
        }
      }
    };

    if (localLastIndex == null || evt.shiftKey !== true) {
      operateSelection(row);
      return;
    }

    const from = localLastIndex < rowIndex ? localLastIndex : rowIndex;
    const to = localLastIndex < rowIndex ? rowIndex : localLastIndex;
    for (let i = from; i <= to; i += 1) {
      operateSelection(filteredSortedRows[i]);
    }
  };
  // -----------------------------------------------

  return {
    getSelectedString,
    getDataTable,
    refreshTable,
    onSelection,
    showSelected,
    pagination,
    lastIndex,
    filtering,
    selected,
    tableRef,
    loading,
  };
};
