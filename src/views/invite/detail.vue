<template>
  <el-card>
    <el-form :model="detail" label-width="auto">
      <el-form-item label="被邀请人ID">
        <UserInput v-model="detail.invitee_id" />
      </el-form-item>
      <el-form-item label="邀请人ID">
        <UserInput v-model="detail.inviter_id" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="subInvite" v-if="!id">创建</el-button>
    <el-button type="primary" @click="subUpInvite" v-else>更新</el-button>
  </el-card>
</template>

<script setup>
import { creInvite, getInviteId, upInvite } from "@/api/invite";
import { message } from "@/utils/message";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

defineOptions({
  name: "invite-detail"
});

const route = useRoute();
const router = useRouter();
const id = Number(String(route.query.id)) || 0;
const detail = ref({ id: id, invitee_id: 0, inviter_id: 0 });

if (id && id !== "") {
  getInviteId(id).then(({ data }) => {
    const { invite } = data;
    detail.value = {
      id: id,
      invitee_id: invite.invitee.id,
      inviter_id: invite.inviter.id
    };
  });
}

const subInvite = async () => {
  detail.value.invitee_id = Number(detail.value.invitee_id);
  detail.value.inviter_id = Number(detail.value.inviter_id);
  await creInvite(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const subUpInvite = async () => {
  await upInvite(detail.value);
  message("ok", { type: "success" });
  router.back();
};
</script>

<style lang="scss" scoped></style>
