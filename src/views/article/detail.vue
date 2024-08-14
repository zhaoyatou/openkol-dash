<template>
  <el-card>
    <el-form :model="detail" label-width="auto">
      <el-form-item label="封面" prop="image">
        <UploadImage
          :limit="1"
          @upImagekey="coverImage"
          :fileList="images"
          :isEstablish="!id"
        />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="detail.title" style="max-width: 800px" />
      </el-form-item>
      <el-form-item label="可见性">
        <el-space>
          <el-select v-model="detail.visibility" placeholder="请选择">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <RouteBuilderButton style="margin-left: 10px" />
          <el-popconfirm
            title="切换HTML模式可能会打断图片上传，请确保没有正在上传的图片"
            @confirm="quillMode = !quillMode"
            :width="300"
          >
            <template #reference>
              <el-button v-if="quillMode" type="danger"
                >切换为HTML模式</el-button
              >
              <el-button v-else type="danger" @click="quillMode = true"
                >切换为富文本模式</el-button
              >
            </template>
          </el-popconfirm>
        </el-space>
      </el-form-item>
      <el-form-item label="内容">
        <quill v-model="html" v-if="quillMode" />
        <el-input v-model="html" type="textarea" v-if="!quillMode" :rows="30" />
      </el-form-item>
    </el-form>
    <el-button type="primary" class="mt-5" @click="subAdmin" v-if="!id">
      创建
    </el-button>
    <el-button type="primary" class="mt-5" @click="subUpAdmin" v-else>
      更新
    </el-button>
  </el-card>
</template>

<script setup>
import { creArticleList, getArticleId, upArticle } from "@/api/article";
import { message } from "@/utils/message";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import UploadImage from "@/components/UploadImage/index.vue";
import quill from "@/components/Quill/index.vue";
import { articleVisibilities } from "@/utils/enums";

defineOptions({
  name: "article-detail"
});

const status = articleVisibilities(false);
const detail = ref({ cover: "", title: "", content: "", visibility: "draft" });
const route = useRoute();
const router = useRouter();
const images = ref([]);
const quillMode = ref(true);

const id = String(route.query.id || "");

const html = ref("");

if (id && id !== "") {
  getArticleId(id).then(({ data }) => {
    images.value.push({ url: data.article.cover });
    html.value = data.article.content;
    detail.value = data.article;
  });
}

const subAdmin = async () => {
  detail.value.content = html.value;
  await creArticleList(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const subUpAdmin = async () => {
  detail.value.content = html.value;
  await upArticle(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const coverImage = key => {
  console.log(key);
  detail.value.cover = key[0];
};
</script>

<style lang="scss" scoped></style>
