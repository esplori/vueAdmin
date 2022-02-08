<template>
  <div class="cssFormat">
    <el-form :model="form" label-width="100px">
      <el-form-item label="转换源代码：">
        <el-input v-model="form.oldValue" type="textarea" :rows="8"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="cssCompress">压缩</el-button>
        <el-button @click="cssFormat">格式化</el-button>
      </el-form-item>
      <el-form-item label="转换后代码：">
        <el-input v-model="form.newValue" type="textarea" :rows="8"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        oldValue: "",
        newValue: "",
      },
    };
  },
  components: {},
  created() {},
  methods: {
    cssFormat() {
      let code = this.form.oldValue;
      code = code.replace(/(\s){2,}/gi, "$1");
      code = code.replace(/(\S)\s*\{/gi, "$1 {");
      code = code.replace(/\*\/(.[^\}\{]*)}/gi, "*/\n$1}");
      code = code.replace(/\/\*/gi, "\n/*");
      code = code.replace(/;\s*(\S)/gi, ";\n\t$1");
      code = code.replace(/\}\s*(\S)/gi, "}\n$1");
      code = code.replace(/\n\s*\}/gi, "\n}");
      code = code.replace(/\{\s*(\S)/gi, "{\n\t$1");
      code = code.replace(/(\S)\s*\*\//gi, "$1*/");
      code = code.replace(/\*\/\s*([^\}\{]\S)/gi, "*/\n\t$1");
      code = code.replace(/(\S)\}/gi, "$1\n}");
      code = code.replace(/(\n){2,}/gi, "\n");
      code = code.replace(/:/gi, ":");
      code = code.replace(/ {2}/gi, " ");
      this.form.newValue = code;
    },
    cssCompress() {
      let code = this.form.oldValue;
      code = code.replace(/\r\n/gi, "");
      code = code.replace(/(\s){2,}/gi, "$1");
      code = code.replace(/\t/gi, "");
      code = code.replace(/\n\}/gi, "}");
      code = code.replace(/\n\{\s*/gi, "{");
      code = code.replace(/(\S)\s*\}/gi, "$1}");
      code = code.replace(/(\S)\s*\{/gi, "$1{");
      code = code.replace(/\{\s*(\S)/gi, "{$1");
      this.form.newValue = code;
    },
  },
};
</script>

<style scoped lang="less">
</style>
