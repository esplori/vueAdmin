<template>
  <div class="post">
    <!-- <el-button @click="postPage">start</el-button> -->
    <el-form label-width="100px" :model="form">
      <el-form-item label="标题：">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <div>
          <div style="min-height: 200px" id="wangeditor"></div>
        </div>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-date-picker
          type="datetime"
          popper-class="select-zindex"
          v-model="form.createDate"
          format="yyyy-MM-dd HH:mm:ss"
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
        <el-input
          v-model="form.keywords"
          class="optionsWidth"
          placeholder="多个关键字用英文逗号分隔，例如：开发,web"
        ></el-input>
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
  getCateValidApi,
} from "@/views/API/admin.js";
import { getCurrDate } from "@/utils/common.js";
export default {
  data() {
    return {
      form: {
        id: "",
        title: "",
        content: "",
        cate: 3,
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
        // console.log("customInsert", result);
        // console.log('result.data[0]', result.data[0])
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        insertImgFn(result.data[0].url);
      },
    };
    // 插入代码语言配置
    this.editor.config.languageType = [
      // "Bash",
      // "C",
      // "C#",
      // "C++",
      "JavaScript",
      "CSS",
      "Java",
      "JSON",
      "TypeScript",
      "Plain text",
      "Html",
      // "XML",
      "SQL",
      // "Go",
      // "Kotlin",
      // "Lua",
      "Markdown",
      "PHP",
      "Python",
      "Shell Session",
      // "Ruby",
    ];
    // 挂载highlight插件
    this.editor.highlight = hljs;
    this.editor.create();
  },
  computed: {
    userInfo() {
      const userinfo = localStorage.getItem("userInfo");
      if (userinfo) {
        return JSON.parse(userinfo);
      } else {
        return null;
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
      const res = await getCateValidApi({});
      if (res) {
        this.cateList = res.data.result || [];
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
      // const res = await axios.get("/static/json/poet.song.4000.json");
      const res = await postPageApi({
        ...this.form,
        createBy: this.userInfo && this.userInfo.username,
        createDate: getCurrDate(this.form.createDate),
      });
      // arr.map(it =>{
      //   debugger
      //   this.pt({
      //     title: it.title + '-' + it.author ,
      //     content: it.paragraphs.length?it.paragraphs.join("<br>"):it.title,
      //     cate: 137,
      //     views: 0,
      //     keywords: it.title + ',' + it.author,
      //     createBy: this.userInfo && this.userInfo.username,
      //   });
      // })

      if (res) {
        this.$message.success("添加成功");
        this.$router.push({ path: "/admin/pageList" });
      }
    },
    // async pt(data) {
    //   const res = await postPageApi({
    //     ...data,
    //     createBy: this.userInfo && this.userInfo.username,
    //   });
    // },
    async getDetail(id) {
      const res = await getDetailByIdApi({ id: id });
      if (res) {
        this.$set(this, "form", res.data.result);
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
  },
};
</script>

<style scoped lang="less">
.post {
  width: 100%;
  .optionsWidth {
    width: 350px;
  }
}
</style>
