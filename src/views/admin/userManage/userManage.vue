<template>
  <div class="user-manage">
    <el-button @click="insertUser" type="text ">新增用户</el-button>
    <el-table :data="data">
      <el-table-column  type="index" label="序号" width="55px"></el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="role" label="角色Id"> </el-table-column>
      <el-table-column fixed="right" width="180" label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text">编辑</el-button>
          <!-- 不允许删除管理员 -->
          <el-button
            @click="del(scope.row.id, scope.row.username)"
            type="text"
            class="cus-button-danger"
            :disabled="scope.row.role.indexOf('admin') !== -1"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="editObj.currUsername + '角色修改'"
      :visible.sync="editObj.dialogVisible"
      width="30%"
    >
      <div>
        <el-table
          :data="Roledata"
          ref="RoleTable"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="roleName" label="角色"> </el-table-column>
          <el-table-column prop="roleId" label="角色ID"> </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editObj.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新增用户"
      :visible.sync="insertObj.dialogVisible"
      width="30%"
    >
      <div>
        <el-form :model="form" label-width="60px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertObj.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserListApi,
  getRoleListApi,
  updateRoleApi,
  insertUserApi,
  deleUserApi,
} from "../../API/admin";
export default {
  data() {
    return {
      data: [],
      Roledata: [],
      params: {
        page: 1,
      },
      editObj: {
        dialogVisible: false,
        currUsername: "",
      },
      insertObj: {
        dialogVisible: false,
      },
      multipleSelection: [],
      form: {
        username: "",
        password: "",
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async insert() {
      const res = await insertUserApi({
        ...this.form,
      });
      if (res) {
        this.insertObj.dialogVisible = false;
        this.getUserList();
      }
    },
    insertUser() {
      this.insertObj.dialogVisible = true;
    },
    async getUserList() {
      const res = await getUserListApi({ page: this.params.page });
      if (res) {
        this.data = res.data.result;
      }
    },
    edit(row) {
      this.editObj.dialogVisible = true;
      this.editObj.currUsername = row.username;
      this.getRoleList(row);
    },
    del(id, username) {
      this.delUser(id, username);
    },
    async delUser(id, username) {
      const res = await deleUserApi({ id, username });
      if (res) {
        this.getUserList();
      }
    },
    async getRoleList(row) {
      const res = await getRoleListApi({});
      if (res) {
        this.Roledata = res.data.result;
        this.Roledata.forEach((item, index) => {
          if (row.role.indexOf(item.roleId) !== -1) {
            this.$nextTick(() => {
              this.$refs.RoleTable.toggleRowSelection(
                this.Roledata[index],
                true
              );
            });
          }
        });
      }
    },
    submit() {
      this.updateRole();
      this.dialogVisible = false;
    },
    async updateRole() {
      const res = await updateRoleApi({
        roleList: this.multipleSelection,
        username: this.editObj.currUsername,
      });
      if (res) {
        this.editObj.dialogVisible = false;
        this.getUserList();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped lang="less">
.music {
  width: 100%;
  height: 100%;
  .music-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 400px;
    background: #001529;
    margin: auto;
  }
}
</style>
