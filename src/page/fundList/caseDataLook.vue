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
			
		</section>
</template>

<script>
	import pieChart from 'cps/echarts/pieChart' // 用户投资类型 饼状图
	import lineChart from 'cps/echarts/lineChart' // 用户投资类型 折线图

    export default {
    	data(){
    		return {
    		}
    	},
    	components: {
		   pieChart,
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
	}
  
</style>