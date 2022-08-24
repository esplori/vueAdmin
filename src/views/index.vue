<template>
  <div class="admin-home">
    <div class="content-container">
      <div class="left-menu">
        <div class="logo">
          <a href="https://www.dsiab.com" target="_blank">javascript技术分享</a>
        </div>
        <el-menu
          style="height: 100%; overflow-y: auto"
          default-active="/home"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          @select="handleSelect"
          router
        >
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
        <!-- <keep-alive> -->
        <adminHeader :userInfoObj="userInfoObj"></adminHeader>
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick"
          closable
          @tab-remove="removeTab"
        >
          <el-tab-pane
            :label="item.title"
            :name="item.path"
            v-for="(item, index) in tabList"
            :key="index"
          ></el-tab-pane>
        </el-tabs>

        <router-view></router-view>
        <!-- </keep-alive> -->
        <commonFooter></commonFooter>
      </div>
    </div>
    <music class="global-music" v-if="false"></music>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/views/API/admin.js";
export default {
  data() {
    return {
      menuList: [
        {
          title: "首页",
          path: "/home",
          id: "",
          icon: "el-icon-s-home",
          auth: "ROLE_admin,ROLE_author",
        },
        {
          title: "导航管理",
          path: "/navigationList",
          id: "",
          auth: "ROLE_admin",
          icon: "el-icon-s-promotion",
          children: [
            { title: "导航列表", path: "/navigationList", id: "" },
            { title: "分类管理", path: "/navigationCate", id: "" },
            { title: "新增导航", path: "/navigationEdit", id: "" },
          ],
        },
        {
          title: "文章管理",
          path: "/pageList",
          id: "",
          icon: "el-icon-s-order",
          auth: "ROLE_admin,ROLE_author",
          children: [
            {
              title: "文章列表",
              path: "/pageList",
              id: "",
              auth: "ROLE_admin,ROLE_author",
            },
            {
              title: "新增文章",
              path: "/post",
              id: "",
              auth: "ROLE_admin,ROLE_author",
            },
            {
              title: "评论管理",
              path: "/commentList",
              id: "",
              auth: "ROLE_admin",
            },
            {
              title: "分类管理",
              path: "/cateList",
              id: "",
              auth: "ROLE_author",
            },
            {
              title: "专题管理",
              path: "/topic",
              id: "",
              auth: "ROLE_admin",
            },
          ],
        },
        {
          title: "小工具",
          path: "/tools/jsonviewer",
          id: "",
          auth: "ROLE_admin,ROLE_author",
          icon: "el-icon-crop",
          children: [
            { title: "json格式化", path: "/tools/jsonviewer", id: "" },
            { title: "抽奖", path: "/tools/choujiang", id: "" },
            { title: "点名", path: "", id: "", path: "/tools/dianming" },
            {
              title: "图片转成base64",
              path: "/tools/img2base64",
              id: "",
            },
            { title: "二维码生成", path: "/tools/qrcode", id: "" },
          ],
        },
        {
          title: "权限管理",
          path: "/userManage",
          id: "",
          auth: "ROLE_admin",
          icon: "el-icon-s-custom",
          children: [
            { title: "用户管理", path: "/userManage", id: "" },
            { title: "角色管理", path: "/roleManage", id: "" },
            // { title: "菜单管理", path: "/admin/menuManage", id: "" },
          ],
        },
        {
          title: "个人设置",
          path: "/userSetting",
          id: "",
          auth: "ROLE_admin,ROLE_author",
          icon: "el-icon-user",
          children: [{ title: "个人资料", path: "/userSetting", id: "" }],
        },
        {
          title: "推广",
          path: "/caijiList",
          id: "",
          auth: "ROLE_admin",
          icon: "el-icon-sell",
          children: [
            { title: "采集", path: "/caiji", id: "" },
            { title: "采集列表", path: "/caijiList", id: "" },
            { title: "分类", path: "/tbkType", id: "" },
          ],
        },
        {
          title: "系统设置",
          path: "/systemSetting",
          id: "",
          auth: "ROLE_admin",
          icon: "el-icon-setting",
          children: [
            { title: "站点设置", path: "/systemSetting", id: "" },
            { title: "资源管理", path: "/sourceList", id: "" },
            { title: "编译部署", path: "/deploy", id: "" },
            { title: "回收站", path: "/recycle", id: "" },
            {
              title: "发送邮件",
              path: "/mail",
              id: "",
            },
          ],
        },
      ],
      isCollapse: false,
      userInfoObj: {},
      activeName: "/home",
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
    tabList() {
      return this.$store.state.tabList;
    },
    flatTabsList() {
      let tabArrObj = {};
      let list = [];
      this.tabList.forEach((item) => {
        list.push(item.path);
        tabArrObj[item.path] = item.title;
      });
      return { tabArrObj, list };
    },
    flatMenuList() {
      let list = this.menuList;
      let resultList = [];
      let flat = function (arr) {
        arr.forEach((item) => {
          if (item.children && item.children.length) {
            flat(item.children);
          } else {
            resultList.push(item);
          }
        });
      };
      flat(list);
      let arrObj = {};
      resultList.forEach((item) => {
        arrObj[item.path] = item.title;
      });
      return { resultList, arrObj };
    },
  },
  components: {
    adminHeader: () => import("@/components/admin-header"),
    commonFooter: () => import("@/components/footer"),
  },
  mounted() {
    // this.initWebStat();
    this.getUserInfo();
  },
  methods: {
    removeTab(item) {
      let { list } = this.flatTabsList;
      let index = list.indexOf(item);
      this.tabList.splice(index, 1);
      // 删除后默认跳转到最后一个彩蛋
      this.$router.push(this.tabList[this.tabList.length - 1].path);
      this.activeName = this.tabList[this.tabList.length - 1].path;
    },
    handleClick(item) {
      this.$router.push({ path: item.name });
    },
    handleSelect(key) {
      let { arrObj } = this.flatMenuList;
      let { tabArrObj } = this.flatTabsList;
      // 之前打开过的菜单不新增
      if (!tabArrObj[key]) {
        this.tabList.push({ path: key, title: arrObj[key] });
      }
      // 选中当前的tab
      this.activeName = key;
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      let res = await getUserInfoApi({});
      this.userInfoObj = res.data;
    },
    initWebStat() {
      let webStats = new webStatistics({
        baseUrl: "/bootService", // 基础接口地址url
        url: "/stats/getStats.gif", // 请求上报api的接口地址
        routeMode: "hash", // 填写单页面应用中使用的路由模式。
        autoUpload: true,
        prop: {
          //请求参数映射，参数名默认如下，可以自定义修改参数名。
          id: "visitorId",
        },
      });
      setTimeout(() => {
        webStats.setUserId();
      }, 200);
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
  .logo {
    font-size: 14px;
  }
  .content-container {
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .left-menu {
    border-radius: 3px;
    background: #fff;
    .logo {
      font-size: 14px;
      text-align: center;
      padding: 15px 0;
      color: #fff;
      border-bottom: 1px solid #ddd;
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
    padding-bottom: 20px;
    background: #fff;
    margin-left: 10px;
    border-radius: 3px;
    height: fit-content;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
    overflow-x: hidden;
  }
  .el-menu {
    border-right: none;
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
