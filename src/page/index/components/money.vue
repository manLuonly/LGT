<template>
  <div class="money">
    <div id="money" :style="{width: '600px', height: '300px'}"></div>
  </div>
</template>

<script>
import { money } from "@/api/home";
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
      money(7).then((res) => {
        money.setOption({
          title: { text: "近七天每日总额统计" },
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