<template>
  <div class="table_container">
    <el-table
      v-loading.lock="table.loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="table.data.data"
      :height="table.tableHeight"
      :default-sort="{prop: 'update_time', order: 'descending'}"
      style="width: 100%"
      align="center"
    >
      <el-table-column align="center" label="启停" width="60">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" align="center" width="80"></el-table-column>
      <el-table-column prop="type" label="分类名称" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="img" label="封面图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 50px; cursor:pointer"
            :src="scope.row.img"
            fit="cover"
            lazy
            :preview-src-list="imgList"
            @click="addImg(scope.row)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="details_imgs" label="详情图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 50px; cursor:pointer"
            :src="scope.row.details_imgs[0]"
            fit="cover"
            lazy
            :preview-src-list="scope.row.details_imgs"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="details_total" label="详情图数量" align="center"></el-table-column>
      <el-table-column prop="update_time" sortable label="更新时间" align="center" width="170">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ Date.format(scope.row.update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button icon="edit" size="mini" @click="lookCaseListStatus(scope.row)">编辑</el-button>
          <el-button type="danger" icon="delete" size="mini" @click="deleteCaeList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pageTotal="table.data.count"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteH5TypeList } from "@/api/projectManagement";

export default {
  name: "caseListDialog",
  data() {
    return {
      caseTable: {},
      imgList: [],
      pageTotal: 0,
    };
  },
  props: {
    table: Object,
    default: () => {},
  },
  mounted() {
    this.$emit("changeLoading", false);
  },
  methods: {
    // 编辑操作方法
    lookCaseStatus(row) {
      this.$emit("showCaseDialog", row);
      this.$store.commit("SET_ADDOREDIT", "edit");
    },
    //
    addImg(row) {
      this.imgList = [];
      this.imgList.push(row.img);
    },
    // 上下分页
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    // 编辑操作方法
    lookCaseListStatus(row) {
      this.$emit("showCaseDialog", row);
      this.$store.commit("SET_ADDOREDIT", "edit");
    },
    // 删除数据
    deleteCaeList(row) {
      let id = row.id;
      this.alertMsgBox()
        .then(() => {
          deleteH5TypeList(id).then((res) => {
            if (res.code === 0) {
              this.message(res.msg);
              this.$emit("getCaseList");
            }
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  .active {
    border-radius: 3px;
    margin: 5px;
    color: #fff;
    background-color: rgb(102, 177, 255);
  }
  /deep/ .el-form {
    .avatar-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409eff;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
      }
      .avatar {
        width: 148px;
        height: 148px;
        display: block;
      }
    }

    // 文本域高度
    .el-textarea__inner {
      height: 150px;
    }
  }
}
</style>
