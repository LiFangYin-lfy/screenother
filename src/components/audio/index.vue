<template>
  <div class="pt-audio">
    <div class="audio-icon" :class="{play: isPlay}" @click="audioHandler"></div>
    <div class="audio-title pt-base-color" v-if="title">{{title}}</div>
  </div>
</template>

<script>
  import ToolsUtils from '@/utils/ToolsUtils'
  export default {
    name: 'PtAudio',
    props: {
      title: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        isPlay: true
      }
    },
    methods: {

      /**
       * 播放器操作
       */
      audioHandler() {
        const that = this
        ToolsUtils.getGlobalVue().$emit('audio-list', that.isPlay)
      }
    },
    created() {
      const that = this
      ToolsUtils.getGlobalVue().$on('audio-item', flag => {
        that.isPlay = flag
      })
    }
  }
</script>

<style scoped>
  .pt-audio{
    font-size: 12px;
  }
  .audio-icon{
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url(../../assets/layout/play.png) no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
    position: relative;
    top: 5px;
  }
  .audio-icon.play{
    background: url(../../assets/layout/stop.png) no-repeat center;
    background-size: 100% 100%;
  }
  .audio-title{
    display: inline-block;
    padding: 5px;
  }
</style>