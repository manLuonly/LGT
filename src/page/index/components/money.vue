<template>
  <div class="money">
    <div id="money" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>

<script>
import { moneyFn } from "@/api/home";
export default {
  name: "money",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let money = this.$echarts.init(document.getElementById("money"));
      moneyFn(7).then((res) => {
        money.setOption({
          title: {
            text: "近7天每日总额统计",
            shadowBlur: 0,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            left: "center",
            textStyle: {
              fontSize: 16,
            },
          },
          tooltip: {
            showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            transitionDuration: 0,
          },
          xAxis: {
            data: res.data.xData,
            axisLabel: {
              interval: 0, // 字体设置全部显示
              // rotate: 40, // 字体倾斜40度
              formatter(params) { // 字体换行
                return params.replace(/.{5}(?!$)/g, (a) => a + "\n");
              },
            },
          },
          yAxis: {},
          series: [
            {
              name: "当日成交价",
              type: "bar",
              data: res.data.yData,

              barWidth: 30, //柱图宽度
            },
          ],
        });
      });
      window.addEventListener("resize", () => {
        money.resize();
      });
    },
  },
};
</script>

<style lang='less' scoped>
.money {
  display: flex;
  justify-content: center;
}
</style>