<template>
  <div class="login">
    <div class="login-container">
      <el-form :model="form" label-width="80px" :rules="rules" ref="form">
        <h2 style="text-align: center; padding: 20px 0">用户注册</h2>
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input
            v-model="form.email"
            type="text"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="valid" type="primary">提交</el-button>
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
        email: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
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
    valid() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          return false;
        }
      });
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
    width: 300px;
    background: rgba(255, 255, 255, 1);
    padding: 40px 80px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
