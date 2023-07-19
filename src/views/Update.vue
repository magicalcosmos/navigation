<template>
  <div style="width:80%;margin: 0 auto;">
    <el-table width="50%" :data="website">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        :filters="[
          { text: '开发', value: '1' },
          { text: '测试', value: '2' },
          { text: '生产', value: '4' },
          { text: '其他', value: '3' }
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1">开发</span>
          <span v-if="scope.row.type === 2">测试</span>
          <span v-if="scope.row.type === 3">其他</span>
          <span v-if="scope.row.type === 4">生产</span>
        </template>
      </el-table-column>
      <el-table-column prop="imageUrl" label="图片">
        <template slot-scope="scope">
          <img style="width:50px;height:50px" class="img" alt="图片" :src="scope.row.imageUrl" />
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form
        style="position:relative;margin:0 auto;"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input type="url" v-model="ruleForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <el-option
              :label="item.name"
              :value="item.type"
              v-for="(item, index) in websiteType"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :action="`${Common.getHTTP(9093)}/api/v1/website/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:50px" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import Common from '../utils/common';
@Component
export default class Update extends Vue {
  @Prop() private msg!: string;
  private website: Array<any> = [];
  private dialogVisible: any = false;
  private inx: any = '';
  private ruleForm: any = {
    name: '',
    url: '',
    imageUrl: '',
    type: ''
  };
  private rules: any = {
    // name: [{ required: true, message: "请输入名称", trigger: "blur" }],
    url: [{ required: true, message: '请输入url', trigger: 'blur' }]
  };
  private websiteType: any = [
    { type: 1, name: '开发' },
    { type: 2, name: '测试' },
    { type: 4, name: '生产' },
    { type: 3, name: '其他' }
  ];
  private imageUrl: any = '';

  created() {
    this.addWebsite({});
  }

  addWebsite(obj: any) {
    axios
      .post('/website/get', {})
      .then(response => {
        this.website = response.data.msg.data;
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  handleDelete(inx: number) {
    this.$confirm('此操作将删除该网址, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        axios
          .post('/website/delete', { inx: inx })
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.addWebsite({});
          })
          .catch(function(error) {
            console.error(error);
          });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
  }

  handleEdit(index: any, params: any) {
    this.dialogVisible = true;
    this.inx = index;
    this.ruleForm = params;
    this.imageUrl = params.imageUrl;
    console.error(params);
  }
  filterHandler(value: any, row: any, column: any) {
    return row['type'] === parseInt(value);
  }

  submitForm(formName: any) {
    const form: any = this.$refs[formName];
    form.validate((valid: any) => {
      if (valid) {
        axios
          .post('/website/edit', Object.assign({}, this.ruleForm, { inx: this.inx }))
          .then(response => {
            form.resetFields();
            this.imageUrl = '';
            this.dialogVisible = false;
            this.addWebsite({});
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('error submit!!');
        return false;
      }
    });
  }
  resetForm(formName: any) {
    const form: any = this.$refs[formName];
    form.resetFields();
    this.dialogVisible = false;
    this.imageUrl = '';
  }
  handleAvatarSuccess(res: any, file: any) {
    this.imageUrl = URL.createObjectURL(file.raw);
    this.ruleForm.imageUrl = `${Common.getHTTP(9093)}/${res.files.file.name}`;
  }
  beforeAvatarUpload(file: any) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isLt2M;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.flex-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: center;
  .box {
    position: relative;
    width: 20%;
    height: 86px;
    cursor: pointer;
    border-radius: 4px;
    padding: 0px 30px 0px 30px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e4ecf3;
    margin: 5px 0 0 5px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
    }

    p {
      margin-top: 30px;
      display: inline-block;
      position: relative;
      top: -20px;
    }
  }
}
.el-form-item__label {
  text-align: left;
}
.img {
  margin-top: 25px;
  margin-right: 20px;
  width: auto;
  height: auto;
  object-fit: contain;
  max-height: 50%;
}
</style>
