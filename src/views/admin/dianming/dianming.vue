<template>
  <div class="dianming">
    <div>
      总人数：<span>{{ students.length }}</span> 人，抽取：
      <input type="text" v-model="size" /> 位
    </div>
    <div>
      <button
        type="button"
        style="height: 50px; font-size: 20px; margin-top: 10px"
        @click="onBtnClick()"
      >
        {{ btnText }}
      </button>
    </div>
    <div>
      <ul
        style="
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-flow: row wrap;
        "
      >
        <li
          v-for="(v, i) in students"
          :key="i"
          :class="{ active: selectedStudentIndexs.includes(i) }"
        >
          {{ v }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        "张三",
        "李四",
        "王五",
        "阿福",
        "旺财",
        "小米",
        "小红",
        "白白",
        "小天",
        "赵六",
        "晓晴",
        "吴浩",
        "阿勇",
        "王武",
        "江山",
        "天下",
        "阮天",
        "萌萌",
        "芒果",
        "卿苑",
        "青柠",
        "青鸢",
        "苹芃",
        "小妮",
        "子依",
        "点点",
        "贤贤",
      ],
      studentIndexs: [],
      size: 1,
      selectedStudentIndexs: [],
      intervalId: null,
    };
  },
  created() {
    this.studentIndexs = this.students.map((v, i) => i);
    this.students.sort(() => 0.5 - Math.random());
  },
  computed: {
    btnText() {
      return this.intervalId ? "确定选择" : `点击随机抽取 ${this.size} 位`;
    },
  },
  methods: {
    onBtnClick() {
      // 已开启，需要停止
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      // 未开启，需要开启
      else {
        this.intervalId = setInterval(() => {
          this.selectedStudentIndexs = this.studentIndexs
            .sort(() => 0.5 - Math.random())
            .slice(0, this.size);
        }, 100);
      }
    },
  },
};
</script>

<style scoped lang="less">
.dianming {
  background: #000;
  display: flex;
  flex-flow: column;
  align-items: center;
  color: #fff;
  li {
    margin: 10px;
    padding: 10px;
    border: 1px solid white;
    border-radius: 10px;
  }

  .active {
    background-color: white;
    color: black;
    /* 2D转换的属性名 */
    transform: scale(1.3);
    /* 过渡效果的属性名 */
    transition: transform 0.3s;
    /* 位移，属于transform的属性值 */
    /* translate */
  }
}
</style>