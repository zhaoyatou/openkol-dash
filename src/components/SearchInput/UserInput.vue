<template>
  <div>
    <el-select
      v-model="state"
      filterable
      remote
      reserve-keyword
      placeholder="请输入"
      :remote-method="remoteMethod"
      :loading="loading"
      style="width: 240px"
      clearable
    >
      <el-option
        v-for="item in list"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span
          style="
            float: right;
            color: var(--el-text-color-secondary);
            font-size: 13px;
          "
        >
          {{ item.value }}
        </span></el-option
      >
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { getUserList } from "@/api/user";
import { defineModel, ref } from "vue";

const state = defineModel();
const loading = ref();
const list = ref([]);
const remoteMethod = async query => {
  if (query) {
    loading.value = true;
    const { data }: any = await getUserList({ keyword: query, limit: 5 });
    data.users.map(i => {
      i.value = i.id;
      i.label = i.username;
    });
    console.log(data.users);
    list.value = data.users;
    loading.value = false;
  } else {
    list.value = [];
  }
};
remoteMethod("");
</script>
