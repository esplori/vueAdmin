<template>
  <div class="compressJs">
    <el-button @click="deployAdmin" :loading="Adminloading">部署后台管理</el-button> <i class="el-icon-check success" v-show="AdminSuccessIcon"></i>
    <el-button @click="deployFront" :loading="Frontloading">部署前台应用</el-button> <i class="el-icon-check success" v-show="FrontSuccessIcon"></i>
  </div>
</template>

<script>
import { getCompressJsApi } from "@/views/API/tools.js";

export default {
  data() {
    return {
      list: [],
      Adminloading: false,
      AdminSuccessIcon: false,
      Frontloading: false,
      FrontSuccessIcon: false
    };
  },
  created() {},
  methods: {
    async deployAdmin() {
      this.loading = true
      let res = await getCompressJsApi({});
      if (res) {
        this.Adminloading = false
        this.AdminSuccessIcon = true
      }
    },
    async deployFront() {
      this.loading = true
      let res = await getCompressJsApi({});
      if (res) {
        this.Frontloading = false
        this.FrontSuccessIcon = true
      }
    },
  },
};
</script>

<style scoped lang="less">
.compressJs {
  width: 100%;
  .success{
    color: #67C23A;
  }
}
</style>
