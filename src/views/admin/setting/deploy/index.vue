<template>
  <div class="compressJs">
    <el-button @click="deployAdmin" :loading="Adminloading"
      >部署后台管理</el-button
    >
    <i class="el-icon-check success" v-show="AdminSuccessIcon"></i>
    <el-button @click="deployFront" :loading="Frontloading"
      >部署前台应用</el-button
    >
    <i class="el-icon-check success" v-show="FrontSuccessIcon"></i>
  </div>
</template>

<script>
import { deployApi } from "@/views/API/tools.js";

export default {
  data() {
    return {
      list: [],
      Adminloading: false,
      AdminSuccessIcon: false,
      Frontloading: false,
      FrontSuccessIcon: false,
    };
  },
  created() {},
  methods: {
    async deployAdmin() {
      this.Adminloading = true;
      let res = await deployApi({ type: "/build.sh" });
      if (res) {
        this.AdminSuccessIcon = true;
      }
      this.Adminloading = false;
    },
    async deployFront() {
      this.Frontloading = true;
      let res = await deployApi({ type: "/test.sh" });
      if (res) {
        this.FrontSuccessIcon = true;
      }
      this.Frontloading = false;
    },
  },
};
</script>

<style scoped lang="less">
.compressJs {
  width: 100%;
  .success {
    color: #67c23a;
  }
}
</style>
