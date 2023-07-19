<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="name" sortable label="名称"></el-table-column>
      <el-table-column prop="url" label="地址"></el-table-column>
      <el-table-column prop="toolType" label="类型" :filters="filters" :filter-method="filterHandler">
        <template slot-scope="scope">
          <el-tag disable-transitions>{{ scope.row.toolTypeName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link :href="scope.row.url">下载</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        style="position:relative;margin:0 auto;"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input type="url" v-model="ruleForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="toolType">
          <el-select v-model="ruleForm.toolType" placeholder="请选择类型" style="width: 100%;" @change="onSelectChange">
            <el-option v-for="item in filters" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm('ruleForm')">
          提 交
        </el-button>
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Tools extends Vue {
  dialogVisible = false;
  ruleForm = {
    id: '',
    name: '',
    url: '',
    type: '5',
    toolType: '',
    toolTypeName: ''
  };
  filters: Array<object> = [];
  rules: object = {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    url: [{ required: true, message: '请输入url', trigger: 'blur' }]
  };
  tableData: Array<object> = [];

  /**
   * 新增表单提交
   */
  public submitForm(formName: string): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = this.$refs[formName];
    form.validate((valid: boolean) => {
      if (valid) {
        this.updateData()
          .then((res: any) => {
            form.resetFields();
            this.dialogVisible = false;
            this.getData();
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
   * 取消新增表单
   */

  resetForm(formName: any): void {
    const form: any = this.$refs[formName];
    this.dialogVisible = false;
    // form.resetFields();
    this.getData();
  }
  /**
   * 编辑
   */
  public handleEdit(index: number, row: any): void {
    this.dialogVisible = true;
    this.ruleForm = row;
  }
  /**
   * 删除
   */
  public handleDelete(index: number, row: any): void {
    this.deleteData(row.id);
  }
  /**
   * 添加数据
   */
  public addData(): Promise<void> {
    return this.axios.post('website/addData', this.ruleForm);
  }
  /**
   * 删除数据
   */
  public deleteData(id: string): void {
    this.$confirm('此操作将删除该网址, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.axios
          .delete(`/website/deleteData/${id}`)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData();
          })
          .catch(error => {
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

  /**
   * 更新数据
   */
  public updateData(): Promise<void> {
    return this.axios.post('website/updateData', this.ruleForm);
  }

  /**
   * 获取数据
   */
  public getData(): void {
    this.axios
      .get('/website/getData/5')
      .then(res => {
        this.tableData = res.data.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  public filterHandler(value: string, row: any, column: any): boolean {
    return row['toolType'] === value;
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
  private created(): void {
    this.getDic();
    this.getData();
  }
}
</script>
<style lang="less" scoped>
.container {
  text-align: left;
}
</style>
