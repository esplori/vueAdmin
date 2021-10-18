<!--后台管理首页-->
<template>
  <div class="admin-home">
    <div class="left-menu">
      <!-- <div class="logo">DSIAB</div> -->
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
        <el-menu-item index="/admin/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/admin/navigationList" v-if="userInfo.role.indexOf('ROLE_admin')!== -1">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">导航管理</span>
        </el-menu-item>
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
          <el-menu-item index="/admin/cate" v-if="userInfo.role.indexOf('ROLE_admin')!== -1">
            <span slot="title">分类管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-crop"></i>
            <span slot="title">小工具</span>
          </template>
          <el-menu-item index="/admin/music">
            <span slot="title">音乐分享</span>
          </el-menu-item>
          <el-menu-item index="/admin/fiction">
            <span slot="title">小说阅读</span>
          </el-menu-item>
          <el-menu-item index="/admin/jsonviewer">
            <span slot="title">json格式化</span>
          </el-menu-item>
          <el-menu-item index="/admin/choujiang">
            <span slot="title">抽奖</span>
          </el-menu-item>
          <el-menu-item index="/admin/mail">
            <span slot="title">发送邮件</span>
          </el-menu-item>
          <el-menu-item index="/admin/dianming">
            <span slot="title">点名</span>
          </el-menu-item>
          <el-menu-item index="/admin/img2base64">
            <span slot="title">图片转成base64</span>
          </el-menu-item>
          <el-menu-item index="/admin/compressJs">
            <span slot="title">js压缩</span>
          </el-menu-item>
          <el-menu-item index="/admin/qrcode">
            <span slot="title">二维码生成</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="3" v-if="userInfo.role.indexOf('ROLE_admin')!== -1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="/admin/userManage">
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/roleManage">
            <span slot="title">角色管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统设置</span>
          </template>
          <el-menu-item index="/admin/systemSetting" v-if="userInfo.role.indexOf('ROLE_admin')!== -1">
            <span slot="title">站点设置</span>
          </el-menu-item>
          <el-menu-item index="/admin/userSetting">
            <span slot="title">个人设置</span>
          </el-menu-item>
          <el-menu-item index="/admin/sourceList" v-if="userInfo.role.indexOf('ROLE_admin')!== -1">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: "首页",
          path: "/admin/home",
          role: "ROLE_author",
          icon: "el-icon-s-home",
        },
        {
          name: "文章管理",
          icon: "el-icon-s-order",
          path: "",
          role: "ROLE_author",
          children: [
            {
              name: "文章列表",
              path: "/admin/pageList",
              role: "ROLE_author",
              icon: "el-icon-edit-outline",
            },
            {
              name: "新增文章",
              path: "/admin/post",
              role: "ROLE_author",
              icon: "el-icon-edit-outline",
            },
            {
              name: "分类管理",
              path: "/admin/cate",
              role: "ROLE_admin",
              icon: "el-icon-menu",
            },
          ],
        },
        {
          name: "导航管理",
          path: "/admin/navigationList",
          role: "ROLE_admin",
          icon: "el-icon-s-promotion",
        },
        {
          name: "小工具",
          path: "/admin/tools",
          role: "ROLE_author",
          icon: "el-icon-crop",
          children: [
            {
              name: "音乐分享",
              path: "/admin/music",
              role: "ROLE_author",
              icon: "el-icon-share",
            },
            {
              name: "小说阅读",
              path: "/admin/fiction",
              role: "ROLE_author",
              icon: "el-icon-share",
            },
            {
              name: "json格式化",
              path: "/admin/jsonviewer",
              role: "ROLE_author",
              icon: "el-icon-share",
            },
            {
              name: "抽奖",
              path: "/admin/choujiang",
              role: "ROLE_author",
              icon: "el-icon-share",
            },
            {
              name: "发送邮件",
              path: "/admin/mail",
              role: "ROLE_admin",
              icon: "el-icon-share",
            },
            {
              name: "点名",
              path: "/admin/dianming",
              role: "ROLE_author",
              icon: "el-icon-share",
            },
            {
              name: "图片转成base64",
              path: "/admin/img2base64",
              role: "ROLE_author",
              icon: "el-icon-share",
            },
            {
              name: "js压缩",
              path: "/admin/compressJs",
              role: "ROLE_admin",
              icon: "el-icon-share",
            },
            {
              name: "二维码生成",
              path: "/admin/qrcode",
              role: "ROLE_author",
              icon: "el-icon-share",
            },
          ],
        },
        {
          name: "用户管理",
          path: "/admin/userManage",
          role: "ROLE_admin",
          icon: "el-icon-user",
          children: [
            {
              name: "用户管理",
              path: "/admin/userManage",
              role: "ROLE_admin",
              icon: "el-icon-user",
            },
            {
              name: "角色管理",
              path: "/admin/roleManage",
              role: "ROLE_admin",
              icon: "el-icon-postcard",
            },
          ],
        },
        {
          name: "系统设置",
          path: "/admin/systemSetting",
          role: "ROLE_author",
          icon: "el-icon-setting",
          children: [
            {
              name: "站点设置",
              path: "/admin/systemSetting",
              role: "ROLE_admin",
              icon: "el-icon-setting",
            },
            {
              name: "个人设置",
              path: "/admin/userSetting",
              role: "ROLE_author",
              icon: "el-icon-setting",
            },
            {
              name: "资源管理",
              path: "/admin/sourceList",
              role: "ROLE_admin",
              icon: "el-icon-picture-outline",
            },
          ],
        },
      ],
      isCollapse: false,
    };
  },
  computed: {
    userInfo() {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
      } else {
        userInfo =  {
          role: ''
        }
      }
      console.log("userInfo", userInfo);
      return userInfo;
    },
  },
  components: {
    adminHeader: () => import("./components/admin-header"),
  },
  mounted() {
    // this.initWebStat();
    window.addEventListener("click", (item) => {
      // this.getWegStats();
    });
  },
  methods: {
    getWegStats() {
      console.log(window.hunter.getDirectData());
      window.hunter.track("/bootService/stats/getStats.gif", {
        ...window.hunter.getDirectData(),
      });
    },
    initWebStat() {
      var hunter = new Hunter({
        baseUrl: "/bootService", // 基础接口地址url
        url: "/stats/getStats.gif", // 请求上报api的接口地址
        routeMode: "history", // 填写单页面应用中使用的路由模式。
        autoUpload: true, // 是否自动请求接口，在setUserId之后会以baseUrl+url形式在页面切换时自动请求上报PV/UV的接口
        prop: {
          // 请求参数映射，参数名默认如下，可以自定义修改参数名。
          uv: "uv",
          pv: "pv",
          id: "id",
          mVisits: "mVisits",
          domain: "domain",
          title: "title",
          referrer: "referrer",
          screen: "screen",
          lang: "lang",
          userAgent: "userAgent",
          os: "os",
          browse: "browse",
          device: "device",
        },
      });
      window.hunter = hunter;
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
  .left-menu {
    .switch-icon {
      text-align: center;
      padding-top: 40px;
      padding-bottom: 20px;
    }
  }
  .right-content {
    width: 100%;
    padding: 20px;
    overflow-y: auto;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
}
</style>
