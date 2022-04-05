<template>
  <div class="page-list">
    <div class="handle">
      <el-form :model="params" label-width="80px">
        <el-form-item label="采集条数:">
          <el-input v-model.number="params.pageSize"></el-input>
        </el-form-item>
        <el-form-item label="关键字:">
          <el-input v-model="params.keyWords"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="start">开始采集</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          <a :href="scope.row.url">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="shop_type" label="店铺类型">
      </el-table-column>
      <el-table-column prop="seller_nick" label="标题"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.pict_url" alt="" width="200px" height="120px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)" type="primary">编辑</el-button>
          <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" style="text-align: center; margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.pageSize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { delApi, getTbkShopListApi } from "@/views/API/admin.js";

export default {
  data() {
    return {
      list: [],
      params: {
        page: 1,
        pageSize: 5,
        keyWords: "女装"
      },
      total: 0
    };
  },
  created() {},
  methods: {
    insertPage() {
      this.$router.push({
        path: "post",
      });
    },
    async getList() {
      let res = await getTbkShopListApi(this.params);
      if (res) {
        this.list = res.data.result;
      }
    },
    start() {
      this.getList();
    },
    async del(id) {
      let res = await delApi({ id: id });
      if (res) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    /**
     * 编辑
     */
    edit(id) {
      this.$router.push({ path: "post", query: { id: id } });
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getList();
    },
    multipleDel(condition) {},
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
