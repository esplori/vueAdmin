<template>
  <div class="page-list">
    <span>按分类筛选：</span>
    <el-select v-model="params.cate" @change="getList">
      <el-option label="全部" :value="null"></el-option>
      <el-option v-for="(item,index) in cateList" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-table
      :data="list">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
      fixed="right"
      width="180"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)" type="primary">编辑</el-button>
          <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" style="text-align: center;margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.pageSize"
        :pager-count="5"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {delApi, getListByCateApi, getListApi, getCateApi} from '@/views/API/admin.js'

export default {
  data () {
    return {
      list: [],
      params: {
        page: 1,
        cate: null
      },
      total: 0,
      cateList: []
    }
  },
  created () {
    this.getList()
    this.getCate()
  },
  methods: {
    getList() {
      if (this.params.cate !== null) {
        this.getListByCate()
      } else {
        this.getAllList()
      }
    },
    async getCate () {
      let res = await getCateApi({})
      if (res) {
        this.cateList = res.result
      }
    },
    async getListByCate () {
      let res = await getListByCateApi(this.params)
      if (res) {
        this.list = res.result
        this.total = res.total
      }
    },
    async getAllList () {
      let res = await getListApi(this.params)
      if (res) {
        this.list = res.result
        this.total = res.total
      }
    },
    async del (id) {
      let res = await delApi({id: id})
      if (res) {
        this.$message.success('删除成功')
        this.getList()
      }
    },
    /**
     * 编辑
     */
    edit (id) {
      this.$router.push({path: 'post', query: {id: id}})
    },
    handleSizeChange (val) {
      this.params.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.params.page = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
.page-list{
  width: 100%;
  .content-item{
    font-size: 18px;
    text-align: left;
    padding: 5px;
  }
}
</style>
