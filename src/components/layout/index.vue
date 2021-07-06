<template>
  <div class="layout">
    <div class="header-container">
      <div class="header">
        <div class="user"></div>
        <div class="top">
          <div class="left">
            <span>
              <i class="fa fa-sun-o"></i>&nbsp;晴
            </span>
            <span class="text-split">|</span>
            <span>
              <i class="fa fa-thermometer-half"></i>&nbsp;22°C
            </span>
            <span class="text-split">|</span>
            <span>
              <i class="fa fa-tint"></i>&nbsp;35%
            </span>
            <span class="text-split">|</span>
            <span>
              <i class="fa fa-flag-o"></i>&nbsp;微风
            </span>
            <span style="margin-left: 30px;">
              2021-03-31 星期三
            </span>
          </div>
          <div class="title-bg">
            <div class="title">
              <img src="assets/home/title.png" style="height: 35px; margin-top: 6px;">
            </div>
          </div>
          <div class="right">
            <span>
              当前坐标：
            </span>
            <span>经度 119.111574</span>
            <span class="text-split"></span>
            <span>维度 25.324438</span>
            <span class="text-split"></span>
            <span>高程 22</span>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-item" v-for="(item, index) in tabs" :key="item.label">
            <div class="item-title pt-base-color" :class="{active: activeIndex === index}" @click="changeTab(item, index)">
              <i class="layout-icon" :class="[item.class]"></i>{{item.label}}<div class="item-delta"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <transition>
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  import ToolsUtils from '@/utils/ToolsUtils'
  export default {
    name: 'Layout',
    data() {
      return {
        activeIndex: 0,
        tabs: [{
          label: '首页',
          path: '/',
          name: 'home',
          class: 'home'
        }, {
          label: '妈祖文化',
          path: '/mzwh',
          class: 'lotus',
          name: 'mzwh'
        }, {
          label: '大爱生境',
          path: '/dasj',
          class: 'tree',
          name: 'dasj'
        }, {
          label: '环境监测',
          path: '/hjjc',
          class: 'square',
          name: 'hjjc'
        }, {
          label: '生物样本库',
          path: '/swybdp',
          class: 'me',
          name: 'swybdp'
        }, {
          label: '生态修复评估',
          path: '',
          class: 'todo',
          name: 'todo'
        }, {
          label: '系统管理',
          path: '',
          class: 'setting',
          name: 'setting'
        }]
      }
    },
    methods: {

      /**
       * 改变tabs
       */
      changeTab(item, index) {
        const path = item.path
        if (!path) {
          this.$message({
            type: 'warning',
            message: '敬请期待'
          })
          return
        }
        this.activeIndex = index
        this.$router.push({path})
		location. reload()
      }
    },
    created() {
      const that = this
      ToolsUtils.getGlobalVue().$on('nav-change', ({to}) => {
        const meta = to.meta
        for (let i = 0; i < that.tabs.length; i++) {
          const tab = that.tabs[i]
          if (tab.name === meta.name) {
            that.activeIndex = i
            break
          }
        }
      })
    },
  }
</script>

