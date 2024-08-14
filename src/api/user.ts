import { http } from "@/utils/http";

export type LoginResult = {
  data: {
    /** token */
    token: string;
  };
};

export type UserResult = {
  data: {
    // 名字
    name: string;
    // 手机号
    phone: string;
    // 头像
    photo_url: string;
    // 权限
    roles: Array<{ id: string; name: string }>;
  };
};

/** 密码登录 */
export const getLogin = (data?: object) =>
  http.request<LoginResult>("post", "/api/admin/login", { data });

// 获取个人信息
export const getUserInfo = (data?: object) =>
  http.request<UserResult>("get", "/api/v1/my/info", { data });

// 获取验证码
export const getCode = data => http.request("post", "/api/code", { data });

export const getUserList = (params?: any) =>
  http.request("get", "/api/user/list", { params });

export const getUserId = (id?: any) =>
  http.request("get", `/api/user/detail/${id}`);

export const creUser = (data?: any) => http.post("/api/user/create", { data });

export const upUser = (data?: any) => http.post("/api/user/update", { data });

export const getQiniuToken = (params?: any) =>
  http.get("/api/upload/token", { params });

export const getStaffList = (params?: any) =>
  http.request("get", "/api/user/staff/list", { params });

export const creStaff = (data?: any) =>
  http.post("/api/user/staff/create", { data });

export const delStaff = (data?: any) =>
  http.request("post", `/api/user/staff/delete`, { data });
