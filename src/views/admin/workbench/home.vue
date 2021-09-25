<template>
  <div class="admin-home">
    <el-row :gutter="12" style="width: 100%">
      <el-col :span="8">
        <el-card shadow="always"> 总访问量：{{ views }} </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always"> 文章总数：{{ pages }} </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserInfoApi, getCountViewsApi } from "@/views/API/admin.js";

export default {
  data() {
    return {
      views: 0,
      pages: 0,
    };
  },
  created() {
    this.getUserInfo();
    this.getCountViews();
  },
  methods: {
    async getUserInfo() {
      await getUserInfoApi({});
    },
    async getCountViews() {
      let res = await getCountViewsApi({});
      if (res) {
        this.views = res.allViews;
        this.pages = res.allpages;
      }
    },
  },
};
</script>

<style scoped lang="less">
.page-list {
  width: 100%;
  .content-item {
    font-size: 18px;
    text-align: left;
    padding: 5px;
  }
}
</style>
