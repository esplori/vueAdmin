<template>
  <div class="wi-music" v-if="isClose == 'open' ">
    <i class="el-icon-close close" @click="close"></i>
    <div class="music-box">
      <audio :src="src" controls ref="audio" style="display: none"></audio>
      <div ref="music" class="music">
        <div class="cover">
          <img
            width="80px"
            height="80px"
            src="@/assets/images/music/cover.jpeg"
            alt=""
          />
          <i
            class="el-icon-video-pause"
            v-if="pauseIcon"
            @click="pauseClick"
          ></i>
          <i class="el-icon-video-play" v-if="playIcon" @click="startClick"></i>
        </div>
        <div class="progress">
          <div class="name">歌曲：{{ currentSrc }}</div>
          <div class="progress-bar">
            <div style="display: inline-block; width: 95%">
              <el-progress
                :percentage="percent"
                status="success"
                :stroke-width="2"
                :show-text="false"
              ></el-progress>
            </div>

            <el-popover placement="top" width="200" trigger="hover">
              <el-slider
                v-model="volume"
                @change="volumeChange"
                :min="0"
                :max="1"
                :step="0.1"
              ></el-slider>
              <i class="el-icon-microphone" slot="reference"></i>
            </el-popover>
          </div>
        </div>
      </div>
      <!-- <div class="fileList">
        <el-table
          :data="list"
          style="width: 100%"
          :show-header="false"
          @row-click="rowClick"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="name"> </el-table-column>
        </el-table>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          src: "https://source.dsiab.com/upload/%E4%B8%80%E4%BA%8B%E6%97%A0%E6%88%90.mp3",
          name: "一事无成",
        },
        {
          src: "https://source.dsiab.com/upload/%E8%B5%A4%E4%BC%B6.mp3",
          name: "赤伶",
        },
      ],
      src: "",
      percent: 0,
      currentTime: 0,
      duration: 0,
      currentSrc: "",
      pauseIcon: false,
      playIcon: true,
      volume: 0.2,
      interval: null,
      isClose: sessionStorage.getItem("isClose") || 'open'
    };
  },
  mounted() {
    this.$refs.audio.src = this.list[0].src;
    this.currentSrc = this.list[0].name;
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    close() {
      this.isClose = 'close'
      sessionStorage.setItem("isClose", "close")
    },
    startClick() {
      const _this = this;
      this.$refs.audio.play();
      this.$refs.audio.volume = "0.2";
      this.interval = setInterval(() => {
        const ref = this.$refs.audio;
        _this.percent = parseFloat((ref.currentTime / ref.duration) * 100) || 0;
        _this.duration = ref.duration;
        _this.currentTime = ref.currentTime;
      }, 1000);
      this.pauseIcon = true;
      this.playIcon = false;
    },
    pauseClick() {
      this.$refs.audio.pause();
      this.pauseIcon = false;
      this.playIcon = true;
    },
    next() {
      this.$refs.audio.pause();
      this.$refs.audio.src = this.list[1];
      this.$refs.audio.play();
    },
    pre() {
      this.$refs.audio.pause();
      this.$refs.audio.src = this.list[0];
      this.$refs.audio.play();
    },
    rowClick(row, column, event) {
      this.src = row.src;
      this.currentSrc = row.name;
      this.$nextTick(() => {
        this.startClick();
      });
    },
    volumeChange(val) {
      this.$refs.audio.volume = val;
    },
  },
};
</script>

<style scoped lang="less">
.wi-music {
  z-index: 100;
  width: 100%;
  // height: 100%;
  .music-box {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // width: 400px;
    // margin: auto;
    // margin-top: 200px;
    // border: 1px solid #f5f5f5;
    // border-radius: 5px;
    .music {
      overflow: hidden;
      // width: 400px;
      height: 50px;
      // background: rgba(black, black, black, 1);
      background: #000;
      opacity: 0.6;
      display: flex;
      justify-content: flex-start;
      color: #fff;
      // border-bottom: 1px solid #f5f5f5;
      .cover {
        position: relative;
        display: flex;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          font-size: 30px;
          position: absolute;
          bottom: 20px;
          right: 40px;
          color: #fff;
          cursor: pointer;
        }
      }
      .progress {
        width: 100%;
        height: 2px;
        display: flex;
        padding: 2px 20px;
        justify-content: space-between;
        flex-direction: column;
        box-sizing: content-box;
        .name{
          font-size: 14px;
        }
        .progress-bar {
          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            font-size: 18px;
          }
        }
      }
    }
    .fileList {
      width: 100%;
      background: #fff;
    }
  }
  .close{
    cursor: pointer;
    color: #fff;
    z-index: 200;
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 20px;
  }
}
</style>
