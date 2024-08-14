<template>
  <div>
    <el-select
      v-model="state"
      placeholder="请输入"
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
        </span>
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { getPlatformList } from "@/api/platform";
import { defineModel, ref } from "vue";

const state = defineModel();
const list = ref([]);
const getList = async () => {
  const { data }: any = await getPlatformList();
  data.platforms.map(i => {
    i.value = i.id;
    i.label = i.name;
  });
  list.value = data.platforms;
};
getList();
</script>
