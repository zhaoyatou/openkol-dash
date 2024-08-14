<template>
  <el-card>
    <el-form :model="detail" label-width="auto">
      <el-form-item label="显示位置" prop="location">
        <el-select v-model="locationValue">
          <el-option
            v-for="item in locationList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="detail.title" />
      </el-form-item>
      <el-form-item label="热力值">
        <el-input v-model="detail.hot" />
      </el-form-item>
      <el-form-item label="图片(250x50)" prop="image">
        <UploadImage
          :limit="1"
          @upImagekey="coverImage"
          :fileList="images"
          :isEstablish="!id"
        />
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          v-model="detail.enabled"
          active-text="yes"
          inactive-text="no"
        />
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="detail.target">
          <template #append>
            <RouteBuilderButton />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="subRecommend" v-if="!id">创建</el-button>
    <el-button type="primary" @click="subUpRecommend" v-else>更新</el-button>
  </el-card>
</template>

<script setup>
import { creRecommend, getRecommendId, upRecommend } from "@/api/recommend";
import { message } from "@/utils/message";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import UploadImage from "@/components/UploadImage/index.vue";
import { advertisementLocations } from "@/utils/enums";

defineOptions({
  name: "recommend-detail"
});

const detail = ref({
  enabled: true,
  image: "",
  location: "",
  title: "1",
  hot: 0
});
const route = useRoute();
const router = useRouter();
const locationValue = ref("home");
const images = ref([]);
const locationList = advertisementLocations(false);

const id = String(route.query.id || "");

if (id && id !== "") {
  getRecommendId(id).then(({ data }) => {
    images.value.push({ url: data.advertisement.image });
    detail.value = data.advertisement;
    locationValue.value = data.advertisement.location;
  });
}

const subRecommend = async () => {
  detail.value.sort = Number(detail.value.sort);
  detail.value.hot = Number(detail.value.hot);
  detail.value.location = locationValue.value;
  await creRecommend(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const subUpRecommend = async () => {
  detail.value.sort = Number(detail.value.sort);
  detail.value.hot = Number(detail.value.hot);
  detail.value.location = locationValue.value;
  await upRecommend(detail.value);
  message("ok", { type: "success" });
  router.back();
};
const coverImage = key => {
  console.log(key);
  detail.value.image = key[0];
};
</script>

<style lang="scss" scoped></style>
