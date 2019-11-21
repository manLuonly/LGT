<template>
  <div class="fillcontain">
    <div>
      <div class="button-group">
        <el-button type="primary" class="addCase" @click="addCase">添加案例</el-button>
        <el-button class="addCase" @click="getType('logo设计')">logo设计</el-button>
        <el-button class="addCase" @click="getType('画册设计')">画册设计</el-button>
        <el-button class="addCase" @click="getType('海报设计')">海报设计</el-button>
        <el-button class="addCase" @click="getType('网页设计')">网页设计</el-button>
        <el-button class="addCase" @click="getType('APP设计')">APP设计</el-button>
        <el-button class="addCase" @click="getType('小程序')">小程序</el-button>
      </div>
      <div class="search">
        <el-input class="search-input" placeholder="请输入名称" v-model="searchVal" clearable></el-input>
        <div class="search-button">
          <el-button icon="el-icon-search" size="medium"></el-button>
        </div>
      </div>
    </div>
    <div class="table_container">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        align="center"
        @select="selectTable"
        @select-all="selectAll"
      >
        <el-table-column v-if="idFlag" prop="id" label="id" align="center" width="180"></el-table-column>
        <el-table-column align="center" label="启停" width="60">
          <template slot-scope="scope">
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ table_index(scope.$index) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.username }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="idFlag" prop="address" label="分类名称" align="center"></el-table-column>
        <el-table-column prop="address" label="跳转地址" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.address" :disabled="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="更新时间" align="center" sortable width="170">
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button icon="edit" size="mini" @click="onEditMoney(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="mini"
              @click="onDeleteMoney(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :pageTotal="pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
      <addFundDialog
        v-if="addFundDialog.show"
        :isShow="addFundDialog.show"
        :dialogRow="addFundDialog.dialogRow"
        @getFundList="getMoneyList"
        @closeDialog="hideAddFundDialog"
      ></addFundDialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutils from "@/utils/mUtils";
import SearchItem from "./components/searchItem";
import AddFundDialog from "./components/addFundDialog";
import Pagination from "@/components/pagination";
import { getMoneyIncomePay, removeMoney, batchremoveMoney } from "@/api/money";

export default {
  data() {
    return {
      tableData: [],
      tableHeight: 0,
      loading: true,
      idFlag: false,
      isShow: false, // 是否显示资金modal,默认为false
      editid: "",
      rowIds: [],
      sortnum: 0,
      format_type_list: {
        0: "提现",
        1: "提现手续费",
        2: "提现锁定",
        3: "理财服务退出",
        4: "购买宜定盈",
        5: "充值",
        6: "优惠券",
        7: "充值礼券",
        8: "转账"
      },
      addFundDialog: {
        show: false,
        dialogRow: {}
      },
      incomePayData: {
        page: 1,
        limit: 20,
        name: ""
      },
      pageTotal: 0,
      // 用于列表筛选
      fields: {
        incomePayType: {
          filter: {
            list: [
              {
                text: "提现",
                value: 0
              },
              {
                text: "提现手续费",
                value: 1
              },
              {
                text: "提现锁定",
                value: 2
              },
              {
                text: "理财服务退出",
                value: 3
              },
              {
                text: "购买宜定盈",
                value: 4
              },
              {
                text: "充值",
                value: 5
              },
              {
                text: "优惠券",
                value: 6
              },
              {
                text: "充值礼券",
                value: 7
              },
              {
                text: "转账",
                value: 8
              }
            ],
            multiple: true
          }
        }
      },
      value: true,
      searchVal: "" // 搜索值
    };
  },
  components: {
    SearchItem,
    AddFundDialog,
    Pagination
  },
  computed: {
    ...mapGetters(["search"])
  },
  mounted() {
    this.getMoneyList();
  },
  methods: {
    setAddress(value) {},
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 300;
      });
    },
    // 获取资金列表数据
    getMoneyList() {
      const para = Object.assign({}, this.incomePayData, this.search);
      getMoneyIncomePay(para).then(res => {
        this.loading = false;
        this.pageTotal = res.data.total;
        this.tableData = res.data.moneyList;
      });
    },
    // 显示资金弹框
    showAddFundDialog(val) {
      this.$store.commit("SET_DIALOG_TITLE", val);
      this.addFundDialog.show = true;
    },
    hideAddFundDialog() {
      this.addFundDialog.show = false;
    },
    // 上下分页
    handleCurrentChange(val) {
      this.incomePayData.page = val;
      this.getMoneyList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.incomePayData.limit = val;
      this.getMoneyList();
    },
    getPay(val) {
      if (mutils.isInteger(val)) {
        return -val;
      } else {
        return val;
      }
    },
    /**
     * 格式化状态
     */
    formatterType(item) {
      const type = parseInt(item.incomePayType);
      return this.format_type_list[type];
    },
    filterType(value, item) {
      const type = parseInt(item.incomePayType);
      return this.format_type_list[value] == this.format_type_list[type];
    },
    // 编辑操作方法
    onEditMoney(row) {
      this.addFundDialog.dialogRow = { ...row };
      this.showAddFundDialog();
    },
    // 删除数据
    onDeleteMoney(row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          const para = { id: row.id };
          removeMoney(para).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getMoneyList();
          });
        })
        .catch(() => {});
    },
    onBatchDelMoney() {
      this.$confirm("确认批量删除记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          const ids = this.rowIds.map(item => item.id).toString();
          const para = { ids: ids };
          batchremoveMoney(para).then(res => {
            this.$message({
              message: "批量删除成功",
              type: "success"
            });
            this.getMoneyList();
          });
        })
        .catch(() => {});
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    selectTable(val, row) {
      this.setSearchBtn(val);
    },
    // 用户全选checkbox时触发该事件
    selectAll(val) {
      val.forEach(item => {
        this.rowIds.push(item.id);
      });
      this.setSearchBtn(val);
    },
    setSearchBtn(val) {
      let isFlag = true;
      if (val.length > 0) {
        isFlag = false;
      } else {
        isFlag = true;
      }
      this.$store.commit("SET_SEARCHBTN_DISABLED", isFlag);
    },
    // 添加序号
    table_index(index) {
      return (
        (this.incomePayData.page - 1) * this.incomePayData.limit + index + 1
      );
    },
    // 改变 Switch状态
    changeSwitch(val) {
      console.log(val);
    },
    // 添加案例
    addCase() {},
    // 获取数据类型
    getType(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
.table_container {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}
.el-dialog--small {
  width: 600px !important;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}
.addCase {
  height: 40px;
  margin-bottom: 15px;
}
.button-group {
  display: inline-block;
}
.search {
  display: inline-block;
  float: right;
  .search-input {
    display: inline-block;
    width: 217px;
    height: 40px;
    line-height: 40px;
    /deep/ .el-input__inner {
      height: 36px !important;
      line-height: 36px !important;
    }
  }
  .search-button {
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
}
// .fillcontain {
//   .search-input {
//     >>> .el-input__inner {
//       height: 36px !important;
//       line-height: 36px !important;
//     }
//   }
// }
</style>


