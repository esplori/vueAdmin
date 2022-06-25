<template>
  <div class="admin-header">
    <div class="header-container">
      <div class="left-header">
        <div class="logo">DSIAB</div>
        <div class="tips">
          <i class="el-icon-bell"></i>
          <span class="welcomeMsg">{{ welcomeMsg }}</span>
        </div>
      </div>
      <div class="user-info">
        <userInfo></userInfo>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-header",
  data() {
    return {
      welcomeMsg: " 欢迎来到javascript技术分享网站",
    };
  },
  components: {
    userInfo: () => import("@/components/userInfo.vue"),
  },
};
</script>

<style scoped lang="less">
.admin-header {
  width: 100%;
  padding: 20px 0;
  margin: 0 auto 10px;
  background: #fff;
  color: #71777c;
  border-bottom: 1px solid #ddd;
  .header-container {
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    .user-info {
      display: flex;
      justify-content: flex-end;
    }
    .left-header{
      display: flex;
      align-items: center;
    }
    .logo{
      font-size: 18px;
      margin-right: 20px;
    }
    .tips {
      .welcomeMsg {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>
