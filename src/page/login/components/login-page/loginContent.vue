<template>
	<div :class="'login-content' + currenTemplate">
		<div class="title" v-show="currenTemplate == 1 || currenTemplate == 5|| currenTemplate == 6">欢迎回来！</div>
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item prop="username">
				<el-input
					placeholder="请输入账号"
					clearable
					v-model="form.username"
					maxlength="20"
					@keyup.enter.native="submitForm"
				>
					<i slot="prefix" class="el-icon-user prefix_icon"></i>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					placeholder="请输入密码"
					clearable
					v-model="form.password"
					show-password
					maxlength="20"
					@keyup.enter.native="submitForm"
				>
					<i slot="prefix" class="el-icon-lock prefix_icon"></i>
				</el-input>
			</el-form-item>

			<div>
				忘记密码
				<tip content="请联系管理员找回密码" />
			</div>
			<el-button type="primary" @click="submitForm" class="submit_btn" :loading="$attrs.loading">登录</el-button>
		</el-form>
	</div>
</template>

<script>
import tip from "../tip";
export default {
	name: "loginContent",
	props: ["currenTemplate"],
	components: {
		tip
	},
	data() {
		return {
			form: {
				username: "",
				password: ""
			},
			rules: {
				username: [
					{ required: true, message: "请输入账号", trigger: "blur" },
					{
						max: 20,
						message: "长度在 3 到 5 个字符",
						trigger: "blur"
					}
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					{
						min: 6,
						max: 20,
						message: "密码长度为 6 ~ 20！",
						trigger: "blur"
					}
				]
			}
		};
	},
	methods: {
		resetForm() {
			this.$refs.form.resetFields();
		},
		submitForm() {
			this.$refs.form.validate(valid => {
				if (valid) {
					this.$emit("submit");
				}
			});
		}
	}
};
</script>

<style lang='scss' scoped>
@import "./content.scss";
</style>