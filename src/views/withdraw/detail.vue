<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>提现审核</h1>
        </div>
      </template>
      <el-descriptions title="账户信息" border>
        <el-descriptions-item label="id">{{ account.id }}</el-descriptions-item>
        <el-descriptions-item label="账户信息">
          <div v-if="account.bank_account">
            <el-row> 用户名：{{ account.bank_account.user_name }} </el-row>
            <el-row> 账号:{{ account.bank_account.user_no }} </el-row>
            <el-row> 手机号：{{ account.bank_account.mobile }} </el-row>
            <el-row> 城市：{{ account.bank_account.bank_name }} </el-row>
            <el-row> 卡号：{{ account.bank_account.card_no }} </el-row>
          </div>
          <div v-else>
            <el-image
              :src="account.image"
              :preview-src-list="[account.image]"
              style="width: 50px; height: 50px"
              fit="cover"
            />
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="类型">{{
          account.type
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          second2Time(account.created_at)
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{
          second2Time(account.updated_at)
        }}</el-descriptions-item>
      </el-descriptions>
      <br />
      <el-descriptions title="提现信息" border>
        <el-descriptions-item label="提现ID">{{
          detail.id
        }}</el-descriptions-item>
        <el-descriptions-item label="用户">
          <template #default="">
            <UserTableItem :user="user" />
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="提现金额">
          <div style="font-weight: 600; color: #ff5a5a">
            {{ cent2Yuan(detail.amount) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          second2Time(user.created_at)
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{
          second2Time(user.updated_at)
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <br />
    <el-card v-if="detail.status === 'pending'">
      <template #header>
        <div class="card-header">
          <h1>审核回执</h1>
        </div>
      </template>
      <el-form :model="receiptRef" label-width="auto">
        <el-form-item label="状态">
          <el-select
            v-model="receiptRef.status"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="回执">
          <el-input v-model="receiptRef.receipt" />
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <UploadImage
            :limit="1"
            @upImagekey="coverImage"
            :fileList="images"
            :isEstablish="!id"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="subWithdraw">更新</el-button>
    </el-card>
    <el-card v-else>
      <template #header>
        <div class="card-header">
          <h1>审核回执</h1>
        </div>
      </template>
      <el-descriptions title="审核回执" border>
        <el-descriptions-item label="状态">{{
          withdrawRequestStatus2Text(detail.status)
        }}</el-descriptions-item>
        <el-descriptions-item label="回执">{{
          detail.receipt
        }}</el-descriptions-item>
        <el-descriptions-item label="图片">
          <el-image
            :src="detail.receipt_image"
            :preview-src-list="[detail.receipt_image]"
            style="width: 200px; height: 200px"
            fit="cover"
          />
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { getWithdrawId, upWithdraw } from "@/api/withdraw";
import { message } from "@/utils/message";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import UploadImage from "@/components/UploadImage/index.vue";
import {
  withdrawRequestStatus2Text,
  withdrawRequestStatuses
} from "@/utils/enums";
import { cent2Yuan, second2Time } from "@/utils/convert";

defineOptions({
  name: "withdraw-detail"
});

const route = useRoute();
const router = useRouter();
const images = ref([]);
const id = Number(route.query.id || 0);
const detail = ref({ id: id, status: "", receipt: "", receipt_image: "" });
const status = withdrawRequestStatuses(false);
const account = ref({
  id: 0,
  image: "",
  type: "",
  created_at: 0,
  updated_at: 0,
  bank_account: null
});
const user = ref({
  id: 0,
  username: "",
  avatar: "",
  created_at: 0,
  updated_at: 0
});
const receiptRef = ref({
  id: id,
  status: "pending",
  receipt: "",
  receipt_image: ""
});

if (id && id !== "") {
  getWithdrawId(id).then(({ data }) => {
    images.value.push({ url: data.withdraw.receipt_image });
    detail.value = data.withdraw;
    account.value = data.withdraw.account;
    user.value = data.withdraw.user;
  });
}

const subWithdraw = async () => {
  await upWithdraw(receiptRef.value);
  message("ok", { type: "success" });
  router.back();
};
const coverImage = key => {
  console.log(key);
  receiptRef.value.receipt_image = key[0];
};
</script>

<style lang="scss" scoped></style>
