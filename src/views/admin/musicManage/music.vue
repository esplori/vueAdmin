<template>
  <div class="wi-music">
    <div class="music-box">
      <audio :src="src" controls ref="audio" style="display: none"></audio>
      <div ref="music" class="music">
        <div class="cover">
          <img
            width="80px"
            height="80px"
            src="data:image/jpeg;base64,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"
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
          <div>{{ currentSrc }}</div>
          <div class="progress-bar">
            <div style="display: inline-block; width: 80%">
              <el-progress
                :percentage="percent"
                status="success"
                :show-text="false"
              ></el-progress>
            </div>

            <el-popover placement="top" width="200" trigger="hover">
              <el-slider v-model="volume" @change="volumeChange" :min="0" :max="1" :step="0.1"></el-slider>
              <i class="el-icon-microphone" slot="reference"></i>
            </el-popover>

          </div>
        </div>
      </div>
      <div class="fileList">
        <el-table
          :data="list"
          style="width: 100%"
          :show-header="false"
          @row-click="rowClick"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="name"> </el-table-column>
        </el-table>
      </div>
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
      interval: null
    };
  },
  mounted() {
    this.$refs.audio.src = this.list[0].src;
    this.currentSrc = this.list[0].name;
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    startClick() {
      let _this = this;
      this.$refs.audio.play();
      this.$refs.audio.volume = "0.2";
      this.interval = setInterval(() => {
        let ref = this.$refs.audio;
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
    }
  },
};
</script>

<style scoped lang="less">
.wi-music {
  width: 100%;
  height: 100%;
  .music-box {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    width: 400px;
    margin: auto;
    margin-top: 200px;
    border: 1px solid #f5f5f5;
    border-radius: 5px;
    .music {
      overflow: hidden;
      width: 400px;
      height: 80px;
      background: #fff;
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px solid #f5f5f5;
      .cover {
        position: relative;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          font-size: 20px;
          position: absolute;
          bottom: 5px;
          right: 5px;
          color: #fff;
        }
      }
      .progress {
        width: 60%;
        display: flex;
        padding: 8px;
        justify-content: space-between;
        flex-direction: column;
        box-sizing: content-box;
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
}
</style>
