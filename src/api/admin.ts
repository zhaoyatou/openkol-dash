import { http } from "@/utils/http";

export const getAdminList = (params?: any) =>
  http.request("get", "/api/admin/list", { params });

export const getAdminId = (id?: any) =>
  http.request("get", `/api/admin/detail/${id}`);

export const creAdmin = (data?: any) =>
  http.request("post", "/api/admin/create", { data });

export const upAdmin = (data?: any) =>
  http.request("post", "/api/admin/update", { data });

export const delAdmin = (id?: any) =>
  http.request("post", `/api/admin/delete/${id}`);
