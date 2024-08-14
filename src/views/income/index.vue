<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item label="平台">
        <PlatformInput v-model="query.platform_id" />
      </el-form-item>
      <el-form-item label="用户">
        <UserInput v-model="query.user_id" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          v-model="query.type"
          placeholder="请选择"
          style="width: 120px"
          clearable
        >
          <el-option
            v-for="item in incomeTypes(false)"
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
        <el-button type="danger" @click="router.push(`/income-detail`)"
          >录入收益</el-button
        >
        <el-button type="warning" @click="derive">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column label="金额">
        <template #default="scope">
          {{ cent2Yuan(scope.row.income) }}
        </template>
      </el-table-column>
      <el-table-column label="平台">
        <template #default="scope">
          {{ scope.row.platform?.name || "无" }}
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template #default="scope">
          {{ incomeType2Text(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="用户">
        <template #default="scope">
          <UserTableItem :user="scope.row.user" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ second2Time(scope.row.created_at) }}
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
import { getIncomeExport, getIncomeList } from "@/api/income";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { cent2Yuan, second2Time } from "@/utils/convert";
import { incomeType2Text, incomeTypes } from "@/utils/enums";
import { downloadByData } from "@pureadmin/utils";
import dayjs from "dayjs";

defineOptions({
  name: "income"
});

const initQuery = {
  platform_id: null,
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
  const { data } = await getIncomeList({
    limit: limit.value,
    page: page.value,
    ...query.value,
    // time_start time_end 改成时间戳
    time_start: query.value.time_start ? query.value.time_start / 1000 : 0,
    time_end: query.value.time_end ? query.value.time_end / 1000 : 0
  });
  list.value = data.incomes;
  count.value = data.count;
  console.log(data);
};

const change = async e => {
  page.value = e - 1;
  await getList();
};

const resetQuery = async () => {
  query.value = { ...initQuery };
  console.log(query.value);
  await getList();
};

const derive = async () => {
  const data = await getIncomeExport({
    ...query.value,
    time_start: query.value.time_start ? query.value.time_start / 1000 : 0,
    time_end: query.value.time_end ? query.value.time_end / 1000 : 0
  });
  console.log(data);
  downloadByData(data, `${dayjs().format("YYYY-MM-DD")}-收入明细.xls`);
};

getList();
</script>

<style lang="scss" scoped></style>
