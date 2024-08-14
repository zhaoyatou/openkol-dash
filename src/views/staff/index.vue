<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item>
        <el-button type="danger" @click="router.push(`/staff-detail`)"
          >创建运营人员</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column label="运营信息">
        <template #default="scope">
          <div style="display: flex; align-content: center">
            <el-avatar :size="20" :src="scope.row.avatar" />
            <strong style="margin-left: 8px">{{ scope.row.nickname }}</strong>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contact" label="联系" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-row>
            <el-popconfirm
              width="220"
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
              @confirm="deleteStaff(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </el-row>
          <el-row>
            <el-button
              type="primary"
              @click="router.push(`/staff-detail?id=${scope.row.id}`)"
            >
              更新
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { delStaff, getStaffList } from "@/api/staff";
import { message } from "@/utils/message";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "staff"
});

const router = useRouter();
const list = ref([]);

const getList = async () => {
  const { data } = await getStaffList();
  list.value = data.staffs;
};

const deleteStaff = async id => {
  await delStaff(id);
  message("ok", { type: "success" });
  await getList();
};

getList();
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 10px;
}
</style>
