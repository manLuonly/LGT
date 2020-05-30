<template>
  <div class="date-picker inline-block">
    <div class="block">
      <el-date-picker
        v-model="date"
        type="daterange"
        size="large"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="disabledTodayPickerOption"
        @change="changeDate"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: "datePicker",

  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      disabledTodayPickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      date: ""
    };
  },

  methods: {
    changeDate(date) {
      this.$emit("changeDate", date);
    }
  }
};
</script>

<style lang='less' scoped>
.date-picker {
  margin: 0 10px;
}
</style>