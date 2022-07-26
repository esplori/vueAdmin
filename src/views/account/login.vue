<template>
  <div class="login">
    <div class="show-container" :class="{ shadow: showShadow }">
      <div class="login-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户登录" name="login">
            <el-form
              :model="form"
              label-width="80px"
              :rules="loginRules"
              ref="form"
              label-position="left"
            >
              <el-form-item label="用户名：" prop="username">
                <el-input
                  @focus="shadow"
                  @blur="hideShadow"
                  prefix-icon="el-icon-user"
                  v-model="form.username"
                  placeholder="账号"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <el-input
                  @focus="shadow"
                  @blur="hideShadow"
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
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="reg">
            <el-form
              :model="regform"
              label-width="80px"
              :rules="rules"
              ref="regform"
              label-position="left"
            >
              <el-form-item label="用户名:" prop="username">
                <el-input
                  @focus="shadow"
                  @blur="hideShadow"
                  v-model="regform.username"
                  placeholder="账号"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input
                  @focus="shadow"
                  @blur="hideShadow"
                  v-model="regform.password"
                  type="password"
                  placeholder="密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱:" prop="email">
                <el-input
                  @focus="shadow"
                  @blur="hideShadow"
                  v-model="regform.email"
                  type="text"
                  placeholder="请输入正确邮箱，方便找回密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%" @click="valid" type="primary"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi, registerApi } from "@/views/API/common.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showShadow: false,
      activeName: "login",
      regform: {
        username: "",
        password: "",
        email: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "blur",
          },
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
    async login() {
      let boollid = await this.$refs["form"].validate();
      if (!boollid) {
        return;
      }
      let res = await loginApi(this.form);
      if (res) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        this.$router.push({ path: "/admin" });
      }
    },
    toReg() {
      this.$router.push({ path: "/reg" });
    },
    shadow() {
      this.showShadow = true;
    },
    hideShadow() {
      this.showShadow = false;
    },
    async register() {
      if (!this.regform.username || !this.regform.password) {
        this.$message.error("请输入账号和密码");
        return;
      }
      const res = await registerApi(this.regform);
      if (res) {
        this.$message.success("注册成功，请登录");
        this.$router.push({ path: "/login" });
      }
    },
    valid() {
      this.$refs["regform"].validate((valid) => {
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

  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: cover;

  .login-container {
    border-radius: 3px;
    width: 320px;
    background: rgba(255, 255, 255, 1);
    padding: 40px 60px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .reg {
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
    }
  }
  .show-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .shadow {
    background: rgba(0, 0, 0, 0.6);
    transition: all 0.5s;
  }
  ::v-deep .el-tabs__header {
    // width: 184px;
    // margin: 0 auto;
    margin-bottom: 30px;
    .el-tabs__item {
      font-size: 18px;
    }
    .el-tabs__nav-wrap{
      display: flex;
      justify-content: center;
    }
  }
}
</style>
