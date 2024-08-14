<template>
  <div>
    <el-card>
      <el-form :model="detail" label-width="auto">
        <el-form-item label="用户名">
          <el-input v-model="detail.username" />
        </el-form-item>
        <el-form-item label="备注别名">
          <el-input v-model="detail.remark" />
        </el-form-item>
      </el-form>
      <el-form-item label="头像" prop="avatar">
        <UploadImage
          :limit="1"
          @upImagekey="coverImage"
          :fileList="images"
          :isEstablish="!id"
        />
      </el-form-item>
      <el-button type="primary" @click="subUser" v-if="!id">创建</el-button>
      <el-button type="primary" @click="subUpUser" v-else>更新</el-button>
    </el-card>
    <br />
    <div v-if="id">
      <el-card>
        <el-form :model="staffRef" label-width="auto" inline>
          <el-form-item>
            <el-form-item label="运营ID">
              <el-input v-model="staffRef.staff_id" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="staffRef.remark" />
            </el-form-item>
            <el-button type="primary" @click="subStaff()"
              >添加/修改 运营人员</el-button
            >
          </el-form-item>
        </el-form>
        <el-table :data="list" class="mt-5">
          <el-table-column prop="id" label="运营ID" width="100px" />
          <el-table-column label="运营信息">
            <template #default="scope">
              <div style="display: flex; align-content: center">
                <el-avatar :size="20" :src="scope.row.avatar" />
                <strong style="margin-left: 8px">{{
                  scope.row.nickname
                }}</strong>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="contact" label="联系方式" />
          <el-table-column prop="remark" label="备注" />
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
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {
  creStaff,
  creUser,
  delStaff,
  getStaffList,
  getUserId,
  upUser
} from "@/api/user";
import { message } from "@/utils/message";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import UploadImage from "@/components/UploadImage/index.vue";
import { InfoFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "user-detail"
});

const list = ref([]);
const detail = ref({ username: "", avatar: "", remark: "" });
const route = useRoute();
const router = useRouter();
const images = ref([]);
const id = Number(route.query.id || 0);
const staffRef = ref({ staff_id: 0, user_id: id, remark: "" });

if (id && id !== "") {
  getUserId(id).then(({ data }) => {
    detail.value = data.user;
    images.value.push({ url: data.user.avatar });
  });
}

const getList = async () => {
  const { data } = await getStaffList({ id: id });
  console.log(data);
  list.value = data.staffs;
};

const subUser = async () => {
  await creUser(detail.value);
  message("ok", { type: "success" });
  router.back();
};

const subUpUser = async () => {
  await upUser(detail.value);
  message("ok", { type: "success" });
  router.back();
};
const coverImage = key => {
  detail.value.avatar = key[0];
};
const subStaff = async () => {
  staffRef.value.staff_id = Number(staffRef.value.staff_id);
  await creStaff(staffRef.value);
  message("ok", { type: "success" });
  await getList();
};
const deleteStaff = async staff_id => {
  await delStaff({ staff_id, user_id: id });
  message("ok", { type: "success" });
  await getList();
};
getList();
</script>

<style lang="scss" scoped></style>
