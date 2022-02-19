<template>
  <div class="compressJs">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="部署名称" width="180">
      </el-table-column>
      <el-table-column prop="type" label="部署文件" width="180">
      </el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.class"
            @click="deployAdmin(scope.row)"
            :loading="scope.row.loading"
            >{{ scope.row.btnDesc }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column width="180" label="状态">
        <template slot-scope="scope">
          <el-button v-show="scope.row.success" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deployApi } from "@/views/API/tools.js";

export default {
  data() {
    return {
      tableData: [
        {
          name: "部署后台管理",
          type: "/build.sh",
          success: false,
          loading: false,
          btnDesc: "启动",
          class: "",
        },
        {
          name: "部署前台应用",
          type: "/build.nuxt.sh",
          success: false,
          loading: false,
          btnDesc: "启动",
          class: "",
        },
      ],
    };
  },
  created() {},
  methods: {
    async deployAdmin(row) {
      row.loading = true;
      row.btnDesc = "部署中";
      row.class = "primary";
      let res = await deployApi({ type: row.type || "" });
      if (res) {
        row.success = true;
      }
      row.loading = false;
      row.btnDesc = "重新启动";
      row.class = "primary";
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
