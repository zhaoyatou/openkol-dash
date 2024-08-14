import { http } from "@/utils/http";

export const getRecommendList = (params?: any) =>
  http.request("get", "/api/advertisement/recommend/list", { params });

export const getRecommendId = (id?: any) =>
  http.request("get", `/api/advertisement/recommend/detail/${id}`);

export const creRecommend = (data?: any) =>
  http.post("/api/advertisement/recommend/create", { data });

export const upRecommend = (data?: any) =>
  http.post("/api/advertisement/recommend/update", { data });

export const delRecommend = (id?: any) =>
  http.request("post", `/api/advertisement/recommend/delete/${id}`);
