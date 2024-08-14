import { defineStore } from "pinia";
import { store } from "@/store";

export const joinStore = defineStore({
  id: "join-store",
  state: () => ({
    status: [
      { label: "待审核", value: "pending" },
      { label: "待补充", value: "supplement" },
      { label: "待注册", value: "register" },
      { label: "驳回", value: "reject" },
      { label: "通过", value: "pass" }
    ]
  })
});

export function joinStoreHook() {
  return joinStore(store);
}
