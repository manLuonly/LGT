<template>
  <div class="table_container">
    <el-table
      v-loading="table.loading"
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
      <el-table-column label="排序" align="center" width="80" prop="id"></el-table-column>
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
import { getCaseType } from "@/api/caseType";
import { caseList } from "@/api/projectManagement";

export default {
  name: "caseListDialog",
  data() {
    return {
      caseTable: {},
      imgList: [],
      pageTotal: 0
    };
  },
  props: {
    table: Object,
    default: () => {}
  },
  components: {
    ...mapGetters(["systemType", "status"])
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
    getCaseTypeList() {
      const caseForm = {
        pid: this.systemType,
        pageNum: 1,
        pageSize: 20
      };
      getCaseType(caseForm).then(res => {
        if (res.code === 0) {
          this.caseOptions = res.data.map(i => i) || [];
        }
      });
    },

    successImg(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeUploadIcon(file) {
      this.ruleForm.suffix = file.type.split("/")[1];
      this.file = file;
      const isImg =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isImg) {
        this.$message.error("只能上传图片格式为jpg,jpeg,png!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      this.fileName = file.name;
      return isImg && isLt5M;
    },

    beforeUploadImg(file) {
      console.log(file, "file");

      this.files = file;
      const isImg =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isImg) {
        this.$message.error("只能上传图片格式为jpg,jpeg,png!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      this.fileNames = file.name;
      return isImg && isLt5M;
    },

    // 图片上传成功
    uploadSuccess(res, file, fileList) {
      console.log(fileList, "fileList");

      this.fileList = fileList;
    },

    //表单提交
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const form = this.ruleForm;

          if (this.status === "add") {
            caseList(form).then(res => {
              this.message("新增案例列表成功");
              this.hideLoading();
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getCaseList");
            });
          } else {
            this.showLoading();

            caseList(form).then(res => {
              this.message("修改案例列表成功");
              this.hideLoading();
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getCaseList");
            });
          }
        }
      });
    },

    removeImgList(file, fileList) {
      this.deleteImg.push(file);
      console.log("现在删除的是", file, "目前数据", fileList);
      console.log("已经删除的是", this.deleteImg);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 关闭dialog
    closeDialog() {
      this.$emit("closeDialog");
    },

    // 显示加载框
    showLoading() {
      const loading = this.$loading({
        lock: true,
        text: "上传中,请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      return loading;
    },

    // 隐藏加载框
    hideLoading() {
      let loading = this.showLoading();
      loading.close();
    },

    //
    addImg(row) {
      this.imgList = [];
      this.imgList.push(row.img);
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
    // 编辑操作方法
    lookCaseListStatus(row) {
      this.$emit("showCaseDialog", row);
      this.$store.commit("SET_ADDOREDIT", "edit");
    },
    // 删除数据
    deleteCaeList(row) {
      let id = row.id;
      this.alertMsgBox("此操作将删除该数据,是否继续?")
        .then(() => {
          deleteType(id).then(res => {
            if (res.code === 0) {
              this.message(res.msg);
              this.$emit("getCaseList");
            }
          });
        })
        .catch(err => {
          this.message("已取消", "info");
        });
    }
  }
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
