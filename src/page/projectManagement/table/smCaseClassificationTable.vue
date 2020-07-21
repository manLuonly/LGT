<template>
  <div class="table_container">
    <el-table
      v-loading="table.loading"
      :data="table.table"
      :height="table.tableHeight"
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
      <el-table-column label="排序" align="center">
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
      <el-table-column label="封面图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 50px; cursor:pointer"
            :src="scope.row.cover_img"
            fit="cover"
            lazy
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
          <el-button icon="edit" size="mini" @click="lookCaseStatus(scope.row);">编辑</el-button>
          <el-button type="danger" icon="delete" size="mini" @click="deleteCase(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteH5Type } from "@/api/caseType";

export default {
  data() {
    return {
      iconImgList: [],
      coveriImgList: []
    };
  },
  props: {
    table: Object,
    default: () => {}
  },
  computed: {},
  mounted() {
    this.$emit("changeLoading", false);
  },
  methods: {
    addIconImg(row) {
      this.iconImgList = [];
      this.iconImgList.push(row.icon_img);
    },
    addCoveriImg(row) {
      this.coveriImgList = [];
      this.coveriImgList.push(row.cover_img);
    },
    // 编辑操作方法
    lookCaseStatus(row) {
      this.$emit("showCaseDialog", row);
      this.$store.commit("SET_ADDOREDIT", "edit");
      this.coveriImgList.push(row.cover_img);
    },
    // 删除数据
    deleteCase(row) {
      let id = row.id;
      this.alertMsgBox("此操作将删除该数据,是否继续?")
        .then(() => {
          deleteH5Type(id).then(res => {
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
</style>
