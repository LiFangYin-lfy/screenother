<template>
  <div class="page-container hjjc-container">
    <div class="left">
      <pt-panel radius>
        <div class="flex-list">
          <div class="flex-item flex-2 flex-1">
            <div class="flex-item flex-1 bg">
              <div class="left-title">
                <div>
                  在线设备运行情况：
                  <span class="tip">正常</span>
                </div>
                <div class="sblx">
                  <span>设备类型：</span>
                  <el-radio-group v-model="sbValue" @change="agreeChange">
                    <!-- <el-radio :label="1" >水质</el-radio> -->
                    <el-radio :label="2">海洋</el-radio>
                    <el-radio :label="3">天气</el-radio>
                    <el-radio :label="4">空气</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <vue-scroll :ops="ops">
                <template v-for="(data, index) in cjzsData">
                  <div class="left-item left-1-flex">
                    <div class="left-1-item" style="margin-bottom: 10px;">
                      <div style="width: 100%;">
                        <el-row>
                          <el-col :span="12">
                            <div class="left-subtitle">站点名称：</div>
                            <div class="left-subtitle-text">{{data.stationName}}</div>
                          </el-col>
                          <el-col :span="12">
                            <div class="left-subtitle">检测设备：</div>
                            <div class="left-subtitle-text">
                              {{data.stationType}}
                              <img src="assets/hjjc/dfp.png" style="width: 15px;" />
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div class="left-1-item">
                      <div style="width: 100%;">
                        <div class="cs-flex">
                          <div class="cs-title">采集次数：</div>
                          <div class="cs-img" ref="csImg">
                            <img src="assets/hjjc/cs.png" alt />
                            <div
                              class="active-img"
                              :style="{width: `calc(100% / 46 * ${data.acquisitionTimes})`}"
                            >
                              <img
                                :style="{width: `${csImgWidth}px`}"
                                src="assets/hjjc/cs-active.png"
                                alt
                              />
                            </div>
                          </div>
                          <div class="cs-value">{{data.acquisitionTimes}}次</div>
                        </div>
                      </div>
                    </div>
                    <div class="left-1-item">
                      <div style="width: 100%;">
                        <div class="cs-flex">
                          <div class="cs-title">漏采次数：</div>
                          <div class="cs-img">
                            <img src="assets/hjjc/cs.png" alt />
                            <div
                              class="active-img"
                              :style="{width: `calc(100% / 46 * ${data.missedTimes})`}"
                            >
                              <img
                                :style="{width: `${csImgWidth}px`}"
                                src="assets/hjjc/cs-active.png"
                                alt
                              />
                            </div>
                          </div>
                          <div class="cs-value">{{data.missedTimes}}次</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </vue-scroll>
            </div>
            <div class="flex-item flex-1 bg">
              <div class="left-title">
                <div>
                  当前空气质量状况：
                  <span class="tip success-tip">优</span>
                </div>
                <div class="kqzl">
                  <span class="kqzl-title left-title2">时间选择：</span>
                  <div class="kqzl-date">
                    <el-date-picker
                      v-model="kqDate"
                      type="daterange"
                      ange-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :editable="false"
                    />
                  </div>
                  <div class="kqzl-btn">
                    <el-button type="primary" @click="kqQuery()">查询</el-button>
                  </div>
                </div>
              </div>
              <div class="kqzl-chart">
                <el-row>
                  <el-col :span="8">
                    <div class="zxjk-sqtchart" id="hylzb"></div>
                  </el-col>
                  <el-col :span="8">
                    <div class="zxjk-sqtchart" id="hwrzb"></div>
                  </el-col>
                  <el-col :span="8">
                    <div class="zxjk-sqtchart" id="hyjcs2"></div>
                  </el-col>
                </el-row>
              </div>
              <div class="kqzl-list">
                <div class="pt-table-title">空气状况</div>
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
                      <div class="pt-table-row" v-for="(zxjk, index) in kqData.data" :key="index">
                        <div class="th">{{index + 1 > 9 ? index + 1 : '0' + (index + 1)}}</div>
                        <div class="td">{{zxjk.date}}</div>
                        <div class="td pt-warn2-color">{{zxjk.AQI}}({{zxjk.quality}})</div>
                        <div class="td">{{zxjk.primaryPollutant}}</div>
                      </div>
                    </vue-scroll>

                    <!--                    <vue-scroll>
                      <div class="pt-table-row" v-for="index in 10" :key="index">
                        <div class="th">{{index > 9 ? index : '0' + index}}</div>
                        <div class="td">2021/04/20</div>
                        <div class="td pt-warn2-color">81</div>
                        <div class="td">臭氧（135）</div>
                      </div>
                    </vue-scroll>
                    -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-item flex-1 bg">
            <div class="left-title">
              <div>
                当前水质类别：
                <span class="tip">II类</span>
              </div>
              <div class="kqzl">
                <span class="kqzl-title left-title2">时间选择：</span>
                <div class="kqzl-date">
                  <el-date-picker
                    v-model="szDate"
                    type="daterange"
                    ange-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </div>
                <div class="kqzl-btn">
                  <el-button type="primary">查询</el-button>
                </div>
              </div>
            </div>
            <div class="kqzl-list" id="zs-nw-w"></div>
          </div>
        </div>
      </pt-panel>
    </div>
    <div class="center" id="center">
      <pt-panel>
        <div class="map-container">
          <div class="btns-bar">
            <div
              class="hjjc-btn"
              :class="{active: activeIndex === index}"
              @click="markerHandler(btn, index)"
              v-for="(btn, index) in markers"
              :key="index"
            >
              <img :src="btn.icon" alt style="width: 20px;" />
              <span class="btn-title">{{btn.title}}</span>
            </div>
          </div>
          <div class="hjjc-tl"></div>
          <div class="right-bar">
            <div
              class="right-btn"
              :class="{active: activeRightIndex === index}"
              @click="rightMarkerHandler(btn, index)"
              v-for="(btn, index) in rightMarkers"
              :key="index"
            >
              <img :src="btn.icon" alt :style="{width: btn.width || '20px'}" />
            </div>
          </div>
          <!--          <div class="afp-marker" @click="showMarker">
            <img src="assets/hjjc/dfp.png" alt="" style="width: 30px;">
          </div>
          -->
        </div>
        <div class="map" id="mymap"></div>
      </pt-panel>
    </div>
    <div class="right">
      <pt-panel radius>
        <div class="flex-list">
          <div class="flex-item flex-2 flex-1">
            <div class="flex-item" style="background: inherit;">
              <div class="right-flex">
                <div class="right-title">最新数据</div>
                <div class="right-body">
                  <div class="hjjc-table">
                    <!-- <div class="table-title">妈祖城海浮标1号</div> -->
                    <div class="table-body">
                      <vue-scroll :ops="ops">
                        <div class="table-header">
                          <div class="th" style="width: 80px">站点</div>
                          <div class="th" style="width: 80px">时间</div>
                          <div class="th" style="width: 50px">水温</div>
                          <div class="th" style="width: 50px">溶解氧</div>
                          <div class="th" style="width: 50px">盐度</div>
                          <div class="th" style="width: 50px">叶绿素</div>
                          <div class="th" style="width: 50px">浊度</div>
                          <div class="th" style="width: 50px">PH</div>
                          <div class="th" style="width: 50px">水温</div>
                          <div class="th" style="width: 50px">COD</div>
                          <div class="th" style="width: 50px">非离子氨</div>
                        </div>
                        <div class="table-row" v-for="i in 15" :key="i">
                          <div class="td" style="width: 80px">斗尾港标</div>
                          <div class="td" style="width: 80px">04/20 11:00</div>
                          <div class="td" style="width: 50px">18.0</div>
                          <div class="td" style="width: 50px">7.9</div>
                          <div class="td" style="width: 50px">32.1‰</div>
                          <div class="td" style="width: 50px">1.0</div>
                          <div class="td" style="width: 50px">6.6</div>
                          <div class="td" style="width: 50px">8.2</div>
                          <div class="td" style="width: 50px">18.2</div>
                          <div class="td" style="width: 50px">1.3</div>
                          <div class="td" style="width: 50px">0.02</div>
                        </div>
                      </vue-scroll>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--           <div class="flex-item-line">
              <div class="line-item"></div>
            </div>
            <div class="flex-item">
              <div class="hjjc-table">
                <div class="table-title">妈祖城海浮标2号</div>
                <vue-scroll :ops="ops">
                  <div class="table-body">
                    <div class="table-header">
                      <div class="th" style="width: 80px">时间</div>
                      <div class="th" style="width: 50px">水温</div>
                      <div class="th" style="width: 50px">溶解氧</div>
                      <div class="th" style="width: 50px">盐度</div>
                      <div class="th" style="width: 50px">叶绿素</div>
                      <div class="th" style="width: 50px">浊度</div>
                      <div class="th" style="width: 50px">PH</div>
                      <div class="th" style="width: 50px">水温</div>
                      <div class="th" style="width: 50px">COD</div>
                      <div class="th" style="width: 50px">非离子氨</div>
                    </div>
                    <div class="table-row" v-for="i in 15" :key="i">
                      <div class="td" style="width: 80px">04/20 11:00</div>
                      <div class="td" style="width: 50px">18.0</div>
                      <div class="td" style="width: 50px">7.9</div>
                      <div class="td" style="width: 50px">32.1‰</div>
                      <div class="td" style="width: 50px">1.0</div>
                      <div class="td" style="width: 50px">6.6</div>
                      <div class="td" style="width: 50px">8.2</div>
                      <div class="td" style="width: 50px">18.2</div>
                      <div class="td" style="width: 50px">1.3</div>
                      <div class="td" style="width: 50px">0.02</div>
                    </div>
                  </div>
                </vue-scroll>
              </div>
            </div>
            -->
          </div>
          <div class="flex-item">
            <div class="hjjc-table">
              <div class="table-title chart-title">24小时实测水质曲线图【{{fbName}}】</div>
              <div class="chart-radio">
                <el-checkbox v-model="szValue" :label="0">风力</el-checkbox>
                <el-checkbox v-model="szValue" :label="1">波高</el-checkbox>
                <el-checkbox v-model="szValue" :label="2">气温</el-checkbox>
                <el-checkbox v-model="szValue" :label="3">气压</el-checkbox>
                <el-checkbox v-model="szValue" :label="4">水温</el-checkbox>
              </div>
              <div class="table-body" style="padding-bottom: 0;">
                <div style="height: 100%" id="sz-chart"></div>
              </div>
            </div>
          </div>
          <div class="flex-item">
            <div class="hjjc-table">
              <div class="table-title chart-title">三24小时实测水质曲线图【{{fbName}}】</div>
              <div class="chart-radio">
                <el-checkbox v-model="sz2Value" :label="0">盐度</el-checkbox>
                <el-checkbox v-model="sz2Value" :label="1">PH</el-checkbox>
                <el-checkbox v-model="sz2Value" :label="2">溶解氧</el-checkbox>
                <el-checkbox v-model="sz2Value" :label="3">浊度</el-checkbox>
                <el-checkbox v-model="sz2Value" :label="4">叶绿素</el-checkbox>
              </div>
              <div class="table-body" style="padding-bottom: 0;">
                <div style="height: 100%" id="sz-chart2"></div>
              </div>
            </div>
          </div>
        </div>
      </pt-panel>
    </div>
    <el-dialog
      :visible.sync="markerVisible"
      :title="fpData.stationName"
      width="470px"
      class="marker-dialog"
      :modal="false"
    >
      <div class="marker-tip">
        <span>最新监测时间：{{fpData.createDate}}</span>
      </div>
      <div class="marker-type">
        <div>
          <el-row>
            <el-col :span="12">
              <span class="state">盐度：{{fpData.salinity}}</span>
            </el-col>
            <el-col :span="12">
              <span class="type">PH：{{fpData.ph}}</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <span class="state">溶解氧：{{fpData.dissolvedOxygen}}mg/L</span>
            </el-col>
            <el-col :span="12">
              <span class="type">浊度：{{fpData.turbidity}}NTU</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <span class="state">叶绿素：{{fpData.chlorophyll}}ug/L</span>
            </el-col>
            <el-col :span="12">
              <span class="type">水温：{{fpData.waterTempertature}}°C</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <span class="state">平均风速：{{fpData.windSpeed}}m/s</span>
            </el-col>
            <el-col :span="12">
              <span class="type">最大风速：{{fpData.windSpeedMax}}m/s</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <span class="state">风向：{{fpData.windDirection}}</span>
            </el-col>
            <el-col :span="12">
              <span class="type">风向值：{{fpData.windDirectionValue}}°</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <span class="state">风力等级：{{fpData.windLevel}}</span>
            </el-col>
            <el-col :span="12">
              <span class="type">浪级：{{fpData.waveLevel}}</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <span class="state">有效波高：{{fpData.waveHeight}}m</span>
            </el-col>
            <el-col :span="12">
              <span class="type">最大波高：{{fpData.waveHeightMax}}m</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <span class="state">气温：{{fpData.tempertature}}℃</span>
            </el-col>
            <el-col :span="12">
              <span class="type">气压：{{fpData.pressure}}hPa</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="radius-icon top-left"></div>
      <div class="radius-icon top-right"></div>
      <div class="radius-icon bottom-right"></div>
      <div class="radius-icon bottom-left"></div>
    </el-dialog>
    <el-dialog
      :visible.sync="markerVisible2"
      :title="fpData.stationName"
      width="270px"
      class="marker-dialog"
      :modal="false"
    >
      <div class="marker-type">
        <div>
          <template v-if="mapBtnActiveIndex === 2">
            <div>
              <span class="state">时间：{{fpData.createDate}}</span>
            </div>
            <div>
              <span class="state">平均风速：{{fpData.windSpeed}}m/s</span>
            </div>
            <div>
              <span class="type">最大风速：{{fpData.windSpeedMax}}m/s</span>
            </div>
            <div>
              <span class="state">风向：{{fpData.windDirection}}</span>
            </div>
            <div>
              <span class="state">风力等级：{{fpData.windLevel}}</span>
            </div>
            <div>
              <span class="state">类型：{{fpData.stationType}}</span>
            </div>
          </template>
          <template v-if="mapBtnActiveIndex === 3">
            <div>
              <span class="state">时间：{{fpData.createDate}}</span>
            </div>
            <div>
              <span class="state">有效波高：{{fpData.waveHeight}}m</span>
            </div>
            <div>
              <span class="type">最大波高：{{fpData.waveHeightMax}}m</span>
            </div>
            <div>
              <span class="type">浪级：{{fpData.waveLevel}}</span>
            </div>
            <div>
              <span class="state">类型：{{fpData.stationType}}</span>
            </div>
          </template>
          <template v-if="mapBtnActiveIndex === 4">
            <div>
              <span class="state">时间：{{fpData.createDate}}</span>
            </div>
            <div>
              <span class="state">气温：{{fpData.tempertature}}℃</span>
            </div>
            <div>
              <span class="state">类型：{{fpData.stationType}}</span>
            </div>
          </template>
          <template v-if="mapBtnActiveIndex === 5">
            <div>
              <span class="state">时间：{{fpData.createDate}}</span>
            </div>

            <div>
              <span class="type">气压：{{fpData.pressure}}hPa</span>
            </div>
            <div>
              <span class="state">类型：{{fpData.stationType}}</span>
            </div>
          </template>
          <template v-if="mapBtnActiveIndex === 6">
            <div>
              <span class="state">时间：{{fpData.createDate}}</span>
            </div>
            <div>
              <span class="type">水温：{{fpData.waterTempertature}}°C</span>
            </div>
            <div>
              <span class="state">类型：{{fpData.stationType}}</span>
            </div>
          </template>
          <template v-if="mapBtnActiveIndex === 7">
            <div>
              <span class="state">时间：{{fpData.createDate}}</span>
            </div>
            <div>
              <span class="state">叶绿素：{{fpData.chlorophyll}}ug/L</span>
            </div>
            <div>
              <span class="state">类型：{{fpData.stationType}}</span>
            </div>
          </template>
          <template v-if="mapBtnActiveIndex === 8">
            <div>
              <span class="state">时间：{{fpData.createDate}}</span>
            </div>
            <div>
              <span class="state">盐度：{{fpData.salinity}}</span>
            </div>
            <div>
              <span class="state">类型：{{fpData.stationType}}</span>
            </div>
          </template>
          <template v-if="mapBtnActiveIndex === 9">
            <div>
              <span class="state">时间：{{fpData.createDate}}</span>
            </div>
            <div>
              <span class="state">溶解氧：{{fpData.dissolvedOxygen}}mg/L</span>
            </div>
            <div>
              <span class="state">PH：{{fpData.ph}}mg/L</span>
            </div>
            <div>
              <span class="state">浊度：{{fpData.turbidity}}mg/L</span>
            </div>
            <div>
              <span class="state">类型：{{fpData.stationType}}</span>
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="radius-icon top-left"></div>
		<div class="radius-icon top-right"></div>
		<div class="radius-icon bottom-right"></div>
      <div class="radius-icon bottom-left"></div>-->
    </el-dialog>
  </div>
