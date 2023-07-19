<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0 0 20px" v-if="website1.length">
      <el-breadcrumb-item>开发</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex-box">
      <div class="box" v-for="(item, index) in website1" :key="index" @click="open(item.url)">
        <img class="img" alt="图片" v-if="item.imageUrl !== ''" :src="item.imageUrl" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <el-breadcrumb separator="/" style="margin:20px 0 0 20px" v-if="website2.length">
      <el-breadcrumb-item>测试</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex-box">
      <div class="box" v-for="(item2, index2) in website2" :key="index2" @click="open(item2.url)">
        <img class="img" alt="图片" v-if="item2.imageUrl !== ''" :src="item2.imageUrl" />
        <p>{{ item2.name }}</p>
      </div>
    </div>
    <el-breadcrumb separator="/" style="margin:20px 0 0 20px" v-if="website4.length">
      <el-breadcrumb-item>生产</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex-box">
      <div class="box" v-for="(item4, index4) in website4" :key="index4" @click="open(item4.url)">
        <img class="img" alt="图片" v-if="item4.imageUrl !== ''" :src="item4.imageUrl" />
        <p>{{ item4.name }}</p>
      </div>
    </div>

    <el-breadcrumb separator="/" style="margin:20px 0 0 20px" v-if="website3.length">
      <el-breadcrumb-item>其他</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex-box">
      <div class="box" v-for="(item3, index3) in website3" :key="index3" @click="open(item3.url)">
        <img class="img" alt="图片" v-if="item3.imageUrl !== ''" :src="item3.imageUrl" />
        <p>{{ item3.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private website: Array<any> = [];

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

  get website1() {
    const arr = this.website.filter((item, index) => {
      return item.type === 1;
    });
    return arr;
  }

  get website2() {
    return this.website.filter((item, index) => {
      return item.type == 2;
    });
  }

  get website3() {
    return this.website.filter((item, index) => {
      return item.type == 3;
    });
  }
  get website4() {
    return this.website.filter((item, index) => {
      return item.type == 4;
    });
  }

  open(url: string) {
    window.open(url, '_blank');
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

.img {
  margin-top: 25px;
  margin-right: 20px;
  width: auto;
  height: auto;
  object-fit: contain;
  max-height: 50%;
}
</style>
