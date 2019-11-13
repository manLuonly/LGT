<template>
	 <div class='footer'>
        <p class="intro rflex">
            <span>小爱Admin</span>
            <a :href='github' target="_blank">
               <icon-svg icon-class="iconGithub" />
            </a>
        </p>
        <p class="beian">鄂ICP备18001612号</p>
    </div>
</template>


<script>
    import { github } from "@/utils/env";

export default {
    name: "footerNav",
	data(){
		return {
            github:github
		}
	},
	methods:{

	}
}
</script>

<style lang="less">
	.footer{
        width: 100%;
        padding: 10px 0;
        font-size:12px;
        text-align: center;
        background: #fff;
        p{
            line-height: 30px;
        }
        .intro{
            width: 240px;
            margin: 0 auto;
            justify-content: space-around;
            align-items: center;
        }
    }
</style>


