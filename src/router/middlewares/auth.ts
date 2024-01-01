import { pb } from "@services/main";

export const isAuth = async (_to: any, _from: any, next: any) => {
  try {
    if (pb.authStore.isAuthRecord && await pb.collection('users').authRefresh()) return next();
    else {
      pb.authStore.clear();
      return next({ name: "login" });
    }
  } catch (error) {
    pb.authStore.clear();
    return next({ name: "login" });
  }
};

export const isNotAuth = async (_to: any, _from: any, next: any) => {
    if (!pb.authStore.isAuthRecord) return next();
    else return next({ name: "main" });
};
