<template>
		<section class="data_section" ref="data_section"> 
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="13">
					<lineChart title="案例统计数量列表" />
				</el-col>
				<el-col :span="11">
					<pie-chart />
				</el-col>
			</el-row>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="13">
					<line-chart title="客户点击项目数量统计"/>
				</el-col>

			   	<el-col :span="11">
					<lineChart title="客户月份数量统计"  :xData="[1,2,3,4,5,6,7,8,9,10,11,12]" :yData="[10,20,30,40,50,60,70,80,90,100,110,120]"/>
				</el-col>
			</el-row> 
			
		</section>
</template>

<script>
	import barChart from 'cps/echarts/barChart' // 用户投资类型 柱状图
	import pieChart from 'cps/echarts/pieChart' // 用户投资类型 饼状图
	import radarChart from 'cps/echarts/radarChart' // 用户投资类型 雷达图
	import lineChart from 'cps/echarts/lineChart' // 用户投资类型 折线图
	import { github } from "@/utils/env";

    export default {
    	data(){
    		return {
			  github:github
    		}
    	},
    	components: {
		   barChart,
		   pieChart,
		   radarChart,
		   lineChart
		},	
		created(){
		},
    	mounted(){
		},
    	methods: {
    	}
    }
</script>

<style lang="less" scoped>
	.data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				overflow: hidden;
			}
			.orderbarArea{
				height: 370px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				width:62px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 30px;
				}
			}
		    .number{
				font-size: 22px;
				font-weight: bold;
				.perTitle{
					font-size: 13px;
   				    margin-left: 5px;
				}
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
     
	}
  
</style>
