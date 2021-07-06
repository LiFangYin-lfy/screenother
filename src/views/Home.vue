<template>
  <div class="page-container home-container">
    <div class="top">
      <div class="top-left">
        <div class="item item-flex">
          <div class="top-left-flex">
            <div class="flex-p1">
              <div class="flex-p2">
                <div class="flex-p1 top-p-flex">
                  <pt-panel>
                    <div class="panel-contianer mzwh-panel">
                      <div class="pt-title" style="padding: 0 0 10px 0;">妈祖文化</div>
                      <div style="padding: 10px;">
                        <pt-audio title="妈祖背景音乐" />
                        <div class="big-title">立德 行善 大爱</div>
                        <div class="memo-title">
                          <div>中国首个信俗类世界遗产</div>
                          <div>中国海洋文化的代表</div>
                          <div>中华民族重要文化瑰宝之一</div>
                          <div>联合国有关机构授予妈祖“和平女神”称号</div>
                        </div>
                      </div>
                    </div>
                  </pt-panel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item item-flex border-margin-top">
          <div class="top-left-flex">
            <div class="flex-p1">
              <div class="flex-p2">
                <div class="flex-p1 top-p-flex">
                  <pt-panel>
                    <div class="xfcg-panel" :class="{xfcg2: xfcgFlag}">
                      <div class="pt-title">
                        <span>修复成果</span>
                        <div class="xfcg-tip" v-if="!xfcgFlag"></div>
                        <div class="xfcg-tabs">
                          <div class="title-tabs">
                            <div
                              class="title-tab"
                              :class="{active: xfcgFlag}"
                              @click="xfcgFlag = true"
                            >生态工法</div>
                            <div
                              class="title-tab"
                              :class="{active: !xfcgFlag}"
                              @click="xfcgFlag = false"
                            >生境营造</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </pt-panel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-center border-margin-left">
        <pt-panel :bg="false">
          <div class="map-background"></div>
          <div class="map-container">
            <div class="reload-map">
              <el-button type="primary" @click="reloadMap" icon="el-icon-refresh">复原</el-button>
            </div>
            <div
              v-pt-drag="dragEvent"
              :key="markerUUID"
              ref="dragEle"
              class="no-map"
              v-pt-mousewheel="mousewheelEvent"
              :style="{transform: `scale(${scale})`}"
            >
              <div class="home-map-content">
                <div
                  class="map-marker"
                  :class="{other: mapBtnActiveIndex !== 0}"
                  :style="{top: marker.position[0], left: marker.position[1], transform: mapBtnActiveIndex === 0 ? `rotate(${marker.windRotationAngle}deg)` : null}"
                  @click="showMarker(marker)"
                  v-for="marker in markers"
                  :key="marker.stationCode"
                >
                  <el-popover placement="top" trigger="hover" popper-class="home-popover">
                    <div style="text-align: center;">
                      <template v-if="mapBtnActiveIndex === 0">
                        <span>{{marker.stationName}}</span>
                        <span style="margin-left: 5px;">{{marker.windLevel}}级</span>
                        <span style="margin-left: 5px;">{{marker.windSpeedAvg}}m/s</span>
                      </template>
                      <template v-else>{{marker.stationName}}</template>
                    </div>
                    <img
                      slot="reference"
                      :src="`assets/home/${marker.windIcon}`"
                      alt
                      v-if="mapBtnActiveIndex === 0"
                    />
                    <div slot="reference" v-else-if="mapBtnActiveIndex === 1">
                      <div class="lg-bg" :class="[`l-${marker.waveLevelNum || 1}`]">
                        {{marker.waveHeight || '--'}}
                        <span style="margin: 0 5px;">|</span>
                        {{marker.waveHeightMax || '--'}}
                      </div>
                    </div>
                    <div slot="reference" v-else>
                      <div class="lg-bg l-qwys">
                        <template v-if="mapBtnActiveIndex === 2">{{marker.airTemperature || '--'}}</template>
                        <template v-else-if="mapBtnActiveIndex === 3">{{marker.pressure || '--'}}</template>
                        <template
                          v-else-if="mapBtnActiveIndex === 4"
                        >{{marker.waterTemperature || '--'}}</template>
                      </div>
                    </div>
                  </el-popover>
                </div>
              </div>
            </div>
            <div
              @click="changeMapBtn(index)"
              class="map-btn"
              :class="[mapBtn.class, mapBtnActiveIndex === index ? 'active' : null]"
              v-for="(mapBtn, index) in mapBtns"
              :key="index"
            >
              <img :src="mapBtn.image" class="img" />
              <div class="text">{{mapBtn.name}}</div>
            </div>
          </div>
          <div class="home-tl" v-show="mapBtnActiveIndex === 0"></div>
          <div class="home-tl1" v-show="mapBtnActiveIndex === 1"></div>
        </pt-panel>
      </div>
      <div class="top-right border-margin-left">
        <div class="item item-flex">
          <div class="top-left-flex">
            <div class="flex-p1">
              <div class="flex-p2">
                <div class="flex-p1 top-p-flex">
                  <pt-panel>
                    <div>
                      <div class="pt-title">在线监测总体情况</div>
                      <div style="padding: 0 10px;">
                        <div class="title-tabs">
                          <div
                            class="title-tab"
                            :class="{active: tab.value === zxjkTabsValue}"
                            @click="zxjkTabsChange(tab)"
                            v-for="tab in zxjkTabs"
                            :key="tab.value"
                          >{{tab.label}}</div>
                        </div>
                        <!-- 右上角日期搜索框 -->
                        <template v-if="zxjkTabsValue === 3">
                          <el-button
                            style="float: right; margin-left: 10px;position: relative; top: -2px;"
                            type="primary"
                            @click="kqQuery()"
                          >查询</el-button>
                          <div class="title-tabs zxjk-right">
                            <div class="title-tab">
                              <el-date-picker
                                v-model="zxjkData"
                                type="date"
                                :editable="false"
                                placeholder="选择日期"
                              />
                            </div>
                          </div>
                        </template>
                        <template v-if="zxjkTabsValue === 4">
                          <div class="title-tabs zxjk-right">
                            <div class="title-tab">
                              <el-date-picker
                                v-model="zxtqData"
                                type="date"
                                placeholder="选择日期"
                                readonly="readonly"
                              />
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                    <div class="zxjk-body">
                      <!-- 空气-->
                      <div v-if="zxjkTabsValue === 3" style="height: 100%" :key="`${useKey}-3`">
                        <el-row>
                          <el-col :span="8">
                            <div class="zxjk-sqtchart" id="ylzb"></div>
                          </el-col>
                          <el-col :span="8">
                            <div class="zxjk-sqtchart" id="wrzb"></div>
                          </el-col>
                          <el-col :span="8">
                            <div class="zxjk-sqtchart" id="yjcs2"></div>
                          </el-col>
                        </el-row>
                        <div class="zxjk-subbody">
                          <div class="pt-table-title">空气质量</div>
                          <div class="pt-table zxjk-table">
                            <div class="pt-table-header">
                              <div class="pt-table-row">
                                <div class="th">序号</div>
                                <div class="td">监测时间</div>
                                <div class="td">AQI指数</div>
                                <div class="td">主要污染物</div>
                              </div>
                            </div>
                            <div class="pt-table-body">
                              <vue-scroll>
                                <div
                                  class="pt-table-row"
                                  v-for="(zxjk, index) in jkData.data"
                                  :key="index"
                                >
                                  <div class="th">{{index + 1 > 9 ? index + 1 : '0' + (index + 1)}}</div>
                                  <div class="td">{{zxjk.date}}</div>
                                  <div class="td pt-warn2-color">{{zxjk.AQI}}({{zxjk.quality}})</div>
                                  <div class="td">{{zxjk.primaryPollutant}}</div>
                                </div>
                              </vue-scroll>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 天气-->
                      <div
                        v-else-if="zxjkTabsValue === 4"
                        style="height: 100%"
                        :key="`${useKey}-4`"
                      >
                        <div class="zxjk-info">
                          <div class="zxjk-info-panel">
                            <div class="panel-card">{{tqData[0].slogan}}</div>
                          </div>
                          <div class="zxjk-info-text">
                            <div>
                              <div>
                                <img style="width: 18px; height: 12px;" src="assets/home/tq.png" />
                                {{tqData[0].conditionDay}}
                              </div>
                              <div>
                                <img
                                  style="width: 12px; height: 18px; margin-right: 10px;"
                                  src="assets/home/qw.png"
                                />
                                气温：{{tqData[0].tempDay}}°C/{{tqData[0].tempNight}}°C
                              </div>
                              <div>
                                <img style="width: 18px; height: 18px;" src="assets/home/zwx.png" />
                                紫外线指数：{{tqData[0].UVI}}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="zxjk-tq">
                          <div class="zxjk-tq-top">
                            <div class="item" v-for="(tq, index) in tqData" :key="index">
                              <div>
                                <div>{{tq.title}}</div>
                                <div>{{tq.date}}</div>
                                <div>{{tq.conditionDay}}</div>
                                <img style="width: 25px;" :src="`assets/home/mjtq/${tq.icon}`" alt />
                              </div>
                            </div>
                          </div>
                          <div class="zxjk-tq-chart" id="tq-chart" :key="`${useKey}-5`"></div>
                          <div class="zxjk-tq-zl">
                            <div class="item" v-for="(tq, index) in tqData" :key="index">
                              <div>
                                <div>{{tq.windDirDay}}</div>
                                <div class="tq-xj" v-if="tq.AQI === '1'">差</div>
                                <div class="tq-lj" v-if="tq.AQI === '2'">良</div>
                                <div class="tq-yj" v-if="tq.AQI === '3'">优</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </pt-panel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item item-flex border-margin-top" style="position: relative;">
          <div class="top-left-flex">
            <div class="flex-p1">
              <div class="flex-p2">
                <div class="flex-p1 top-p-flex">
                  <pt-panel>
                    <div class="pt-title">生物样本</div>
                    <div style="text-align: center;">
                      <div class="memo-title swyb-text" style="margin-top: 10px;">
                        已记录
                        <span class="swyb-title">14663</span>个动植物生态监测数据
                      </div>
                      <div class="memo-title swyb-text">
                        总用户为
                        <span class="swyb-title">526</span>人
                      </div>
                    </div>
                  </pt-panel>
                  <div class="swyb-panel-list">
                    <el-row :gutter="10" style="height: 100%;">
                      <el-col :span="8" style="height: 100%;">
                        <div class="swyb-panel">
                          <div>
                            <img src="../assets/layout/swyb-1.png" alt />
                            <div class="swyb-panel-number">13381</div>
                            <div>张图片</div>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8" style="height: 100%;">
                        <div class="swyb-panel">
                          <div>
                            <img src="../assets/layout/swyb-2.png" alt />
                            <div class="swyb-panel-number">1280</div>
                            <div>个视频</div>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8" style="height: 100%;">
                        <div class="swyb-panel">
                          <div>
                            <img src="../assets/layout/swyb-3.png" alt />
                            <div class="swyb-panel-number">3240</div>
                            <div>条记录</div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left item-flex">
        <div class="top-left-flex">
          <div class="flex-p1">
            <div class="flex-p2">
              <div class="flex-p1 top-p-flex">
                <pt-panel>
                  <div class="pt-title cxqx-header">
                    <span>潮汐曲线</span>
                    <div class="cxqx-tabs">
                      <div class="title-tabs">
                        <div
                          class="title-tab"
                          :class="{active: tab.value === cxqxTabsValue}"
                          @click="cxqxTabsChange(tab)"
                          v-for="tab in cxqxTabs"
                          :key="tab.value"
                        >{{tab.label}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="cxqx-body">
                    <div class="cxqx-chart" id="cxqx"></div>
                    <div class="cxqx-card">
                      <el-row :gutter="10">
                        <el-col :span="12">
                          <div
                            class="cxqx-card-col"
                            :title="`第一高潮：潮时 ${cxqxTabs[cxqxTabsValue - 1].dTitle[0]}  潮高 ${cxqxTabs[cxqxTabsValue - 1].dData[0]}cm`"
                          >
                            <div class="small-font">
                              第一高潮：
                              <strong>{{cxqxTabs[cxqxTabsValue - 1].dTitle[0]}}</strong>/
                              <strong>{{cxqxTabs[cxqxTabsValue - 1].dData[0]}}cm</strong>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div
                            class="cxqx-card-col"
                            :title="`第二高潮：潮时 ${cxqxTabs[cxqxTabsValue - 1].dTitle[1]}  潮高 ${cxqxTabs[cxqxTabsValue - 1].dData[1]}cm`"
                          >
                            <div class="small-font">
                              第二高潮：
                              <strong>{{cxqxTabs[cxqxTabsValue - 1].dTitle[1]}}</strong>/
                              <strong>{{cxqxTabs[cxqxTabsValue - 1].dData[1]}}cm</strong>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div
                            class="cxqx-card-col"
                            :title="`第一低潮：潮时 ${cxqxTabs[cxqxTabsValue - 1].dTitle[3]}  潮高 ${cxqxTabs[cxqxTabsValue - 1].dData[3]}cm`"
                          >
                            第一低潮：
                            <strong>{{cxqxTabs[cxqxTabsValue - 1].dTitle[3]}}</strong>/
                            <strong>{{cxqxTabs[cxqxTabsValue - 1].dData[3]}}cm</strong>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div
                            class="cxqx-card-col"
                            :title="`第二低潮：潮时 ${cxqxTabs[cxqxTabsValue - 1].dTitle[2]}  潮高 ${cxqxTabs[cxqxTabsValue - 1].dData[2]}cm`"
                          >
                            第二低潮：
                            <strong>{{cxqxTabs[cxqxTabsValue - 1].dTitle[2]}}</strong>/
                            <strong>{{cxqxTabs[cxqxTabsValue - 1].dData[2]}}cm</strong>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </pt-panel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-center border-margin-left">
        <div class="bottom-center-item item-flex">
          <div class="top-left-flex">
            <div class="flex-p1">
              <div class="flex-p2">
                <div class="flex-p1 top-p-flex">
                  <pt-panel>
                    <div class="pt-title">
                      <span style="font-size: 14px;">【内湾】水质状态：II类</span>
                      <span style="float: right;">
                        <el-checkbox :label="0" v-model="nvValue">水温</el-checkbox>
                        <el-checkbox :label="1" v-model="nvValue">PH</el-checkbox>
                        <el-checkbox :label="2" v-model="nvValue">溶解氧</el-checkbox>
                        <el-checkbox :label="3" v-model="nvValue">COD</el-checkbox>
                      </span>
                    </div>
                    <div class="sjtj-body">
                      <div id="nw"></div>
                    </div>
                  </pt-panel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-center-item item-flex">
          <div class="top-left-flex">
            <div class="flex-p1">
              <div class="flex-p2">
                <div class="flex-p1 top-p-flex">
                  <pt-panel>
                    <div class="pt-title">
                      <span style="font-size: 14px;">【外湾】水质状态：II类</span>
                      <span style="float: right;">
                        <el-checkbox :label="0" v-model="wvValue">水温</el-checkbox>
                        <el-checkbox :label="1" v-model="wvValue">PH</el-checkbox>
                        <el-checkbox :label="2" v-model="wvValue">溶解氧</el-checkbox>
                        <el-checkbox :label="3" v-model="wvValue">COD</el-checkbox>
                      </span>
                    </div>
                    <div class="sjtj-body">
                      <div id="ww"></div>
                    </div>
                  </pt-panel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-right border-margin-left item-flex">
        <div class="top-left-flex">
          <div class="flex-p1">
            <div class="flex-p2">
              <div class="flex-p1 top-p-flex">
                <pt-panel>
                  <div class="pt-title">小程序二维码</div>
                  <div class="pt-panel-body">
                    <div style="text-align: center;">
                      <img src="../assets/layout/qrcode.png" />
                      <div class="pt-base-color" style="margin-top: 10px;">莆田蓝色海湾生物资源样本库</div>
                    </div>
                  </div>
                </pt-panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="markerVisible"
      :title="curMarker.label"
      width="400px"
      class="marker-dialog"
      :modal="false"
    >
      <div class="marker-tip">
        <span>最新监测时间：{{curMarker.latestDate}}</span>
        <span style="margin-left: 20px;">所在海域：内湾</span>
      </div>
      <!--      <div class="marker-type">
       <div>
          <span class="state">平均风速：{{curMarker.windSpeedAvg}}m/s</span>
          <span class="type">{{curMarker.windSpeedMax || '--'}}m/s</span>
       </div>
       <div>
         <span class="state">风向：{{curMarker.windDirection}}</span>
          <span class="type">风力：{{curMarker.windLevel}}级</span>
       </div>
      </div>
      -->

      <div class="marker-type">
        <!-- 风力 -->
        <template v-if="mapBtnActiveIndex === 0">
          <div>
            <span class="state">平均风速：{{curMarker.windSpeedAvg}}m/s</span>
            <!-- <span class="type">{{curMarker.windSpeedMax || '--'}}m/s</span> -->
          </div>
          <div>
            <span class="state">风向：{{curMarker.windDirection}}</span>
            <span class="type">风力：{{curMarker.windLevel}}级</span>
          </div>
        </template>
        <!-- 浪高 -->
        <template v-else-if="mapBtnActiveIndex === 1">
          <div>
            <span class="state">有效波高：{{curMarker.waveHeight}}m</span>
            <span class="type">最高波高：{{curMarker.waveHeightMax || '--'}}m</span>
          </div>
          <div>
            <span class="state">浪级：{{curMarker.waveLevel}}</span>
          </div>
        </template>
        <!-- 气温 -->
        <template v-else-if="mapBtnActiveIndex === 2">
          <div>
            <span class="state">气温：{{curMarker.airTemperature}}</span>
          </div>
        </template>
        <!-- 气压 -->
        <template v-else-if="mapBtnActiveIndex === 3">
          <div>
            <span class="state">气压：{{curMarker.pressure}}</span>
          </div>
        </template>
        <!-- 水温 -->
        <template v-else-if="mapBtnActiveIndex === 4">
          <div>
            <span class="state">水温：{{curMarker.waterTemperature}}</span>
          </div>
        </template>
      </div>
      <div class="dialog-chart" id="dialog-chart"></div>
      <div class="radius-icon top-left"></div>
      <div class="radius-icon top-right"></div>
      <div class="radius-icon bottom-right"></div>
      <div class="radius-icon bottom-left"></div>
    </el-dialog>
  </div>
</template>

<script>
import PtPanel from '@/components/panel'
import PtAudio from '@/components/audio'
import ToolsUtils from '@/utils/ToolsUtils.js'
import Api from '@/api'
export default {
  name: 'Home',
  components: { PtPanel, PtAudio },
  data() {
    return {
      markerUUID: new Date().valueOf(),
      mapBtnActiveIndex: 0,
      mapBtns: [{
        name: '风力',
        class: 'sz',
        image: 'assets/home/fl.png'
      }, {
        name: '浪高',
        class: 'lg',
        image: 'assets/home/lg.png'
      }, {
        name: '气温',
        class: 'sw',
        image: 'assets/home/qw2.png'
      }, {
        name: '气压',
        class: 'pm25',
        image: 'assets/home/qy.png'
      }, {
        name: '水温',
        class: 'wexin',
        image: 'assets/home/sw.png'
      }],
      nvValue: [2],
      wvValue: [2],
      scale: 1,
      top: null,
      left: null,
      WIDTH: 1920,
      HEIGHT: 1080,
      jkData: {},
      tqData: [],
      useKey: new Date().valueOf(),
      zxtqData: new Date(),
      zxjkData: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
      xfcgFlag: false,
      markerVisible: false,
      curMarker: {},
      map: null,
      markers: [{
        label: '斗尾港标',
        position: ['1200px', '550px']
      }, {
        label: '湄洲岛',
        position: ['1014px', '1500px']
      }],
      zxjkTabsValue: 3,
      zxjkTabs: [{
        label: '空气',
        value: 3
      }, {
        label: '天气',
        value: 4
      }],
      cxqxTabs: [{
        value: 1,
        dTitle: [],
        dData: []
      }, {
        value: 2,
        dTitle: [],
        dData: []
      }, {
        value: 3,
        dTitle: [],
        dData: []
      }],
      cxqxTabsValue: 2,
      sjData: {}
    }
  },
  watch: {
    nvValue: {
      handler() {
        this.createSjtjNw()
      }
    },
    wvValue: {
      handler() {
        this.createSjtjWw()
      }
    }
  },
  mounted() {
    this.initScale4Screen()
    this.getJkData()
    this.getTqData()
    this.createTimer(true)
  },
  methods: {

    /**
     * 改变地图按钮索引
     */
    changeMapBtn(index) {
      const that = this
      that.mapBtnActiveIndex = index
      that.markerUUID = new Date().valueOf()
      switch (index) {
        case 0:
          break
        case 1:
          break
      }
    },

    /**
     * 定时器
     */
    createTimer(isInit = false) {
      const that = this
      const timer = noFirst => {
        const t = setTimeout(() => {
          that.createCxqx()
          that.getSjData()
          that.zxjkTabsChange({ value: that.zxjkTabsValue })
          that.getBuoyData()
          timer(false)
          clearTimeout(t)
        }, noFirst ? 0 : 60000)
      }
      timer(isInit)
    },

    /**
     * 水质数据
     */
    getSjData() {
      const that = this
      Api.sjData().then(result => {
        that.sjData = result
        that.createSjtjNw()
        that.createSjtjWw()
      })
    },

    /**
     * 监控数据-空气数据
     */
    getJkData() {
      const that = this
      const time = that.dateFormat(that.zxjkData, "YYYY-mm-dd HH:MM")
      Api.jkData('秀屿区政府', time).then(result => {
        that.jkData = result.body
      })
    },

    /**
     * 日期格式化
     * @param {Object} date
     * @param {Object} fmt
     * yyyy-MM-dd HH:mm:ss YYYY-mm-dd HH:MM:SS
     */
    dateFormat(date, fmt) {
      let ret
      const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
      }
      return fmt
    },
    /**
     * 监控数据-天气数据
     */
    getTqData() {
      const that = this
      Api.tqData().then(result => {
        that.tqData = result.body.weatherList
      })
    },

    /**
     * 获取浮标数据
     */
    getBuoyData() {
      const that = this
      Promise.all(that.markers.map(item => Api.buoyData(item.label))).then(results => {
        const mList = []
        for (let i = 0; i < results.length; i++) {
          const result = results[i].body
          mList.push({
            ...that.markers[i],
            ...result
          })
        }
        that.markers = mList
      }).catch(e => {
        console.log(e)
      })
    },

    // 显示当前marker
    showMarker(marker) {
      this.curMarker = marker
      switch (this.mapBtnActiveIndex) {
        case 0:
          // 风力
          this.markerVisible = true
          this.drawWindChart()
          break
        case 1:
          // 浪高
          this.markerVisible = true
          this.drawWaveChart()
          break
        case 2:
          // 气温
          this.markerVisible = true
          this.drawAirTempChart()
          break
        case 3:
          // 气压
          this.markerVisible = true
          this.drawPressureChart()
          break
        case 4:
          // 水温
          this.markerVisible = true
          this.drawWaterTempChart()
          break

      }
    },

    /**
     * 绘制统计图表
     */
    drawChart() {
      const that = this
      const option = {
        title: {
          text: 'm/s',
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          opacity: 0.3,
          formatter(data) {
            // console.log(data)
            return `时间：${data[0].value[0]}<br/>平均风速：${data[0].value[1]}m/s`
          }
        },
        legend: {
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          left: 'right',
          formatter: function (value) {
            // return [value === '平均风速' ? `{a|${value}}` : `{b|${value}}`].join('')
            return [value === '平均风速' ? `{b|${value}}` : `{b|${value}}`].join('')
          },
          textStyle: {
            rich: {
              a: {
                color: 'rgb(0, 0, 0)'
              },
              b: {
                color: 'rgb(92, 246, 251)'
              }
            }
          }
        },
        grid: {
          top: 25,
          left: 20,
          right: 20,
          bottom: 40,
        },
        xAxis: {
          type: 'category',
          data: that.curMarker.windSpeedAvgList.map(item => item[0]),
          axisLabel: {
            color: '#ffffff',
            formatter(value) {
              const values = value.split(' ')
              return [`{a|${values[1]}}`, `{b|${values[0]}}`].join('\n')
            },
            rich: {
              a: {
                fontSize: 14
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [/*{
            symbol: 'none',
            name: '最大风速',
            type: 'line',
            data: that.curMarker.windSpeedMaxList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
            color: 'rgb(92, 246, 251)'
          }, */{
            symbol: 'none',
            name: '平均风速',
            type: 'line',
            data: that.curMarker.windSpeedAvgList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
            // color: 'rgb(0, 0, 0)'
            color: 'rgb(92, 246, 251)'
          }]
      }
      this.$nextTick(() => {
        const t = setTimeout(() => {
          const $chart = echarts.init(document.getElementById('dialog-chart'))
          $chart.clear()
          $chart.setOption(option)
          clearTimeout(t)
        }, 500)
      })
    },

    /**
     * 绘制风力统计图表
     */
    drawWindChart() {
      const that = this
      const option = {
        title: {
          text: 'm/s',
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          opacity: 0.3,
          formatter(data) {
            // console.log(data)
            return `时间：${data[0].value[0]}<br/>平均风速：${data[0].value[1]}m/s`
          }
        },
        legend: {
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          left: 'right',
          formatter: function (value) {
            // return [value === '平均风速' ? `{a|${value}}` : `{b|${value}}`].join('')
            return [value === '平均风速' ? `{b|${value}}` : `{b|${value}}`].join('')
          },
          textStyle: {
            rich: {
              a: {
                color: 'rgb(0, 0, 0)'
              },
              b: {
                color: 'rgb(92, 246, 251)'
              }
            }
          }
        },
        grid: {
          top: 25,
          left: 20,
          right: 20,
          bottom: 40,
        },
        xAxis: {
          type: 'category',
          data: that.curMarker.windSpeedAvgList.map(item => item[0]),
          axisLabel: {
            color: '#ffffff',
            formatter(value) {
              const values = value.split(' ')
              return [`{a|${values[1]}}`, `{b|${values[0]}}`].join('\n')
            },
            rich: {
              a: {
                fontSize: 14
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [/*{
            symbol: 'none',
            name: '最大风速',
            type: 'line',
            data: that.curMarker.windSpeedMaxList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
            color: 'rgb(92, 246, 251)'
          }, */{
            symbol: 'none',
            name: '平均风速',
            type: 'line',
            data: that.curMarker.windSpeedAvgList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
            // color: 'rgb(0, 0, 0)'
            color: 'rgb(92, 246, 251)'
          }]
      }
      this.$nextTick(() => {
        const t = setTimeout(() => {
          const $chart = echarts.init(document.getElementById('dialog-chart'))
          $chart.clear()
          $chart.setOption(option)
          clearTimeout(t)
        }, 500)
      })
    },

    /**
     * 绘制浪高统计图表
     */
    drawWaveChart() {
      const that = this
      const option = {
        title: {
          text: 'm',
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          opacity: 0.3,
          formatter(data) {
            // console.log(data)
            return `时间：${data[0].value[0]}<br/>波高：${data[0].value[1]}m/s`
          }
        },
        legend: {
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          left: 'right',
          formatter: function (value) {
            // return [value === '平均风速' ? `{a|${value}}` : `{b|${value}}`].join('')
            return [value === '最大浪高' ? `{a|${value}}` : `{b|${value}}`].join('')
          },
          textStyle: {
            rich: {
              a: {
                color: 'rgb(85, 255, 127)'
              },
              b: {
                color: 'rgb(92, 246, 251)'
              }
            }
          }
        },
        grid: {
          top: 25,
          left: 20,
          right: 20,
          bottom: 40,
        },
        xAxis: {
          type: 'category',
          data: that.curMarker.waveHeightList.map(item => item[0]),
          axisLabel: {
            color: '#ffffff',
            formatter(value) {
              const values = value.split(' ')
              return [`{a|${values[1]}}`, `{b|${values[0]}}`].join('\n')
            },
            rich: {
              a: {
                fontSize: 14
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          symbol: 'none',
          name: '最大波高',
          type: 'line',
          data: that.curMarker.waveHeightMaxList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
          color: 'rgb(85, 255, 127)'
        }, {
          symbol: 'none',
          name: '有效波高',
          type: 'line',
          data: that.curMarker.waveHeightList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
          color: 'rgb(92, 246, 251)'
        }]
      }
      this.$nextTick(() => {
        const t = setTimeout(() => {
          const $chart = echarts.init(document.getElementById('dialog-chart'))
          $chart.clear()
          $chart.setOption(option)
          clearTimeout(t)
        }, 500)
      })
    },

    /**
     * 绘制气温统计图表
     */
    drawAirTempChart() {
      const that = this
      const option = {
        title: {
          text: '℃',
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          opacity: 0.3,
          formatter(data) {
            // console.log(data)
            return `时间：${data[0].value[0]}<br/>气温：${data[0].value[1]}℃`
          }
        },
        legend: {
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          left: 'right',
          formatter: function (value) {
            // return [value === '平均风速' ? `{a|${value}}` : `{b|${value}}`].join('')
            return [value === '气温' ? `{b|${value}}` : `{b|${value}}`].join('')
          },
          textStyle: {
            rich: {
              a: {
                color: 'rgb(85, 255, 127)'
              },
              b: {
                color: 'rgb(92, 246, 251)'
              }
            }
          }
        },
        grid: {
          top: 25,
          left: 20,
          right: 20,
          bottom: 40,
        },
        xAxis: {
          type: 'category',
          data: that.curMarker.airTemperatureList.map(item => item[0]),
          axisLabel: {
            color: '#ffffff',
            formatter(value) {
              const values = value.split(' ')
              return [`{a|${values[1]}}`, `{b|${values[0]}}`].join('\n')
            },
            rich: {
              a: {
                fontSize: 14
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          symbol: 'none',
          name: '气温',
          type: 'line',
          data: that.curMarker.airTemperatureList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
          // color: 'rgb(0, 0, 0)'
          color: 'rgb(92, 246, 251)'
        }]
      }
      this.$nextTick(() => {
        const t = setTimeout(() => {
          const $chart = echarts.init(document.getElementById('dialog-chart'))
          $chart.clear()
          $chart.setOption(option)
          clearTimeout(t)
        }, 500)
      })
    },

    /**
     * 绘制气压统计图表
     */
    drawPressureChart() {
      const that = this
      const option = {
        title: {
          text: 'hPa',
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          opacity: 0.3,
          formatter(data) {
            // console.log(data)
            return `时间：${data[0].value[0]}<br/>气压：${data[0].value[1]}hPa`
          }
        },
        legend: {
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          left: 'right',
          formatter: function (value) {
            // return [value === '平均风速' ? `{a|${value}}` : `{b|${value}}`].join('')
            return [value === '气压' ? `{b|${value}}` : `{b|${value}}`].join('')
          },
          textStyle: {
            rich: {
              a: {
                color: 'rgb(85, 255, 127)'
              },
              b: {
                color: 'rgb(92, 246, 251)'
              }
            }
          }
        },
        grid: {
          top: 25,
          left: 20,
          right: 20,
          bottom: 40,
        },
        xAxis: {
          type: 'category',
          data: that.curMarker.pressureList.map(item => item[0]),
          axisLabel: {
            color: '#ffffff',
            formatter(value) {
              const values = value.split(' ')
              return [`{a|${values[1]}}`, `{b|${values[0]}}`].join('\n')
            },
            rich: {
              a: {
                fontSize: 14
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [/*{
            symbol: 'none',
            name: '最大风速',
            type: 'line',
            data: that.curMarker.windSpeedMaxList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
            color: 'rgb(92, 246, 251)'
          }, */{
            symbol: 'none',
            name: '气压',
            type: 'line',
            data: that.curMarker.pressureList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
            // color: 'rgb(0, 0, 0)'
            color: 'rgb(92, 246, 251)'
          }]
      }
      this.$nextTick(() => {
        const t = setTimeout(() => {
          const $chart = echarts.init(document.getElementById('dialog-chart'))
          $chart.clear()
          $chart.setOption(option)
          clearTimeout(t)
        }, 500)
      })
    },

    /**
     * 绘制水温统计图表
     */
    drawWaterTempChart() {
      const that = this
      const option = {
        title: {
          text: '℃',
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          opacity: 0.3,
          formatter(data) {
            // console.log(data)
            return `时间：${data[0].value[0]}<br/>水温：${data[0].value[1]}℃`
          }
        },
        legend: {
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          left: 'right',
          formatter: function (value) {
            // return [value === '平均风速' ? `{a|${value}}` : `{b|${value}}`].join('')
            return [value === '水温' ? `{b|${value}}` : `{b|${value}}`].join('')
          },
          textStyle: {
            rich: {
              a: {
                color: 'rgb(85, 255, 127)'
              },
              b: {
                color: 'rgb(92, 246, 251)'
              }
            }
          }
        },
        grid: {
          top: 25,
          left: 20,
          right: 20,
          bottom: 40,
        },
        xAxis: {
          type: 'category',
          data: that.curMarker.waterTemperatureList.map(item => item[0]),
          axisLabel: {
            color: '#ffffff',
            formatter(value) {
              const values = value.split(' ')
              return [`{a|${values[1]}}`, `{b|${values[0]}}`].join('\n')
            },
            rich: {
              a: {
                fontSize: 14
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [/*{
            symbol: 'none',
            name: '最大风速',
            type: 'line',
            data: that.curMarker.windSpeedMaxList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
            color: 'rgb(92, 246, 251)'
          }, */{
            symbol: 'none',
            name: '水温',
            type: 'line',
            data: that.curMarker.waterTemperatureList.map(item => [item[0], Number(item[1] || '0').valueOf()]),
            // color: 'rgb(0, 0, 0)'
            color: 'rgb(92, 246, 251)'
          }]
      }
      this.$nextTick(() => {
        const t = setTimeout(() => {
          const $chart = echarts.init(document.getElementById('dialog-chart'))
          $chart.clear()
          $chart.setOption(option)
          clearTimeout(t)
        }, 500)
      })
    },

    // 初始化屏幕
    initScale4Screen() {
      const canvasWidth = this.$refs.dragEle.offsetWidth
      const canvasHeight = this.$refs.dragEle.offsetHeight
      const wh = ToolsUtils.getAssignSize4Scale(canvasWidth, canvasHeight, this.WIDTH, this.HEIGHT)
      const scale = wh.width / this.WIDTH
      this.scale = scale > 1 ? scale : 1
    },

    /**
     * 重置地图
     */
    reloadMap() {
      this.$refs.dragEle.style.left = '-51px'
      this.$refs.dragEle.style.top = '-377px'
      this.scale = 1
      ToolsUtils.getGlobalVue().$emit('bg-reset', this.scale)
    },

    /**
     * 拖拽回调
     */
    dragEvent(left, top) {
      ToolsUtils.getGlobalVue().$emit('bg-change', { left, top })
    },

    // 滚轮监听
    mousewheelEvent(direction) {
      const that = this
      switch (direction) {
        case 'up':
          if (that.scale < 5) {
            that.scale += 0.1
          }
          break
        case 'down':
          if (that.scale > 1) {
            that.scale -= 0.1
          }
          break
      }
      ToolsUtils.getGlobalVue().$emit('bg-wheel', that.scale)
    },

    /**
     * 潮汐曲线tab
     */
    cxqxTabsChange(tab) {
      const that = this
      that.cxqxTabsValue = tab.value
      that.createCxqx()
    },

    /**
     * 在线监控
     */
    zxjkTabsChange(tab) {
      const that = this
      that.zxjkTabsValue = tab.value
      that.useKey = new Date().valueOf()
      switch (that.zxjkTabsValue) {
        case 3:
          that.$nextTick(() => {
            that.ylzbChart()
            that.wrzbChart()
            that.yjcs2Chart()
          })
          break
        case 4:
          that.$nextTick(() => {
            that.tqChart()
          })
          break
      }
    },

    /**
     * 查询空气监测数据
     */
    kqQuery() {
      const that = this
      that.getJkData()
      that.$nextTick(() => {
        that.ylzbChart()
        that.wrzbChart()
        that.yjcs2Chart()
      })
    },

    /**
     * 优良占比
     */
    ylzbChart() {
      const that = this
      const $chart = echarts.init(document.getElementById('ylzb'))
      $chart.clear()
      const option = {
        title: {
          text: '优良占比',
          left: 'center',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        series: [{
          type: 'liquidFill',
          radius: 60, // 水球图的半径
          center: ['50%', '60%'], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
          // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形  
          shape: 'circle',
          phase: 0, // 波的相位弧度 不设置  默认自动
          direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
          outline: {
            show: true,
            borderDistance: 1, // 边框线与图表的距离 数字
            itemStyle: {
              opacity: 1, // 边框的透明度   默认为 1
              borderWidth: 1, // 边框的宽度
              shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
              shadowColor: '#fff', // 边框的阴影颜色,
              borderColor: '#a0c1d8' // 边框颜色
            }
          },
          // 图形样式
          itemStyle: {
            color: '#3ca806', // 水球显示的背景颜色
            shadowBlur: 10 // 波浪的阴影范围
          },
          backgroundStyle: {
            color: 'transparent', // 水球未到的背景颜色
            opacity: 0.5
          },
          // 图形的高亮样式
          emphasis: {
            itemStyle: {
              opacity: 0.8 // 鼠标经过波浪颜色的透明度
            }
          },
          // 图形上的文本标签
          label: {
            fontSize: 12,
            color: '#fff'
          },
          data: [that.jkData.excellentRatio] // 系列中的数据内容数组 [0.88]
        }]
      }
      $chart.setOption(option)
    },

    /**
     * 污染占比
     */
    wrzbChart() {
      const that = this
      const $chart = echarts.init(document.getElementById('wrzb'))
      $chart.clear()
      const option = {
        title: {
          text: '污染占比',
          left: 'center',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        series: [{
          type: 'liquidFill',
          radius: 60, // 水球图的半径
          center: ['50%', '60%'], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
          // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形  
          shape: 'circle',
          phase: 0, // 波的相位弧度 不设置  默认自动
          direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
          outline: {
            show: true,
            borderDistance: 1, // 边框线与图表的距离 数字
            itemStyle: {
              opacity: 1, // 边框的透明度   默认为 1
              borderWidth: 1, // 边框的宽度
              shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
              shadowColor: '#fff', // 边框的阴影颜色,
              borderColor: '#a0c1d8' // 边框颜色
            }
          },
          // 图形样式
          itemStyle: {
            color: '#834d01', // 水球显示的背景颜色
            shadowBlur: 10 // 波浪的阴影范围
          },
          backgroundStyle: {
            color: 'transparent', // 水球未到的背景颜色
            opacity: 0.5
          },
          // 图形的高亮样式
          emphasis: {
            itemStyle: {
              opacity: 0.8 // 鼠标经过波浪颜色的透明度
            }
          },
          // 图形上的文本标签
          label: {
            fontSize: 12,
            color: '#fff'
          },
          data: [that.jkData.polluteRatio] // 系列中的数据内容数组 [0.12]
        }]
      }
      $chart.setOption(option)
    },

    /**
     * 预警次数2
     */
    yjcs2Chart() {
      const that = this
      const $chart = echarts.init(document.getElementById('yjcs2'))
      $chart.clear()
      const option = {
        title: {
          text: '预警次数',
          left: 'center',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        series: [{
          type: 'liquidFill',
          radius: 60, // 水球图的半径
          center: ['50%', '60%'], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
          // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形  
          shape: 'circle',
          phase: 0, // 波的相位弧度 不设置  默认自动
          direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
          outline: {
            show: true,
            borderDistance: 1, // 边框线与图表的距离 数字
            itemStyle: {
              opacity: 1, // 边框的透明度   默认为 1
              borderWidth: 1, // 边框的宽度
              shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
              shadowColor: '#fff', // 边框的阴影颜色,
              borderColor: '#e83f32' // 边框颜色
            }
          },
          // 图形样式
          itemStyle: {
            color: '#2c284c', // 水球显示的背景颜色
            shadowBlur: 10 // 波浪的阴影范围
          },
          backgroundStyle: {
            color: '#2c284c' // 水球未到的背景颜色
          },
          // 图形的高亮样式
          emphasis: {
            itemStyle: {
              opacity: 0.8 // 鼠标经过波浪颜色的透明度
            }
          },
          // 图形上的文本标签
          label: {
            fontSize: 25,
            color: '#e83f32',
            formatter() {
              return that.jkData.warningTimes //'3'
            }
          },
          data: [that.jkData.warningTimes] // 系列中的数据内容数组 [0]
        }]
      }
      $chart.setOption(option)
    },


    /**
     * 天气
     */
    tqChart() {
      const that = this
      const $chart = echarts.init(document.getElementById('tq-chart'))
      $chart.clear()
      const option = {
        grid: {
          left: 0,
          right: 0,
          bottom: 10,
          top: 20
        },
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: that.tqData.map(item => item.tempDay),
          type: 'line',
          color: '#d6e022',
          label: {
            position: 'top',
            show: true,
            textBorderWidth: 0,
            color: '#ffffff',
            formatter: '{c}°C',
            fontSize: 10
          },
        }, {
          data: that.tqData.map(item => item.tempNight),
          type: 'line',
          color: '#03aced',
          label: {
            position: 'bottom',
            show: true,
            textBorderWidth: 0,
            color: '#ffffff',
            formatter: '{c}°C',
            fontSize: 10
          },
        }]
      }
      $chart.setOption(option)
    },

    /**
     * 潮汐曲线
     */
    createCxqx() {
      const that = this
      const $chart = echarts.init(document.getElementById('cxqx'))
      $chart.clear()
      const option = {
        title: {
          text: '潮高(cm)',
          padding: [0, 0, 10, 10],
          textStyle: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 10
          }
        },
        tooltip: {
          trigger: 'axis',
          opacity: 0.3,
          formatter(data) {
            return `${data[0].value}cm`
          }
        },
        grid: {
          left: 35,
          right: 10,
          top: 30,
          bottom: 20
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          }
        },
        yAxis: {
          type: 'value',
          interval: 200,
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#ffffff',
              opacity: 0.2
            }
          },
        },
        series: [{
          data: [],
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [{
                offset: 0, color: '#27f7ff' // 0% 处的颜色
              }, {
                offset: 1, color: '#0165ff' // 100% 处的颜色
              }]
            }
          }
        }]
      }
      Api.tideData('秀屿区').then(result => {
        const data = result.body
        const tideList = data.tideList
        that.cxqxTabs = tideList.map((item, index) => {
          const tideData = item.tideData
          const timeData = item.timeData
          return {
            label: item.colDate.replace('月', '/').replace('日', ''),
            value: index + 1,
            title: timeData.map(tide => tide[0]),
            data: timeData.map(tide => Number(tide[1]).valueOf()),
            dTitle: tideData.map(tide => tide[0]),
            dData: tideData.map(tide => tide[1]),
          }
        })
        option.xAxis.data = that.cxqxTabs[that.cxqxTabsValue - 1].title
        option.series[0].data = that.cxqxTabs[that.cxqxTabsValue - 1].data
        $chart.setOption(option)
      })
    },

    /**
     * 数据统计曲线
     */
    createSjtjNw() {
      const that = this
      const $chart = echarts.init(document.getElementById('nw'))
      $chart.clear()
      const series = [{
        name: '水温',
        data: that.sjData.nw.sw.map(item => Number(item[1]).valueOf()),
        markLine: {
          symbol: 'none',
          label: {
            color: 'rgb(50, 212, 249)',
            formatter: '平均'
          },
          lineStyle: {
            color: 'rgb(50, 212, 249)'
          },
          data: [
            {
              type: 'average',
              name: '平均值',
            }
          ]
        },
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(50, 212, 249)' },
            { offset: 1, color: '#000000' }
          ]),
          opacity: 0.1
        },
        lineStyle: {
          color: 'rgb(50, 212, 249)'
        },
        endLabel: {
          show: true,
          formatter: '实时',
          color: 'rgb(50, 212, 249)'
        }
      }, {
        name: 'ph',
        data: that.sjData.nw.ph.map(item => Number(item[1]).valueOf()),
        markLine: {
          symbol: 'none',
          label: {
            color: 'rgb(112, 254, 0)',
            formatter: '平均'
          },
          lineStyle: {
            color: 'rgb(112, 254, 0)'
          },
          data: [
            {
              type: 'average',
              name: '平均值',
            }
          ]
        },
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(112, 254, 0)' },
            { offset: 1, color: '#000000' }
          ]),
          opacity: 0.1
        },
        lineStyle: {
          color: 'rgb(112, 254, 0)'
        },
        endLabel: {
          show: true,
          formatter: '实时',
          color: 'rgb(112, 254, 0)'
        }
      }, {
        name: '溶解氧',
        data: that.sjData.nw.rjy.map(item => Number(item[1]).valueOf()),
        markLine: {
          symbol: 'none',
          label: {
            color: 'rgb(138, 202, 70)',
            formatter: '平均'
          },
          lineStyle: {
            color: 'rgb(138, 202, 70)'
          },
          data: [
            {
              type: 'average',
              name: '平均值',
            }
          ]
        },
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(138, 202, 70)' },
            { offset: 1, color: '#000000' }
          ]),
          opacity: 0.1
        },
        lineStyle: {
          color: 'rgb(138, 202, 70)'
        },
        endLabel: {
          show: true,
          formatter: '实时',
          color: 'rgb(138, 202, 70)'
        }
      }, {
        name: 'CODmn',
        data: that.sjData.nw.con.map(item => Number(item[1]).valueOf()),
        markLine: {
          symbol: 'none',
          label: {
            color: 'rgb(255, 87, 153)',
            formatter: '平均'
          },
          lineStyle: {
            color: 'rgb(255, 87, 153)'
          },
          data: [
            {
              type: 'average',
              name: '平均值',
            }
          ]
        },
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(255, 87, 153)' },
            { offset: 1, color: '#000000' }
          ]),
          opacity: 0.1
        },
        lineStyle: {
          color: 'rgb(255, 87, 153)'
        },
        endLabel: {
          show: true,
          formatter: '实时',
          color: 'rgb(255, 87, 153)'
        }
      }]
      const option = {
        tooltip: {
          trigger: 'axis',
          opacity: 0.3
        },
        grid: {
          left: 35,
          right: 40,
          top: 20,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          data: that.sjData.nw.sw.map(item => item[0]),
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          }
        },
        yAxis: {
          type: 'value',
          interval: 4,
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#ffffff',
              opacity: 0.2
            }
          }
        },
        series: series.filter((item, index) => that.nvValue.includes(index))
      }
      $chart.setOption(option)
    },

    /**
     * 数据统计曲线
     */
    createSjtjWw() {
      const that = this
      const $chart = echarts.init(document.getElementById('ww'))
      $chart.clear()
      const series = [{
        name: '水温',
        data: that.sjData.ww.sw.map(item => Number(item[1]).valueOf()),
        markLine: {
          symbol: 'none',
          label: {
            color: 'rgb(50, 212, 249)',
            formatter: '平均'
          },
          lineStyle: {
            color: 'rgb(50, 212, 249)'
          },
          data: [
            {
              type: 'average',
              name: '平均',
            }
          ]
        },
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(50, 212, 249)' },
            { offset: 1, color: '#000000' }
          ]),
          opacity: 0.1
        },
        lineStyle: {
          color: 'rgb(50, 212, 249)'
        },
        endLabel: {
          show: true,
          formatter: '实时',
          color: 'rgb(50, 212, 249)'
        }
      }, {
        name: 'ph',
        data: that.sjData.ww.ph.map(item => Number(item[1]).valueOf()),
        markLine: {
          symbol: 'none',
          label: {
            color: 'rgb(112, 254, 0)',
            formatter: '平均'
          },
          lineStyle: {
            color: 'rgb(112, 254, 0)'
          },
          data: [
            {
              type: 'average',
              name: '平均',
            }
          ]
        },
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: 'rgb(112, 254, 0)',
          opacity: 0.1,
          shadowOffsetY: 0.5
        },
        lineStyle: {
          color: 'rgb(112, 254, 0)'
        },
        endLabel: {
          show: true,
          formatter: '实时',
          color: 'rgb(112, 254, 0)'
        }
      }, {
        name: '溶解氧',
        data: that.sjData.ww.rjy.map(item => Number(item[1]).valueOf()),
        markLine: {
          symbol: 'none',
          label: {
            color: 'rgb(138, 202, 70)',
            formatter: '平均'
          },
          lineStyle: {
            color: 'rgb(138, 202, 70)'
          },
          data: [
            {
              type: 'average',
              name: '平均',
            }
          ]
        },
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(138, 202, 70)' },
            { offset: 1, color: '#000000' }
          ]),
          opacity: 0.1
        },
        lineStyle: {
          color: 'rgb(138, 202, 70)'
        },
        endLabel: {
          show: true,
          formatter: '实时',
          color: 'rgb(138, 202, 70)'
        }
      }, {
        name: 'CODmn',
        data: that.sjData.ww.con.map(item => Number(item[1]).valueOf()),
        markLine: {
          symbol: 'none',
          label: {
            color: 'rgb(255, 87, 153)',
            formatter: '平均'
          },
          lineStyle: {
            color: 'rgb(255, 87, 153)'
          },
          data: [
            {
              type: 'average',
              name: '平均',
            }
          ]
        },
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(255, 87, 153)' },
            { offset: 1, color: '#000000' }
          ]),
          opacity: 0.1
        },
        lineStyle: {
          color: 'rgb(255, 87, 153)'
        },
        endLabel: {
          show: true,
          formatter: '实时',
          color: 'rgb(255, 87, 153)'
        }
      }]
      const option = {
        tooltip: {
          trigger: 'axis',
          opacity: 0.3
        },
        grid: {
          left: 35,
          right: 40,
          top: 20,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          data: that.sjData.ww.sw.map(item => item[0]),
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          }
        },
        yAxis: {
          type: 'value',
          // interval: 4,
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#ffffff',
              opacity: 0.2
            }
          }
        },
        series: series.filter((item, index) => that.wvValue.includes(index))
      }
      $chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.home-container {
  flex-direction: column;
  min-height: 800px;
}
.top {
  flex-basis: 0;
  flex-grow: 7;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.bottom {
  flex-basis: 0;
  flex-grow: 3;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  overflow: hidden;
}
.item-flex {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.top-left-flex {
  flex-basis: 0;
  flex-grow: 1;
  overflow: hidden;
}
.flex-p1 {
  height: 100%;
  position: relative;
}
.flex-p2 {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
}
.top-p-flex {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.top-left,
.top-right,
.bottom-left,
.bottom-right {
  flex-basis: 0;
  flex-grow: 0;
  min-width: 315px;
  overflow: hidden;
}
.top-left,
.top-right {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.top-left > .item,
.top-right > .item {
  flex-basis: 0;
  flex-grow: 1;
  overflow: hidden;
}
.top-center,
.bottom-center {
  flex-basis: 0;
  flex-grow: 1;
  overflow: hidden;
}
.bottom-center {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.bottom-center > .bottom-center-item {
  flex-basis: 0;
  flex-grow: 1;
}
.bottom-center > .bottom-center-item:first-child {
  margin-right: 5px;
}
.bottom-center > .bottom-center-item:last-child {
  margin-left: 5px;
}
.border-margin-top {
  margin-top: 10px;
}
.border-margin-left {
  margin-left: 10px;
}
.panel-contianer {
  padding: 10px;
}
.pt-panel-body {
  height: calc(100% - 37px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.mzwh-panel {
  height: calc(100% - 20px);
  background: url(../assets/layout/mzwh.png) no-repeat center;
  background-size: 100% 100%;
}
.mzwh-panel .big-title {
  font-size: 24px;
  margin-top: 15px;
}
.memo-title {
  font-size: 12px;
  margin-top: 20px;
}
.xfcg-panel {
  height: 100%;
  background: url(../assets/layout/xfcg.gif) no-repeat center;
  background-size: 100% 100%;
}
.xfcg-panel.xfcg2 {
  background: url(../assets/layout/xfcg2.png) no-repeat center;
  background-size: 100% 100%;
}
.xfcg-tip {
  height: 30px;
  width: 142px;
  background: url(../assets/layout/xfcg-tip.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  bottom: 10px;
  left: calc(50% - 71px);
}
.swyb-title {
  color: #f3ff15;
  font-weight: bolder;
  font-size: 18px;
}
.swyb-panel-list {
  position: absolute;
  width: calc(100% - 20px);
  top: 130px;
  bottom: 10px;
  margin: 0 10px;
}
.swyb-panel {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  padding: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 31px);
  text-align: center;
}
.swyb-panel > img {
  width: 60%;
  margin-bottom: 10px;
}
.swyb-panel .swyb-panel-number {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  font-family: "DINPro";
}
.swyb-panel .swyb-panel-number + div {
  font-weight: lighter;
}
.map-container {
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-btn {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background: rgba(92, 246, 251, 0.3);
  color: rgb(92, 246, 251);
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  transition: all 0.5s;
  z-index: 100;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
}
.map-btn.sz {
  top: 20px;
}
.map-btn.lg {
  top: 70px;
}
.map-btn.sw {
  top: 120px;
}
.map-btn.pm25 {
  top: 170px;
}
.map-btn.wexin {
  top: 220px;
}
.map-btn.sz > .img {
  width: 18px;
  height: 15px;
}
.map-btn.lg > .img {
  width: 19px;
  height: 15px;
}
.map-btn.sw > .img {
  width: 12px;
  height: 18px;
}
.map-btn.pm25 > .img {
  width: 18px;
  height: 16px;
}
.map-btn.wexin > .img {
  width: 18px;
  height: 16px;
}
.map-btn > .text {
  font-size: 12px;
  display: none;
  margin-left: 5px;
  transition: all 0.5s;
}
.map-btn:hover,
.map-btn.active {
  width: auto;
  padding: 0 20px;
  border: 1px solid rgb(92, 246, 251);
}
.map-btn:hover > .text,
.map-btn.active > .text {
  display: inline-block;
}
.xfcg-tabs,
.cxqx-title,
.sjtj-tabs,
.zxjk-right {
  float: right;
  color: #ffffff;
}
.title-tabs.zxjk-right > .title-tab {
  padding: 0;
}
.title-tabs.zxjk-right > .title-tab:hover {
  background: inherit;
}
.cxqx-title > span + span {
  margin-left: 10px;
}
.cxqx-body,
.sjtj-body {
  height: calc(100% - 37px);
  overflow: hidden;
  width: 100%;
}
.cxqx-tabs {
  width: calc(100% - 48px);
  float: right;
  text-align: center;
}
#nw,
#ww {
  height: 100%;
}
.cxqx-card {
  margin: 10px;
  background: rgba(255, 255, 255, 0.2);
}
.cxqx-card-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
  padding: 5px;
  font-size: 12px;
}
.cxqx-chart {
  height: calc(100% - 74px);
}
.zxjk-body {
  height: calc(100% - 75px);
  font-weight: lighter;
}
.zxjk-sqtchart {
  height: 100px;
}
.zxjk-subbody {
  height: calc(100% - 100px);
}
.zxjk-table {
  height: calc(100% - 22px);
}
.zxjk-swz {
  display: flex;
  align-items: center;
  justify-content: center;
}
.zxjk-swz > .swz-state-image {
  width: 50px;
  height: 50px;
  display: inline-block;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
.zxjk-swz > .swz-state-image img {
  width: 30px;
  height: 30px;
}
.swz-title {
  font-size: 12px;
  margin-bottom: 5px;
}
.swz-state {
  font-size: 16px;
  color: #66ff97;
}
.swz-state.state-error {
  color: #e73e31;
}
.zxjk-subbody-sw {
  margin-top: 10px;
  height: calc(100% - 60px);
}
.reload-map {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
}
.home-map {
  width: 2000px;
  height: 1741px;
  min-width: 2000px;
  min-height: 1741px;
  background: url(../assets/home/bg.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  transition: all 0.5s;
  left: 0;
  top: 0;
}
.no-map {
  position: fixed;
  left: -51px;
  top: -377px;
  width: 2000px;
  height: 1741px;
  min-width: 2000px;
  min-height: 1741px;
  background: transparent;
  z-index: 10;
}
.home-tl {
  width: 78px;
  height: 111px;
  left: 10px;
  bottom: 10px;
  position: absolute;
  z-index: 2;
  background: url(../assets/home/tl.png) no-repeat center;
  background-size: 100% 100%;
}
.home-tl1 {
  width: 110px;
  height: 133px;
  left: 10px;
  bottom: 10px;
  position: absolute;
  z-index: 2;
  background: url(../assets/home/tl1.png) no-repeat center;
  background-size: 100% 100%;
}
.home-map-content {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.map-marker {
  position: absolute;
  width: 31px;
  height: 31px;
  cursor: pointer;
}
.map-marker.other {
  width: 70px;
  height: 30px;
}
.map-marker img {
  width: 100%;
  -webkit-user-drag: none;
}
.dialog-chart {
  height: 200px;
}
.zxjk-info {
  overflow: hidden;
  padding: 3px 0;
}
.zxjk-tq {
  height: calc(100% - 70px);
  font-size: 12px;
  text-align: center;
}
.zxjk-tq-top {
  height: 80px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.zxjk-tq-top > .item {
  flex-basis: 0;
  flex-grow: 1;
  overflow: hidden;
  transform: scale(0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
.zxjk-tq-zl {
  height: 35px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.zxjk-tq-zl > .item {
  flex-basis: 0;
  flex-grow: 1;
  overflow: hidden;
  transform: scale(0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
.zxjk-tq-chart {
  height: calc(100% - 80px - 35px);
}
.zxjk-info-panel {
  text-align: center;
  padding: 0 10px;
  float: left;
}
.zxjk-info-text {
  display: flex;
  align-items: center;
  width: calc(100% - 111px);
  float: left;
  font-size: 14px;
  padding-left: 20px;
}
.zxjk-info-text img {
  position: relative;
  top: 2px;
  margin-right: 5px;
}
.panel-card {
  display: inline-block;
  border: 1px solid rgb(0, 199, 255);
  background-color: rgba(0, 102, 131, 0.8);
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  padding: 5px;
  width: 52px;
  border-radius: 5px;
}
.tq-yj {
  padding: 0 10px;
  border-radius: 8px;
  background: #1cb577;
  color: #ffffff;
}
.tq-lj {
  padding: 0 10px;
  border-radius: 8px;
  background: #d5e023;
  color: #ffffff;
}
.tq-xj {
  padding: 0 10px;
  border-radius: 8px;
  background: #858889;
  color: #ffffff;
}
.swyb-text {
  font-size: 18px;
  font-family: "PingFang SC";
  font-weight: lighter;
}
.swyb-text + .swyb-text {
  margin-top: 10px;
}
.swyb-text .swyb-title {
  margin: 0 5px;
  font-size: 20px;
  font-family: "DINPro Black";
  font-weight: bold;
}
.lg-bg {
  width: 70px;
  height: 30px;
  color: #ffffff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lg-bg.l-1 {
  background: url(../assets/home/lg/1.png) no-repeat center;
  background-size: 100% 100%;
}
.lg-bg.l-2 {
  background: url(../assets/home/lg/2.png) no-repeat center;
  background-size: 100% 100%;
}
.lg-bg.l-3 {
  background: url(../assets/home/lg/3.png) no-repeat center;
  background-size: 100% 100%;
}
.lg-bg.l-4 {
  background: url(../assets/home/lg/4.png) no-repeat center;
  background-size: 100% 100%;
}
.lg-bg.l-5 {
  background: url(../assets/home/lg/5.png) no-repeat center;
  background-size: 100% 100%;
}
.lg-bg.l-qwys {
  background: url(../assets/home/lg/qwys.png) no-repeat center;
  background-size: 100% 100%;
}
</style>