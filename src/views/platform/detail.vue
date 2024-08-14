<template>
  <el-card>
    <el-form :model="detail">
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
    <el-button type="primary" @click="subPlatform">创建</el-button>
  </el-card>
</template>

<script setup>
import { crePlatformList } from "@/api/platform";
import { message } from "@/utils/message";
import { useRouter } from "vue-router";
import { ref } from "vue";
import UploadImage from "@/components/UploadImage/index.vue";
import { platformStoreHook } from "@/store/modules/platform";

defineOptions({
  name: "platform-detail"
});

const detail = ref({ icon: "", name: "", sort: 0, status: "active" });
const router = useRouter();
const platformStatus = platformStoreHook().platformStatus;
const images = ref([]);

const subPlatform = async () => {
  detail.value.sort = Number(detail.value.sort);
  await crePlatformList(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const coverImage = key => {
  console.log(key);
  detail.value.icon = key[0];
};
</script>

<style lang="scss" scoped></style>
