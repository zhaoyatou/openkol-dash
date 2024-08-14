import { http } from "@/utils/http";

export const getWithdrawList = (params?: any) =>
  http.request("get", "/api/withdraw/request/list", { params });

export const getWithdrawId = (id?: any) =>
  http.request("get", `/api/withdraw/request/detail/${id}`);

export const upWithdraw = (data?: any) =>
  http.post("/api/withdraw/request/update", { data });

export const getWithdrawExport = (params?: any) =>
  http.get(
    "/api/withdraw/request/export",
    { params },
    { responseType: "blob", timeout: 100000 }
  );
