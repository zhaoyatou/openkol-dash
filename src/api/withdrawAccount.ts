import { http } from "@/utils/http";

export const getWithdrawAccountList = (params?: any) =>
  http.request("get", "/api/withdraw/account/list", { params });
