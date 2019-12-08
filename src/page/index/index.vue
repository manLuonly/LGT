<template>
  <div class="index">
    <div class="show_info_box">
      <ul>
        <li class="leave_msg">
          <div>
            <img src="../../assets/img/leave_msg.png" />
          </div>
          <div>
            <span>留言消息</span>
            <span class="number">39</span>
          </div>
        </li>
        <li class="add_msg">
          <div>
            <img src="../../assets/img/add_msg.png" />
          </div>
          <div>
            <span>新增留言</span>
            <span class="number">39</span>
          </div>
        </li>
        <li class="total_user_num">
          <div>
            <img src="../../assets/img/user_num.png" />
          </div>
          <div>
            <span>总用户数</span>
            <span class="number">1000</span>
          </div>
        </li>
        <li class="case_total_num">
          <div>
            <img src="../../assets/img/case_total_num.png" />
          </div>
          <div>
            <span>案例总数</span>
            <span class="number">1260</span>
          </div>
        </li>
      </ul>
    </div>
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
          <line-chart title="客户点击项目数量统计" />
        </el-col>

        <el-col :span="11">
          <lineChart
            title="客户月份数量统计"
            :xData="[1,2,3,4,5,6,7,8,9,10,11,12]"
            :yData="[10,20,30,40,50,60,70,80,90,100,110,120]"
          />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import pieChart from "cps/echarts/pieChart"; // 用户投资类型 饼状图
import lineChart from "cps/echarts/lineChart"; // 用户投资类型 折线图

export default {
  data() {
    return {};
  },
  components: {
    pieChart,
    lineChart
  },
  created() {},
  mounted() {},
  methods: {}
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
  .show_info_box {
    ul > li {
      width: 20%;
      height: 100px;
      margin: 0 28px;
      display: inline-block;
      background-color: #fff;
      img {
        display: inline-block;
        margin: 20px;
        line-height: 50px;
      }
      div {
        display: inline-block;
        span {
          display: block;
          margin: 15px 30px;
        }
        .number {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
