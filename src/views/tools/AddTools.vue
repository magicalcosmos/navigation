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
      <el-form-item label="类型" prop="toolType">
        <div class="flex-box">
          <el-select
            v-model="ruleForm.toolType"
            placeholder="请选择类型"
            class="flex-box-select"
            @change="onSelectChange"
          >
            <el-option v-for="item in filters" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" @click="handleAdd()" class="flex-box-button">
            新增
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="字典新增" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="dicForm"
        :rules="dicRules"
        status-icon
        ref="dicForm"
        style="position:relative;margin:0 auto;"
        label-width="100px"
      >
        <el-form-item label="字段名称" prop="field">
          <el-input type="text" v-model="dicForm.field" disabled autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="字典值" prop="value">
          <el-input
            type="text"
            v-model="dicForm.value"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="字典名称" prop="text">
          <el-input type="text" v-model="dicForm.text" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitFormDic('dicForm')">
          提 交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AddTools extends Vue {
  dialogVisible = false;
  dicForm: object = {
    field: 'tool_type',
    text: '',
    value: ''
  };
  dicRules = {
    text: [{ required: true, message: '请输入字典名称', trigger: 'blur' }]
  };
  ruleForm = {
    name: '',
    url: '',
    type: 5,
    toolType: '',
    toolTypeName: ''
  };
  rules: object = {
    url: [{ required: true, message: '请输入url', trigger: 'blur' }],
    toolType: [{ required: true, message: '请选择类型', trigger: 'change' }]
  };
  filters = [];

  submitForm(formName: string) {
    const form: any = this.$refs[formName];
    form.validate((valid: boolean) => {
      if (valid) {
        this.addData()
          .then(response => {
            form.resetFields();
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
  }
  resetForm(formName: string): void {
    const form: any = this.$refs[formName];
    form.resetFields();
  }
  /**
   * 添加数据
   */
  public addData(): Promise<void> {
    return this.axios.post('website/addData', this.ruleForm);
  }

  handleAdd() {
    this.dialogVisible = true;
  }
  submitFormDic(formName: string) {
    const form: any = this.$refs[formName];
    form.validate((valid: boolean) => {
      if (valid) {
        this.addDic()
          .then(response => {
            form.resetFields();
            this.dialogVisible = false;
            this.getDic();
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
  /**
   * 新增字典项
   */
  public addDic(): Promise<void> {
    return this.axios.post('dic/addDic', this.dicForm);
  }
  /**
   * 查询字典项
   */
  public getDic(): void {
    this.axios
      .get('dic/getDic?field=tool_type')
      .then(res => {
        this.filters = res.data.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
  onSelectChange(value: any) {
    const data: any = this.filters.find((item: any) => item.value === value);
    this.ruleForm.toolTypeName = data.text;
  }
  private created() {
    this.getDic();
  }
}
</script>

<style lang="less" scope>
.flex-box {
  display: flex;
  .flex-box-select {
    flex: 1;
  }
  .flex-box-button {
    margin-left: 8px;
  }
}
</style>
