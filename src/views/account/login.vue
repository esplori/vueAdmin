<template>
  <div class="login">
    <div class="login-container">
      <el-form :model="form">
        <h2 style="text-align: center; padding: 20px 0">用户登录</h2>
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
          prefix-icon="el-icon-view"
            v-model="form.password"
            type="password"
            placeholder="密码"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width: 100%"
            >登录</el-button
          >
          <div class="reg" @click="toReg">注册</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from "@/views/API/common.js";
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
    async login() {
      let res = await loginApi(this.form);
      if (res) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        this.$router.push({ path: "/admin" });
      }
    },
    toReg() {
      this.$router.push({ path: "/reg" });
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
  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: cover;

  .login-container {
    border-radius: 5px;
    width: 300px;
    background: rgba(255,255,255,0.5);
    padding: 40px 80px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .reg {
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
    }
  }
}
</style>
