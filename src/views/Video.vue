<template>
  <section>
    <ul class="list" v-show="!url">
      <li class="item">
        <a :data-href="`${Common.getHTTP(9093)}/yunshangcaoyuan.mp4`" @click="handleClick($event)">
          安吉云上草原-2021.05.21
        </a>
      </li>
    </ul>
    <section v-show="url">
      <p class="back-list" @click="handleBack">返回列表</p>
      <video
        width="800"
        height="500"
        controls="controls"
        preload="auto"
        autoplay
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
        style="object-fit:fill"
        ref="video"
      >
        <source type="video/mp4" />
        您的浏览器不支持 HTML5 video 标签。
      </video>
    </section>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Common from '../utils/common';
@Component
export default class Video extends Vue {
  private url: any = '';
  handleBack() {
    this.url = '';
  }
  handleClick(evt: Event) {
    const target: any = evt.target;
    const dataset: any = target.dataset;
    this.url = dataset.href;
    const video: any = this.$refs.video;
    video.src = this.url;
  }
}
</script>
<style lang="less" scoped>
.list {
  text-align: left;
  width: 20%;
  a {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      color: blue;
    }
  }
}
.back-list {
  cursor: pointer;
  text-align: left;
}
video {
  border-radius: 5px;
}
</style>
