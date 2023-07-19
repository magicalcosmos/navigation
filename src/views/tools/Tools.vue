<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="name" sortable label="名称"></el-table-column>
      <el-table-column prop="toolType" label="类型" :filters="filters" :filter-method="filterHandler">
        <template slot-scope="scope">
          <el-tag disable-transitions>{{ scope.row.toolTypeName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link :href="scope.row.url">下载</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Tools extends Vue {
  dialogVisible = false;
  filters: Array<object> = [];
  tableData: Array<object> = [];

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

  public filterHandler(value: string, row: any, column: any): boolean {
    return row['toolType'] === value;
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
