import { http } from "@/utils/http";

export const getInviteList = (params?: any) =>
  http.request("get", "/api/invite/list", { params });

export const getInviteId = (id?: any) =>
  http.request("get", `/api/invite/detail/${id}`);

export const creInvite = (data?: any) =>
  http.post("/api/invite/create", { data });

export const upInvite = (data?: any) =>
  http.post("/api/invite/update", { data });

export const delInvite = (id?: any) =>
  http.request("post", `/api/invite/delete/${id}`);
