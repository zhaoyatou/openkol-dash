import { http } from "@/utils/http";

export const getStaffList = (params?: any) =>
  http.request("get", "/api/staff/list", { params });

export const getStaffId = (id?: any) =>
  http.request("get", `/api/staff/detail/${id}`);

export const creStaff = (data?: any) =>
  http.post("/api/staff/create", { data });

export const upStaff = (data?: any) => http.post("/api/staff/update", { data });

export const delStaff = (id?: any) =>
  http.request("post", `/api/staff/delete/${id}`);
