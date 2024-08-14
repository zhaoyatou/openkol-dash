<template>
  <div>
    <quill-editor
      v-model:content="value"
      :toolbar="toolbar"
      :modules="modules"
      class="editor"
      theme="snow"
      content-type="html"
    />
  </div>
</template>

<script setup>
import { Quill, QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";
import ResizeModule from "@ssumo/quill-resize-module";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, defineModel } from "vue";
import { getQiniuToken } from "@/api/user";
import { upQiniuImage } from "@/utils/qiniu-js";
const value = defineModel();

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/resize", ResizeModule);

const toolbar = ref([
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  [{ size: ["12", "14", "16", "18", "20", "22", "24", "28", "32", "36"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  // [{ font: ['songti'] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["image", "link"] // 链接、图片、视频
]);

const modules = ref([
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: async file => {
        console.log(file);
        const { data } = await getQiniuToken({ filename: file.name });
        console.log(data);
        await upQiniuImage(data.token, { file });
        return data.token.url;
      }
    }
  },
  {
    name: "resize",
    module: ResizeModule
  }
]);
</script>

<style lang="scss">
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  min-height: 500px;
}
</style>
