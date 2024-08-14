<template>
  <div>
    <el-button type="primary" @click="router.push(`/recommend-detail`)"
      >创建</el-button
    >
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column prop="title" label="标题" />
      <el-table-column label="图片">
        <template #default="scope">
          <el-image
            :src="scope.row.image"
            style="width: 250px; height: 50px"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="hot" label="热力值" />
      <el-table-column label="显示">
        <template #default="scope">
          {{ scope.row.enabled ? "是" : "否" }}
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
            <el-popconfirm
              width="220"
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
              @confirm="deleteRecommend(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </el-row>
          <el-row>
            <el-button
              type="primary"
              @click="router.push(`/recommend-detail?id=${scope.row.id}`)"
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
import { delRecommend, getRecommendList } from "@/api/recommend";
import { message } from "@/utils/message";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { second2Time } from "@/utils/convert";
import { InfoFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "recommend"
});

const router = useRouter();
const list = ref([]);
const count = ref();
const limit = ref(20);
const page = ref(0);
// 测试
const getList = async () => {
  const { data } = await getRecommendList({
    limit: limit.value,
    page: page.value
  });
  console.log(data);
  list.value = data.advertisements;
  count.value = data.count;
};

const change = async e => {
  page.value = e - 1;
  getList();
};

const deleteRecommend = async id => {
  await delRecommend(id);
  message("ok", { type: "success" });
  await getList();
};

getList();
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 10px;
}
</style>
