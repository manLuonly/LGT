
<template lang="html">
    <!-- <div id="wangeditor">
        <div ref="editorElem" style="text-align:left"></div>
    </div>   -->
    <div class="editor">
        <div ref="toolbar" class="toolbar"></div>
        <div ref="editor" class="text"></div>
    </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editorbar",
  data() {
    return {
      editor: null,
      info_: null
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear(val) {
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value(val) {
      this.editor.txt.html(val);
    }
  },
  mounted() {
    this.seteditor();
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);

      // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
      // this.editor.customConfig.uploadImgShowBase64 = true; // base 64 存储地址
      this.editor.customConfig.uploadImgServer = "/caseupload"; // 配置服务器地址

      this.editor.customConfig.uploadImgHeaders = {}; // 配置请求头
      this.editor.customConfig.uploadFileName = "file"; // 配置后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 100 * 1024 * 1024; // 配置图片大小限制
      this.editor.customConfig.uploadImgMaxLength = 6; // 配置限制一次最多上传6张照片
      this.editor.customConfig.uploadImgMaxTimeout = 3 * 60 * 1000; // 配置超时时间

      // 配置菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字号
        "list", // 列表
        "justify", // 对齐方式
        "italic",
        "underline",
        "image", // 插入图片
        "foreColor", // 文字颜色
        "undo", // 撤销
        "redo" // 重复
      ];

      this.editor.customConfig.uploadImgHooks = {
        fail: function(xhr, editor, result) {
          // 插入图片失败回调
           console.log("上传失败,原因是"+result);
        },
        success: function(xhr, editor, result) {
          console.log(xhr,editor, result)
          // 图片上传成功回调
        },
        timeout: function(xhr, editor) {
          // 图片上传超时回调
        },
        error: function(xhr, editor) {
          // 图片上传错误回调
        },
        customInsert: function(insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          //   let url = Object.values(result.data); //result.data就是服务器返回的图片名字和链接
          //   JSON.stringify(url); //在这里转成JSON格式
          //   insertImg(url);
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      };
      this.editor.customConfig.onchange = html => {
        this.info_ = html; // 绑定当前组件的值
        this.$emit("change", this.info_); //将内容同步到父组件
      };
      // 创建富文本编辑器
      this.editor.create();
    }
  }
};

</script>
<style lang="less" scoped>
.editor {
    width: 100%;
    margin: 0 auto;
}
.toolbar {
    border: 1px solid #ccc;
}
.text {
    border: 1px solid #cccccc;
    height: 300px;
}
</style>;
