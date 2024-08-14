<template>
  <div style="margin: 20px">
    <h1>Welcome to OpenKOL!</h1>
    <h2>Permission : {{ userInfo.roles.map(r => r.name).join(",") }}</h2>
  </div>
</template>

<script setup lang="ts">
import { storageLocal } from "@pureadmin/utils";
import { type DataInfo, sessionKey } from "@/utils/auth";

const userInfo = storageLocal().getItem<DataInfo>(sessionKey);
</script>

<style lang="scss" scoped></style>
