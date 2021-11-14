<template>
  <div class="page-list">
    <el-button type="primary" @click="insertCate">新增分类</el-button>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary">编辑</el-button>
          <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

     <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <div>
        <el-input v-model="row.name" placeholder="请输入名称"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(row)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  delCateApi,
  getCateApi,
  updateCateApi,
  insertCateApi,
} from "@/views/API/admin.js";

export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      title: "新增",
      row: {
        id: "",
        name: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    insertCate() {
      this.dialogVisible = true
      this.title = "新增"
    },
    async getList() {
      let res = await getCateApi(this.params);
      if (res) {
        this.list = res.result;
        this.total = res.total;
      }
    },
    async del(id) {
      let res = await delCateApi({ id: id });
      if (res) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    /**
     * 编辑
     */
    edit(row) {
      this.title = "编辑"
      this.dialogVisible = true;
      this.row = row;
    },
    async submit(row) {
      if (row.id) {
        let res = await updateCateApi(row);
        if (res) {
          this.getList();
        }
      } else {
        let res = await insertCateApi(row);
        if (res) {
          this.getList();
        }
      }
      this.dialogVisible = false;
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getList();
    },
    handleClose() {
      this.row = {
        id: "",
        name: "",
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