</template>

<script>
import '@supermap/iclient-classic/libs/SuperMap-8.1.1-17729'
import '@supermap/iclient-classic/libs/SuperMap_OGC-8.1.1-17729'
import axios from '@/utils/http.js'
import PtPanel from '@/components/panel'
import Api from '@/api'
export default {
  name: 'Dasj',
  components: { PtPanel },
  data() {
    return {
      map: null,//地图
      tiandituLayer: null, //矢量底图
      tianMarkerLayer: null,//矢量标签
      tiandituLayer_img: null,//影像底图
      tianMarkerLayer_img: null,//影像标签
      tiandituLayer_ter: null,//地形地图
      tianMarkerLayer_ter: null,//地形标签
      markersMap: null, //定义点图层
      lineLayer: null,//定义线图层
      drawLine: null,//定义测量距离事件
      drawPolygon: null,//定于画面控制
      polygonLayer: null,//定义面矢量图层
      vectorLayer: null,//定义定点图层
      infowin: null,
      zxjd: 119.1158,
      zxwd: 25.1174,
      zoomm: 12,
      marker: null, //定义点图层
      markersSearch: null,//定义搜索点图层
      projectNamewin: null,
      projectNamewinFd: null,
      layer: null,
      themeLayer: null,
      themeLayerCity: null,
      themeLayerCounty: null,
      fullscreen: false,
      ditu: "影像",
      strategy: null,//策略
      callbacks: null,
      selectFeature: null,
      wqStationNames: "", //水质站点列表
      buoyStationNames: "斗尾港标,湄洲岛", //海洋站点列表
      airStationNames: "秀屿区政府",//空气站点列表
      weatherStationNames: "秀屿区",//天气站点列表
      acquisitionDate: null,//采集时间
      cjData: [],//采集统计数据
      cjzsData: [],//采集展示数据
      kqData: {},//空气数据
      kqDate: [new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)],
      szDate: [new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)],
      fbMarkers: [//浮标点数据
        {
          name: '斗尾港标'
        }, {
          name: '湄洲岛'
        },
      ],
      fbName: '湄洲岛', //图表展示浮标名称
      fbDatas: [], //浮标总数据
      fbtbData: [],//浮标图表数据
      mapBtnActiveIndex: null,
      fpData: {},//浮标最新一条记录
      csImgWidth: null,
      sbValue: 2,
      szValue: [2],
      sz2Value: [2],
      ops: {
        bar: {
          background: 'rgba(238, 238, 238, 0.3)',
          keepShow: true
        },
        scrollPanel: {
          scrollingX: true,
          scrollingY: true
        }
      },
      markerVisible: false,
      markerVisible2: false,
      curMarker: {},
      chartKey: new Date().valueOf(),
      activeIndex: null,
      activeRightIndex: null,
      markers: [{
        title: '大浮漂',
        icon: 'assets/hjjc/dfp.png'
      }, {
        title: '小浮漂',
        icon: 'assets/hjjc/xfp.png'
      }, {
        title: '风力',
        icon: 'assets/hjjc/fl.png'
      }, {
        title: '浪高',
        icon: 'assets/hjjc/lg.png'
      }, {
        title: '气温',
        icon: 'assets/hjjc/qw.png'
      }, {
        title: '气压',
        icon: 'assets/hjjc/qy.png'
      }, {
        title: '水温',
        icon: 'assets/hjjc/sw.png'
      }, {
        title: '叶绿素',
        icon: 'assets/hjjc/yls.png'
      }, {
        title: '盐度',
        icon: 'assets/hjjc/yd.png'
      }, {
        title: '水质',
        icon: 'assets/hjjc/sz.png'
      }],
      rightMarkers: [{
        title: '全屏',
        icon: 'assets/hjjc/qp.png'
      }, {
        title: '还原',
        icon: 'assets/hjjc/hy.png'
      }, {
        title: '放大',
        icon: 'assets/hjjc/fd.png'
      }, {
        title: '缩小',
        icon: 'assets/hjjc/sx.png'
      }, {
        title: '标尺',
        icon: 'assets/hjjc/bc.png'
      }, {
        title: '地图',
        icon: 'assets/hjjc/dt.png'
      }, {
        title: '清屏',
        icon: 'assets/hjjc/ql.png',
        width: '30px'
      }]
    }
  },
  watch: {
    szValue: {
      handler() {
        this.createSjtjWl()
      }
    },
    sz2Value: {
      handler() {
        this.createSjtjHx()
      }
    }
  },
  mounted() {
    this.chushihua()
    this.getHjjcCjData()
    this.getKqData()
    this.getFbDatas()
    const that = this

    // that.csImgWidth = that.$refs.csImg.offsetWidth
    const t = setTimeout(() => {
      that.ylzbChart()
      that.wrzbChart()
      that.yjcs2Chart()
      that.drawChartSzNWw()
      that.createSjtjWl()
      that.createSjtjHx()
      clearTimeout(t)
    }, 500)
    //   window.onresize = () => {
    //     that.csImgWidth = that.$refs.csImg.offsetWidth
    //   }
  },
  methods: {
    // 在线监测采集次数aaa
    /**
    * 监控数据-空气数据
    */
    getHjjcCjData() {
      const that = this
      let time = that.acquisitionDate
      if (null != that.acquisitionDate) {
        time = that.dateFormat(that.acquisitionDate, "YYYY-mm-dd HH:MM")
      }
      Api.hjjcCjData(that.wqStationNames, that.buoyStationNames, that.airStationNames, that.weatherStationNames).then(result => {
        that.cjData = result.body
        that.cjzsData = result.body.countBuoyList
      })
    },
    /**
     * @param {Object} val
     * 站点类型切换
     */
    agreeChange(val) {
      // alert("设备切换id：" + val)
      const that = this
      that.sbValue = val;
      switch (val) {
        case 1:
          that.cjzsData = that.cjData.countWqList
          break
        case 2:
          that.cjzsData = that.cjData.countBuoyList
          break
        case 3:
          that.cjzsData = that.cjData.countWeatherList
          break
        case 4:
          that.cjzsData = that.cjData.countAirList
          break
      }
    },
    // 空气监测bbb
    /**
     * 监控数据-空气数据
     */
    getKqData() {
      const that = this
      const startTime = that.dateFormat(that.kqDate[0], "YYYY-mm-dd HH:MM")
      const endTime = that.dateFormat(that.kqDate[1], "YYYY-mm-dd HH:MM")
      Api.kqData('秀屿区政府', startTime, endTime).then(result => {
        that.kqData = result.body
      })
      console.log("空气数据：" + that.kqData)
    },

    /**
     * 查询空气监测数据
     */
    kqQuery() {
      const that = this
      that.getKqData()
      that.$nextTick(() => {
        that.ylzbChart()
        that.wrzbChart()
        that.yjcs2Chart()
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
     * 获取浮标数据 ccc
     */
    getFbDatas() {
      const that = this
      Promise.all(that.fbMarkers.map(item => Api.fb24hData(item.name))).then(results => {
        const mList = []
        let bouys = {}
        for (let i = 0; i < results.length; i++) {
          const result = results[i].body
          mList.push(result)
          bouys = $.extend(bouys, result)
        }
        that.fbDatas = bouys
        console.log('that.fbDatas数据')
        console.log(that.fbDatas)
        const name = '湄洲岛'
        //图表数据
        that.fbtbData = that.fbDatas[name].latest24hData
        that.fbName = name
        console.log('that.fbtbData数据')
        console.log(that.fbtbData)
      }).catch(e => {
        console.log(e)
      })
    },

    // 地图
    chushihua() {
      this.initMap();
      this.tiandituLayer.setVisibility(false);
      this.tianMarkerLayer.setVisibility(false);
      this.tiandituLayer_img.setVisibility(true);
      this.tianMarkerLayer_img.setVisibility(true);
      this.tiandituLayer_ter.setVisibility(false);
      this.tianMarkerLayer_ter.setVisibility(false);
      this.map.setBaseLayer(this.tiandituLayer_img);
    },
    initMap() {

      //设置绘制样式
      var style = {
        strokeColor: "#304DBE",
        strokeWidth: 2,
        pointerEvents: "visiblePainted",
        fillColor: "#304DBE",
        fillOpacity: 0.8
      };
      //新建线矢量图层
      this.lineLayer = new SuperMap.Layer.Vector("lineLayer");
      //对线图层应用样式style（前面有定义）
      this.lineLayer.style = style;
      //创建画线控制，图层是lineLayer;这里DrawFeature(图层,类型,属性)；multi:true在将要素放入图层之前是否现将其放入几何图层中
      this.drawLine = new SuperMap.Control.DrawFeature(this.lineLayer, SuperMap.Handler.Path, { multi: true });
      /*
      注册featureadded事件,触发drawCompleted()方法
      例如注册"loadstart"事件的单独监听
      events.on({ "loadstart": loadStartListener });
      */
      this.drawLine.events.on({ "featureadded": this.drawCompleted });
      //----------------
      //新建面矢量图层
      this.polygonLayer = new SuperMap.Layer.Vector("polygonLayer");
      //对面图层应用样式style（前面有定义）
      this.polygonLayer.style = style;
      /*
      注册featureadded事件,触发drawCompleted1()方法
      例如注册"loadstart"事件的单独监听
      events.on({ "loadstart": loadStartListener });
      */
      //创建画面控制，图层是polygonLayer
      this.drawPolygon = new SuperMap.Control.DrawFeature(this.polygonLayer, SuperMap.Handler.Polygon);
      this.drawPolygon.events.on({ "featureadded": this.drawCompleted1 });
      //初始化地图
      this.map = new SuperMap.Map("mymap", {
        controls: [
          new SuperMap.Control.Navigation(),
          //new SuperMap.Control.Zoom(),
          this.drawLine,
          this.drawPolygon
        ],
        allOverlays: true
      });

      //矢量底图
      this.tiandituLayer = new SuperMap.Layer.WMTS({
        name: "vec",
        url: "https://t0.tianditu.gov.cn/vec_c/wmts?tk=1d109683f4d84198e37a38c442d68311",
        layer: "vec",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        opacity: 1,
        requestEncoding: "KVP"
      });

      //矢量标签
      this.tianMarkerLayer = new SuperMap.Layer.WMTS({
        name: "vec",
        url: "https://t0.tianditu.gov.cn/cva_c/wmts?tk=1d109683f4d84198e37a38c442d68311",
        layer: "cva",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        opacity: 1,
        requestEncoding: "KVP"
      });

      this.tianMarkerLayer.layerType = "cva";
      this.tianMarkerLayer.isLabel = true;
      //影像底图
      this.tiandituLayer_img = new SuperMap.Layer.WMTS({
        name: "img",
        url: "https://t0.tianditu.gov.cn/img_c/wmts?tk=1d109683f4d84198e37a38c442d68311",
        layer: "img",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        opacity: 1,
        visibility: false,
        requestEncoding: "KVP"
      });

      //影像标签
      this.tianMarkerLayer_img = new SuperMap.Layer.WMTS({
        name: "cia",
        url: "https://t0.tianditu.gov.cn/cia_c/wmts?tk=1d109683f4d84198e37a38c442d68311",
        layer: "cia",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        opacity: 1,
        visibility: false,
        requestEncoding: "KVP"
      });
      this.tianMarkerLayer_img.layerType = "cva";
      this.tianMarkerLayer_img.isLabel = true;

      //地形地图
      this.tiandituLayer_ter = new SuperMap.Layer.WMTS({
        name: "ter",
        url: "https://t0.tianditu.gov.cn/ter_c/wmts?tk=1d109683f4d84198e37a38c442d68311",
        layer: "ter",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        opacity: 1,
        visibility: false,
        requestEncoding: "KVP"
      });

      //地形标签
      this.tianMarkerLayer_ter = new SuperMap.Layer.WMTS({
        name: "cta",
        url: "https://t0.tianditu.gov.cn/cta_c/wmts?tk=1d109683f4d84198e37a38c442d68311",
        layer: "cta",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        opacity: 1,
        visibility: false,
        requestEncoding: "KVP"
      });

      this.tianMarkerLayer_ter.layerType = "cta";
      this.tianMarkerLayer_ter.isLabel = true;
      this.vectorLayer = new SuperMap.Layer.Vector("vectorLayer");

      this.map.addLayers([
        this.tiandituLayer,
        this.tianMarkerLayer,
        this.tiandituLayer_img,
        this.tianMarkerLayer_img,
        this.tiandituLayer_ter,
        this.tianMarkerLayer_ter,
        this.vectorLayer
        //this.lableLayer
      ]);
      this.map.setCenter(new SuperMap.LonLat(this.zxjd, this.zxwd), this.zoomm);
      //this.addMarker();
      //添加地图缩放事件
      this.map.events.on({ "zoomend": this.callbackFunction });  //地图添加zoom操作完成后被触发。事件
      // this.map.events.on({"moveend": this.moveendFunction});  //地图pan或zoom操作完成时被触发。
      // this.addThemeLayer();
      // 注册 mousemove 事件
      // this.vectorLayer.events.on("mousemove", this.themeMouseover);
      // this.vectorLayer.events.on("mouseout", this.themeMouseout);
      this.callbacks = {
        over: this.themeMouseover,
        out: this.themeMouseout,
        click: this.themeMouseClick
      };
      this.selectFeature = new SuperMap.Control.SelectFeature(this.vectorLayer, {
        callbacks: this.callbacks
      });
      this.map.addControl(this.selectFeature);
      this.selectFeature.activate();
      this.addPoint(1);


    },
    screen() {

      // let element = document.documentElement;//设置后就是我们平时的整个页面全屏效果
      let element = document.getElementById('center');//设置后就是   id==con_lf_top_div 的容器全屏
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;

    },


    /**
     * 点击图标
     */
    markerHandler(btn, index) {
      const that = this
      this.addPoint(index);
      that.activeIndex = index
      // that.$message({
      //   type: 'success',
      //   message: `你点击了${btn.title}`
      // })
    },

    addPoint(index) {
      if (index == 0) {

        //pic+="dfp.png"
        return;
      }
      this.vectorLayer.removeAllFeatures();
      var centerPoint = new SuperMap.Geometry.Point(119.05, 25.07);
      var pic = "assets/hjjc/";
      var style = {
        externalGraphic: pic,
        graphicYOffset: -10,
        graphicWidth: 40, // 图片宽
        graphicHeight: 40 // 图片高
      }
      if (index == 1) {
        pic += "xfp.png"
        style.graphicWidth = 25;

      }
      if (index == 2) {
        pic += "fl.png"
      }
      if (index == 3) {
        pic += "lg.png"
      }
      if (index == 4) {
        pic += "qw.png"
        style.graphicWidth = 25;

      }
      if (index == 5) {
        pic += "qy.png"
      }
      if (index == 6) {
        pic += "sw.png"
      }
      if (index == 7) {
        pic += "yls.png"
        style.graphicHeight = 25;

      }
      if (index == 8) {
        pic += "yd.png"
      }
      if (index == 9) {
        pic += "sz.png"
      }

      style.externalGraphic = pic;
      var centerPoint2 = new SuperMap.Geometry.Point(119.21, 25.12);
      var item = { id: 1, chose: index, name: '斗尾港标' };
      var pointVector = new SuperMap.Feature.Vector(centerPoint, item, style);
      this.vectorLayer.addFeatures([pointVector]);
      var item2 = { id: 2, chose: index, name: '湄洲岛' };
      var pointVector2 = new SuperMap.Feature.Vector(centerPoint2, item2, style);
      this.vectorLayer.addFeatures([pointVector2]);
      this.mapBtnActiveIndex = index;
    },

    // /**
    //  * 点击图标
    //  */
    // markerHandler(btn, index) {
    //   const that = this
    //   that.activeIndex = index
    //   that.$message({
    //     type: 'success',
    //     message: `你点击了${btn.title}`
    //   })
    // },

    /**
     * 点击图标
     */
    rightMarkerHandler(btn, index) {
      const that = this
      that.activeRightIndex = index
      if (index == 2) {
        that.mBtn("放大");
      }
      if (index == 3) {
        that.mBtn("缩小");
      }
      if (index == 4) {
        that.mBtn("测距");
      }
      if (index == 6) {
        that.mBtn("清除");
      }
      if (index == 1) {
        that.mBtn("还原");
      }
      if (index == 5) {
        let di = that.ditu;
        if (di == "矢量") {
          that.ditu = "影像"
          that.mBtn(that.ditu);
        }
        if (di == "影像") {
          that.ditu = "矢量"
          that.mBtn(that.ditu);
        }

      }
      if (index == 0) {
        that.screen();
      }
    },

    themeMouseover() {
      // var str="";
      // 	for (var data in e.attributes){
      // 		str +=data+":"+e[data]+"\n";
      // 	}

      // 	alert("str==:\n"+str);

    },
    themeMouseout() {

    },
    //点击浮标
    themeMouseClick(e) {

      let that = this;
      let poiontId = e.data.id;
      let index = e.data.chose;
      let url = 'http://121.199.37.147:8888/ptserver/a/jeeplusapi/buoy/getLatestData?stationName='
      const name = e.data.name;
      //图表数据
      that.fbName = name
      that.fbtbData = that.fbDatas[name].latest24hData
      that.createSjtjWl();
      that.createSjtjHx();
      if (poiontId == 1) {
        url += '斗尾港标'
      }
      if (poiontId == 2) {
        url += '湄洲岛'
      }
      axios({
        method: 'get',
        url: url
        // data:{stationName: "斗尾港标"}

      })
        .then(function (response) {

          console.log(response.data.body.latestData);
          that.fpData = response.data.body.latestData;
          //var data = response.data.body.latestData
          console.log(that.fpData);


          //alert(this.fpData)
        })
        .catch(function (error) {
          console.log(error);
        });
      if (index == 1) {
        this.showMarker();
      } else {
        this.markerVisible2 = true
      }
    },
    mBtn(fun) {
      switch (fun) {
        case "放大": this.map.zoomIn(); break;
        case "缩小": this.map.zoomOut(); break;
        case "还原": this.map.setCenter(new SuperMap.LonLat(this.zxjd, this.zxwd), this.zoomm); this.map.pan; break;
        case "测距": this.distanceMeasure(); break;
        case "量算": this.areaMeasure(); break;
        case "清除": this.clearFeatures(); break;
        case "矢量":
          this.tiandituLayer.setVisibility(true);
          this.tianMarkerLayer.setVisibility(true);
          this.tiandituLayer_img.setVisibility(false);
          this.tianMarkerLayer_img.setVisibility(false);
          this.tiandituLayer_ter.setVisibility(false);
          this.tianMarkerLayer_ter.setVisibility(false);
          this.map.setBaseLayer(this.tiandituLayer);
          break;
        case "影像":
          this.tiandituLayer.setVisibility(false);
          this.tianMarkerLayer.setVisibility(false);
          this.tiandituLayer_img.setVisibility(true);
          this.tianMarkerLayer_img.setVisibility(true);
          this.tiandituLayer_ter.setVisibility(false);
          this.tianMarkerLayer_ter.setVisibility(false);
          this.map.setBaseLayer(this.tiandituLayer_img);
          break;
        case "地形":
          this.tiandituLayer.setVisibility(false);
          this.tianMarkerLayer.setVisibility(false);
          this.tiandituLayer_img.setVisibility(false);
          this.tianMarkerLayer_img.setVisibility(false);
          this.tiandituLayer_ter.setVisibility(true);
          this.tianMarkerLayer_ter.setVisibility(true);
          this.map.setBaseLayer(this.tiandituLayer_ter);
          break;
      }
    },
    //测量距离
    distanceMeasure() {
      // this.clearFeatures();
      this.drawLine.activate();
    },

    //测量触发事件
    drawCompleted(drawGeometryArgs) {
      //停止画面控制
      this.drawLine.deactivate();
      //获得图层几何对象
      var geometry = drawGeometryArgs.feature.geometry,
        measureParam = new SuperMap.REST.MeasureParameters(geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
        myMeasuerService = new SuperMap.REST.MeasureService("http://39.99.247.43:8726/iserver/services/map-ws2/rest/maps/控制单元_全国_1_1_1@Kzdy"); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
      myMeasuerService.events.on({ "processCompleted": this.measureCompleted });

      //对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是Mea 	ode.AREA
      myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;
      myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
    },

    //测量结束调用事件
    measureCompleted(measureEventArgs) {
      // alert(123)
      var distance = measureEventArgs.result.distance;
      distance = distance.toFixed(2);
      // alert(distance);
      this.$message({
        type: 'success',
        message: "测量距离：" + distance + "米"
      })
    },
    //移除图层要素
    clearFeatures() {
      // this.markersSearch.clearMarkers();
      // this.lineLayer.removeAllFeatures();
      this.vectorLayer.removeAllFeatures();

    },

    /**
     * 物理因素绘制统计图表
     */
    createSjtjWl() {
      const that = this
      const $chart = echarts.init(document.getElementById('sz-chart'))
      $chart.clear()
      const series = [
        {
          name: '风力',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.windSpeed || '0').valueOf()]),
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
          name: '波高',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.waveHeight || '0').valueOf()]),
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
          name: '气温',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.tempertature || '0').valueOf()]),
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
          name: '气压',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.tempertature || '0').valueOf()]),
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
        }, {
          name: '水温',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.waterTempertature || '0').valueOf()]),
          markLine: {
            symbol: 'none',
            label: {
              color: 'rgb(255, 0, 255)',
              formatter: '平均'
            },
            lineStyle: {
              color: 'rgb(255, 0, 255)'
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
              { offset: 0, color: 'rgb(255, 0, 255)' },
              { offset: 1, color: '#000000' }
            ]),
            opacity: 0.1
          },
          lineStyle: {
            color: 'rgb(255, 0, 255)'
          },
          endLabel: {
            show: true,
            formatter: '实时',
            color: 'rgb(255, 0, 255)'
          }
        },
      ]
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
          type: 'time',
          data: that.fbtbData.map(item => item.pubTime),
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
        series: series.filter((item, index) => that.szValue.includes(index))
      }
      $chart.setOption(option)
    },

    /**
     * 化学因素绘制统计图表
     */
    createSjtjHx() {
      const that = this
      const $chart = echarts.init(document.getElementById('sz-chart2'))
      $chart.clear()
      const series = [
        {
          name: '盐度',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.salinity || '0').valueOf()]),
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
          name: 'PH',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.ph || '0').valueOf()]),
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
          data: that.fbtbData.map(item => [item.pubTime, Number(item.dissolvedOxygen || '0').valueOf()]),
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
          name: '浊度',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.turbidity || '0').valueOf()]),
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
        }, {
          name: '叶绿素',
          data: that.fbtbData.map(item => [item.pubTime, Number(item.chlorophyll || '0').valueOf()]),
          markLine: {
            symbol: 'none',
            label: {
              color: 'rgb(255, 0, 255)',
              formatter: '平均'
            },
            lineStyle: {
              color: 'rgb(255, 0, 255)'
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
              { offset: 0, color: 'rgb(255, 0, 255)' },
              { offset: 1, color: '#000000' }
            ]),
            opacity: 0.1
          },
          lineStyle: {
            color: 'rgb(255, 0, 255)'
          },
          endLabel: {
            show: true,
            formatter: '实时',
            color: 'rgb(255, 0, 255)'
          }
        },
      ]
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
          type: 'time',
          data: that.fbtbData.map(item => item.pubTime),
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
        series: series.filter((item, index) => that.sz2Value.includes(index))
      }
      $chart.setOption(option)
    },

    drawChartSz() {
      const $chart = echarts.init(document.getElementById('sz-chart'))
      $chart.clear()
      const option = {
        grid: {
          top: 30,
          bottom: 50,
          left: 30,
          right: 10
        },
        xAxis: {
          type: 'category',
          data: ['04月10日 00:00', '04月10日 12:00', '04月11日 00:00', '04月11日 12:00', '04月12日 00:00', '04月12日 12:00', '04月13日 00:00', '04月13日 12:00'],
          axisLabel: {
            color: '#ffffff',
            formatter(value) {
              const values = value.split(' ')
              return [`{a|${values[1]}}`, `{b|${values[0]}}`].join('\n')
            },
            rich: {
              a: {
                fontSize: 12,
                fontWeight: 'bolder'
              },
              b: {
                fontSize: 10
              }
            }
          }
        },
        yAxis: {
          type: 'value',
          interval: 15,
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
              opacity: 0.1
            }
          }
        },
        series: [{
          data: [30, 20, 15, 19, 17, 3, 9, 10],
          type: 'line',
          symbol: 'none',
          lineStyle: {
            color: '#b82495'
          }
        }]
      }
      $chart.setOption(option)
    },

    /**
     * 优良占比
     */
    ylzbChart() {
      const that = this
      const $chart = echarts.init(document.getElementById('hylzb'))
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
          data: [that.kqData.excellentRatio] // 系列中的数据内容数组
        }]
      }
      $chart.setOption(option)
    },

    /**
     * 污染占比
     */
    wrzbChart() {
      const that = this
      const $chart = echarts.init(document.getElementById('hwrzb'))
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
          data: [that.kqData.polluteRatio] // 系列中的数据内容数组
        }]
      }
      $chart.setOption(option)
    },

    /**
     * 预警次数2
     */
    yjcs2Chart() {
      const that = this
      const $chart = echarts.init(document.getElementById('hyjcs2'))
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
              return that.kqData.warningTimes
            }
          },
          data: [that.kqData.warningTimes] // 系列中的数据内容数组
        }]
      }
      $chart.setOption(option)
    },

    /**
     * 绘制第三个面板chart表
     */
    drawChartSzNWw() {
      const $chart = echarts.init(document.getElementById('zs-nw-w'))
      const option = {
        title: [{
          top: '75%',
          left: '15%',
          text: '内湾',
          textStyle: {
            color: 'rgb(160, 193, 216)',
            fontSize: 14,
            fontWeight: 'lighter'
          }
        }, {
          top: '75%',
          left: '70%',
          text: '外湾',
          textStyle: {
            color: 'rgb(160, 193, 216)',
            fontSize: 14,
            fontWeight: 'lighter'
          }
        }],
        legend: {
          left: 'center',
          top: 'bottom',
          textStyle: {
            color: 'rgb(160, 193, 216)',
            fontSize: 12,
            fontWeight: 'lighter'
          },
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          top: 40,
          bottom: 100
        },
        label: {
          show: true,
          textBorderWidth: 0,
          color: '#ffffff',
          formatter: '{d}%',
          fontSize: 10
        },
        series: [{
          name: '内湾',
          type: 'pie',
          radius: '50%',
          center: ['25%', '50%'],
          labelLine: {
            length2: 0
          },
          data: [
            {
              value: 86, name: 'I类',
              itemStyle: {
                borderWidth: 0,
                color: 'rgba(207, 249, 255, 0.8)',
                /*normal: {
                  borderWidth: 1,
                  borderColor: 'rgb(160, 193, 216)'
                }*/
              }
            },
            {
              value: 157, name: 'II类',
              itemStyle: {
                color: 'rgba(241, 235, 0, 0.8)',
                /*normal: {
                  borderWidth: 1,
                  borderColor: 'rgb(160, 193, 216)'
                }*/
              }
            },
            {
              value: 544, name: 'III类',
              itemStyle: {
                color: 'rgba(112, 254, 0, 0.8)',
                /*normal: {
                  borderWidth: 1,
                  borderColor: 'rgb(160, 193, 216)'
                }*/
              }
            },
            {
              value: 223, name: 'IV类',
              itemStyle: {
                color: 'rgba(1, 202, 254, 0.8)',
                /*normal: {
                  borderWidth: 1,
                  borderColor: 'rgb(160, 193, 216)'
                }*/
              }
            }
          ],
        }, {
          name: '外湾',
          type: 'pie',
          radius: '50%',
          center: ['75%', '50%'],
          labelLine: {
            length2: 0
          },
          data: [
            {
              value: 73, name: 'I类',
              itemStyle: {
                color: 'rgba(207, 249, 255, 0.8)',
                /*normal: {
                  borderWidth: 1,
                  borderColor: 'rgb(160, 193, 216)'
                }*/
              }
            },
            {
              value: 28, name: 'II类',
              itemStyle: {
                color: 'rgba(241, 235, 0, 0.8)',
                /*normal: {
                  borderWidth: 1,
                  borderColor: 'rgb(160, 193, 216)'
                }*/
              }
            },
            {
              value: 496, name: 'III类',
              itemStyle: {
                color: 'rgba(112, 254, 0, 0.8)',
                /*normal: {
                  borderWidth: 1,
                  borderColor: 'rgb(160, 193, 216)'
                }*/
              }
            },
            {
              value: 181, name: 'IV类',
              itemStyle: {
                color: 'rgba(1, 202, 254, 0.8)',
                /*normal: {
                  borderWidth: 1,
                  borderColor: 'rgb(160, 193, 216)'
                }*/
              }
            }
          ]
        }]
      }
      $chart.setOption(option)
    },

    // 显示当前marker
    showMarker() {
      this.markerVisible = true
    }
  }
}
</script>

