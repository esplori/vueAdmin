<template>
  <div class="admin-header">
    <div>
      <a href="https://www.dsiab.com" target="_blank">查看站点</a>
    </div>
    <userInfo></userInfo>
  </div>
</template>

<script>
export default {
  name: "admin-header",
  data() {
    return {
    };
  },
  components: {
    userInfo: () => import("@/components/userInfo.vue"),
  },
};
</script>

<style scoped lang="less">
.admin-header {
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
  color: #71777c;
  display: flex;
  justify-content: flex-end;
}
</style>
