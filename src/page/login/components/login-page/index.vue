<template>
	<!-- 
		props
			loading { boolean } 设置登录按钮loading状态

		Event
			submit  Fn  点击登录的回调事件

		Methods
			resetForm() Fn 清空表单
	-->
	<div class="template-login" :style="{backgroundImage: bg}">
		<img src="~@/assets/img/logo-2.png" alt class="logo" />

		<div class="option-group">
			<div class="item">客服二维码</div>
			<div class="item" style="margin-top:16px">
				<img src="~@/assets/img/kefu.png" alt class="icon" />
				<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2418531916&site=qq&menu=yes">在线客服</a>
			</div>
		</div>

		<div class="welcome" v-show="currenTemplate == 4">
			<div class="line1">欢迎登录！</div>
			<div class="line2">Login Please</div>
		</div>

		<loginContent
			:currenTemplate="currenTemplate"
			v-on="$listeners"
			v-bind="$attrs"
			ref="loginContent"
		/>

		<el-select
			v-model="currenTemplate"
			placeholder="请选择模版"
			style="float:right;width:100px"
			@change="selectChange"
			:disabled="$attrs.loading"
		>
			<el-option
				v-for="item in templateList"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			></el-option>
		</el-select>
	</div>
</template>

<script>
import loginContent from "./loginContent";
export default {
	name: "loginPage",
	components: {
		loginContent
	},
	data() {
		return {
			templateList: [
				{ label: "模版1", value: 1 },
				{ label: "模版2", value: 2 },
				{ label: "模版3", value: 3 },
				{ label: "模版4", value: 4 },
				{ label: "模版5", value: 5 },
				{ label: "模版6", value: 6 }
			],
			currenTemplate: 1
		};
	},
	created() {
		this.settingRem();
		this.initCurrenTemplate();
	},
	computed: {
		currenTemplateComponent() {
			const { currenTemplate } = this;
			return () => import(`./template${currenTemplate}`);
		},
		bg() {
			const { currenTemplate } = this;
			const bgMap = {
				1: "https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/0efb949497bb6242278fc67dd058cd48ff79ef89.jpg",
				2: "https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/1f2d5142dc1c1f46b9ff5274f9bdc2f7ce64256e.jpg",
				3: "https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/eebbf12ef085bc6718d99e0da84c5beba6319434.jpg",
				4: "https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/71f15707345ab7ad16fa699a4f8f4c2700b90ce0.jpg",
				5: "https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/16da22dd7cef8d3eea1e9bdc180a81f9a0885bf7.jpg",
				6: "https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/274b069c1eced8458c4ce3a000195fdcf80dd375.jpg"
			};
			return `url(${bgMap[currenTemplate]})`;
		}
	},
	methods: {
		resetForm() {
			this.$refs.loginContent.resetForm();
		},
		settingRem() {
			let docEle = document.documentElement,
				resizeEvt =
					"orientationchange" in window ? "orientationchange" : "resize",
				resizeFun = () => {
					let clientWidth = docEle.clientWidth;
					if (!clientWidth) return;
					docEle.style.fontSize = 100 * (clientWidth / 1920) + "px";
				};
			if (!document.addEventListener) return;
			window.addEventListener(resizeEvt, resizeFun, false);
			window.addEventListener("DOMContentLoaded", resizeFun, false);
			resizeFun();
		},
		selectChange(value) {
			window.localStorage.setItem("currenTemplate", value);
		},
		initCurrenTemplate() {
			const currenTemplate = +window.localStorage.getItem("currenTemplate");
			this.currenTemplate = currenTemplate || 1;
		}
	}
};
</script>

<style lang='scss' scoped>
@function pxtorem($value) {
	@return ($value/100) + rem;
}
.template-login {
	position: relative;
	width: 100vw;
	height: 100vh;
	background-size: cover;
	background-repeat: no-repeat;
	overflow: hidden;

	.logo {
		position: absolute;
		width: pxtorem(227);
		height: pxtorem(152);
		top: pxtorem(60);
		left: pxtorem(70);
		z-index: 2;
		user-select: none;
	}

	.option-group {
		position: absolute;
		bottom: pxtorem(86);
		right: 0;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			width: pxtorem(182);
			height: pxtorem(61);
			font-size: pxtorem(24);
			color: #2e3954;
			background: #ffffff;
			border-radius: pxtorem(5);
			cursor: pointer;

			.icon {
				width: pxtorem(33);
				height: pxtorem(37);
				margin-right: pxtorem(12);
			}
		}
	}

	.welcome {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		top: pxtorem(400);
		left: pxtorem(70);
		height: pxtorem(160);
		line-height: 1;
		padding: pxtorem(10) 0 pxtorem(10) pxtorem(50);
		margin-left: pxtorem(20);
		border-left: 3px solid #ffffff;
		color: #fff;
		z-index: 2;

		.line1 {
			font-size: pxtorem(60);
			letter-spacing: pxtorem(4);
		}

		.line2 {
			font-size: pxtorem(40);
			letter-spacing: pxtorem(10);
		}
	}
}
</style>