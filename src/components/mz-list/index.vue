<template>
  <div>
    <mz-item @close="closeExt" @open="openExt" v-for="(item, index) in list" :key="index" :index="index" :is-opened="index === activeIndex" :title="item.title" :image="item.image" :content="item.content" />
  </div>
</template>

<script>
  import MzItem from './item'
  export default {
    name: 'MzList',
    components: {MzItem},
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        activeIndex: 0
      }
    },
    methods: {
      
      /**
       * 关闭
       */
      closeExt() {
        this.activeIndex = null
      },

      /**
       * 打开
       */
      openExt(index) {
        this.activeIndex = index
      }
    }
  }
</script>

<style scoped>

</style>