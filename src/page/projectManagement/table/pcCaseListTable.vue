<template>
  <div class="table_container">
    <el-table
      v-loading="loading"
      :data="tableData"
      :height="tableHeight"
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
            @change="changeSwitch(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" width="80" prop="id"></el-table-column>
      <el-table-column label="分类名称" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type_name" label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name ? scope.row.type_name : scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="idFlag" prop="address" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="update_time" sortable label="更新时间" align="center" width="170">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ Date.format(scope.row.update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            icon="edit"
            size="mini"
            @click="lookCaseListStatus(scope.row,dialogTitle = '编辑案例列表')"
          >编辑</el-button>
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
import { mapGetters } from "vuex";
import { getCaseType } from "@/api/caseType";
import { caseList } from "@/api/projectManagement";

export default {
  name: "caseListDialog",
  data() {
    return {
      isVisible: this.isShow,
      ruleForm: {
        type_name: "",
        update_time: "",
        type: "",
        enable: true,
        suffix: "",
        directory: "",
        url: "",
        base64Details: []
      },
      form_rules: {
        type: [{ required: true, message: "分类不能为空", trigger: "change" }],
        type_name: [
          { required: true, message: "案例名称不能为空", trigger: "blur" }
        ]
        // imageUrl:[
        //   { required: true, message: "案例图不能为空", trigger: "change" }
        // ]
      },
      startStop: true,
      imageUrl: "",
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      isClear: false,
      caseOptions: [],
      staticNumber: 0,
      ClassificationStatusItems: [
        {
          name: "默认"
        },
        {
          name: "自定义"
        }
      ],
      isCanSelectAddress: true,
      dialogImageUrl: "",
      dialogVisible: false,
      file: "",
      fileName: "",
      iconBase64: "",
      files: "",
      fileNames: "",
      fileList: [],
      caseFileList: [],
      i: 0,
      deleteImg: [],
      addImg: []
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object
  },
  components: {
    ...mapGetters(["systemType"])
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.dialogRow, "dialogRow");

    this.imageUrl = this.noBaseUrlhandleSmImgUrl(
      this.dialogRow.type_name,
      this.dialogRow.suffix,
      this.dialogRow.directory
    );

    if (this.dialogRow.type_name_details_num > 0) {
      this.spliceImgsUrl(
        this.dialogRow.type_name_details_num,
        this.dialogRow.suffix,
        this.dialogRow.directory,
        this.dialogRow.type_name
      );
    }

    console.log(this.caseFileList, "this.caseFileList");

    if (this.dialogRow.title === "添加网站案例") {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }

    this.getCaseTypeList();
  },
  methods: {
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
          this.ruleForm.pid = "pc"; // 系统类型
          this.ruleForm.directory = `mg/${this.ruleForm.type}`; // 存放文件目录(app,logo...)

          delete form.title;

          if (this.dialogRow.title === "添加网站案例") {
            this.ruleForm.opr = "add";
            this.showLoading();
            this.file
              ? this.iconToBase64(this.file)
              : (this.ruleForm.base64Case = "");

            this.fileList.map(item => {
              this.imageToBase64(item.raw);
            });

            setTimeout(() => {
              caseList(form).then(res => {
                this.message("新增案例列表成功");
                this.hideLoading();
                this.$refs["form"].resetFields();
                this.isVisible = false;
                this.$emit("getCaseList");
              });
            }, 500);
          } else {
            this.ruleForm.opr = "update";
            this.showLoading();

            this.file
              ? this.iconToBase64(this.file)
              : (this.ruleForm.base64Case = "");

            this.ruleForm.base64Details = [];

            // 把新上传的图片放入数组
            this.fileList.forEach(i => {
              if (i.raw) {
                this.addImg.push(i);
              }
            });

            this.addImg.map(item => {
              this.imageToBase64(item.raw);
            });

            console.log(this.ruleForm.base64Details, "base64Details");

            setTimeout(() => {
              caseList(form).then(res => {
                this.message("修改案例列表成功");
                this.hideLoading();
                this.$refs["form"].resetFields();
                this.isVisible = false;
                this.$emit("getCaseList");
              });
            }, 500);
          }
        }
      });
    },

    // 地址是否自定义
    getClassificationStatus(index) {
      this.staticNumber = index;
      if (index === 1) {
        this.isCanSelectAddress = false;
      } else {
        this.isCanSelectAddress = true;
      }
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

    // 案例图二进制转base64
    iconToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log("cion file 转 base64结果：" + reader.result);
        this.ruleForm.base64Case = reader.result.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    // 案例详情图二进制转base64
    imageToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log("img file 转 base64结果：" + reader.result);
        console.log(this.ruleForm.base64Details, "base64Details");

        this.ruleForm.base64Details.push(
          reader.result.replace(/^data:image\/\w+;base64,/, "")
        );
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    // 拼接案例图片
    noBaseUrlhandleSmImgUrl(name, suffix, directory) {
      if (name && suffix && directory) {
        return `/zngl/fileOperate?name=${name}&suffix=${suffix}&directory=${directory}`;
      }
    },

    // 拼接案例详情图片
    spliceImgsUrl(type_name_details_num, suffix, directory, type_name) {
      console.log(suffix, type_name_details_num);
      for (this.i = 0; this.i < type_name_details_num; this.i++) {
        this.caseFileList.push({
          name: type_name,
          url: `/zngl/fileOperate?name=${this.i +
            1}&suffix=${suffix}&directory=${directory}/${type_name}`
        });
      }
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
