<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="addFundDialog.title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog"
    center
  >
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="form_rules"
        :label-width="dialog.formLabelWidth"
        style="margin:10px;width:auto;"
      >
        <el-form-item prop="username" label="启停">
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number
            v-model="form.caseSortNum"
            @change="handleCaseSortNumChange"
            :min="0"
            :max="99999"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item prop="jumpAddress" label="上级分类">
          <span
            v-for="(item,index) in ClassificationStatusItems"
            :key="index"
            @click="getClassificationStatus(index)"
            :class="{active:index===staticNumber}"
          >{{ item.name }}</span>
          <el-input v-model="form.jumpAddress" :disabled="isCanSelectAddress"></el-input>
        </el-form-item>

        <el-form-item prop="updateTime" label="案例名称">
          <el-input v-model="form.updateTime"></el-input>
        </el-form-item>

        <el-form-item prop="accoutCash" label="缩略图">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item prop="remarks" label="图文">
          <editor-bar v-model="form.remarks" :isClear="isClear"></editor-bar>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false">取 消</el-button>
      <el-button type="primary" @click='onSubmit("form")'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { addMoney, updateMoney } from "@/api/money";
import AreaJson from "@/assets/datas/area.json";
import editorBar from "./wangEditor";

export default {
  name: "addFundDialogs",
  data() {
    return {
      areaData: [],
      isVisible: this.isShow,
      form: {
        caseSortNum: 0,
        jumpAddress: "www.baidu.com",
        updateTime: "",
        remarks: ""
      },
      form_rules: {
        jumpAddress: [
          { required: true, message: "跳转地址不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        remarks: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      },
      value: true,
      imageUrl: "",
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      isClear: false,
      staticNumber: 0,
      ClassificationStatusItems: [
        {
          name: "默认"
        },
        {
          name: "自定义"
        }
      ],
      isCanSelectAddress: true
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object
  },
   components: {
    editorBar
  },
  computed: {
    ...mapGetters(["addFundDialog"])
  },
  created() {
    this.areaData = AreaJson;
  },
  mounted() {
    if (this.addFundDialog.type === "edit") {
      // this.form = this.dialogRow;
      console.log(this.dialogRow, "000");
      this.form = {
        classificationName: this.dialogRow.type,
        jumpAddress: this.dialogRow.address,
        updateTime: this.dialogRow.createTime,
        remarks: ""
      };
      // this.form.incomePayType = this.dialogRow.incomePayType.toString();
      // this.form.address = ["120000", "120200", "120223"]
    } else {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var item of opt) {
          if (item.value == value) {
            opt = item.children;
            return item.label;
          }
        }
        return null;
      });
    },
    handleChange(value) {
      console.log([...value]); // ["120000", "120200", "120223"]
      this.form.address = [...value];
      let vals = this.getCascaderObj([...value], this.areaData); // arr
      this.form.tableAddress = vals.join(",").replace(/,/g, "");
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    //表单提交
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          let formData = this[form];
          const para = Object.assign({}, formData);
          console.log(para);
          // edit
          if (this.addFundDialog.type === "edit") {
            updateMoney(para).then(res => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getFundList");
            });
          } else {
            // add
            addMoney(para).then(res => {
              this.$message({
                message: "新增成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getFundList");
            });
          }
        }
      });
    },
    handleCaseSortNumChange(val) {
      console.log("案例排序发生了变化" + val);
    },
    // 地址是否自定义
    getClassificationStatus(index) {
      this.staticNumber = index;
      if (index === 1) {
        this.isCanSelectAddress = false;
      } else {
        this.isCanSelectAddress = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.form {
  .active {
    border-radius: 3px;
    margin: 5px;
    color: #fff;
    background-color: rgb(102, 177, 255);
  }
}
</style>
