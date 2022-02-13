<template>
  <div class="compressJs">
    <el-button @click="compressJs">部署网站</el-button>
  </div>
</template>

<script>
import { getCompressJsApi } from "@/views/API/tools.js";

export default {
  data() {
    return {
      list: [],
    };
  },
  created() {},
  methods: {
    async compressJs() {
      let res = await getCompressJsApi({});
      if (res) {
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
