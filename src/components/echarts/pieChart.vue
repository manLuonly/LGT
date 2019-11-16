<template>
	<div ref="lineChart" class="orderArea"></div>
</template>

<script>
import echarts from "echarts";

export default {
	data() {
		return {
			myChart: null
		};
	},
	mounted() {
		this.loadChart();
	},
	beforeDestroy() {
		if (!this.myChart) {
			return;
		}
		this.myChart.dispose();
		this.myChart = null;
	},
	methods: {
		loadChart() {
			this.$nextTick(() => {
				this.myChart = echarts.init(this.$refs.lineChart);
				this.myChart.setOption(this.initOption());
			});
		},
		initOption() {
			let data = {
				title: {
					text: '季度订单量管理',
					left: 'center',
					top: '5%'
				},
				tooltip: {
					trigger: "item",
					formatter: "{b} : {c} ({d}%)"
				},
				grid:{
					top:80,
					left:60,
					bottom:40,
					right:40
				},
				legend: {
					x: "center",
					// y 设置垂直安放位置，默认全图顶端，可选值：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
					y: "15%",
					itemWidth: 24, // 设置图例图形的宽
					itemHeight: 18, // 设置图例图形的高
					textStyle: {
						color: "#000", // 图例文字颜色，
						padding: [2, 0, 0, 0]
					},
					// itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
					itemGap: 30
				},
				series: [
					{
						name: "访问来源",
						type: "pie",
						radius: "70%",
        				center: ['50%', '60%'],
						label: {
							normal: {
								show: true,
								position: "inside", //标签的位置
								formatter: "{d}%",
								textStyle: {
									color: "#fff",
								}
							}
						},

						color: [
							"rgb(131,249,103)",
							"rgb(234,217,17)",
							"#FE5050",
							"#1DB7E5"
						],
						data: [
							{
								value: 285,
								name: "1-3月"
							},
							{
								value: 410,
								name: "4-6月"
							},
							{
								value: 274,
								name: "7-9月"
							},
							{
								value: 235,
								name: "10-12月"
							}
						],
						itemStyle: {
							normal: {
								borderWidth: 6,
								borderColor: "#fff"
							}
						}
					}
				]
			};
			return data;
		}
	}
};
</script>

<style lang="less">
.orderArea {
	width: 100%;
	height: 100%;
}
</style>
