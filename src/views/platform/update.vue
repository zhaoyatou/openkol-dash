<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>基本信息</h1>
        </div>
      </template>
      <el-form :model="detail" label-width="auto">
        <el-form-item label="名字">
          <el-input v-model="detail.name" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="detail.sort" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="detail.status">
            <el-option
              v-for="item in platformStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="image">
          <UploadImage
            :limit="1"
            @upImagekey="coverImage"
            :fileList="images"
            :isEstablish="!id"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="subUpAdmin">更新</el-button>
    </el-card>
    <br />
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>平台配置</h1>
        </div>
      </template>
      <el-form :model="config" label-width="auto">
        <el-form-item label="平台政策">
          <el-input v-model="config.policy">
            <template #append>
              <RouteBuilderButton />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="入驻流程">
          <el-input v-model="config.process">
            <template #append>
              <RouteBuilderButton />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="提现流程">
          <el-input v-model="config.withdraw_process">
            <template #append>
              <RouteBuilderButton />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="通过后引导页">
          <el-input v-model="config.passed_guide">
            <template #append>
              <RouteBuilderButton />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="主题色">
          <el-color-picker v-model="config.color" />
        </el-form-item>
        <el-button type="primary" @click="updateConfig">更新</el-button>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>平台文章</h1>
        </div>
      </template>
      <ArticleGroup :group-key="articleGroupKey" />
    </el-card>
    <br />
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>邀请计划</h1>
        </div>
      </template>
      <el-form :model="plan" label-width="auto">
        <PriceInputForm
          v-model="plan.invite_user_reward"
          label="新用户邀请奖励"
        />
        <el-form-item label="平台收益分成">
          <el-input-number
            :min="0"
            :max="100"
            v-model="plan.invite_user_income_ratio"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="subUpPlan">更新</el-button>
    </el-card>
    <br />
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>注册配置</h1>
        </div>
      </template>
      <el-form
        :model="platTutorial"
        style="max-width: 800px"
        label-width="auto"
      >
        <el-divider>注册配置-主页截图示例</el-divider>
        <UploadImage
          :limit="1"
          @upImagekey="exampleImage"
          :fileList="example"
          :isEstablish="!example.length"
        />

        <el-divider>注册配置-账号平台</el-divider>
        <el-select
          v-model="platTutorial.platform_account"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="请输入账号平台，并回车"
          style="width: 600px"
        />
        <el-divider>注册配置-领域</el-divider>
        <el-select
          v-model="platTutorial.fields"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="请输入领域，并回车"
          style="width: 600px"
        />
        <el-divider>注册配置-类型</el-divider>
        <el-select
          v-model="platTutorial.type"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="请输入类型，并回车"
          style="width: 600px"
        />

        <el-divider>待注册相关配置</el-divider>
        <el-form-item label="注册教程教程文章">
          <ArticleInput v-model="platTutorial.tutorial_id" />
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in platTutorial.copyable_text"
          :key="domain.key"
          :label="'可复制字段' + (index + 1)"
        >
          <el-space>
            <el-input v-model="domain.key" label="key" placeholder="名字" />
            <el-input
              v-model="domain.value"
              label="value"
              placeholder="可复制字段"
            />
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-space>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">添加可复制字段</el-button>
        </el-form-item>
        <el-divider>待补充相关配置</el-divider>
        <el-form-item
          v-for="(domain, index) in platTutorial.register_supplement"
          :key="index"
          :label="'需补充资料' + (index + 1)"
        >
          <el-space>
            <el-input v-model="domain.name" label="name" placeholder="名字" />
            <el-select v-model="domain.type" placeholder="类型">
              <el-option label="文本" value="text" />
              <el-option label="图片" value="image" />
              <el-option label="视频" value="video" />
            </el-select>
            <el-input
              v-model="domain.example"
              label="name"
              placeholder="文本示例"
            />
            <el-button @click.prevent="removeDatum(domain)"> 删除 </el-button>
          </el-space>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDatum">添加需补充资料</el-button>
        </el-form-item>
        <el-divider />
        <el-form-item>
          <el-button type="primary" @click="subPlatTutorial">更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {
  getPlatformId,
  upPlan,
  upPlatConfig,
  upPlatform,
  upPlatTutorial
} from "@/api/platform";
import { message } from "@/utils/message";
import { useRoute } from "vue-router";
import { ref } from "vue";
import UploadImage from "@/components/UploadImage/index.vue";
import { platformStoreHook } from "@/store/modules/platform";
import ArticleGroup from "@/components/ArticleGroup/index.vue";

