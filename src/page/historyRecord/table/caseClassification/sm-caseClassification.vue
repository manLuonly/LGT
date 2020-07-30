<template>
  <div class="table_container">
    <!--  如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值 -->
    <el-table
      v-loading.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="table"
      :height="Number(tableHeight)"
      :default-sort="{prop: 'update_time', order: 'descending'}"
      style="width: 100%"
      align="center"
    >
      <el-table-column align="center" label="启停" width="60">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="icon" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 20px; height: 20px; cursor:pointer"
            :src="scope.row.icon_img"
            fit="cover"
            lazy
            :preview-src-list="iconImgList"
            @click="addIconImg(scope.row)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="封面图" align="center" width="130">
        <template slot-scope="scope">
          <el-image
            style="width: 130px; height: 50px; cursor:pointer"
            :src="scope.row.cover_img"
            fit="cover"
            :preview-src-list="coveriImgList"
            @click="addCoveriImg(scope.row)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="list_total_num" label="案例总条数" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip width="120" label="描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.details }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="update_time" label="更新时间" align="center" sortable>
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span>{{ Date.format(scope.row.update_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="operation" align="center" label="操作">
        <template slot-scope="scope">
          <el-button icon="edit" size="mini" @click="restoreRecording(scope.row)">恢复</el-button>
          <el-button type="danger" icon="delete" size="mini" @click="deleteCase(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listAll, restoreMini, deleteH5Type } from "@/api/caseType";
export default {
  name: "uploadFile",

  data() {
    return {
      loading: true,
      table: [],
      tableHeight: "",
      paginationForm: {
        system_type: "mini",
        delete_status: 1,
      },
      iconImgList: [],
      coveriImgList: [],
      pageTotal: 0,
    };
  },
  mounted() {
    this.getDataList();
    this.setTableHeight();
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 250;
      });
    },
    getDataList() {
      let form = this.paginationForm;
      listAll(form)
        .then((res) => {
          this.table = res.data || [];
          this.pageTotal = res.count;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addIconImg(row) {
      this.iconImgList = [];
      this.iconImgList.push(row.icon_img);
    },
    addCoveriImg(row) {
      this.coveriImgList = [];
      this.coveriImgList.push(row.cover_img);
    },
    // 恢复历史记录
    restoreRecording(row) {
      let id = row.id;
      this.alertMsgBox("此操作将恢复该数据,是否继续?")
        .then(() => {
          restoreMini(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
    // 删除数据
    deleteCase(row) {
      let id = row.id;
      this.alertMsgBox("删除后无法恢复,是否继续?")
        .then(() => {
          deleteH5Type(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
  },
};
</script>

<style lang='less' scoped>
</style>