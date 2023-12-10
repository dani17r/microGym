import { TableRequestPropI, PaginateI } from "@/types/global";
import { pb } from "@services/main";
import { Ref, ref } from "vue";

export default (table:string, data:any, paginated: Ref<PaginateI>) => {
  const loading = ref(false);
  const filtering = ref("");
  const rows = ref(data);
  const tableRef = ref();

  const pagination = ref({
    rowsPerPage: paginated.value.perPage,
    page: paginated.value.page,
    descending: false,
    sortBy: "desc",
  });

  async function onRequest(props: TableRequestPropI) {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    const filter = props.filter ? `name ?= '${props.filter}'` : "";

    loading.value = true;

    const resultList = await pb
      .collection(table)
      .getList(page, rowsPerPage, {
        filter,
        expand: "permitions",
      })
      .finally(() => (loading.value = false));

    rows.value = resultList.items;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;

    paginated.value.page = page;
    paginated.value.perPage = rowsPerPage;
  }

  return {
    onRequest,
    pagination,
    filtering,
    tableRef,
    loading,
    rows,
  };
};