defineOptions({
  name: "platform-update"
});

const route = useRoute();
const platformStatus = platformStoreHook().platformStatus;
const images = ref([]);
const example = ref([]);
const id = Number(route.query.id || 0);
const articleGroupKey = ref(`platform_article:${id}`);
const detail = ref({ icon: "", name: "", sort: 0, status: "active" });

const list = ref([]);
const platTutorial = ref({
  platform_id: id,
  tutorial_id: null,
  copyable_text: [],
  register_supplement: [],
  fields: [],
  type: [],
  platform_account: []
});

const plan = ref({
  platform_id: id,
  invite_user_reward: 0,
  invite_user_income_ratio: 0
});
const config = ref({
  color: "#ffffff",
  policy: "",
  process: "",
  withdraw_process: "",
  passed_guide: ""
});

const getPlatformDetail = async () => {
  const { data } = await getPlatformId(id);
  images.value.push({ url: data.platform.icon });
  list.value = data.articles;
  detail.value = {
    sort: 0,
    ...data.platform
  };
  config.value = {
    platform_id: data.platform.id,
    ...(data.config || {})
  };
  platTutorial.value = {
    platform_id: data.platform.id,
    tutorial_id: data.tutorial?.tutorial_id,
    copyable_text: data.tutorial?.copyable_text || [],
    register_supplement: data.tutorial?.register_supplement || [],
    fields: data.tutorial?.fields || [],
    type: data.tutorial?.type || [],
    platform_account: data.tutorial?.platform_account || []
  };
  example.value.push({
    url: data.tutorial?.home_page_capture_example || ""
  });
  plan.value = {
    platform_id: data.platform.id,
    ...(data.plan || {})
  };
};
const subUpPlan = async () => {
  await upPlan(plan.value);
  await getPlatformDetail();
  message("ok", { type: "success" });
};

const subUpAdmin = async () => {
  detail.value.sort = Number(detail.value.sort);
  await upPlatform(detail.value);
  message("ok", { type: "success" });
};

const coverImage = key => {
  detail.value.icon = key[0];
};

const exampleImage = key => {
  platTutorial.value.home_page_capture_example = key[0];
};

const removeDomain = item => {
  const index = platTutorial.value.copyable_text.indexOf(item);
  if (index !== -1) {
    platTutorial.value.copyable_text.splice(index, 1);
  }
};

const addDomain = () => {
  platTutorial.value.copyable_text.push({
    key: "可复制字段" + (platTutorial.value.copyable_text.length + 1),
    value: ""
  });
};

const removeDatum = item => {
  const index = platTutorial.value.register_supplement.indexOf(item);
  if (index !== -1) {
    platTutorial.value.register_supplement.splice(index, 1);
  }
};

const addDatum = () => {
  platTutorial.value.register_supplement.push({
    name: "",
    type: "",
    uuid: crypto.randomUUID(),
    example: ""
  });
};

const subPlatTutorial = async () => {
  await upPlatTutorial(platTutorial.value);
  message("ok", { type: "success" });
};

const updateConfig = async () => {
  await upPlatConfig(config.value);
  message("ok", { type: "success" });
};

if (id) {
  getPlatformDetail();
}
</script>

<style lang="scss" scoped></style>
