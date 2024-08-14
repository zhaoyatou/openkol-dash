<template>
  <el-card>
    <el-form :model="detail" label-width="auto">
      <PriceInputForm v-model="detail.income" label="金额" />
      <el-form-item label="平台">
        <PlatformInput v-model="detail.platform_id" />
      </el-form-item>
      <el-form-item label="用户">
        <UserInput v-model="detail.user_id" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="value"
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          style="width: 240px"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="确认转账">
        <div style="display: flex; flex-direction: column; width: 240px;">
            <el-input
            v-model="confirm"
            placeholder="输入“中文大写转账金额”完成转账操作"
            style="width: 240px"
          />
          <el-alert :title="moneyCn" type="warning" :closable="false" style="width: 240px" />
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="subIncome">录入</el-button>
  </el-card>
</template>

<script setup>
import { creIncomeList } from "@/api/income";
import { message } from "@/utils/message";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { cent2Yuan } from "@/utils/convert";

defineOptions({
  name: "income-detail"
});

const route = useRoute();
const router = useRouter();
const detail = ref({
  income: 0,
  platform_id: Number(route.query.platform_id) || 0,
  type: "",
  user_id: Number(route.query.user_id) || 0
});
const confirm = ref("");
const value = ref();
const statusList = [
  {
    label: "邀请_管理员操作",
    value: "invite_admin_operation"
  },
  {
    label: "内容收益_新增",
    value: "content_profit_new"
  },
  {
    label: "内容收益_管理员操作",
    value: "content_profit_admin_operation"
  }
];

const moneyCn = computed(() => numberToChinese(cent2Yuan(detail.value.income)));

const subIncome = async () => {
  if (confirm.value !== moneyCn.value) {
    message("请完成确认转账操作", { type: "error" });
    return;
  }
  detail.value.income = Number(detail.value.income);
  detail.value.platform_id = Number(detail.value.platform_id);
  detail.value.user_id = Number(detail.value.user_id);
  detail.value.type = value.value;
  await creIncomeList(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const numberToChinese = (n) => {
  const isNegative = n.startsWith("-");
  if (isNegative) {
    n = n.slice(1);
  } 
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return '数据非法';
  }
  let unit = '千百拾亿千百拾万千百拾元角分';
  let str = '';
  n = n.replace(',', '');
  n += '00';
  const p = n.indexOf('.');
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2);
  }
  unit = unit.substring(unit.length - n.length);
  for (let i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  }
  str = str
  .replace(/零(千|百|拾|角)/g, '零')
  .replace(/(零)+/g, '零')
  .replace(/零(万|亿|元)/g, '$1')
  .replace(/(亿)万|壹(拾)/g, '$1$2')
  .replace(/^元零?|零分/g, '')
  .replace(/元$/g, '元整');
  if (isNegative) {
    str = `负${str}`;
  }
  return str;
};

</script>

<style lang="scss" scoped></style>
