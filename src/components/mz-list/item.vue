<template>
  <div class="mz-item">
    <div class="base-panel" :class="{hide: isOpened}" @click="openExt">
      <div class="title">{{title}}</div>
      <div class="image">
        <img :src="image" alt="">
      </div>
      <div class="item-bg"></div>
    </div>
    <div class="open-panel" :class="{show: isOpened}" @click="closeExt">
      <div class="title">{{title}}</div>
      <div class="content pt-base-color">
        <div class="content-p" v-for="(c, index) in content" :key="index">{{c}}</div>
      </div>
      <div class="image">
        <img :src="image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MzItem',
    props: {
      index: {
        default: null
      },
      isOpened: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: null
      },
      image: {
        type: String,
        default: null
      },
      content: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {

      /**
       * 打开
       */
      openExt() {
        this.$emit('open', this.index)
      },

      /**
       * 关闭
       */
      closeExt() {
        this.$emit('close', this.index)
      }
    }
  }
</script>

<style scoped>
  .mz-item{
    padding: 5px;
    overflow: hidden;
    background: rgba(45, 104, 216, 0.2);
    margin: 10px;
  }
  .base-panel, .open-panel{
    overflow: hidden;
    transition: all 0.5s;
    cursor: pointer;
  }
  .base-panel.hide, .open-panel{
    height: 0;
  }
  .base-panel, .open-panel.show{
    height: auto;
  }
  .base-panel{
    position: relative;
  }
  .base-panel .title{
    float: left;
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 10px;
  }
  .base-panel .image{
    float: right;
    width: 150px;
    display: flex;
    align-items: center;
  }
  .base-panel .image > img{
    height: 60px;
    width: 100%;
    object-fit: cover;
  }
  .item-bg{
    position: absolute;
    top: 0;
    left: calc(100% - 150px);
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to right, #1c3670 , transparent);
  }
  .open-panel .content{
    font-size: 12px;
    margin: 15px 0;
  }
  .open-panel .content > .content-p + .content-p{
    margin-top: 10px;
  }
  .open-panel img{
    width: 100%;
  }
</style>