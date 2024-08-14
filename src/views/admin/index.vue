<template>
  <div>
    <el-button type="primary" @click="router.push(`/admin-detail`)"
      >创建</el-button
    >
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="permission" label="许可" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm
            width="220"
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
            @confirm="deleteAdmin(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button
            type="primary"
            @click="router.push(`/admin-detail?id=${scope.row.id}`)"
          >
            更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { delAdmin, getAdminList } from "@/api/admin";
import { message } from "@/utils/message";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "admin"
});

const router = useRouter();
const list = ref([]);

const getList = async () => {
  const { data } = await getAdminList();
  list.value = data.admins;
};

const deleteAdmin = async id => {
  await delAdmin(id);
  message("ok", { type: "success" });
  await getList();
};

getList();
</script>

<style lang="scss" scoped></style>
