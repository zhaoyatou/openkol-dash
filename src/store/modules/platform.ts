import { defineStore } from "pinia";
import { store } from "@/store";

export const platformStore = defineStore({
  id: "platform-store",
  state: () => ({
    platformStatus: [
      { label: "激活", value: "active" },
      { label: "未激活", value: "inactive" }
    ]
  })
});

export function platformStoreHook() {
  return platformStore(store);
}
