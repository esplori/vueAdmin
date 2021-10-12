<template>
  <div class="qrcode">
    <el-form :model="form" label-width="60px">
      <el-form-item label="文本：">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item label="logo：">
        <el-input v-model="form.imageUrl"></el-input>
      </el-form-item>
      <el-form-item label="尺寸：">
        <el-input v-model="form.size"></el-input>
      </el-form-item>
    </el-form>
   <div style="text-align:center">
      <vue-qr :logoSrc="form.imageUrl" :text="form.text" :size="form.size"></vue-qr>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
        imageUrl: require("../../../assets/images/music/cover.jpeg"),
        text: "https://www.dsiab.com",
        size: 200
      }
    };
  },
  components: {
    vueQr: () => import("vue-qr")
  },
  created() {},
  methods: {
    generate() {
       
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
