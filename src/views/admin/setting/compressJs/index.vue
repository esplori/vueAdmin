<template>
  <div class="compressJs">
    <el-button @click="compressJs" :loading="loading">部署网站</el-button> <i class="el-icon-check success" v-show="showSuccessIcon"></i>
  </div>
</template>

<script>
import { getCompressJsApi } from "@/views/API/tools.js";

export default {
  data() {
    return {
      list: [],
      loading: false,
      showSuccessIcon: false
    };
  },
  created() {},
  methods: {
    async compressJs() {
      this.loading = true
      let res = await getCompressJsApi({});
      if (res) {
        this.loading = false
        this.showSuccessIcon = true
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
