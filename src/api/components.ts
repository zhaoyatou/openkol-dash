import { http } from "@/utils/http";

export const getIncomeList = (params?: any) =>
  http.request("get", "/api/income/list", { params });

export const creIncomeList = (data?: any) =>
  http.post("/api/income/create", { data });

export const uploadFile = (data?: any) =>
  http.post(
    "/api/upload",
    { data },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
