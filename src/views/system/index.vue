<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import UploadImage from "@/components/UploadImage/index.vue";
import {
  getInviteConfigs,
  getSystemConfigs,
  getWithdrawConfigs,
  resetCache,
  upInviteConfigs,
  upSystemConfigs,
  upWithdrawConfigs
} from "@/api/system";

defineOptions({
  name: "system"
});

const images = ref([]);

const pageConfig = ref([
  {
    key: "invite_intro",
    label: "邀请介绍"
  },
  {
    key: "help_center",
    label: "帮助中心"
  },
  {
    key: "policy_page",
    label: "政策页面"
  },
  {
    key: "user_notice",
    label: "用户须知"
  },
  {
    key: "privacy_policy",
    label: "隐私政策"
  },
  {
    key: "user_agreement",
    label: "用户协议"
  }
]);

const sysConfig = ref({
  invite_intro: "",
  help_center: "",
  policy_page: "",
  user_notice: "",
  privacy_policy: "",
  user_agreement: "",
  service_qr_code: ""
});

const withdrawConfig = ref({
  min_withdraw_amount: 0,
  withdraw_month_start: 0,
  withdraw_month_end: 0
});

const inviteConfig = ref({
  max_invite_user_reward: 0,
  max_invite_reward: 0
});

getSystemConfigs().then(({ data }: any) => {
  images.value.push({ url: data.config.service_qr_code });
  sysConfig.value = data.config;
});

getInviteConfigs().then(({ data }: any) => {
  inviteConfig.value = data.config;
});

getWithdrawConfigs().then(({ data }: any) => {
  withdrawConfig.value = data.config;
});

const saveConfig = async () => {
  await upSystemConfigs(sysConfig.value);
  ElMessage.success("保存成功");
};

const coverImage = key => {
  sysConfig.value.service_qr_code = key[0];
};

const saveInviteConfig = async () => {
  await upInviteConfigs(inviteConfig.value);
  ElMessage.success("保存成功");
};

const saveWithdrawConfig = async () => {
  await upWithdrawConfigs(withdrawConfig.value);
  ElMessage.success("保存成功");
};

const clearCache = async () => {
  await resetCache();
  ElMessage.success("清除成功");
};
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <h2>系统配置</h2>
      </template>
      <el-form :model="sysConfig" label-width="auto">
        <p>下面配置请填下路由</p>
        <br />
        <el-form-item v-for="c in pageConfig" :key="c.key" :label="c.label">
          <el-input v-model="sysConfig[c.key]">
            <template #append>
              <RouteBuilderButton />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="专属客服">
          <UploadImage
            :limit="1"
            @upImagekey="coverImage"
            :fileList="images"
            :isEstablish="images.length"
          />
        </el-form-item>
        <el-button type="primary" @click="saveConfig">保存</el-button>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <template #header>
        <h2>邀请配置</h2>
      </template>
      <el-form :model="sysConfig" label-width="auto">
        <p>下面配置请填下最大限制金额（单位：元）</p>
        <br />
        <el-form-item label="最大邀请用户奖励">
          <PriceInputForm v-model="inviteConfig.max_invite_user_reward" />
        </el-form-item>
        <el-form-item label="最大邀请奖励">
          <PriceInputForm v-model="inviteConfig.max_invite_reward" />
        </el-form-item>
        <el-button type="primary" @click="saveInviteConfig">保存</el-button>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <template #header>
        <h2>提现配置</h2>
      </template>
      <el-form :model="withdrawConfig" label-width="auto">
        <el-form-item label="最小提现金额">
          <PriceInputForm v-model="withdrawConfig.min_withdraw_amount" />
        </el-form-item>
        <el-form-item label="每月提现开始日期">
          <el-input-number
            v-model="withdrawConfig.withdraw_month_start"
            :min="1"
            :max="31"
          />
        </el-form-item>
        <el-form-item label="每月提现结束日期">
          <el-input-number
            v-model="withdrawConfig.withdraw_month_end"
            :min="1"
            :max="31"
          />
        </el-form-item>
        <el-button type="primary" @click="saveWithdrawConfig">保存</el-button>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <template #header>
        <h2>清除缓存</h2>
      </template>
      <h4>使用说明</h4>
      <p>1. 点击清除缓存按钮，可以清除所有缓存</p>
      <p>2. 缓存主要包括小程序首页配置，榜单排名</p>
      <br />
      <el-button type="danger" @click="clearCache">清除缓存</el-button>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
