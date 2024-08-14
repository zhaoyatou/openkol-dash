<template>
  <el-card>
    <el-form :model="detail" label-width="auto">
      <el-form-item label="用户名">
        <el-input v-model="detail.username" style="width: 240px" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="detail.password"
          show-password
          style="width: 240px"
        />
        <el-alert
          v-if="id"
          title="如果不需要修改，请将密码留空."
          type="warning"
          :closable="false"
        />
      </el-form-item>
      <el-form-item label="许可">
        <el-checkbox-group v-model="detail.permission">
          <el-checkbox v-for="i in permissionList" :key="i" :label="i" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="subAdmin" v-if="!id">创建</el-button>
    <el-button type="primary" @click="subUpAdmin" v-else>更新</el-button>
  </el-card>
</template>

<script setup>
import { creAdmin, getAdminId, upAdmin } from "@/api/admin";
import { message } from "@/utils/message";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useAppStoreHook } from "@/store/modules/app";

defineOptions({
  name: "admin-detail"
});

const detail = ref({ username: "", password: "", permission: [] });
const route = useRoute();
const router = useRouter();
const permissionList = useAppStoreHook().permissionList;
console.log(permissionList);

const id = String(route.query.id || "");

if (id && id !== "") {
  getAdminId(id).then(({ data }) => {
    detail.value = {
      ...data.admin,
      password: ""
    };
  });
}

const subAdmin = async () => {
  const { password } = detail.value;
  if (password.length !== 0 && password.length < 9) {
    message("密码太短", { type: "error" });
    return;
  }
  await creAdmin(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const subUpAdmin = async () => {
  console.log(detail.value);
  const { password } = detail.value;
  if (password.length !== 0 && password.length < 9) {
    message("密码太短", { type: "error" });
    return;
  }
  await upAdmin(detail.value);
  message("ok", { type: "success" });
  router.back();
};
</script>

<style lang="scss" scoped></style>
