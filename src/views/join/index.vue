<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item label="平台">
        <PlatformInput v-model="query.platform_id" />
      </el-form-item>
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
            v-for="item in platformJoinStatuses(false)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
        <el-button type="warning" @click="derive">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="platform_account" label="平台账号" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column label="入驻平台">
        <template #default="scope">
          {{ scope.row.platform?.name }}
        </template>
      </el-table-column>
      <el-table-column label="用户">
        <template #default="scope">
          <UserTableItem :user="scope.row.user" />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          {{ platformJoinStatus2Text(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            @click="router.push(`/join-detail?id=${scope.row.id}`)"
          >
            详情
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
import { getPlatformJoinExport, getPlatformJoinList } from "@/api/join";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { platformJoinStatus2Text, platformJoinStatuses } from "@/utils/enums";
import { downloadByData } from "@pureadmin/utils";
import dayjs from "dayjs";

defineOptions({
  name: "join"
});

const list = ref([]);
const count = ref();
const limit = ref(20);
const page = ref(0);
const router = useRouter();
const initQuery = {
  platform_id: null,
  user_id: null,
  status: ""
};
const query = ref({ ...initQuery });
// 测试
const getList = async () => {
  const { data } = await getPlatformJoinList({
    limit: limit.value,
    page: page.value,
    ...query.value
  });
  console.log(data);
  list.value = data.joins;
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
  const data = await getPlatformJoinExport({
    ...query.value
  });
  downloadByData(data, `${dayjs().format("YYYY-MM-DD")}-入驻明细.xls`);
};

getList();
</script>

<style lang="scss" scoped></style>
