<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item label="关键字">
        <ArticleInput v-model="query.keyword" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          v-model="query.visibility"
          placeholder="请选择"
          style="width: 120px"
          clearable
        >
          <el-option
            v-for="item in articleVisibilities(true)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
        <el-button type="danger" @click="router.push(`/article-detail`)"
          >创建文章</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column label="图片">
        <template #default="scope">
          <el-image
            :src="scope.row.cover"
            style="width: 50px; height: 50px"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author_id" label="作者" />
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ second2Time(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template #default="scope">
          {{ second2Time(scope.row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="visibility" label="可见">
        <template #default="scope">
          {{ articleVisibility2Text(scope.row.visibility) }}
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
              @confirm="deleteArticle(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </el-row>
          <el-row>
            <el-button
              type="primary"
              @click="router.push(`/article-detail?id=${scope.row.id}`)"
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
import { delArticle, getArticleList } from "@/api/article";
import { message } from "@/utils/message";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { articleVisibilities, articleVisibility2Text } from "@/utils/enums";
import { second2Time } from "@/utils/convert";
import { InfoFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "atricle"
});

const router = useRouter();
const list = ref([]);
const count = ref();
const limit = ref(20);
const page = ref(0);
const initQuery = {
  keyword: "",
  visibility: ""
};
const query = ref({ ...initQuery });

// 测试
const getList = async () => {
  const { data } = await getArticleList({
    limit: limit.value,
    page: page.value,
    ...query.value
  });
  list.value = data.articles;
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

const deleteArticle = async id => {
  await delArticle(id);
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
