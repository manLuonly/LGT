<template>
  <div class="upload-file">
    <upload-file-dialog
      v-if="uploadFile.isShow"
      :isShow="uploadFile.isShow"
      @getCaseList="getDataList"
      @closeDialog="hideDialog"
    ></upload-file-dialog>

    <el-button
      type="primary"
      size="large"
      class="add-case"
      style="margin-bottom: 15px;"
      @click="showDialog()"
    >上传文件</el-button>

    <search
      :customizePlaceholder="customizePlaceholder"
      @searchUserList="searchUserList($event)"
      ref="search"
    ></search>

    <div class="table_container">
      <el-table :data="table" :height="tableHeight" style="width: 100%" align="center">
        <el-table-column prop="id" label="id" align="center"></el-table-column>
        <el-table-column prop="name" label="文件名" align="center"></el-table-column>
        <el-table-column prop="url" label="文件链接" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="文件类型" align="center" :formatter="fileType"></el-table-column>
        <el-table-column prop="file_size" label="文件大小" align="center"></el-table-column>
        <el-table-column prop="file_type" label="文件格式" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.file_type.toUpperCase() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button icon="edit" size="mini" @click="lookCase(scope.row)">预览</el-button>
            <el-button type="danger" icon="delete" size="mini" @click="deleteCase(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :pageTotal="pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { historyRecord } from "@/api/historyRecord";
import { listPage, deleteFile } from "@/api/uploadFile";
import uploadFileDialog from "./Dialog/uploadFileDialog";

export default {
  name: "uploadFile",
  data() {
    return {
      table: [],
      tableHeight: 0,
      uploadFile: {
        isShow: false,
      },
      paginationForm: {
        pageNum: 1,
        pageSize: 20,
        search_name: "",
      },
      pageTotal: 0,
      customizePlaceholder: "请输入文件名",
    };
  },
  components: {
    uploadFileDialog,
  },
  computed: {},
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
    // 获取数据
    getDataList() {
      const form = this.paginationForm;
      listPage(form).then((res) => {
        this.table = res.data || [];
        this.pageTotal = res.count;
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
    // 删除记录
    deleteCase(row) {
      let id = row.id;
      this.alertMsgBox()
        .then(() => {
          deleteFile(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.pid = val;
      this.getDataList();
    },
    // 获取搜索值
    searchUserList(searchVal) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.search_name = searchVal;
      this.getDataList();
    },
    // 显示dialog
    showDialog() {
      this.uploadFile.isShow = true;
    },
    // 隐藏dialog
    hideDialog() {
      this.uploadFile.isShow = false;
    },
    // 预览
    lookCase(row) {
      let url = row.url;
      window.open(url);
    },
    // 格式化文件类型
    fileType(row) {
      let type = row.type;
      if (type === 1) {
        return "文件";
      } else if (type === 2) {
        return "图片";
      } else {
        return "未知";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.upload-file {
  padding: 20px;
  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }
}
</style>