<template>
  <div class="page-list">
    <div class="handle">
      <el-button type="primary" @click="addFile">新增文件</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有" name="all"></el-tab-pane>
      <el-tab-pane label="图片" name="image"></el-tab-pane>
      <el-tab-pane label="视频" name="media"></el-tab-pane>
      <el-tab-pane label="音乐" name="music"></el-tab-pane>
      <el-tab-pane label="文档" name="file"></el-tab-pane>
    </el-tabs>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="序号" width="55px"></el-table-column>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="" label="名称">
        <template slot-scope="scope">
          <div class="filename">
            <div
              v-if="typeConfig.music.includes(scope.row.filename.split('.')[1])"
            >
              <span>{{ scope.row.filename }}</span>
              <audio
                :src="sourceUrl + scope.row.filename"
                controls="controls"
              ></audio>
            </div>
            <div
              v-else-if="
                typeConfig.image.includes(scope.row.filename.split('.')[1])
              "
            >
              <span style="margin-right: 40px">{{ scope.row.filename }}</span>
              <img
                loading="lazy"
                :src="sourceUrl + scope.row.filename"
                alt=""
                height="40px"
              />
            </div>
            <div v-else>
              <span>{{ scope.row.filename }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
       <el-table-column prop="" label="名称">
        <template slot-scope="scope">
          <a target="_blank" :href="sourceUrl + scope.row.filename">{{sourceUrl + scope.row.filename}}</a>
        </template>
       </el-table-column>
      <el-table-column fixed="right" width="120" label="操作">
        <template slot-scope="scope">
          <el-button @click="del(scope.row.filename)" type="text"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-upload
        class="upload-demo"
        drag
        action="/bootService/account/upload"
        multiple
        :headers="headers"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delFileApi, getSourceListApi } from "@/views/API/admin.js";

export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      activeName: "",
      sourceUrl: "",
      typeConfig: {
        image: ["jpg", "png", "gif", "jpeg"],
        media: ["mp4"],
        music: ["mp3"],
        file: ["docx", "doc", "xslx", "txt", "zip"],
      },
    };
  },
  created() {
    this.getList(this.activeName);
  },
  computed: {
    headers() {
      let userinfo = localStorage.getItem("userInfo");
      if (userinfo) {
        userinfo = JSON.parse(userinfo);
        return { Authorization: userinfo.token };
      }
      return { Authorization: "" };
    },
  },
  methods: {
    handleClick(val) {
      this.getList(this.activeName);
    },
    addFile() {
      this.dialogVisible = true;
    },
    async getList(type) {
      const res = await getSourceListApi({});
      if (res) {
        this.sourceUrl = res.data.sourceUrl;
        this.list = res.data.result.filter((item) => {
          const fig = this.typeConfig[type];
          if (type && fig) {
            const fn = item.filename.split(".")[1];
            return fig.includes(fn);
          }
          return item;
        });
      }
    },
    async del(filename) {
      const res = await delFileApi({ filename: filename });
      if (res) {
        this.$message.success("删除成功");
        this.getList(this.activeName);
      }
    },
  },
};
</script>

<style scoped lang="less">
.page-list {
  width: 100%;
  .content-item {
    font-size: 18px;
    text-align: left;
    padding: 5px;
  }
  .filename {
    display: flex;
    align-items: center;
    audio {
      margin-left: 10px;
      width: 300px;
      height: 20px;
    }
  }
}
</style>
