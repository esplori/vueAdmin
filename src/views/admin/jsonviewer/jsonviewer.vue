<template>
  <div class="jsonviewer">
    <el-input type="textarea" :rows="10" v-model="originJsonData"></el-input>
    <div style="padding: 20px 0">
      <el-button type="primary" @click="handler">转换</el-button>
    </div>

    <json-viewer
      :value="jsonData"
      copyable
      boxed
      sort
      :expand-depth="5"
      :expanded="true"
      :preview-mode="false"
    ></json-viewer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originJsonData: '{"code":0,"msg":"查询成功","data":{"username":"test","password":"","role":"ROLE_author","nickname":"i am a test user","userdesc":"developer","avatar":"icom","token":null}}',
      jsonData: {}
    };
  },
  mounted() {
  },
  methods: {
    handler() {
      this.jsonData = JSON.parse(this.originJsonData)
    }
  },
};
</script>

<style scoped lang="less">
.jsonviewer {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
