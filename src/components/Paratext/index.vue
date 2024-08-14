<template>
  <div>
    <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      :id="tinymceId"
    />
  </div>
</template>

<script setup>
import tinymce from "tinymce/tinymce";
// import "tinymce/skins/content/default/content.css";
import Editor from "@tinymce/tinymce-vue";
import "./sideEffects";
import { uploadFile } from "@/api/components";
import { ref, reactive, watch, onMounted } from "vue";

const emits = defineEmits(["getContent"]);
//这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
const props = defineProps({
  value: {
    type: String,
    default: () => {
      return "";
    }
  },
  baseUrl: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  },
  plugins: {
    type: [String, Array],
    default:
      "importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link codesample table charmap nonbreaking anchor insertdatetime advlist lists wordcount charmap quickbars emoticons accordion"
  },
  knwlgId: {
    type: String
  },
  toolbar: {
    type: [String, Array],
    default:
      "undo redo | accordion accordionremove | blocks fontfamily fontsize| bold italic underline strikethrough ltr rtl  | align numlist bullist | link image | table | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | anchor codesample"
  }
});

const loading = ref(false);

const myValue = ref(props.value);
const tinymceId = ref(
  "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "")
);

//定义一个对象 init初始化
const init = reactive({
  selector: "#" + tinymceId.value, //富文本编辑器的id,
  language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径，具体路径看自己的项目
  language: "zh_CN",
  skin_url: "/tinymce/skins/ui/oxide", // skin路径，具体路径看自己的项目
  editable_root: props.editable_root,
  height: 600,
  branding: false, // 是否禁用“Powered by TinyMCE”
  promotion: false, //去掉 upgrade
  toolbar_sticky: true,
  toolbar_sticky_offset: 100,
  menubar: "edit view insert format tools table",
  paste_data_images: true, //允许粘贴图像
  image_dimensions: false, //去除宽高属性
  plugins: props.plugins, //这里的数据是在props里面就定义好了的
  toolbar: props.toolbar, //这里的数据是在props里面就定义好了的
  // 默认快捷菜单
  quickbars_insert_toolbar: "quicktable image codesample table",
  // 选中图片的快捷提示
  quickbars_image_toolbar:
    "alignleft aligncenter alignright | rotateleft rotateright | imageoptions",
  editimage_toolbar:
    "rotateleft rotateright | flipv fliph | editimage imageoptions",
  // 文字样式
  font_family_formats:
    "Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;", //字体
  font_size_formats: "11px 12px 14px 16px 18px 24px 36px 48px 64px 72px", //文字大小
  image_caption: true,
  editimage_cors_hosts: ["picsum.photos"],
  noneditable_class: "mceNonEditable",
  toolbar_mode: "wrap", // 工具栏模式 floating / sliding / scrolling / wrap
  // 默认样式
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
  image_advtab: true,
  importcss_append: true,
  paste_webkit_styles: "all",
  paste_merge_formats: true,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,
  file_picker_types: "file",
  // 选中文字的快捷提示
  quickbars_selection_toolbar:
    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
  // 编辑器高度自适应
  autoresize_bottom_margin: 20,
  autoresize_min_height: 600,
  // autoresize_overflow_padding: 50,
  content_css: "/tinymce/skins/content/default/content.css", //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  // eslint-disable-next-line
  setup: function (editor) {
    //编辑器初始化
  },
  // eslint-disable-next-line
  init_instance_callback: function (editor) {
    // 编辑器初始化完毕
  },
  //图片上传
  // eslint-disable-next-line
  images_upload_handler: (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const file = blobInfo.blob();
      if (file.size / 1024 / 1024 > 200) {
        reject({
          message: "上传失败，图片大小请控制在 200M 以内",
          remove: true
        });
      }
      const formData = new FormData();
      formData.append("file", file);
      loading.value = true;
      uploadFile(formData)
        .then(({ data }) => {
          loading.value = false;
          resolve(data.url);
        })
        .catch(() => {
          loading.value = false;
        });
    })
});

//监听富文本中的数据变化
watch(
  () => myValue.value,
  () => {
    emits("getContent", myValue.value);
  }
);

//初始化编辑器
onMounted(() => {
  tinymce.init({});
});
</script>

<style lang="scss" scoped>
:deep(.tox-tinymce) {
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  .tox-statusbar {
    display: none;
  }
}
</style>
