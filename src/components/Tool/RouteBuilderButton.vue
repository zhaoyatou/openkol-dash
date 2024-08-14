<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";

type Param = {
  key: string;
  description: string;
  value: string;
};

type RouterBuilder = {
  name: string;
  rule: string;
  params: Param[];
  builder: (params: Param[]) => string;
};

const drawerRef = ref(false);

const dataSource = ref<Array<RouterBuilder>>([
  {
    name: "平台详情",
    rule: "/pages/detail/index?id=id",
    params: [
      {
        key: "id",
        description: "平台ID",
        value: "1"
      }
    ],
    builder: params => {
      const id = params.find(item => item.key === "id")?.value;
      return `/pages/detail/index?id=${id}`;
    }
  },
  {
    name: "文章详情",
    rule: "/pages/articles/index?id=id",
    params: [
      {
        key: "id",
        description: "文章ID",
        value: "1"
      }
    ],
    builder: params => {
      const id = params.find(item => item.key === "id")?.value;
      return `/pages/articles/index?id=${id}`;
    }
  },
  {
    name: "榜单列表",
    rule: "/pages/incomeList/index?id=id",
    params: [
      {
        key: "id",
        description: "平台ID",
        value: "1"
      }
    ],
    builder: params => {
      const id = params.find(item => item.key === "id")?.value;
      return `/pages/incomeList/index?id=${id}`;
    }
  },
  {
    name: "我的页面",
    rule: "/pages/mine/index",
    params: [],
    builder: () => {
      return `/pages/mine/index`;
    }
  }
]);

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    ElMessage.success("复制成功");
  } catch (err) {
    ElMessage.error("复制失败");
  }
}
</script>

<template>
  <div>
    <el-button type="primary" @click="drawerRef = true"> 路由生成器 </el-button>
    <el-drawer v-model="drawerRef">
      <template #default>
        <h2>路由生成器使用说明</h2>
        <p>1. 点击生成器列的复制按钮，可以复制生成的路由</p>
        <p>2. 点击参数列的输入框，可以修改参数值</p>
        <br />
        <div v-for="data in dataSource" :key="data.name">
          <el-descriptions :title="data.name" :column="1" border>
            <el-descriptions-item label="规则">{{
              data.rule
            }}</el-descriptions-item>
            <el-descriptions-item
              label="参数"
              v-if="data.params && data.params.length"
            >
              <el-row
                v-for="item in data.params"
                :key="item.key"
                style="display: flex; justify-content: center"
              >
                <el-input v-model="item.value">
                  <template #prepend>{{ item.description }}</template>
                </el-input>
              </el-row>
            </el-descriptions-item>
            <el-descriptions-item label="生成器">
              <el-row>
                <el-col :span="24">
                  <el-input :value="data.builder(data.params)">
                    <template #append>
                      <el-button @click="copyText(data.builder(data.params))"
                        >复制</el-button
                      >
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </el-descriptions-item>
          </el-descriptions>
          <el-divider />
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss"></style>
