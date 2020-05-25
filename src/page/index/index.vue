<template>
  <div class="index">
    <div class="show_info_box">
      <ul>
        <li v-for="(item) in infoForm" :key="item.tiele">
          <div class="left">
            <span class="title">{{ item.title}}</span>
          </div>
          <div class="right">
            <div class="right_text_box">
              <span class="text">{{ item.right.text }}:</span>
              <span class="number" @click="goDetails(item.title)">{{ item.right.number }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pieChart from "cps/echarts/pieChart"; // 用户投资类型 饼状图
import lineChart from "cps/echarts/lineChart"; // 用户投资类型 折线图

export default {
  data() {
    return {
      infoForm: [
        {
          title: "案",
          right: {
            text: "案例总数",
            number: 100
          }
        },
        {
          title: "言",
          right: {
            text: "客户留言",
            number: 10
          }
        },
        {
          title: "定",
          right: {
            text: "成交订单",
            number: 20
          }
        },
        {
          title: "点",
          right: {
            text: "点击案例",
            number: 80
          }
        },
        {
          title: "客",
          right: {
            text: "客户总数",
            number: 17
          }
        },
        {
          title: "文",
          right: {
            text: "文件总数",
            number: 88
          }
        }
      ]
    };
  },
  components: {
    pieChart,
    lineChart
  },
  created() {},
  mounted() {},
  methods: {
    goDetails(title) {
      console.log(title, "title");
      switch (title) {
        case "案":
          this.$router.push({ path: "/projectManagement/classificationList" });
          break;
        case "点":
          this.$router.push({ path: "/projectManagement/classificationList" });
          break;
        case "言":
          this.$router.push({ path: "/clientManagement/userInfo" });
          break;
        case "客":
          this.$router.push({ path: "/clientManagement/userInfo" });
          break;
        case "定":
          this.$router.push({ path: "/orderManagement/orderDetails" });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  .data_section {
    margin: 20px;
    border-radius: 2px;
    .row_list {
      margin-bottom: 20px;
      .row_base {
        padding: 10px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 6px;
        height: 120px;
      }
    }
    .order_list {
      .orderArea {
        width: 100%;
        height: 300px;
        background: #fff !important;
        border-radius: 6px;
        box-sizing: border-box;
        overflow: hidden;
      }
      .orderbarArea {
        height: 370px;
      }
    }
  }
  // .show_info_box {
  //   ul > li {
  //     width: 20%;
  //     height: 100px;
  //     margin: 0 28px;
  //     display: inline-block;
  //     background-color: #fff;
  //     img {
  //       display: inline-block;
  //       margin: 20px;
  //       line-height: 50px;
  //     }
  //     div {
  //       display: inline-block;
  //       span {
  //         display: block;
  //         margin: 15px 30px;
  //       }
  //       .number {
  //         font-size: 30px;
  //       }
  //     }
  //   }
  // }
  .show_info_box {
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        width: 30%;
        height: 70px;
        margin: 20px 10px;
        background-color: rgb(47, 114, 184);
        .left {
          position: relative;
          width: 30%;
          height: 100%;
          color: #fff;
          .title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 25px;
          }
        }
        .right {
          position: relative;
          width: 70%;
          height: 100%;
          background-color: #fff;
          .right_text_box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .text {
              margin-right: 2px;
              font-size: 18px;
            }
            .number {
              font-size: 24px;
              color: rgb(47, 114, 184);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
