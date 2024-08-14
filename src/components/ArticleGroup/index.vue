<template>
  <el-form-item label="添加文章">
    <ArticleInput v-model="addArticle.article_id" />
    &nbsp;&nbsp;
    <el-button type="primary" @click="bindAdd">添加文章</el-button>
  </el-form-item>
  <el-table :data="list" class="mt-5">
    <el-table-column prop="id" label="ID" />
    <el-table-column label="封面">
      <template #default="scope">
        <el-image
          :src="scope.row.cover"
          style="width: 50px; height: 50px"
          fit="cover"
        />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" />
    <el-table-column label="可见性">
      <template #default="scope">
        {{ articleVisibility2Text(scope.row.visibility) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-popconfirm
          width="220"
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="Are you sure to delete this?"
          @confirm="bindDelete(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  articleGroupAdd,
  articleGroupDelete,
  articleGroupList
} from "@/api/article";
import { InfoFilled } from "@element-plus/icons-vue";
import { articleVisibility2Text } from "../../utils/enums";

const props = defineProps({
  groupKey: {
    type: String,
    required: true
  }
});

const addArticle = ref({ article_id: 0, key: props.groupKey });

const list = ref([]);

const bindAdd = async () => {
  await articleGroupAdd(addArticle.value);
  await getList();
};

const bindDelete = async (id: number) => {
  await articleGroupDelete({ article_id: id, key: props.groupKey });
  await getList();
};

const getList = async () => {
  const res = await articleGroupList({ key: props.groupKey });
  list.value = res.data.articles;
};

getList();
</script>

<style scoped lang="scss"></style>
