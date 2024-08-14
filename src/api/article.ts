import { http } from "@/utils/http";

export const getArticleList = (params?: any) =>
  http.request("get", "/api/article/list", { params });

export const getArticleId = (id?: any) =>
  http.request("get", `/api/article/detail/${id}`);

export const creArticleList = (data?: any) =>
  http.post("/api/article/create", { data });

export const upArticle = (data?: any) =>
  http.post("/api/article/update", { data });

export const delArticle = (id?: any) =>
  http.request("post", `/api/article/delete/${id}`);

export const articleGroupList = (params?: any) =>
  http.get("/api/article/group/list", { params });

export const articleGroupAdd = (data?: any) =>
  http.post("/api/article/group/add", { data });

export const articleGroupDelete = (data?: any) =>
  http.post("/api/article/group/delete", { data });
