<template>
  <div class="page-list">
    <div class="select-by-cate">
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
    </div>
    <el-table :data="list" @sort-change="sortCchange">
      <el-table-column type="index" label="序号" width="55px"></el-table-column>
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
      <el-table-column label="阅读" width="120px" sortable="custom" prop="views">
        <template slot-scope="scope">
          {{ scope.row.views }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180px" sortable="custom" prop="createDate">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="180" label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)" type="text">编辑</el-button>
          <el-button
            @click="delConfirm(scope.row.id)"
            type="text"
            class="cus-button-danger"
            >删除</el-button
          >
          <el-button @click="addToTopic(scope.row)" type="text">添加到专题</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" style="text-align: center; margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

     <el-dialog title="添加到专题" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-select v-model="form.topicId">
          <el-option
            v-for="(item, index) in topicList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTopic()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  delApi,
  getListByCateApi,
  getCateValidApi,
  getTopicListApi,
  addPostToTopicApi
} from "@/views/API/admin.js";

export default {
  data() {
    return {
      list: [],
      params: {
        page: 1,
        cate: "",
        pageSize: 10,
        order: 'desc',
        orderBy: 'createDate'
      },
      form: {
        postId: '',
        name: '',
        topicId: ''
      },
      total: 0,
      cateList: [],
      dialogVisible: false,
      topicList: []
    };
  },
  created() {
    this.getCate();
    // 恢复之前查询的参数
    let { page, cate, pageSize } = this.$route.query
    this.params.page = parseInt(page) || 1
    this.params.pageSize = parseInt(pageSize) || 10
    this.params.cate = parseInt(cate) || ''
    this.getList();
  },
  methods: {
    sortCchange({ column, prop, order }) {
      this.params.page = 1;
      // 需要转换成sql对应的排序字段
      this.params.order = order ==='ascending'?"asc":"desc"
      this.params.orderBy = prop
      this.getList();
    },
    async getTopicList() {
      let res = await getTopicListApi({});
      if (res) {
        this.topicList = res.data.result;
      }
    },
    typeChange() {
      this.params.page = 1;
      this.getList();
    },
    getList() {
      this.getListByCate();
    },
    async getCate() {
      const res = await getCateValidApi({});
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
    delConfirm(id) {
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.del(id);
      });
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
      this.$router.push({ path: "post", query: { id: id, ...this.params } });
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getList();
    },
    // 添加到专题
    addToTopic(row) {
      this.getTopicList()
      this.dialogVisible = true
      this.form.postId = row.uid || row.id
      this.form.name = row.title
    },
    async submitTopic() {
      let res = await addPostToTopicApi(this.form)
      if (res) {
        this.$message.success("添加成功")
        this.dialogVisible = false
      }
    }
  },
};
</script>

<style scoped lang="less">
.page-list {
  width: 100%;
  .select-by-cate {
    margin-bottom: 20px;
  }
  .content-item {
    font-size: 18px;
    text-align: left;
    padding: 5px;
  }
}
</style>
