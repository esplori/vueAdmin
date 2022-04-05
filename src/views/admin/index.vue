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
        background-color="#333"
        text-color="#fff"
        active-text-color="#fff"
      >
        <div class="logo">DSIAB</div>
        <div v-for="(item, index) in menuList" :key="index">
          <el-menu-item
            v-if="
              !item.children &&
              userInfo.some((role) => {
                return item.auth.includes(role);
              })
            "
            :index="item.path"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-if="
              item.children &&
              userInfo.some((role) => {
                return item.auth.includes(role);
              })
            "
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="it.path"
              v-for="(it, idx) in item.children"
              :key="idx"
              v-if="
                userInfo.some((role) => {
                  return !it.auth || (it.auth && it.auth.includes(role));
                })
              "
            >
              <span slot="title">{{ it.title }}</span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
    <div class="right-content">
      <adminHeader></adminHeader>
      <!-- <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            :label="item.label"
            :name="item.id"
            v-for="(item, index) in tabList"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
      </div> -->
      <router-view></router-view>
      <commonFooter></commonFooter>
    </div>
    <music class="global-music" v-if="false"></music>
  </div>
</template>

<script>
import FingerprintJS from "@fingerprintjs/fingerprintjs";
export default {
  data() {
    return {
      menuList: [
        {
          title: "首页",
          path: "/admin/home",
          id: "",
          icon: "el-icon-s-home",
          auth: "ROLE_admin,ROLE_author",
        },
        {
          title: "导航管理",
          path: "/admin/navigationList",
          id: "",
          auth: "ROLE_admin",
          icon: "el-icon-s-promotion",
          children: [
            { title: "导航列表", path: "/admin/navigationList", id: "" },
            { title: "分类管理", path: "/admin/navigationCate", id: "" },
            { title: "新增导航", path: "/admin/navigationEdit", id: "" },
          ],
        },
        {
          title: "文章管理",
          path: "/admin/pageList",
          id: "",
          icon: "el-icon-s-order",
          auth: "ROLE_admin,ROLE_author",
          children: [
            {
              title: "文章列表",
              path: "/admin/pageList",
              id: "",
              auth: "ROLE_admin,ROLE_author",
            },
            {
              title: "新增文章",
              path: "/admin/post",
              id: "",
              auth: "ROLE_admin,ROLE_author",
            },
            {
              title: "评论管理",
              path: "/admin/commentList",
              id: "",
              auth: "ROLE_admin",
            },
            {
              title: "分类管理",
              path: "/admin/cateList",
              id: "",
              auth: "ROLE_admin",
            },
            {
              title: "专题管理",
              path: "/admin/topic",
              id: "",
              auth: "ROLE_admin",
            },
          ],
        },
        {
          title: "小工具",
          path: "/admin/tools/jsonviewer",
          id: "",
          auth: "ROLE_admin,ROLE_author",
          icon: "el-icon-crop",
          children: [
            { title: "json格式化", path: "/admin/tools/jsonviewer", id: "" },
            { title: "抽奖", path: "/admin/tools/choujiang", id: "" },
            {
              title: "发送邮件",
              path: "/admin/tools/mail",
              id: "",
              auth: "ROLE_admin",
            },
            { title: "点名", path: "", id: "/admin/tools/dianming" },
            {
              title: "图片转成base64",
              path: "/admin/tools/img2base64",
              id: "",
            },
            { title: "二维码生成", path: "/admin/tools/qrcode", id: "" },
            { title: "css压缩-格式化", path: "/admin/tools/cssFormat", id: "" },
          ],
        },
        {
          title: "用户管理",
          path: "/admin/userManage",
          id: "",
          auth: "ROLE_admin",
          icon: "el-icon-s-custom",
          children: [
            { title: "用户管理", path: "/admin/userManage", id: "" },
            { title: "角色管理", path: "/admin/roleManage", id: "" },
          ],
        },
        {
          title: "个人设置",
          path: "/admin/userSetting",
          id: "",
          auth: "ROLE_admin,ROLE_author",
          icon: "el-icon-user",
          children: [{ title: "个人资料", path: "/admin/userSetting", id: "" }],
        },
        {
          title: "推广",
          path: "/admin/caijiList",
          id: "",
          auth: "ROLE_admin",
          icon: "el-icon-sell",
          children: [
            { title: "分类", path: "/admin/tbkType", id: "" },
            { title: "采集列表", path: "/admin/caijiList", id: "" },
            { title: "采集", path: "/admin/caiji", id: "" },
          ],
        },
        {
          title: "系统设置",
          path: "/admin/systemSetting",
          id: "",
          auth: "ROLE_admin",
          icon: "el-icon-setting",
          children: [
            { title: "站点设置", path: "/admin/systemSetting", id: "" },
            { title: "资源管理", path: "/admin/sourceList", id: "" },
            { title: "编译部署", path: "/admin/deploy", id: "" },
            { title: "回收站", path: "/admin/recycle", id: "" },
          ],
        },
      ],
      isCollapse: false,
      tabList: [],
    };
  },
  computed: {
    userInfo() {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo).role.split(",");
      } else {
        userInfo = [];
      }
      return userInfo;
    },
  },
  components: {
    adminHeader: () => import("@/components/admin-header"),
    commonFooter: () => import("@/components/footer"),
    music: () => import("@/views/admin/tools/musicManage/music.vue"),
  },
  mounted() {
    this.initFingerprint();
  },
  methods: {
    initWebStat(visitorId) {
      let webStats = new WebStats({
        baseUrl: "/bootService", // 基础接口地址url
        url: "/stats/getStats.gif", // 请求上报api的接口地址
        routeMode: "history", // 填写单页面应用中使用的路由模式。
        autoUpload: true,
        prop: {
          //请求参数映射，参数名默认如下，可以自定义修改参数名。
          id: "visitorId",
        },
      });
      webStats.setUserId(visitorId);
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
          this.initWebStat(visitorId);
        }, 200);
      })();
    },
    swith() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(index) {},
    handleClose(index) {},
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
      font-size: 18px;
      text-align: center;
      padding: 15px 0;
      color: #fff;
      background: rgb(58, 58, 58);
    }
    .switch-icon {
      text-align: center;
      padding-top: 40px;
      padding-bottom: 20px;
    }
  }
  .right-content {
    width: 100%;
    padding: 0 20px 20px 20px;
    margin-bottom: 20px;
    overflow-y: auto;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
    overflow-x: hidden;
  }
  .global-music {
    width: 100%;
    position: absolute;
    bottom: 0;
    // background:rgba(#000,0.8);
    // height: 80px;
    color: #fff;
  }
}
</style>
