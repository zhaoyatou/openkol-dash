<template>
  <div>
    <el-form :model="query" label-width="auto" inline>
      <el-form-item label="被邀请人ID">
        <UserInput v-model="query.invitee_id" />
      </el-form-item>
      <el-form-item label="邀请人ID">
        <UserInput v-model="query.inviter_id" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
        <el-button type="danger" @click="router.push(`/invite-detail`)"
          >创建邀请</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="list" class="mt-5">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column label="被邀请">
        <template #default="scope">
          <UserTableItem :user="scope.row.invitee" />
        </template>
      </el-table-column>
      <el-table-column label="邀请">
        <template #default="scope">
          <UserTableItem :user="scope.row.inviter" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ second2Time(scope.row.created_at) }}
        </template>
      </el-table-column>
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
              @confirm="deleteAdmin(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </el-row>
          <el-row>
            <el-button
              type="primary"
              @click="router.push(`/invite-detail?id=${scope.row.id}`)"
            >
              更新
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-4"
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="limit"
      @current-change="change"
    />
  </div>
</template>
<script setup>
import { delInvite, getInviteList } from "@/api/invite";
import { message } from "@/utils/message";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { second2Time } from "@/utils/convert";
import { InfoFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "invite"
});

const router = useRouter();
const list = ref([]);
const count = ref();
const limit = ref(20);
const page = ref(0);
const initQuery = {
  invitee_id: 0,
  inviter_id: 0
};
const query = ref({ ...initQuery });

const getList = async () => {
  const { data } = await getInviteList({
    limit: limit.value,
    page: page.value,
    ...query.value
  });
  list.value = data.invites;
  count.value = data.count;
};

const resetQuery = async () => {
  query.value = { ...initQuery };
  await getList();
};

const change = async e => {
  page.value = e - 1;
  getList();
};

const deleteAdmin = async id => {
  await delInvite(id);
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
