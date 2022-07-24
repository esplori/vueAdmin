<template>
  <div class="post">
    <el-form label-width="85px" :model="form">
      <el-form-item label="标题：">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <div>
          <div style="min-height: 550px" id="wangeditor"></div>
        </div>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-date-picker
          type="datetime"
          class="optionsWidth"
          popper-class="select-zindex"
          v-model="form.createDate"
          format="yyyy/MM/dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="分类：">
        <el-select
          v-model="form.cate"
          popper-class="select-zindex"
          class="optionsWidth"
        >
          <el-option
            v-for="(item, index) in cateList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="浏览量：">
        <el-input v-model="form.views" disabled class="optionsWidth"></el-input>
      </el-form-item>
      <el-form-item label="关键字：">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ 新增</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-button @click="submit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Wangeditor from "wangeditor";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import {
  postPageApi,
  editPageApi,
  getDetailByIdApi,
  getAdminCateValidApi,
} from "@/views/API/admin.js";
import { getCurrDate } from "@/utils/common.js";
export default {
  data() {
    return {
      form: {
        id: "",
        title: "",
        content: "",
        cate: "",
        views: 0,
        keywords: "",
        createBy: "",
        createDate: getCurrDate(),
      },
      cateList: [],
      editorOption: {
        placeholder: "编辑文章内容",
      },
      editor: null,
      inputVisible: false,
      inputValue: "",
      dynamicTags: [],
    };
  },
  components: {},
  mounted() {
    let userinfo = localStorage.getItem("userInfo");
    if (userinfo) {
      userinfo = JSON.parse(userinfo);
    } else {
      userinfo = {};
    }
    this.editor = new Wangeditor("#wangeditor");
    // 配置 server 接口地址
    this.editor.config.uploadImgServer = "/bootService/account/upload";
    this.editor.config.uploadFileName = "file";
    this.editor.config.uploadImgHeaders = {
      Authorization: userinfo.token,
    };
    this.editor.config.uploadImgTimeout = 100 * 1000;
    this.editor.config.uploadImgHooks = {
      // 上传图片之前
      before: function (xhr) {
        // console.log(xhr);
        // // 可阻止图片上传
        // return {
        //     prevent: true,
        //     msg: '需要提示给用户的错误信息'
        // }
      },
      // 图片上传并返回了结果，图片插入已成功
      success: function (xhr) {
        // console.log("success", xhr);
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        // console.log("fail", resData);
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        // console.log("error", xhr, resData);
      },
      // 上传图片超时
      timeout: function (xhr) {
        // console.log("timeout");
      },
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn, result) {
        // result 即服务端返回的接口
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        insertImgFn(result.data[0].url);
      },
    };
    // 插入代码语言配置
    this.editor.config.languageType = [
      "JavaScript",
      "CSS",
      "Java",
      "JSON",
      "Html",
    ];
    // 挂载highlight插件
    this.editor.highlight = hljs;
    // 配置 onchange 回调函数
    this.editor.config.onchange = function (newHtml) {
      setTimeout(()=>{
        localStorage.setItem("newHtml",newHtml)
      },5000)
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms
    this.editor.create();
  },
  computed: {
    userInfo() {
      const userinfo = localStorage.getItem("userInfo");
      if (userinfo) {
        return JSON.parse(userinfo);
      } else {
        return "";
      }
    },
  },
  created() {
    const id = this.$route.query.id;
    if (id) {
      this.getDetail(id);
    }
    this.getCate();
  },
  methods: {
    async getCate() {
      const res = await getAdminCateValidApi({});
      if (res) {
        this.cateList = res.data.result || [];
        // 默认取第一个分类
        this.form.cate = this.cateList[0].id;
      }
    },
    submit() {
      this.form.content = this.editor.txt.html();
      if (!this.form.title) {
        this.$message.warning("请输入标题");
        return false;
      }
      if (!this.form.content) {
        this.$message.warning("请输入内容");
        return false;
      }
      if (this.form.id) {
        this.editPage();
      } else {
        this.postPage();
      }
    },
    async editPage() {
      const res = await editPageApi({
        ...this.form,
        createDate: getCurrDate(this.form.createDate),
        keywords: this.dynamicTags.join(","),
      });
      if (res) {
        this.$message.success("修改成功");
        let { page, cate, pageSize } = this.$route.query;
        // 保存列表查询参数
        this.$router.push({
          path: "/admin/pageList",
          query: { page, cate, pageSize },
        });
      }
    },
    async postPage() {
      const res = await postPageApi({
        ...this.form,
        createBy: this.userInfo && this.userInfo.username,
        createDate: getCurrDate(this.form.createDate),
        keywords: this.dynamicTags.join(","),
      });
      if (res) {
        this.$message.success("添加成功");
        this.$router.push({ path: "/admin/pageList" });
      }
    },
    async getDetail(id) {
      const res = await getDetailByIdApi({ id: id });
      if (res) {
        // 日期兼容safari
        res.data.result.createDate = res.data.result.createDate.replace(
          /-/g,
          "/"
        );
        this.$set(this, "form", res.data.result);
        this.dynamicTags = this.form.keywords
          ? this.form.keywords.split(",")
          : [];
        this.editor.txt.html(this.form.content);
      }
    },
    download() {
      this.ajaxPostLoadFile("/pages/download", "11");
    },
    ajaxPostLoadFile(url, val) {
      var form = document.createElement("form");
      form.setAttribute("style", "display:none");
      form.setAttribute("target", "");
      form.setAttribute("method", "post");
      form.setAttribute("action", url);
      var tempInput = document.createElement("input");
      tempInput.setAttribute("type", "hidden");
      tempInput.setAttribute("name", "testName");
      tempInput.setAttribute("value", val);
      form.append(tempInput);
      document.body.appendChild(form);
      form.submit();
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style scoped lang="less">
.post {
  width: 100%;
  .optionsWidth {
    width: 250px;
  }
  .el-tag {
    margin-right: 5px;
  }
  .button-new-tag {
    height: 28px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
}
</style>
