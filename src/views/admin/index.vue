<!--后台管理首页-->
<template>
  <div class="admin-home">
    <div class="left-menu">
      <el-menu
        style="height: 100%; overflow-y: auto"
        default-active="/admin/home"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        router
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <div class="logo">DSIAB</div>
        <el-menu-item index="/admin/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="5" v-if="userInfo.role.indexOf('ROLE_admin') !== -1">
          <template slot="title">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">导航管理</span>
          </template>
          <el-menu-item index="/admin/navigationList">
            <span slot="title">导航列表</span>
          </el-menu-item>
          <el-menu-item index="/admin/navigationCate">
            <span slot="title">分类管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">文章管理</span>
          </template>
          <el-menu-item index="/admin/pageList">
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="/admin/post">
            <span slot="title">新增文章</span>
          </el-menu-item>
          <el-menu-item
            index="/admin/comments"
            v-if="userInfo.role.indexOf('ROLE_admin') !== -1"
          >
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item
            index="/admin/cate"
            v-if="userInfo.role.indexOf('ROLE_admin') !== -1"
          >
            <span slot="title">分类管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-crop"></i>
            <span slot="title">小工具</span>
          </template>
          <!-- <el-menu-item index="/admin/music">
            <span slot="title">音乐分享</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="/admin/fiction">
            <span slot="title">小说阅读</span>
          </el-menu-item> -->
          <el-menu-item index="/admin/tools/jsonviewer">
            <span slot="title">json格式化</span>
          </el-menu-item>
          <el-menu-item index="/admin/tools/choujiang">
            <span slot="title">抽奖</span>
          </el-menu-item>
          <el-menu-item
            index="/admin/tools/mail"
            v-if="userInfo.role.indexOf('ROLE_admin') !== -1"
          >
            <span slot="title">发送邮件</span>
          </el-menu-item>
          <el-menu-item index="/admin/tools/dianming">
            <span slot="title">点名</span>
          </el-menu-item>
          <el-menu-item index="/admin/tools/img2base64">
            <span slot="title">图片转成base64</span>
          </el-menu-item>
          <!-- <el-menu-item index="/admin/compressJs">
            <span slot="title">js压缩</span>
          </el-menu-item> -->
          <el-menu-item index="/admin/tools/qrcode">
            <span slot="title">二维码生成</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="3" v-if="userInfo.role.indexOf('ROLE_admin') !== -1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="/admin/userManage">
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/roleManage">
            <span slot="title">角色管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">个人设置</span>
          </template>
          <el-menu-item index="/admin/userSetting">
            <span slot="title">个人资料</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="4" v-if="userInfo.role.indexOf('ROLE_admin') !== -1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统设置</span>
          </template>
          <el-menu-item index="/admin/systemSetting">
            <span slot="title">站点设置</span>
          </el-menu-item>
          <el-menu-item index="/admin/sourceList">
            <span slot="title">资源管理</span>
          </el-menu-item>
        </el-submenu>

        <div class="switch-icon">
          <i
            class="el-icon-s-fold"
            style="color: #909399; font-size: 18px"
            v-show="!isCollapse"
            @click="isCollapse = !isCollapse"
          ></i>
          <i
            class="el-icon-s-unfold"
            style="color: #909399; font-size: 18px"
            v-show="isCollapse"
            @click="isCollapse = !isCollapse"
          ></i>
        </div>
      </el-menu>
    </div>
    <div class="right-content">
      <adminHeader></adminHeader>
      <router-view></router-view>
      <commonFooter></commonFooter>
    </div>
    <music class="global-music"></music>
  </div>
</template>

<script>
import FingerprintJS from "@fingerprintjs/fingerprintjs";
export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
    };
  },
  computed: {
    userInfo() {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
      } else {
        userInfo = {
          role: "",
        };
      }
      return userInfo;
    },
  },
  components: {
    adminHeader: () => import("@/components/admin-header"),
    commonFooter: () => import('@/components/footer'),
    music: () => import('@/views/admin/musicManage/music.vue')
  },
  mounted() {
    this.initFingerprint();
    window.addEventListener("click", (item) => {
      // this.getWegStats();
    });
  },
  methods: {
    getWegStats() {
      // console.log(window.webStats.getDirectData());
      window.webStats.track("/bootService/stats/getStats.gif", {
        ...window.webStats.getDirectData(),
        ...{ visitorId: window.visitorId },
      });
    },
    initWebStat() {
      let webStats = new WebStats({
        baseUrl: "/bootService", // 基础接口地址url
        url: "/stats/getStats.gif", // 请求上报api的接口地址
        routeMode: "history", // 填写单页面应用中使用的路由模式。
        autoUpload: true, // 是否自动请求接口，在setUserId之后会以baseUrl+url形式在页面切换时自动请求上报PV/UV的接口
      });
      window.webStats = webStats;
      this.getWegStats();
    },
    initFingerprint() {
      // Initialize an agent at application startup.
      const fpPromise = FingerprintJS.load();
      (async () => {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise;
        const result = await fp.get();

        // This is the visitor identifier:
        const visitorId = result.visitorId;
        // console.log(visitorId);
        window.visitorId = visitorId;
        setTimeout(() => {
          this.initWebStat();
        }, 200);
      })();
    },
    swith() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen() {},
    handleClose() {},
    go(item) {
      this.$router.push({ path: item.path });
    },
  },
  created() {},
};
</script>

<style scoped lang="less">
.admin-home {
  height: 100%;
  display: flex;
  position: relative;
  .left-menu {
    background: #001529;
    color: #fff;
    .logo {
      font-size: 20px;
      text-align: center;
      padding: 15px 0;
    }
    .switch-icon {
      text-align: center;
      padding-top: 40px;
      padding-bottom: 20px;
    }
  }
  .right-content {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    overflow-y: auto;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
  .global-music{
    width: 100%;
    position: absolute;
    bottom: 0 ;
    // background:rgba(#000,0.8);
    // height: 80px;
    color: #fff;
  }
}
</style>
