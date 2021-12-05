<template>
  <div class="user-info">
    <el-form :model="form" label-width="130px" label-position="left">
      <el-form-item label="站点名称:">
        <el-input v-model="form.siteName" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="站点描述:">
        <el-input v-model="form.siteDesc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="站点地址:">
        <el-input v-model="form.siteUrl"> </el-input>
      </el-form-item>
      <el-form-item label="文件引用路径:">
        <el-input v-model="form.sourceUrl" type="textarea"> </el-input>
      </el-form-item>
      <el-form-item label="文件上传实际路径:">
        <el-input v-model="form.sourceRealUrl" type="textarea"> </el-input>
      </el-form-item>
      <el-form-item label="文件备份实际路径:">
        <el-input v-model="form.bakRealUrl" type="textarea"> </el-input>
      </el-form-item>
      <el-form-item label="备案号:">
        <el-input v-model="form.beianNo" type="textarea"> </el-input>
      </el-form-item>
      <el-form-item label="站长邮箱:">
        <el-input v-model="form.siteEmail" type="textarea"> </el-input>
      </el-form-item>
      <el-form-item label="轮播管理">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="轮播图片地址" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.imgUrl"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="轮播描述" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.desc"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="跳转链接">
            <template slot-scope="scope">
              <el-input v-model="scope.row.url"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button @click="add" v-show="scope.$index === tableData.length - 1"
                >新增</el-button
              >
              <el-button @click="del($index)" v-show="scope.$index === tableData.length - 1"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateSiteInfoApi, getSiteInfoApi } from "@/views/API/admin.js";

export default {
  data() {
    return {
      form: {
        siteName: "",
        siteDesc: "",
        siteUrl: "",
        sourceUrl: "",
        sourceRealUrl: "",
        beianNo: "",
        bakRealUrl: "",
        siteEmail: ''
      },
      tableData: [{ imgUrl: "", desc: "", url: "" }],
    };
  },
  created() {
    this.getSiteInfo();
  },
  methods: {
    async submit() {
      const res = await updateSiteInfoApi(
        Object.assign({}, this.form, {
          carouselUrl: JSON.stringify(this.tableData),
        })
      );

      if (res) {
        this.$message.success("更新成功");
      }
    },
    async getSiteInfo() {
      const res = await getSiteInfoApi({});
      if (res) {
        this.form = res;
        this.tableData = JSON.parse(res.carouselUrl);
      }
    },
    add() {
      this.tableData.push({ imgUrl: "", desc: "", url: "" });
    },
    del(index) {
      this.tableData.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="less">
.user-info {
  padding: 20px 0;
}
</style>
