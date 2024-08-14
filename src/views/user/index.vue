<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item label="用户名">
        <UserInput v-model="query.keyword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
        <el-button type="danger" @click="router.push(`/user-detail`)"
          >创建用户</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column label="用户">
        <template #default="scope">
          <UserTableItem :user="scope.row" />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" />
      <el-table-column label="授权信息">
        <template #default="scope">
          <div
            v-for="item in scope.row.platforms"
            :key="item.id"
            style="display: flex; flex-direction: column; align-items: start"
          >
            <el-tag v-if="item.platform === 'wechat_mini'" type="success">{{
              item.platform_id
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ second2Time(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-row>
            <el-button
              type="primary"
              @click="router.push(`/user-detail?id=${scope.row.id}`)"
            >
              更新
            </el-button>
          </el-row>
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
import { getUserList } from "@/api/user";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { second2Time } from "@/utils/convert";

defineOptions({
  name: "user"
});

const router = useRouter();
const list = ref([]);
const count = ref();
const limit = ref(20);
const page = ref(0);
const initQuery = {
  keyword: "",
  category: ""
};
const query = ref({ ...initQuery });
// 测试
const getList = async () => {
  const { data } = await getUserList({
    limit: limit.value,
    page: page.value,
    ...query.value
  });
  list.value = data.users;
  count.value = data.count;
};

const resetQuery = async () => {
  query.value = { ...initQuery };
  await getList();
};

const change = async e => {
  page.value = e - 1;
  getList();
};

getList();
</script>

<style lang="scss" scoped></style>
