import { PaginateI } from "@/types/global"
import { LocalStorage } from "quasar";

export default (nameLocalStore:string) => {
  
  const paginationDefault = (field:string) => <PaginateI>({
    page: 1,
    perPage: 25,
    totalItems: 0,
    TotalPages: 0,
    sort: {
      order: "asc",
      field,
    },
  });

  const getPagination = (fieldSortBy = "created") => {
    const pagStoreLocal = LocalStorage.getItem<PaginateI>(
      `pagination_${nameLocalStore}`
    );
    if (!pagStoreLocal) return paginationDefault(fieldSortBy);
    return pagStoreLocal;
  };

  const changePagination = (params: Partial<PaginateI>) => {
    const data = getPagination();
    LocalStorage.set(`pagination_${nameLocalStore}`, { ...data, ...params });
  };

  return {
    getPagination,
    changePagination,
  };
}