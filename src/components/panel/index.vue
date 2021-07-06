<template>
  <div class="panel" :class="{'no-bg': bg === false}">
    <slot></slot>
    <div class="border-top-left" :class="[radius ? 'border-icon2' : 'border-icon']"></div>
    <div class="border-top-right" :class="[radius ? 'border-icon2' : 'border-icon']"></div>
    <div class="border-bottom-left" :class="[radius ? 'border-icon2' : 'border-icon']"></div>
    <div class="border-bottom-right" :class="[radius ? 'border-icon2' : 'border-icon']"></div>
  </div>
</template>

<script>
  export default {
    name: 'Panel',
    props: {
      radius: {
        type: Boolean,
        default: false
      },
      bg: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .panel{
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border: 1px solid rgba(160, 193, 216, 0.7);
    position: relative;
    background: rgba(12, 32, 77, 0.8);
  }
  .panel.no-bg{
    background: none;
  }
  .border-icon{
    position: absolute;
    width: 8px;
    height: 8px;
  }
  .border-icon.border-top-left{
    background: url(../../assets/layout/top-left.png) no-repeat center;
    background-size: 100% 100%;
    left: -1px;
    top: -1px;
  }
  .border-icon.border-top-right{
    background: url(../../assets/layout/top-right.png) no-repeat center;
    background-size: 100% 100%;
    right: -1px;
    top: -1px;
  }
  .border-icon.border-bottom-left{
    background: url(../../assets/layout/bottom-left.png) no-repeat center;
    background-size: 100% 100%;
    left: -1px;
    bottom: -1px;
  }
  .border-icon.border-bottom-right{
    background: url(../../assets/layout/bottom-right.png) no-repeat center;
    background-size: 100% 100%;
    right: -1px;
    bottom: -1px;
  }
  .border-icon2{
    position: absolute;
    width: 13px;
    height: 2px;
  }
  .border-icon2.border-top-left{
    background: url(../../assets/layout/border-radius.png) no-repeat center;
    background-size: 100% 100%;
    left: -1px;
    top: -1px;
  }
  .border-icon2.border-top-right{
    background: url(../../assets/layout/border-radius.png) no-repeat center;
    background-size: 100% 100%;
    right: -1px;
    top: -1px;
  }
  .border-icon2.border-bottom-left{
    background: url(../../assets/layout/border-radius.png) no-repeat center;
    background-size: 100% 100%;
    left: -1px;
    bottom: -1px;
  }
  .border-icon2.border-bottom-right{
    background: url(../../assets/layout/border-radius.png) no-repeat center;
    background-size: 100% 100%;
    right: -1px;
    bottom: -1px;
  }
</style>