<template>
  <div class="admin-header">
    <div class="header-container">
      <div class="left-header">
        <div class="logo"><a href="https://www.dsiab.com" target="_blank">javascript技术分享</a></div>
        <div class="tips">
          <span class="welcomeMsg">每日一句：{{ dailySentence }}</span>
        </div>
      </div>
      <div class="user-info">
        <userInfo></userInfo>
      </div>
    </div>
  </div>
</template>

<script>
import { delHtmlTag } from "@/utils/common.js"
export default {
  name: "admin-header",
  data() {
    return {
    };
  },
  computed: {
    dailySentence() {
      return this.userInfoObj.dailySentence && delHtmlTag(this.userInfoObj.dailySentence)
    }
  },
  props:{
    userInfoObj: {
      type: Object,
      default: () =>{
        return {}
      }
    }
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
    margin: 0 20px;
    .user-info {
      display: flex;
      justify-content: flex-end;
    }
    .left-header{
      display: flex;
      align-items: center;
      width: 100%;
    }
    .logo{
      font-size: 14px;
      margin-right: 20px;
    }
    .tips {
      width: 85%;
      .welcomeMsg {
        margin-left: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
