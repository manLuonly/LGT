<template>
  <div class="reservation">
    <div id="reservation" :style="{width: '500px', height: '300px'}"></div>
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
          },
          tooltip: {
            trigger: "axis",
            transitionDuration:0,
          },
          legend: {
            data: ["pc","小程序"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
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
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "pc",
              type: "line",
              stack: "总量",
              data: res.data.pcYData,
            },
            {
              name: "小程序",
              type: "line",
              stack: "总量",
              data: res.data.miniYData,
            },
          ],
        });
      });
    },
  },
};
</script>

<style lang='less' scoped>
</style>