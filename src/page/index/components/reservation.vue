<template>
  <div class="reservation">
    <div id="reservation" :style="{width: '600px', height: '300px'}"></div>
  </div>
</template>

<script>
import { reservation } from "@/api/home";
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
      let reservation = this.$echarts.init(document.getElementById("reservation"));
      reservation(7).then((res) => {
        reservation.setOption({
          title: { text: "近七天每日预约人数统计" },
          tooltip: {},
          xAxis: {
            data: res.data.xData,
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res.data.yData,
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