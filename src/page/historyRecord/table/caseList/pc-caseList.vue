<template>
  <div class="table_container">
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
            disabled
            v-model="scope.row.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" align="center" width="80"></el-table-column>
      <el-table-column label="分类名称" align="center">
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
      <el-table-column prop="operation" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button icon="edit" size="mini" @click="restoreRecording(scope.row)">恢复</el-button>
          <el-button type="danger" icon="delete" size="mini" @click="deleteCaeList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pageTotal="pageTotal"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>

<script>
import { listPage, restorePc, deleteTypeList } from "@/api/projectManagement";
export default {
  name: "uploadFile",

  data() {
    return {
      loading: true,
      table: [],
      tableHeight: "",
      paginationForm: {
        pageNum: 1,
        pageSize: 20,
        system_type: "pc",
        type: -1,
        search_name: "",
        delete_status: 1,
      },
      imgList: [],
      pageTotal: 0,
    };
  },
  props: {
    searchVal: {
      type: String,
      default: "",
    },
  },
  mounted() {
    console.log(this.searchVal,'searchVal');
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
      console.log("get");
      let form = this.paginationForm;
      listPage(form)
        .then((res) => {
          this.table = res.data || [];
          this.pageTotal = res.count;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 上下分页
    handleCurrentChange(val) {
      this.paginationForm.pageNum = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.paginationForm.pageSize = val;
      this.getDataList();
    },
    addImg(row) {
      this.imgList = [];
      this.imgList.push(row.img);
    },
    // 恢复历史记录
    restoreRecording(row) {
      let id = row.id;
      this.alertMsgBox("此操作将恢复该数据,是否继续?")
        .then(() => {
          restorePc(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
    // 删除数据
    deleteCaeList(row) {
      let id = row.id;
      this.alertMsgBox("删除后无法恢复,是否继续?")
        .then(() => {
          deleteTypeList(id).then((res) => {
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

<style lang='scss' scoped>
</style>