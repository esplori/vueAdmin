<!--后台管理首页-->
<template>
  <div class="admin-home">
    <div class="admin-index">
      <div class="container">
        <div>
          <div class="logo">
            <span v-if="!isCollapse">DSIAB</span>
          </div>
          <el-menu
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
            <span v-for="(item, index) in menuList" :key="index">
              <el-menu-item
                :index="item.path"
                :key="index"
                v-if="
                  !item.children &&
                  userInfo &&
                  userInfo.role.indexOf(item.role) !== -1
                "
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.name }}</span>
                </template>
              </el-menu-item>
              <el-submenu
                v-if="
                  item.children &&
                  userInfo &&
                  userInfo &&
                  userInfo.role.indexOf(item.role) !== -1
                "
                :index="item.path"
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.name }}</span>
                </template>
                <el-menu-item
                  v-if="userInfo && userInfo.role.indexOf(it.role) !== -1"
                  :index="it.path"
                  v-for="(it, idx) in item.children"
                  :key="idx"
                >
                  <span slot="title">{{ it.name }}</span>
                </el-menu-item>
              </el-submenu>
            </span>
          </el-menu>
        </div>
        <div class="swith-button">
          <i
            class="el-icon-s-unfold"
            v-if="isCollapse"
            style="color: #fff; font-size: 24px"
            @click="swith"
          ></i>
          <i
            class="el-icon-s-fold"
            v-else
            style="color: #fff; font-size: 24px"
            @click="swith"
          ></i>
        </div>
      </div>
      <div class="right-content">
        <adminHeader></adminHeader>
        <router-view></router-view>
      </div>
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
      }
      console.log("userInfo", userInfo);
      return userInfo;
    },
  },
  components: {
    adminHeader: () => import("./components/admin-header"),
  },
  methods: {
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
  .admin-index {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .container {
      height: 100%;
      background: #001529;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      overflow-y: auto;
      .logo {
        padding: 20px 0;
        font-size: 16px;
        color: #fff;
        height: 30px;
        line-height: 30px;
      }
      .swith-button {
        text-align: left;
        padding: 20px;
      }
      .el-menu-vertical-demo {
        border: none;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 400px;
      }
    }
    .right-content {
      width: 100%;
      padding: 20px;
      overflow-y: auto;
    }
  }
}
</style>
