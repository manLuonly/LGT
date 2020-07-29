<template>
  <div class="upload-file">
    <upload-file-dialog
      v-if="uploadFile.isShow"
      :isShow="uploadFile.isShow"
      @getCaseList="getDataList"
      @closeDialog="hideDialog"
    ></upload-file-dialog>

    <el-dialog
      :visible.sync="nameDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      width="50%"
    >
      <el-input v-model="name" placeholder="请输入文件名称" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitName">确 定</el-button>
        <el-button @click="nameDialog = false">取 消</el-button>
      </span>
    </el-dialog>

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
      <el-table
        :data="table"
        :height="tableHeight"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :default-sort="{prop: 'create_time', order: 'descending'}"
        style="width: 100%"
        align="center"
      >
        <el-table-column prop="id" label="id" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="文件名" align="center"></el-table-column>
        <el-table-column prop="url" label="文件链接" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="文件类型" align="center" :formatter="fileType" width="100"></el-table-column>
        <el-table-column prop="file_size" label="文件大小" align="center" width="100"></el-table-column>
        <el-table-column prop="file_type" label="文件格式" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.file_type.toUpperCase() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" sortable label="更新日期" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ Date.format(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button icon="edit" size="mini" @click="lookCase(scope.row)">预览</el-button>
            <el-button icon="edit" size="mini" @click="showEditNameDialog(scope.row)">编辑</el-button>
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
import { listPage, deleteFile, edit } from "@/api/uploadFile";
import uploadFileDialog from "./Dialog/uploadFileDialog";

export default {
  name: "uploadFile",
  data() {
    return {
      table: [],
      loading: true,
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
      id: "",
      name: "",
      nameDialog: false,
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
    // 编辑名字dialog
    showEditNameDialog(row) {
      this.id = row.id;
      this.name = row.name;
      this.nameDialog = true;
    },
    // 发送文件新名称
    submitName() {
      let form = {
        id: this.id,
        name: this.name,
      };
      if (!this.name) {
        this.message("请输入文件名称","error");
        return;
      }
      edit(form).then((res) => {
        this.message("修改成功");
        this.nameDialog = false;
        this.getDataList();
      });
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