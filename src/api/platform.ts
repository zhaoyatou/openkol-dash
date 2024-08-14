import { http } from "@/utils/http";

// 获取验证码
export const getCode = data => http.request("post", "/api/code", { data });

export const getPlatformList = (params?: any) =>
  http.request("get", "/api/platform/list", { params });

export const getPlatformId = (id?: any) =>
  http.request("get", `/api/platform/detail/${id}`);

export const crePlatformList = (data?: any) =>
  http.post("/api/platform/create", { data });

export const upPlatform = (data?: any) =>
  http.post("/api/platform/update", { data });

export const upPlan = (data?: any) =>
  http.post("/api/platform/invite/plan", { data });

export const upPlatConfig = (data?: any) =>
  http.post("/api/platform/config/update", { data });

export const upPlatTutorial = (data?: any) =>
  http.post("/api/platform/tutorial/update", { data });
