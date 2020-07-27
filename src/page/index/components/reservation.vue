<template>
  <div class="reservation">
    <div id="reservation" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>

<script>
import { reservationFn } from "@/api/home";
export default {
  name: "reservation",

  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let reservation = this.$echarts.init(
        document.getElementById("reservation")
      );
      reservationFn(7).then((res) => {
        reservation.setOption({
          title: {
            text: "近7天每日预约人数统计",
            textStyle: {
              fontSize: 16,
            },
          },
          tooltip: {
            trigger: "axis",
            transitionDuration: 0,
            showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          },
          legend: {
            data: ["pc", "小程序"],
          },
          grid: {
            bottom: "3%", // 向下撑开百分之3
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: res.data.xData,
            axisLabel: {
              interval: 0, // 字体设置全部显示
              // rotate: 40, // 字体倾斜40度
              formatter(params) { // 字体换行
                return params.replace(/.{5}(?!$)/g, (a) => a + "\n");
              },
            },
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "pc",
              type: "line",
              symbol: "circle",
              symbolSize: 12,
              data: res.data.pcYData,
            },
            {
              name: "小程序",
              type: "line",
              symbol: "circle",
              symbolSize: 12,
              data: res.data.miniYData,
            },
          ],
        });
        window.addEventListener("resize", () => {
          reservation.resize();
        });
      });
    },
  },
};
</script>

<style lang='less' scoped>
.reservation {
  display: flex;
  justify-content: center;
}
</style>