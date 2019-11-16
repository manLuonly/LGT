<template>
    <div ref="lineChart" class="orderArea" ></div>
</template>

<script>
	import echarts from 'echarts'
    
    export default {
		props:{
			title:{
				type:String
			},
			color:{
				type:String
			},
			xData:{
				type:Array,
				default:()=>['logo', '画册', '海报', 'VI包装', '网站', 'APP', '小程序', '网页', '名片', '详情页']
			},
			yData:{
				type:Array,
				default:()=>[60, 40, 55, 20, 20, 33, 20, 10, 20, 80]
			}
		},
        data(){
            return {
                myChart:null,
            }
        },
        mounted(){
            this.loadChart();
        },
		beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
			loadChart(){
  				this.$nextTick(() => {
                    this.myChart = echarts.init(this.$refs.lineChart);
                    this.myChart.setOption(this.initOption());
                })
			},
			initOption(){
				let data = {
					title: {
						text: this.title,
						left: 'center',
						top: '10%'
					},
					grid:{
						top:80,
						left:60,
						bottom:40,
						right:40
					},
					xAxis: {
						type: 'category',
						axisTick: {
							show: false
						},
						boundaryGap: false,//坐标轴两边是否留白
						axisLine: { //坐标轴轴线相关设置。数学上的x轴
							show: true,
							lineStyle: {
								color: '#6a9cd5' //x轴颜色
							},
						},
						axisLabel: { //坐标轴刻度标签的相关设置
							textStyle: {
								color: '#000',
							},
						},
						data: this.xData
					},
					yAxis: {
						type: 'value',
						axisTick: {
							show: false
						},
						nameTextStyle: {
							color: "#000"
						},
						name: '数量',
						axisLine: { //坐标轴轴线相关设置。数学上的x轴
							show: true,
							lineStyle: {
								color: '#6a9cd5' //x轴颜色
							},
						},
						splitLine: {//y轴上的y轴线条相关设置
							show: false
						},
						splitArea: {//背景条纹
							show: true,
							areaStyle: {
								color: [
									'rgba(255,255,255,0)',
									'rgba(242,243,248,1)'
								]
							}

						},
					},
					series: [{
						data: this.yData,
						type: 'line'
					}]
				}
				return data;
			},
		}
    }
</script>

<style lang="less">
	.orderArea {
		width: 100%;
		height: 100%;
	}
</style>
