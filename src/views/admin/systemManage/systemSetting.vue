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
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updateSiteInfoApi, getSiteInfoApi} from '@/views/API/admin.js'

export default {
  data () {
    return {
      form: {
        siteName: '',
        siteDesc: '',
        siteUrl: '',
        sourceUrl: '',
        sourceRealUrl: '',
        beianNo: '',
      }
    }
  },
  created () {
    this.getSiteInfo()
  },
  methods: {
    async submit () {
      let res = await updateSiteInfoApi(this.form)
      if (res) {
        this.$message.success('更新成功')
      }
    },
    async getSiteInfo () {
      let res = await getSiteInfoApi({})
      if (res) {
        this.form = res
      }
    }
  }
}
</script>

<style scoped lang="less">
  .user-info {
    padding: 20px 0;
  }
</style>
