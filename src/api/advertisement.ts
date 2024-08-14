import { http } from "@/utils/http";

export const getAdvertisementList = (params?: any) =>
  http.request("get", "/api/advertisement/list", { params });

export const getAdvertisementId = (id?: any) =>
  http.request("get", `/api/advertisement/detail/${id}`);

export const creAdvertisementList = (data?: any) =>
  http.post("/api/advertisement/create", { data });

export const upAdvertisement = (data?: any) =>
  http.post("/api/advertisement/update", { data });

export const delAdvertisement = (id?: any) =>
  http.request("post", `/api/advertisement/delete/${id}`);
