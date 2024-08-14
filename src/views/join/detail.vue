<template>
  <el-card>
    <el-descriptions title="基本信息" border>
      <el-descriptions-item label="用户ID">{{
        detail.user?.id
      }}</el-descriptions-item>
      <el-descriptions-item label="用户">
        <UserTableItem :user="detail.user" />
      </el-descriptions-item>
      <el-descriptions-item label="平台账号">{{
        detail.platform_account
      }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{
        detail.nickname
      }}</el-descriptions-item>
      <el-descriptions-item label="入驻平台">{{
        detail.platform?.name
      }}</el-descriptions-item>
      <el-descriptions-item label="类型">{{
        detail.type
      }}</el-descriptions-item>
      <el-descriptions-item label="主页链接">{{
        detail.home_page
      }}</el-descriptions-item>
      <el-descriptions-item label="粉丝量">{{
        detail.fans
      }}</el-descriptions-item>
      <el-descriptions-item label="领域">{{
        detail.field
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        detail.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{
        detail.email
      }}</el-descriptions-item>
      <el-descriptions-item label="代运营">{{
        detail.is_agent ? "是" : "否"
      }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{
        second2Time(detail.created_at)
      }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="附件信息" border class="mt-5" column="1">
      <el-descriptions-item label="首页图片">
        <el-image
          :src="detail.home_page_image"
          :preview-src-list="[detail.home_page_image]"
          style="width: 200px; height: 200px"
          fit="cover"
        />
      </el-descriptions-item>
      <el-descriptions-item
        v-for="(item, index) in detail.supplement"
        :key="index"
        :label="item.name"
      >
        <el-image
          v-if="item.type === 'image'"
          :src="item.value"
          :preview-src-list="[item]"
          style="width: 200px; height: 200px"
          fit="cover"
        />
        <video v-if="item.type === 'video'" controls width="200" height="150">
          <source :src="item.value" type="video/mp4" />
        </video>
        <div v-if="item.type === 'text'">{{ item.value }}</div>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="当前审核状态" border class="mt-5">
      <el-descriptions-item label="状态">{{
        platformJoinStatus2Text(detail.status)
      }}</el-descriptions-item>
      <el-descriptions-item label="驳回原因">{{
        rejectReason2Chinese(detail.reject_reason)
      }}</el-descriptions-item>
      <el-descriptions-item label="审核人ID">{{
        detail.admin_id
      }}</el-descriptions-item>
      <el-descriptions-item label="审核时间">{{
        second2Time(detail.audit_time)
      }}</el-descriptions-item>
      <el-descriptions-item label="审核备注">{{
        detail.audit_remark
      }}</el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-form
      :model="joinAudit"
      class="mt-5"
      v-if="detail.status !== 'pass'"
      label-width="auto"
    >
      <h3 class="mb-4">审核</h3>
      <el-form-item label="状态">
        <el-select v-model="joinAudit.status" placeholder="请选择">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="驳回原因" v-if="joinAudit.status === 'reject'">
        <el-select v-model="joinAudit.reject_reason" placeholder="请选择">
          <el-option
            v-for="item in rejectReason"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="joinAudit.audit_remark" type="textarea" />
      </el-form-item>
      <el-button type="primary" @click="confirm">确认</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import { auditPlatformJoin, getPlatformJoinId } from "@/api/join";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { second2Time } from "@/utils/convert";
import { joinStoreHook } from "@/store/modules/join";
import { message } from "@/utils/message";
import { platformJoinStatus2Text } from "@/utils/enums";

defineOptions({
  name: "join-detail"
});

const rejectReason = ref([
  {
    value: "pending",
    label: "驳回注册信息"
  },
  {
    value: "supplement",
    label: "驳回补充信息"
  }
]);

const rejectReason2Chinese = value => {
  return rejectReason.value.find(item => item.value === value)?.label || "";
};

const detail = ref({});
const route = useRoute();
const router = useRouter();
const joinAudit = ref({ status: "", audit_remark: "", reject_reason: "" });
const status = joinStoreHook().status;

const id = String(route.query.id || "");

if (id && id !== "") {
  getPlatformJoinId(id).then(({ data }) => {
    detail.value = data.join;
  });
}

const confirm = async () => {
  joinAudit.value.id = Number(id);
  await auditPlatformJoin({ ...joinAudit.value });
  message("操作成功", { type: "success" });
  router.back();
};
</script>

<style lang="scss" scoped></style>
