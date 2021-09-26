<template>
  <div class="login">
    <div class="login-container">
      <el-form :model="form">
        <h2 style="text-align: center; padding: 20px 0">用户注册</h2>
        <el-form-item>
          <el-input v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerApi } from "@/views/API/common.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      if (!this.form.username || !this.form.password) {
        this.$message.error("请输入账号和密码");
        return;
      }
      const res = await registerApi(this.form);
      if (res) {
        this.$message.success("注册成功，请登录");
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 300px;
    background: #fff;
    padding: 40px 80px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
