<template>
  <div class="home">
    <div class="card-item">
      <div class="date-picker-change">
        <h3>统计数据</h3>
        <div>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <el-row :gutter="12" style="width: 100%">
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item-title">总访问量</div>
            <div class="item-amount">
              {{ views }}
            </div>
            <div class="item-compare">
              <span>较昨日</span>
              <span class="num"> 34.5% </span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item-title">文章总数</div>
            <div class="item-amount">
              {{ pages }}
            </div>
            <div class="item-compare">
              <span>较昨日</span>
              <span class="num"> 34.5% </span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item-title">浏览量</div>
            <div class="item-amount">
              {{ pages }}
            </div>
            <div class="item-compare">
              <span>较昨日</span>
              <span class="num"> 34.5% </span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item-title">IP数</div>
            <div class="item-amount">
              {{ pages }}
            </div>
            <div class="item-compare">
              <span>较昨日</span>
              <span class="num"> 34.5% </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- <div class="user-data">用户访问量</div> -->
      <div class="type-data">
        <el-row>
          <el-col :span="8">
            <div>
              <div
                id="deviceType"
                style="max-width: 600px; height: 400px"
              ></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <div
                id="browserType"
                style="max-width: 600px; height: 400px"
              ></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <div
                id="deiveRatio"
                style="max-width: 600px; height: 400px"
              ></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/views/API/admin.js";
import { getWebStatisticsApi } from "@/views/API/stats.js";
import * as echarts from "echarts";
export default {
  data() {
    return {
      views: 0,
      pages: 0,
      dateRange: [],
      deviceRatio: [],
      deviceType: [],
      browserType: [],
    };
  },
  created() {
    this.getUserInfo();
    this.getWebStatistics();
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.initCharts();
    });
  },
  methods: {
    initDeviceType() {
      let _this = this;
      let myChart = echarts.init(document.getElementById("deviceType"));
      myChart.setOption({
        title: {
          text: "设备型号",
        },
        tooltip: {},
        xAxis: {
          data: _this.deviceType,
          axisLabel: {
            interval: 0,
            rotate: 45, //倾斜度 -90 至 90 默认为0
            margin: 8,
          },
        },
        yAxis: {},
        series: [
          {
            name: "设备型号",
            type: "bar",
            data: [5, 20, 36, 10, 10],
          },
        ],
      });
      myChart.resize();
    },
    initBrowserType() {
      let _this = this;
      let myChart = echarts.init(document.getElementById("browserType"));
      myChart.setOption({
        title: {
          text: "浏览器型号",
        },
        tooltip: {},
        xAxis: {
          data: _this.browserType,
          axisLabel: {
            interval: 0,
            rotate: 45, //倾斜度 -90 至 90 默认为0
            margin: 8,
            formatter: function (value) {
              //x轴的文字改为竖版显示
              var str = value.slice(0,9);
              return str;
            },
          },
        },
        yAxis: {},
        series: [
          {
            name: "浏览器型号",
            type: "bar",
            data: [5, 30, 36, 10, 10, 34, 45, 67, 69, 98],
          },
        ],
      });
      myChart.resize();
    },
    initDeiveRatio() {
      let _this = this;
      let myChart = echarts.init(document.getElementById("deiveRatio"));
      myChart.setOption({
        title: {
          text: "设备分辨率",
        },
        tooltip: {},
        xAxis: {
          data: _this.deviceRatio,
          axisLabel: {
            interval: 0,
            rotate: 45, //倾斜度 -90 至 90 默认为0
            margin: 8,
          },
        },
        yAxis: {},
        series: [
          {
            name: "设备分辨率",
            type: "bar",
            data: [5, 20, 36, 10, 10, 34, 45, 56, 67, 78],
          },
        ],
      });
      myChart.resize();
    },
    async getUserInfo() {
      await getUserInfoApi({});
    },
    async getWebStatistics() {
      const res = await getWebStatisticsApi({});
      if (res) {
        this.views = res.allViews;
        this.pages = res.allpages;
        this.deviceRatio = res.deviceRatio.map((item) => {
          return item.screen;
        });
        this.deviceType = res.deviceType.map((item) => {
          return item.os;
        });
        this.browserType = res.browserType.map((item) => {
          return item.browse;
        });
        this.initCharts();
      }
    },
    initCharts() {
      this.initDeviceType();
      this.initBrowserType();
      this.initDeiveRatio();
    },
  },
};
</script>

<style scoped lang="less">
.home {
  .date-picker-change {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
  }
  .card-item {
    .item-title {
      text-align: center;
      font-size: 16px;
      padding: 5px;
    }
    .item-amount {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      padding: 5px;
    }
    .item-compare {
      text-align: center;
      font-size: 14px;
      .num {
        color: #f85149;
      }
    }
    .type-data {
      padding: 20px 0;
    }
  }
}
</style>
