<template>
  <div class="fiction">
    <embed src="/static/囧师囧徒.txt" type="" class="preview">
  </div>
</template>

<script>
export default {
  data() {
    return {
      txtPre: ''
    };
  },
  mounted() {
    // this.urlToBlob()
  },
  methods: {
    urlToBlob() {
      let file_url= "/static/test.txt"
//可以是具体.txt也可以是接口返回的blob，或者web转换
      let xhr = new XMLHttpRequest();
      xhr.open("get", file_url, true);
      xhr.responseType = "blob";
      let self=this//onload this指向为window中转一下
      this.loading=true;
      xhr.onload = function () {
        if (this.status == 200) {
          self.loading=false;
          console.log(this.response)
          const reader = new FileReader()
          reader.onload = function () {
            self.txtPre=reader.result//获取的数据data
            self.dialogvisibleview=true
            console.log('reader.result', reader.result)
          }
          reader.readAsText(this.response);
        }else{
          slef.loading=false;
        }
      };
      xhr.send();
    },
  },
};
</script>

<style scoped lang="less">
.fiction {
  width: 100%;
  height: calc(100% - 60px);
  .preview{
    width: 100%;
    height: calc(100% - 30px);
  }
}
</style>
