import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { resetRouter, router } from "@/router";
import { storageLocal } from "@pureadmin/utils";
import { getCode, getLogin, LoginResult } from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import {
  type DataInfo,
  removeToken,
  sessionKey,
  setUserInfo
} from "@/utils/auth";
import { setToken } from "../../utils/auth";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    name: storageLocal().getItem<DataInfo>(sessionKey)?.name ?? "",
    // 手机号
    phone: storageLocal().getItem<DataInfo>(sessionKey)?.phone ?? "",
    // id
    id: storageLocal().getItem<DataInfo>(sessionKey)?.id ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo>(sessionKey)?.roles ?? [],
    // 头像
    photo_url: storageLocal().getItem<DataInfo>(sessionKey)?.photo_url ?? "",

    code_key: ""
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(name: string) {
      this.name = name;
    },
    /** 存储用户手机号 */
    SET_PHONE(phone: string) {
      this.phone = phone;
    },
    /** 存储用户id  */
    SET_ID(id: string) {
      this.id = id;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<{ id: string; name: string }>) {
      this.roles = roles;
    },
    /** 存储角色 */
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_CODEKEY(code_key) {
      this.code_key = code_key;
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<LoginResult>((resolve, reject) => {
        getLogin(data)
          .then((data: any) => {
            console.log(data);
            setToken(data.data);
            setUserInfo({
              id: null,
              name: null,
              phone: null,
              photo_url: null,
              token: data.token,
              roles: data.data.permission.map((item: any) => {
                return { id: item, name: item };
              })
            });
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取验证码
    async getCode(ruleForm) {
      let { username } = ruleForm;
      username = username.trim();
      const { data }: any = await getCode({ username });
      this.SET_CODEKEY(data.code_key);
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
