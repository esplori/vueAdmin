<template>
  <div class="comments-list">
    <el-table :data="list" style="width: 100%">
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.content}}
        </template>
      </el-table-column>
       <el-table-column label="时间">
        <template slot-scope="scope">
          {{scope.row.createDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getCommentApi,
  delCommentApi
} from "@/views/API/admin.js";

export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await getCommentApi();
      if (res) {
        this.list = res.result;
      }
    },
    async del(id) {
      let res = await delCommentApi({ id: id });
      if (res) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    /**
     * 编辑
     */
    edit(row) {
      this.$set(row, "disabled", !row.disabled);
    },
    async handleBlur(row) {
      if (row.id) {
        let res = await updateCateApi(row);
        if (res) {
          this.$set(row, "disabled", !row.disabled);
        }
      } else {
        let res = await insertCateApi(row);
        if (res) {
          this.getList();
        }
      }
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getList();
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
