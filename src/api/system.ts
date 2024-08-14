import { http } from "@/utils/http";

export const getSystemConfigs = () => http.get("/api/system/configs");

export const upSystemConfigs = (data?: any) =>
  http.post("/api/system/configs", { data });

export const getInviteConfigs = () => http.get("/api/invite/configs");

export const upInviteConfigs = (data?: any) =>
  http.post("/api/invite/configs", { data });

export const getWithdrawConfigs = () => http.get("/api/withdraw/configs");

export const upWithdrawConfigs = (data?: any) =>
  http.post("/api/withdraw/configs", { data });

export const resetCache = () => http.post("/api/cache/reset");
