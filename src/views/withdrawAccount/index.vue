<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item label="用户">
        <UserInput v-model="query.user_id" />
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
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column label="用户">
        <template #default="scope">
          <UserTableItem :user="scope.row.user" />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="账户类型" />
      <el-table-column label="账户信息">
        <template #default="scope">
          <div v-if="scope.row.bank_account">
            <el-row> 用户名：{{ scope.row.bank_account.user_name }} </el-row>
            <el-row> 账号:{{ scope.row.bank_account.user_no }} </el-row>
            <el-row> 手机号：{{ scope.row.bank_account.mobile }} </el-row>
            <el-row> 城市：{{ scope.row.bank_account.bank_name }} </el-row>
            <el-row> 卡号：{{ scope.row.bank_account.card_no }} </el-row>
          </div>
          <div v-else-if="scope.row.image">
            <el-image
              :src="scope.row.image"
              style="height: 100px; width: 100px"
              fit="contain"
            />
          </div>
          <div v-else>无</div>
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
import { getWithdrawAccountList } from "@/api/withdrawAccount";
import { ref } from "vue";
import { withdrawAccountTypes } from "@/utils/enums";

defineOptions({
  name: "withdrawAccount"
});

const list = ref([]);
const count = ref();
const limit = ref(20);
const page = ref(0);
const initQuery = {
  user_id: null,
  type: ""
};

const query = ref({ ...initQuery });
// 测试
const getList = async () => {
  const { data } = await getWithdrawAccountList({
    limit: limit.value,
    page: page.value,
    ...query.value
  });
  list.value = data.accounts;
  count.value = data.count;
  console.log(list.value);
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

getList();
</script>

<style lang="scss" scoped></style>
