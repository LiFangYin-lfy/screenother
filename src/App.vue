<template>
  <div id="app">
    <div class="home-bg">
      <layout />
    </div>
    <div v-show="isHome" class="home-bg-image" :style="{left, top, transform: `scale(${scale})`}"></div>
    <div class="audio-contianer">
      <audio :src="src" ref="audio" loop autoplay />
    </div>
  </div>
</template>

<script>
  import Layout from '@/components/layout'
  import ToolsUtils from '@/utils/ToolsUtils'
  export default {
    name: 'App',
    components: {Layout},
    data() {
      return {
        src: 'data/bg-audio.mp3',
        left: null,
        top: null,
        scale: 1,
        isHome: true
      }
    },
    created() {
      const that = this
      ToolsUtils.getGlobalVue().$on('nav-change', ({to}) => {
        that.isHome = to.meta.name === 'home'
      })
      ToolsUtils.getGlobalVue().$on('audio-list', flag => {
        let isPlay = null
        if (flag) {
          that.$refs.audio.pause()
          isPlay = false
        } else {
          that.$refs.audio.play()
          isPlay = true
        }
        ToolsUtils.getGlobalVue().$emit('audio-item', isPlay)
      })
      ToolsUtils.getGlobalVue().$on('bg-change', ({left, top}) => {
        that.left = left
        that.top = top
      })
      ToolsUtils.getGlobalVue().$on('bg-wheel', scale => {
        that.scale = scale
      })
      ToolsUtils.getGlobalVue().$on('bg-reset', scale => {
        that.scale = scale
        that.left = '-51px'
        that.top = '-377px'
      })
    }
  }
</script>

