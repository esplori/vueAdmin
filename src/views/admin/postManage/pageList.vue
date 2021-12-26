<template>
  <div class="page-list">
    <span>按分类筛选：</span>
    <el-select v-model="params.cate" @change="typeChange">
      <el-option label="全部" :value="null"></el-option>
      <el-option
        v-for="(item, index) in cateList"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <el-table :data="list">
      <el-table-column label="标题">
        <template slot-scope="scope">
          <a
            style="color: #333"
            :href="'https://www.dsiab.com/post/' + scope.row.id"
            target="_blank"
            >{{ scope.row.title }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="分类" width="120px">
        <template slot-scope="scope">
          {{ scope.row.cateName }}
        </template>
      </el-table-column>
       <el-table-column label="作者" width="120px">
        <template slot-scope="scope">
          {{ scope.row.createBy }}
        </template>
      </el-table-column>
      <el-table-column label="阅读" width="120px">
        <template slot-scope="scope">
          {{ scope.row.views }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180px">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="180" label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)" type="text">编辑</el-button>
          <el-button @click="del(scope.row.id)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" style="text-align: center; margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.pageSize"
        :pager-count="5"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  delApi,
  getListByCateApi,
  getListApi,
  getCateApi,
} from "@/views/API/admin.js";

export default {
  data() {
    return {
      list: [],
      params: {
        page: 1,
        cate: null,
      },
      total: 0,
      cateList: [],
    };
  },
  created() {
    this.getList();
    this.getCate();
  },
  methods: {
    typeChange() {
      this.params.page = 1;
      this.getList();
    },
    getList() {
      if (this.params.cate !== null) {
        this.getListByCate();
      } else {
        this.getAllList();
      }
    },
    async getCate() {
      const res = await getCateApi({});
      if (res) {
        this.cateList = res.data.result;
      }
    },
    async getListByCate() {
      const res = await getListByCateApi(this.params);
      if (res) {
        this.list = res.data.result;
        this.total = res.data.total;
      }
    },
    async getAllList() {
      const res = await getListApi(this.params);
      if (res) {
        this.list = res.data.result;
        this.total = res.data.total;
      }
    },
    async del(id) {
      const res = await delApi({ id: id });
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
