import { http } from "@/utils/http";

// 获取验证码
export const getCode = data => http.request("post", "/api/code", { data });

export const getIncomeList = (params?: any) =>
  http.request("get", "/api/income/list", { params });

export const creIncomeList = (data?: any) =>
  http.post("/api/income/create", { data });

export const getIncomeExport = (params?: any) =>
  http.get(
    "/api/income/export",
    { params },
    { responseType: "blob", timeout: 100000 }
  );
