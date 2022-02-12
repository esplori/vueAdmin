<template>
  <div class="admin-header">
    <div class="tips">
     <i class="el-icon-bell"></i>  <span class="welcomeMsg">{{welcomeMsg}}</span>
    </div>
    <div class="user-info">
      <div>
        <a href="https://www.dsiab.com" target="_blank">查看站点</a>
      </div>
      <userInfo></userInfo>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-header",
  data() {
    return {
      welcomeMsg: ' 欢迎来到javascript技术分享网站'
    };
  },
  components: {
    userInfo: () => import("@/components/userInfo.vue"),
  },
};
</script>

<style scoped lang="less">
.admin-header {
  padding: 20px 0;
  margin-bottom: 20px;
  background: #fff;
  color: #71777c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  .user-info {
    display: flex;
    justify-content: flex-end;
  }
  .tips{
    .welcomeMsg{
      margin-left: 10px;
      font-size: 16px;
    }
  }
}
</style>
