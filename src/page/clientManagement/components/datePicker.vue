<template>
  <div class="date-picker">
    <div class="block">
      <el-date-picker
        v-model="date"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        size="large"
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
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      date: ""
    };
  },

  methods: {}
};
</script>

<style lang='less' scoped>
.date-picker {
    display: inline-block;
    margin: 0 50px;
}
</style>