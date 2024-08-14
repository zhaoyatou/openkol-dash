<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item label="平台名称">
        <el-input v-model="query.keyword" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="query.status"
          placeholder="请选择"
          style="width: 120px"
          clearable
        >
          <el-option
            v-for="item in platformJoinStatuses(true)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
        <el-button type="danger" @click="router.push(`/platform-detail`)"
          >创建平台</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column label="排序">
        <template #default="scope">
          {{ scope.row.sort || "0" }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" />
      <el-table-column label="图标">
        <template #default="scope">
          <el-image
            :src="scope.row.icon"
            style="width: 50px; height: 50px"
            fit="cover"
          />
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
            @click="router.push(`/platform-update?id=${scope.row.id}`)"
          >
            更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { getPlatformList } from "@/api/platform";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { platformJoinStatus2Text, platformJoinStatuses } from "@/utils/enums";

defineOptions({
  name: "platform"
});

const router = useRouter();
const list = ref([]);
const count = ref();
const initQuery = {
  keyword: "",
  status: ""
};
const query = ref({ ...initQuery });
// 测试
const getList = async () => {
  const { data } = await getPlatformList(query.value);
  list.value = data.platforms;
  count.value = data.count;
};

const resetQuery = async () => {
  query.value = { ...initQuery };
  await getList();
};

getList();
</script>

<style lang="scss" scoped></style>