<style scoped>
  .layout{
    height: 100%;
    overflow: hidden;
    min-width: 1200px;
    color: #ffffff;
    position: relative;
  }
  .header-container{
    height: 110px;
    position: relative;
  }
  .layout .header {
    height: 110px;
    overflow: hidden;
    background: #0c1f4d;
    position: absolute;
    width: 100%;
    z-index: 100;
  }
  .layout .header > .user{
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 40px;
    background: url(../../assets/layout/user.png) no-repeat center;
    background-size: 100% 100%;
  }
  .layout .header > .top{
    height: 40px;
    overflow: hidden;
    text-align: center;
    padding: 10px;
  }
  .layout .header > .top > .left, .layout .header > .top > .right{
    font-size: 12px;
  }
  .layout .header > .top > .left{
    float: left;
    width: 365px;
  }
  .layout .header > .top > .left > .text-item + .text-item{
    margin-left: 10px;
  }
  .layout .header > .top > .right{
    float: right;
    width: 350px;
  }
  .layout .header > .top .title-bg{
    width: calc(100% - 365px - 350px);
    background: url(../../assets/layout/title-bg.png) no-repeat center;
    background-size: 100% 100%;
    float: left;
    height: 50px;
  }
  .layout .header > .top .title{
    display: inline-block;
    font-size: 22px;
    background: url(../../assets/layout/title.png) no-repeat center;
    background-size: 100% 100%;
    padding: 0 45px;
    font-family: "YouSheBiaoTiHei";
  }
  .layout .header > .bottom{
    height: 45px;
    overflow: hidden;
  }
  .layout .header > .bottom > .bottom-item{
    width: calc(100% / 7);
    float: left;
    text-align: center;
    position: relative;
    top: 15px;
  }
  .item-title{
    font-size: 15px;
    padding: 0 10px 6px 10px;
    display: inline-block;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    position: relative;
  }
  .item-delta{
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 3px solid #5cf6fb;
    position: absolute;
    display: none;
    left: 50%;
    bottom: 0;
  }
  .item-title:hover, .item-title.active{
    color: #5cf6fb;
    border-bottom: 1px solid #5cf6fb;
  }
  .item-title:hover > .item-delta, .item-title.active > .item-delta{
    display: inline-block;
  }
  .layout > .body {
    height: calc(100% - 120px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;
  }
  .text-split{
    margin: 0 10px;
  }
  .layout-icon{
    display: inline-block;
    margin-right: 5px;
    position: relative;
    top: 3px;
  }
  .layout-icon.home{
    background: url(../../assets/layout/home.png) no-repeat center;
    background-size: 100% 100%;
    width: 14px;
    height: 16px;
  }
  .item-title:hover .layout-icon.home, .item-title.active .layout-icon.home{
    background: url(../../assets/layout/home-active.png) no-repeat center;
    background-size: 100% 100%;
  }
  .layout-icon.lotus{
    background: url(../../assets/layout/lotus.png) no-repeat center;
    background-size: 100% 100%;
    width: 24px;
    height: 16px;
  }
  .item-title:hover .layout-icon.lotus, .item-title.active .layout-icon.lotus{
    background: url(../../assets/layout/lotus-active.png) no-repeat center;
    background-size: 100% 100%;
  }
  .layout-icon.tree{
    background: url(../../assets/layout/tree.png) no-repeat center;
    background-size: 100% 100%;
    width: 19px;
    height: 18px;
  }
  .item-title:hover .layout-icon.tree, .item-title.active .layout-icon.tree{
    background: url(../../assets/layout/tree-active.png) no-repeat center;
    background-size: 100% 100%;
  }
  .layout-icon.todo{
    background: url(../../assets/layout/todo.png) no-repeat center;
    background-size: 100% 100%;
    width: 16px;
    height: 18px;
  }
  .item-title:hover .layout-icon.todo, .item-title.active .layout-icon.todo{
    background: url(../../assets/layout/todo-active.png) no-repeat center;
    background-size: 100% 100%;
  }
  .layout-icon.square{
    background: url(../../assets/layout/square.png) no-repeat center;
    background-size: 100% 100%;
    width: 18px;
    height: 18px;
  }
  .item-title:hover .layout-icon.square, .item-title.active .layout-icon.square{
    background: url(../../assets/layout/square-active.png) no-repeat center;
    background-size: 100% 100%;
  }
  .layout-icon.me{
    background: url(../../assets/layout/me.png) no-repeat center;
    background-size: 100% 100%;
    width: 16px;
    height: 18px;
  }
  .item-title:hover .layout-icon.me, .item-title.active .layout-icon.me{
    background: url(../../assets/layout/me-active.png) no-repeat center;
    background-size: 100% 100%;
  }
  .layout-icon.setting{
    background: url(../../assets/layout/setting.png) no-repeat center;
    background-size: 100% 100%;
    width: 18px;
    height: 16px;
  }
  .item-title:hover .layout-icon.setting, .item-title.active .layout-icon.setting{
    background: url(../../assets/layout/setting-active.png) no-repeat center;
    background-size: 100% 100%;
  }
</style>