import { http } from "@/utils/http";

export const getPlatformJoinList = (params?: any) =>
  http.request("get", "/api/platform-join/list", { params });

export const getPlatformJoinId = (id?: any) =>
  http.request("get", `/api/platform-join/detail/${id}`);

export const auditPlatformJoin = (data?: any) =>
  http.request("post", "/api/platform-join/audit", { data });

export const getPlatformJoinExport = (params?: any) =>
  http.request(
    "get",
    "/api/platform-join/export",
    { params },
    { responseType: "blob", timeout: 100000 }
  );
