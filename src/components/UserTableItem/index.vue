<script setup lang="ts">
import { second2Time } from "../../utils/convert";

defineProps({
  user: {
    type: Object,
    default: () => {
      return {};
    },
    required: true
  }
});
</script>

<template>
  <div class="user">
    <el-popover
      :width="300"
      trigger="click"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-avatar :size="50" :src="user.avatar" />
      </template>
      <template #default>
        <el-descriptions title="用户信息" :column="1" border>
          <el-descriptions-item label="ID">{{ user.id }}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{
            user.username
          }}</el-descriptions-item>
          <el-descriptions-item label="别名">{{
            user.remark
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            user.phone
          }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{
            second2Time(user.created_at)
          }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{
            second2Time(user.updated_at)
          }}</el-descriptions-item>
        </el-descriptions>
      </template>
    </el-popover>
    <div style="margin-left: 8px">
      <strong>{{ user.username }}</strong>
      <div style="font-size: 10px">
        {{ user.remark ?? user.phone ?? user.id }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  align-items: center;
}
</style>