<style>
  .audio-contianer{
    overflow: hidden;
    height: 0;
    width: 0;
    display: inline-block;
  }
  html, body, #app, .home-bg{
    margin: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .home-bg{
    position: absolute;
    z-index: 1;
  }
  .home-bg-image{
    position: fixed;
    width: 2000px;
    height: 1741px;
    background: url(./assets/home/bg.png) no-repeat center;
    background-size: 100% 100%;
    left: -51px;
    top: -377px;
  }
  #app {
    font-family: "PingFang SC", "Microsoft Yahei";
    position: relative;
    background: #050d25;
  }
  .page-container{
    height: calc(100% - 10px);
    overflow: hidden;
    display: flex;
  }
  .pt-title{
    color: rgb(92, 246, 251);
    font-size: 12px;
    padding: 10px;
  }
  .pt-base-color{
    color: #7d9bb8;
  }
  .pt-bg2-color{
    background: rgba(45, 104, 216, 0.2);
  }
  .marker-dialog .el-dialog{
    border: 1px solid rgb(2, 173, 238);
    background-color: rgba(0, 85, 168, 0.8);
    color: #ffffff;
  }
  .marker-dialog .el-dialog .el-dialog__header > .el-dialog__title{
    color: rgba(255, 255, 255, 0.8);
  }
  .marker-dialog .el-dialog__body{
    padding: 10px 20px;
  }
  .marker-dialog .marker-tip{
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }
  .marker-dialog .marker-type {
    padding: 10px 0;
    font-size: 15px;
  }
  .marker-dialog .marker-type .state{
    color: #ffffff;
    margin-right: 20px;
  }
  .marker-dialog .marker-type .type{
    color: #ffffff;
  }
  .marker-dialog .marker-type .state.warn{
    color: rgb(255, 149, 0);
  }
  .pt-warn-color{
    color: rgb(255, 149, 0);
  }
  .pt-warn2-color{
    color: #f3ff18;
  }
  .marker-dialog .image{
    width: 100%;
  }
  .marker-dialog .radius-icon{
    width: 4px;
    height: 4px;
    position: absolute;
    display: inline-block;
    background: url(./assets/layout/dialog-radius.png) no-repeat center;
    background-size: 100% 100%;
  }
  .marker-dialog .radius-icon.top-left{
    left: 0;
    top: 0;
    min-width: 4px;
  }
  .marker-dialog .radius-icon.top-right{
    right: 0;
    top: 0;
    min-width: 4px;
  }
  .marker-dialog .radius-icon.bottom-right{
    right: 0;
    bottom: 0;
    min-width: 4px;
  }
  .marker-dialog .radius-icon.bottom-left{
    left: 0;
    bottom: 0;
    min-width: 4px;
  }
  .marker-dialog .el-dialog .el-dialog__header .el-dialog__close:before{
    color: rgba(255, 255, 255, 0.8);
  }
  .title-tabs{
    display: inline-block;
    border: 1px solid #a0c1d8;
    color: #ffffff;
    overflow: hidden;
  }
  .title-tabs > .title-tab + .title-tab{
    border-left: 1px solid #a0c1d8;
  }
  .title-tabs > .title-tab{
    font-size: 12px;
    padding: 3px 10px;
    float: left;
  }
  .title-tabs > .title-tab:hover{
    cursor: pointer;
  }
  .title-tabs > .title-tab:hover, .title-tabs > .title-tab.active{
    background: rgba(2, 173, 238, 0.502);
  }
  .title-tabs2{
    display: inline-block;
    color: #ffffff;
    overflow: hidden;
    background: rgba(2, 173, 238, 0.502);
  }
  .title-tabs2 > .title-tab{
    cursor: pointer;
    font-size: 12px;
    padding: 3px 10px;
    float: left;
  }
  .title-tabs2 > .title-tab + .title-tab{
    border-left: 1px solid rgba(160, 193, 216, 0.3);
  }
  .drapdown-btn{
    padding: 5px;
    font-size: 12px;
  }
  .drapdown-btn:hover{
    cursor: pointer;
    background: rgba(2, 173, 238, 0.2);
  }
  .zxjk-right .el-date-editor.el-input{
    width: 130px;
  }
  .zxjk-right .el-input__prefix, .zxjk-right .el-input__suffix{
    top: -2px;
  }
  .zxjk-right .el-date-editor input{
    background: transparent;
    border: 0;
    color: #ffffff;
    height: 24px;
    line-height: 24px;
  }
  .pt-table-title{
    font-size: 12px;
    padding: 0 10px 5px 10px;
    font-weight: bold;
  }
  .pt-table{
    height: 100%;
    overflow: hidden;
  }
  .pt-table > .pt-table-header{
    height: 17px;
    overflow: hidden;
    color: #a0c1d8;
    font-size: 12px;
  }
  .pt-table .pt-table-row{
    display: flex;
    flex-direction: row;
    overflow: hidden;
    text-align: center;
  }
  .pt-table .pt-table-row > .th{
    flex-basis: 0;
    flex-grow: 0;
    min-width: 50px;
    text-align: center;
  }
  .pt-table .pt-table-row > .td{
    flex-basis: 0;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .pt-table > .pt-table-body{
    height: calc(100% - 17px);
    overflow: hidden;
    color: #ffffff;
    font-size: 12px;
    font-weight: lighter;
  }
  .map-background{
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: radial-gradient(transparent 0%, transparent 35%, #02082c 100%);
    z-index: 1;
  }
  .home-popover.el-popover{
    background: rgb(28, 157, 255);
    color: #ffffff;
    border: 0;
  }
  .home-popover.el-popover[x-placement^=top] .popper__arrow:after{
    border-top-color: rgb(28, 157, 255);
  }
  .home-popover.el-popper[x-placement^=top] .popper__arrow{
    border-top-color: rgb(28, 157, 255);
  }
  .hjjc-container .el-radio{
    margin-right: 9px;
  }
  .hjjc-container .el-radio__label{
    font-size: 12px;
    color: #ffffff;
    font-weight: lighter;
    padding-left: 5px;
  }
  .hjjc-container .el-radio__input.is-checked+.el-radio__label{
    color: rgb(57, 243, 255);
  }
  .hjjc-container .el-radio__inner{
    background: transparent;
  }
  .hjjc-container .el-radio__inner:after{
    width: 6px;
    height: 6px;
  }
  .hjjc-container .el-radio__input.is-checked .el-radio__inner{
    border-color: rgb(57, 243, 255);
    background: transparent;
  }
  .hjjc-container .el-radio__input.is-checked .el-radio__inner:after{
    background-color: rgb(57, 243, 255);
  }
  .hjjc-container .el-date-editor .el-range-separator{
    color: #ffffff;
  }
  .hjjc-container .el-date-editor--daterange.el-input__inner{
    width: 100%;
  }
  .hjjc-container .el-date-editor{
    width: 100%;
    border-radius: 0;
    border-color: rgb(160, 193, 216);
    background: transparent;
  }
  .hjjc-container .el-date-editor input{
    background: transparent;
    color: #34dfec;
  }
  .home-container .el-checkbox{
    margin-right: 9px;
    font-size: 12px;
  }
  .home-container .el-checkbox__input.is-checked+.el-checkbox__label{
    color: rgb(57, 243, 255);
  }
  .home-container .el-checkbox__label{
    color: rgb(57, 243, 255);
  }
  .home-container .el-checkbox__input.is-checked .el-checkbox__inner{
    border-color: rgb(57, 243, 255);
    background: transparent;
  }
  .home-container .el-checkbox__input .el-checkbox__inner{
    border-color: rgb(57, 243, 255);
    background: transparent;
  }
  .home-container .el-checkbox__input.is-focus .el-checkbox__inner{
    border-color: rgb(57, 243, 255);
  }
  .home-container .el-checkbox__input.is-checked .el-checkbox__inner:after{
    border-color: rgb(57, 243, 255);
  }
  .small-font{
    font-size: 12px;
    transform: scale(0.8);
  }
</style>