<style scoped>
.hjjc-container {
  flex-direction: row;
  min-height: 800px;
}
.left,
.right {
  flex-basis: 0;
  flex-grow: 0;
  min-width: 376px;
  overflow: hidden;
}
.center {
  flex-basis: 0;
  flex-grow: 3;
  overflow: hidden;
  margin: 0 10px;
}
.flex-list {
  height: calc(100% - 20px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.flex-item {
  flex-basis: 0;
  flex-grow: 1;
  background: rgba(160, 193, 216, 0.102);
  overflow: hidden;
}
.flex-1 {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: inherit;
}
.flex-1.bg {
  background: rgba(160, 193, 216, 0.102);
}
.flex-item.flex-2 {
  flex-grow: 2;
}
.flex-item-line {
  min-height: 1px;
  flex-basis: 0;
  flex-grow: 0;
  padding: 0 10px;
  background: rgba(160, 193, 216, 0.102);
}
.flex-item-line > .line-item {
  background: rgb(160, 193, 216);
  height: 1px;
}
.flex-item + .flex-item {
  margin-top: 10px;
}
.map {
  height: 100%;
  /* background: url(../assets/hjjc/bg.png) no-repeat center; */
}
.btns-bar {
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 10px;
  z-index: 1405;
}
.hjjc-btn {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgb(160, 193, 216);
  background: rgba(13, 26, 67, 0.702);
  height: 50px;
  padding: 0 20px;
}
.hjjc-btn + .hjjc-btn {
  margin-top: 15px;
}
.hjjc-btn > .btn-title {
  margin-left: 10px;
}
.hjjc-btn:hover,
.hjjc-btn.active {
  background: rgba(41, 87, 231, 0.902);
  color: #ffffff;
  cursor: pointer;
}
.right-bar {
  /* background-color: rgba(160, 193, 216, 0.2); */
  background-color: rgba(26, 46, 84, 0.83);
  position: absolute;
  padding: 30px 0;
  right: 0;
  top: 0;
  z-index: 1500;
}
.right-btn {
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right-btn:hover,
.right-btn.active {
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.afp-marker {
  position: absolute;
  left: 710px;
  top: 315px;
  cursor: pointer;
}
.marker-type {
  margin-top: 10px;
}
.marker-type > div + div {
  margin-top: 10px;
}
.marker-type .type {
  font-weight: bolder;
}
.hjjc-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.table-title {
  font-size: 14px;
  color: rgb(255, 255, 255);
  padding: 10px;
  text-align: center;
  flex-basis: 0;
  flex-grow: 0;
  min-height: 17px;
}
.table-body {
  flex-basis: 0;
  flex-grow: 1;
  overflow: hidden;
  padding-bottom: 10px;
}
.table-header {
  font-size: 12px;
  color: rgb(160, 193, 216);
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  margin: 10px 0;
}
.table-header > .th {
  display: inline-block;
}
.table-row {
  font-size: 12px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  padding: 3px 0;
}
.table-row > .td {
  display: inline-block;
}
.chart-title {
  font-size: 12px;
  color: rgb(255, 255, 255);
  text-align: center;
  padding: 10px 0;
}
.chart-radio {
  text-align: center;
  flex-basis: 0;
  flex-grow: 0;
  min-height: 22px;
}
.right-flex {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.right-title {
  color: #ffffff;
  font-size: 14px;
  padding: 0 0 10px 0;
  min-height: 17px;
  flex-basis: 0;
  flex-grow: 0;
}
.right-body {
  flex-basis: 0;
  flex-grow: 1;
  background: rgba(160, 193, 216, 0.102);
}
.left-title {
  min-height: 53px;
  flex-basis: 0;
  flex-grow: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
}
.left-title .tip {
  font-size: 18px;
  color: #39f3ff;
}
.tip.success-tip {
  color: #66ff97;
}
.left-item {
  flex-basis: 0;
  flex-grow: 1;
  padding: 10px;
}
.left-1-flex {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.left-1-item {
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
}
.sblx {
  font-size: 14px;
  color: rgb(255, 255, 255);
  padding: 10px 0;
}
.kqzl {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  margin-top: 10px;
}
.kqzl > .kqzl-title {
  min-width: 70px;
  flex-basis: 0;
  flex-grow: 0;
  display: flex;
  align-items: center;
}
.kqzl > .kqzl-date {
  flex-basis: 0;
  flex-grow: 1;
}
.kqzl > .kqzl-btn {
  min-width: 65px;
  flex-basis: 0;
  flex-grow: 0;
  text-align: center;
}
.kqzl-chart {
  min-height: 100px;
  flex-basis: 0;
  flex-grow: 0;
  overflow: hidden;
  margin-top: 10px;
}
.kqzl-list {
  flex-basis: 0;
  flex-grow: 1;
  overflow: hidden;
  margin: 10px 0;
}
.kqzl-list.sz-chart {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.left-subtitle {
  font-size: 14px;
  color: rgb(160, 193, 216);
  display: inline-block;
}
.left-subtitle-text {
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  position: relative;
}
.left-subtitle-text > img {
  position: absolute;
  top: -2px;
  right: -23px;
}
.cs-flex {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.cs-flex > .cs-title {
  min-width: 70px;
  font-size: 14px;
  flex-basis: 0;
  flex-grow: 0;
  color: rgb(160, 193, 216);
}
.left-title2 {
  color: rgb(160, 193, 216);
}
.cs-flex > .cs-img {
  flex-basis: 0;
  flex-grow: 1;
  position: relative;
}
.cs-flex > .cs-img img {
  height: 15px;
  width: 100%;
}
.cs-flex > .cs-img .active-img {
  position: absolute;
  height: 17px;
  left: 0;
  top: 0;
  overflow: hidden;
}
.cs-flex > .cs-value {
  flex-basis: 0;
  flex-grow: 0;
  min-width: 32px;
  font-size: 14px;
  text-align: center;
}
.zxjk-sqtchart {
  height: 100px;
}
.hjjc-tl {
  width: 87px;
  height: 111px;
  left: 10px;
  bottom: 10px;
  position: absolute;
  background: url(../assets/home/tl.png) no-repeat center;
  background-size: 100% 100%;
}
</style>