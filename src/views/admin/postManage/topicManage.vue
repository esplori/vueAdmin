<template>
  <div class="comments-list">
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="id">
        <template slot-scope="scope">
          {{ scope.row.postId }}
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="delConfirm(scope.row.id)" type="text" class="cus-button-danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  delCommentApi,
  getTopicDetailListApi
} from "@/views/API/admin.js";

export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList(this.$route.query.id);
  },
  methods: {
    async getList(id) {
      let res = await getTopicDetailListApi({topicId: parseInt(id)});
      if (res) {
        this.list = res.data.result;
      }
    },
    delConfirm(id) {
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.del(id)
      });
    },
    async del(id) {
      let res = await delCommentApi({ id: id });
      if (res) {
        this.$message.success("删除成功");
        this.getList();
      }
    }
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
