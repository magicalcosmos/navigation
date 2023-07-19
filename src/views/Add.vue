<template>
  <div>
    <el-form
      style="width:500px;position:relative;left:30%"
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
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import Common from '../utils/common';
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        url: '',
        imageUrl: '',
        type: ''
      },
      rules: {
        url: [{ required: true, message: '请输入url', trigger: 'blur' }]
      },
      websiteType: [
        { type: 1, name: '开发' },
        { type: 2, name: '测试' },
        { type: 4, name: '生产' },
        { type: 3, name: '其他' }
      ],
      imageUrl: ''
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post('/website/add', this.ruleForm)
            .then(response => {
              this.$refs[formName].resetFields();
              this.imageUrl = '';
              alert('添加成功');
              this.$router.push({ path: '/' });
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          console.error('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.imageUrl = '';
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.imageUrl = `${Common.getHTTP(9093)}/${res.files.file.name}`;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    }
  }
};
</script>

<style lang="less" scope>
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
</style>
