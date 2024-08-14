<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item label="用户">
        <UserInput v-model="query.user_id" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="query.status"
          placeholder="请选择"
          style="width: 120px"
          clearable
        >
          <el-option
            v-for="item in withdrawRequestStatuses(true)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          v-model="query.type"
          placeholder="请选择"
          style="width: 120px"
        >
          <el-option
            v-for="item in withdrawAccountTypes(true)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="query.time_start"
          type="date"
          placeholder="开始日期"
          style="width: 120px"
        />
        <el-date-picker
          v-model="query.time_end"
          type="date"
          placeholder="结束日期"
          style="width: 120px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
        <el-button type="warning" @click="derive">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column label="用户">
        <template #default="scope">
          <UserTableItem :user="scope.row.user" />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          {{ withdrawRequestStatus2Text(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ second2Time(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            @click="router.push(`/withdraw-detail?id=${scope.row.id}`)"
          >
            {{ scope.row.status === "pending" ? "审核" : "查看" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-4"
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="limit"
      @current-change="change"
    />
  </div>
</template>
<script setup>
import { getWithdrawExport, getWithdrawList } from "@/api/withdraw";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { second2Time } from "@/utils/convert";
import {
  withdrawAccountTypes,
  withdrawRequestStatus2Text,
  withdrawRequestStatuses
} from "@/utils/enums";
import { downloadByData } from "@pureadmin/utils";
import dayjs from "dayjs";

defineOptions({
  name: "withdraw"
});

const initQuery = {
  status: null,
  user_id: null,
  type: "",
  time_start: 0,
  time_end: 0
};

const router = useRouter();
const list = ref([]);
const count = ref();
const limit = ref(20);
const page = ref(0);
const query = ref({ ...initQuery });
// 测试
const getList = async () => {
  const { data } = await getWithdrawList({
    limit: limit.value,
    page: page.value,
    ...query.value
  });
  console.log(data);
  list.value = data.withdraws;
  count.value = data.count;
};

const resetQuery = async () => {
  query.value = { ...initQuery };
  console.log(query.value);
  await getList();
};

const change = async e => {
  page.value = e - 1;
  getList();
};

const derive = async () => {
  const data = await getWithdrawExport({
    ...query.value
  });
  console.log(data);
  downloadByData(data, `${dayjs().format("YYYY-MM-DD")}-提现明细.xls`);
};

getList();
</script>

<style lang="scss" scoped></style>
