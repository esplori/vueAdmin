<template>
  <div class="user-info">
    <el-form :model="form" label-width="80px" label-position="left">
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
      <el-form-item label="备案号:">
        <el-input v-model="form.beianNo" type="textarea"> </el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in list"
        :key="index"
        :label="'轮播地址' + (index + 1) + ':'"
      >
        <el-input
          v-model="item.url"
          style="width: 400px; margin-right: 10px"
        ></el-input>
        <el-button @click="add" v-show="index === list.length - 1"
          >新增</el-button
        >
        <el-button @click="del(index)" v-show="index === list.length - 1"
          >删除</el-button
        >
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
      },
      list: [{}],
    };
  },
  created() {
    this.getSiteInfo();
  },
  methods: {
    async submit() {
      const res = await updateSiteInfoApi(
        Object.assign({}, this.form, {
          carouselUrl: this.list
            .map((item) => {
              return item.url;
            })
            .join(","),
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
        this.list = res.carouselUrl.split(",").map((item) => {
          return { url: item };
        });
      }
    },
    add() {
      this.list.push({ url: "" });
    },
    del(index) {
      this.list.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="less">
.user-info {
  padding: 20px 0;
}
</style>
