<script setup lang="ts">
import articleGroup from "@/components/ArticleGroup/index.vue";

defineOptions({
  name: "home-article"
});
</script>

<template>
  <el-card>
    <articleGroup group-key="home_article" />
  </el-card>
</template>

<style scoped lang="scss"></style>
