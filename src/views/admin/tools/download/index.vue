<template>
  <div class="download">
    <el-form>
      <el-form-item label="下载地址">
        <el-input v-model="url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="download">下载</el-button>
      </el-form-item>
    </el-form>

    <div>
      文件名： <span id="filename">{{ filename }}</span>
    </div>
    <div>
      进度： <span id="progress">{{ progress }}</span>
    </div>
    <div>
      速度： <span id="speed">{{ speed }}</span>
    </div>
    <div>
      P2P率： <span id="p2pRatio">{{ p2pRatio }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "https://www.charlesproxy.com/assets/release/4.6.2/charles-proxy-4.6.2.dmg?k=ba07c34dbd",
      filename: "",
      progress: "",
      speed: "",
      p2pRatio: "",
    };
  },
  created() {},
  methods: {
    download() {
      let _this = this;
      //第一个参数为video标签的id或class
      var url = this.url;
      var token = "";

      var loginXhr = new XMLHttpRequest();
      loginXhr.timeout = 3000;
      loginXhr.ontimeout = function (event) {
        alert("登录超时！");
      };
      var loginData = {
        // 使用时替换为正式的账号密码
        username: "test",
        password: "123456",
      };
      loginXhr.open("POST", "https://api.webrtc.win/v1/vdn/login");
      loginXhr.send(JSON.stringify(loginData));
      loginXhr.onreadystatechange = function () {
        if (loginXhr.readyState == 4 && loginXhr.status == 200) {
          // 调用接口获取到的token
          token = JSON.parse(loginXhr.responseText).token;
          console.log(loginXhr.responseText);
          if (PearDownloader.isWebRTCSupported()) {
            var downloader = new PearDownloader(url, token, {
              scheduler: "WebRTCFirst", //节点调度算法，默认IdleFirst，其它内置调度算法有“WebRTCFirst“和”CloudFirst”
              auto: true, //是否全部下载,默认true
              useDataChannel: true, //是否开启data channel,默认true
              dataChannels: 20, //创建data channel的最大数量,默认20
              useTorrent: false, //是否开启Browser P2P(基于Webtorrent)，默认true
              //        magnetURI: magnetURI,            //可手动传入magnetURI，需先将useTorrent设为true
              //        trackers:["wss://tracker.openwebtorrent.com"],    //可手动传入tracker服务器，需先将useTorrent设为true
              //        sources: [],                    //指定下载源，增加这个字段后pearplayer不会再向后台请求节点，建议下载源多于5个以保证流畅播放
              useMonitor: false, //是否开启monitor,会稍微影响性能,默认true
              maxLoaders: 15, //push算法中同时下载的节点数量，默认15个
              //            sequencial: true,              //是否有序下载，默认false
              debug: true, //是否开启debug模式，开启后可以在console中查看log，默认false
              algorithm: "push", //下载算法，有‘push’和‘pull’两种，默认‘push’
            });
            downloader.on("begin", _this.onBegin); //开始下载时触发
            downloader.on("progress", _this.onProgress); //回调目前的下载进度
            downloader.on("meanspeed", _this.onMeanSpeed); //平均下载速度
            downloader.on("fogratio", _this.onFogRatio); //fog节点的下载比率（下载的字节数除以总的字节数）
            downloader.on("buffersources", _this.onBufferSources); //buffer map，记录每个buffer的下载源类型，其中s: server   n: node  d: data channel  b: browser
            downloader.on("done", _this.onDone); //结束下载时触发
            downloader.on("traffic", _this.onTraffic); //节点流量统计,每次下载buffer都会触发该事件
            downloader.on("sourcemap", _this.onSourceMap); //记录每个buffer的下载源类型，其中s: server   n: node  d: data channel  b: browser
            downloader.on("metadata", _this.onMetaData);
          }
        } else {
          console.log(loginXhr.statusText);
        }
      };
    },
    onBegin(fileLength, chunks) {
      console.log(
        "start downloading buffer by first aid, file length is:" +
          fileLength / 1024 / 1024 +
          " total chunks:" +
          chunks
      );

      _this.filename = downloader.fileName;
      //        var stream = downloader.file.createReadStream({start: 0, end: 156478});
      //
      //        stream.on('data', function (chunk) {
      //
      //            console.log('stream ondata length:'+chunk.length);
      //        });

      //        downloader.dispatcher.select(0, 10086, true, function () {
      //            console.log('stream ondata ');
      //        });
    },
    onProgress(downloaded) {
      console.log("Progress: " + (downloaded * 100).toFixed(1) + "%");
      _this.progress = (downloaded * 100).toFixed(1) + "%";
    },

    onMeanSpeed(speed) {
      _this.speed = Math.round(speed) + "KB/s";
    },

    onFogRatio(p2pRatio) {
      _this.p2pRatio = (p2pRatio * 100).toFixed(1) + "%";
    },

    onDone() {
      //如果需要文件保存到本地，将下面代码解除注释

      downloader.file.getBlobURL(function (error, url) {
        var aTag = document.createElement("a");
        aTag.download = downloader.fileName;
        aTag.href = url;
        aTag.click();
      });
      console.log("finished downloading buffer by first aid");
    },
    onBufferSources(bufferSources) {
      //s: server   n: node  d: data channel  b: browser
      console.log("Current Buffer Sources:" + bufferSources);
      console.log(JSON.stringify(downloader.debugInfo));
    },
    onTraffic(mac, size, type) {
      console.log(
        "type:" +
          type +
          " mac:" +
          mac +
          " downloaded:" +
          size / 1024 / 1024 +
          "MB"
      );
    },

    onSourceMap(sourceType, index) {
      console.log("Received source type:" + sourceType + " index:" + index);
    },
    onMetaData(metadata) {
      console.log("metadata bitrate:" + metadata.bitrate / 1024 + " KB/s");
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
}
</style>
