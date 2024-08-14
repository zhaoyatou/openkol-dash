<template>
  <div>
    <el-card>
      <el-form :model="detail" label-width="auto">
        <el-form-item label="联系">
          <el-input v-model="detail.contact" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="detail.nickname" />
        </el-form-item>
      </el-form>
      <el-form-item label="头像" prop="avatar">
        <UploadImage
          :limit="1"
          @upImagekey="coverImage"
          :fileList="images"
          :isEstablish="!id"
        />
      </el-form-item>
      <el-button type="primary" @click="subStaff" v-if="!id">创建</el-button>
      <el-button type="primary" @click="subUpStaff" v-else>更新</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { creStaff, getStaffId, upStaff } from "@/api/staff";
import { message } from "@/utils/message";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import UploadImage from "@/components/UploadImage/index.vue";

defineOptions({
  name: "staff-detail"
});

const route = useRoute();
const router = useRouter();
const id = Number(String(route.query.id)) || 0;
const images = ref([]);
const detail = ref({ nickname: "", avatar: "", contact: "" });

if (id && id !== "") {
  getStaffId(id).then(({ data }) => {
    detail.value = data.staff;
    images.value.push({ url: data.staff.avatar });
  });
}

const subStaff = async () => {
  await creStaff(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const subUpStaff = async () => {
  await upStaff(detail.value);
  message("ok", { type: "success" });
  router.back();
};
const coverImage = key => {
  detail.value.avatar = key[0];
};
</script>

<style lang="scss" scoped></style>
