<template>
  <el-form-item :label="props.label">
    <el-input-number
      v-model="moneyYuan"
      :precision="2"
      :step="0.01"
      style="width: 240px"
    />
  </el-form-item>
</template>
<script lang="ts" setup>
import { computed, defineModel } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: () => {
      return "";
    }
  }
});

const money = defineModel({
  type: Number,
  default: 0
});

const moneyYuan = computed({
  get: () => money.value / 100,
  set: val => (money.value = parseInt((val * 100).toFixed(0), 10))
});
</script>
