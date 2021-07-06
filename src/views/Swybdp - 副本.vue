<template>
  <div id="box">
        <div class="box-left">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div class="pub-biaoTi">数据统计</div>
            <div class="jilu">已记录 <span>14663</span> 个动植物生态监测数据</div>
            <div class="jilu">总用户为<span> 526 </span>人</div>
            <div class="video_list">
                <div class="one">
                    <img src="../assets/img.png"   alt="">
                </div>
                <div class="two">13381  张图片</div>
            </div>
            <div class="video_list">
                 <div class="one">
                        <img src="../assets/video.png"  alt="">
                </div>
                <div class="two">1282  个视频</div>
            </div>
            <div class="video_list">
                 <div class="one">
                         <img src="../assets/text.png"  alt="">
                </div>
                <div class="two">3240  条记录</div>
            </div>
            <div class="huanXing">
                <div>
                    <el-progress type="circle" :percentage="37.7"  :width="80"  color="#39F3FF" ></el-progress>
                    <div >4000种</div>
                    <div >生物图片</div>
                </div>
                <div>
                    <el-progress type="circle" :percentage="42.8" :width="80" color="#6FFF9E" ></el-progress>
                    <div >236种</div>
                    <div >动物视频</div>
                </div>
                <div>
                    <el-progress type="circle" :percentage="86.7" :width="80" color="#D6E023" ></el-progress>
                    <div >660种</div>
                    <div >生物记录</div>
                </div>
            </div>
            <div class="pub-biaoTi tops">观测样本数据</div>
            <div class="changeTime">
                <div >时间选择:</div>
                <div > 
                    <el-date-picker
                        v-model="time"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="起始时间"
                        end-placeholder="结束时间">
                        </el-date-picker>
                </div>
                <div style="cursor: pointer;">
                    查询
                </div>
            </div>
             <div class="ceList" style=" margin-top: .1875rem; background: rgba(160, 193, 216, 0.1); ">
                    <div>序号</div>
                    <div>观测时间</div>
                    <div>观测点</div>
                    <div>记录者</div>
                </div>
            <div class="guanCeList">
                <div class="ceList">
                    <div>021</div>
                    <div>2021-03-02 10:0-14:00</div>
                    <div>N24.26 E131.10</div>
                    <div>高天流云</div>
                </div>
                 <div class="ceList">
                    <div>022</div>
                    <div>2021-03-02 07:03-5:04</div>
                    <div>N26.26 E119.01</div>
                    <div>漂泊极北鲵</div>
                </div>
                 <div class="ceList">
                    <div>023</div>
                    <div>2021-03-02 10:0-14:00</div>
                    <div>N24.26 E131.10</div>
                    <div>金雕</div>
                </div>
                 <div class="ceList">
                    <div>024</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>叫我大圣</div>
                </div>
                 <div class="ceList">
                    <div>025</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>NN24.21 E117.08</div>
                    <div>基操勿六</div>
                </div>
                 <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
                 <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
                 <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
                <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
                <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
                <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
                <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
                <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
                <div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div><div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div><div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div><div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div><div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div><div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div><div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div><div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div><div class="ceList">
                    <div>026</div>
                    <div>2021-03-02 11:10-16:10</div>
                    <div>N24.21 E117.08</div>
                    <div>奔波霸</div>
                </div>
            </div>
        </div>
        <div class="box-content" id="content">
			
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <!-- <img src="../assets/bagounrd.jpg" style="width:83%;height:50%" alt=""> -->
            <div class="btn" @click="putChuang">
                <div></div>
            </div>
            <div class="tanImg" v-if="show" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div class="closes">
                    <div>生物样本情况</div>
                    <div @click="xiaoshi" style="cursor: pointer;">
                        <i class="el-icon-close" size="40" color="white"></i>
                    </div>
                </div>
                <div class="phonto">
                    <div>拍照时间: <span>{{sectionData.createTime}}</span></div>
                    <div>拍摄地点: <span>{{sectionData.address}}</span></div>
                </div>
                <div class="phonto">
                    <div>上传用户名: <span>{{sectionData.userName}}</span></div>
                    <div>文件大小: <span>98kb</span></div>
                </div>
                <div class="bai">{{sectionData.brTitle}}<span></span></div>
                <div class="brief">{{sectionData.brContent}}</div>
                <div class="briefImg">
					<!-- ../assets/weitu.png -->
                    <img :src="imgArr[index]" style="width:100%;height:100%" alt="">
                    <div class="swiper">
                        <i class="el-icon-arrow-left" @click="left" v-show='index!=0'></i>
                        <i class="el-icon-arrow-right" @click="right" v-show='index<imgArr.length-1'></i>
                        </div>
                </div>
            </div>
            <div class="center-search">
                <div class="search1" v-if="searchShow == 1" @click="searchShow = 2">
                    <img src="../assets/searchs.png" alt="">
                </div>
                <div class="search2" v-if="searchShow == 2|| searchShow == 3">
                    <div class="search1">
                        <img src="../assets/lefts.png"  alt=""  @click="searchShow = 1">
                    </div>
                    <div style="display:flex;margin-left:4px">
                       <input type="text" id="searchVal" v-model="searchTitle" class="putContent" placeholder="请输入内容" >
                       <div class="search1" @click="changeMapBtn(0)"><img src="../assets/searchs.png"  alt=""></div>
                    </div>
                    <div @click="gaoSouSuo" style="cursor: pointer;">高级搜索</div>
                </div>
                <div class="search3" v-if="searchShow == 3">
                    <div style="display:flex;align-items: center;">
                        <div class="timeFanwei">时间范围:</div>
                        <div style="flex:1;margin-left:5px">
                            <el-date-picker
                                v-model="time"
								value-format="yyyy-MM-dd"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="起始时间"
                                end-placeholder="结束时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div style="display:flex">
                        <div class="timeFanwei">类别:</div>
                        <div style="display:flex">
                            <div class="birder"  @click="changeSearchBtn(1)">植物</div>
                            <div class="birder"  @click="changeSearchBtn(3)">鱼类</div>
                            <div class="birder"  @click="changeSearchBtn(2)">鸟类</div>
                            <div class="birder"  @click="changeSearchBtn(4)">其他</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left_down"  >
                <!-- <v-fishi :name="leftDown" :defaultImg="defaultImg" ></v-fishi> -->
				<div class="zik" >
				  <div class="niao"  @click="changeMapBtn(2)">
				    <div ></div>
				    <div >鸟类</div>
				  </div>
				  <div class="fishi" @click="changeMapBtn(3)">
				    <div></div>
				    <div>鱼类</div>
				  </div>
				  <div class="shen" @click="changeMapBtn(1)">
				    <div></div>
				    <div>植物</div>
				  </div>
				  <div class="hai" @click="changeMapBtn(4)">
				    <div></div>
				    <div>海草</div>
				  </div>
				</div>
            </div>
            <div class="top_right">
                <div @click="changeRightBtn(0)"><img src="../assets/icon1.png" alt=""></div>
                <div @click="changeRightBtn(1)"><img src="/assets/hjjc/hy.png" :style="{width:  '20px'}" alt=""></div>
                <div @click="changeRightBtn(2)"><img src="../assets/icon3.png" alt=""></div>
                <div @click="changeRightBtn(3)"><img src="assets/hjjc/sx.png" :style="{width:  '20px'}" alt=""></div>
                <div @click="changeRightBtn(4)"><img src="../assets/icon5.png" alt=""></div>
                <div @click="changeRightBtn(5)"><img src="../assets/icon6.png" alt=""></div>
            </div>
            <div class="bottom-right" >
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="1" style="color:#A0C1D8;margin:5px 0">大爱湖植被</el-checkbox>
                    <el-checkbox label="2" style="color:#A0C1D8;margin:5px 0">诞生地植被</el-checkbox>
                    <el-checkbox label="3" style="color:#A0C1D8;margin:5px 0">妈祖阁植被</el-checkbox>
                    <el-checkbox label="4" style="color:#A0C1D8;margin:5px 0">女儿湾植被</el-checkbox>
                    <el-checkbox label="5" style="color:#A0C1D8;margin:5px 0">内湾植被</el-checkbox>
                </el-checkbox-group>
            </div>
			<div class="map" id="mymap" >
				<!-- <img src="../assets/bagounrd.jpg" style="width:100%;height:100%" alt=""> -->
			</div>
        </div>
        <div class="box-right" >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div class="pub-biaoTi">植物类别</div>
            <div class="zhiWu">
                <div>
                    <img src="../assets/tree1.png"  alt="">
                    <div>乔木</div>
                </div>
                 <div>
                    <img src="../assets/tree2.png"  alt="">
                    <div>灌木</div>
                </div>
                 <div>
                    <img src="../assets/tree3.png"  alt="">
                    <div>草本</div>
                </div>
            </div>
            <div class="zhiWu">
                <div>
                    <img src="../assets/tree4.png"  alt="">
                    <div>挺水</div>
                </div>
                 <div>
                    <img src="../assets/tree5.png"  alt="">
                    <div>浮水</div>
                </div>
                 <div>
                    <img src="../assets/tree6.png"  alt="">
                    <div>沉水</div>
                </div>
            </div>
            <div id="myChart" class="echats"></div>
             <div class="pub-biaoTi tops">植物种植统计图</div>
             <div class="zW_title">
                        <div>乔木灌木</div>
                        <div>数量(株)</div>
                        <div>草本水生</div>
                        <div>数量(平米)</div>
                </div>
             <div class="zW">
                     <div>
                        <div>蒲桃</div>
                        <div>59</div>
                        <div>木麻黄</div>
                        <div>1767</div>
                    </div>
                     <div>
                        <div>洋蒲桃</div>
                        <div>128</div>
                        <div>湿地松</div>
                        <div>1779.1</div>
                    </div>
                     <div>
                        <div>大花紫薇</div>
                        <div>25</div>
                        <div>台湾相思</div>
                        <div>4018</div>
                    </div>
                    <div>
                        <div>花叶榕</div>
                        <div>211</div>
                        <div>打叶龙船花</div>
                        <div>324.2</div>
                    </div>
                    <div>
                        <div>红车</div>
                        <div>72</div>
                        <div>硬骨凌霄</div>
                        <div>1307.5</div>
                    </div>
                    <div>
                        <div>龙柏球A</div>
                        <div>29</div>
                        <div>大花芦莉</div>
                        <div>490.6</div>
                    </div>
                    <div>
                        <div>龙柏球B</div>
                        <div>27</div>
                        <div>变叶木</div>
                        <div>234.4</div>
                    </div>
                    <div>
                        <div>紫薇</div>
                        <div>89</div>
                        <div>翠芦莉</div>
                        <div>657</div>
                    </div>
                    <div>
                        <div>海槿</div>
                        <div>116</div>
                        <div>桔红苔草</div>
                        <div>60.2</div>
                    </div>
                     <div>
                        <div>黄槿</div>
                        <div>117</div>
                        <div>缀花草坪</div>
                        <div>60.2</div>
                    </div>
                     <div>
                        <div>海槿</div>
                        <div>116</div>
                        <div>桔红苔草</div>
                        <div>97950.6</div>
                    </div>
                     <div>
                        <div>红绒球</div>
                        <div>124</div>
                        <div>射干</div>
                        <div>607.1</div>
                    </div>
                   <div>
                        <div>蒲桃</div>
                        <div>59</div>
                        <div>木麻黄</div>
                        <div>1767</div>
                    </div>
                     <div>
                        <div>洋蒲桃</div>
                        <div>128</div>
                        <div>湿地松</div>
                        <div>1779.1</div>
                    </div>
                     <div>
                        <div>大花紫薇</div>
                        <div>25</div>
                        <div>台湾相思</div>
                        <div>4018</div>
                    </div>
                    <div>
                        <div>花叶榕</div>
                        <div>211</div>
                        <div>打叶龙船花</div>
                        <div>324.2</div>
                    </div>
                    <div>
                        <div>红车</div>
                        <div>72</div>
                        <div>硬骨凌霄</div>
                        <div>1307.5</div>
                    </div>
                    <div>
                        <div>龙柏球A</div>
                        <div>29</div>
                        <div>大花芦莉</div>
                        <div>490.6</div>
                    </div>
                    <div>
                        <div>龙柏球B</div>
                        <div>27</div>
                        <div>变叶木</div>
                        <div>234.4</div>
                    </div>
                    <div>
                        <div>紫薇</div>
                        <div>89</div>
                        <div>翠芦莉</div>
                        <div>657</div>
                    </div>
                    <div>
                        <div>海槿</div>
                        <div>116</div>
                        <div>桔红苔草</div>
                        <div>60.2</div>
                    </div>
                     <div>
                        <div>黄槿</div>
                        <div>117</div>
                        <div>缀花草坪</div>
                        <div>60.2</div>
                    </div>
                     <div>
                        <div>海槿</div>
                        <div>116</div>
                        <div>桔红苔草</div>
                        <div>97950.6</div>
                    </div>
                     <div>
                        <div>红绒球</div>
                        <div>124</div>
                        <div>射干</div>
                        <div>607.1</div>
                    </div>
                    <div>
                        <div>蒲桃</div>
                        <div>59</div>
                        <div>木麻黄</div>
                        <div>1767</div>
                    </div>
                     <div>
                        <div>洋蒲桃</div>
                        <div>128</div>
                        <div>湿地松</div>
                        <div>1779.1</div>
                    </div>
                     <div>
                        <div>大花紫薇</div>
                        <div>25</div>
                        <div>台湾相思</div>
                        <div>4018</div>
                    </div>
                    <div>
                        <div>花叶榕</div>
                        <div>211</div>
                        <div>打叶龙船花</div>
                        <div>324.2</div>
                    </div>
                    <div>
                        <div>红车</div>
                        <div>72</div>
                        <div>硬骨凌霄</div>
                        <div>1307.5</div>
                    </div>
                    <div>
                        <div>龙柏球A</div>
                        <div>29</div>
                        <div>大花芦莉</div>
                        <div>490.6</div>
                    </div>
                    <div>
                        <div>龙柏球B</div>
                        <div>27</div>
                        <div>变叶木</div>
                        <div>234.4</div>
                    </div>
                    <div>
                        <div>紫薇</div>
                        <div>89</div>
                        <div>翠芦莉</div>
                        <div>657</div>
                    </div>
                    <div>
                        <div>海槿</div>
                        <div>116</div>
                        <div>桔红苔草</div>
                        <div>60.2</div>
                    </div>
                     <div>
                        <div>黄槿</div>
                        <div>117</div>
                        <div>缀花草坪</div>
                        <div>60.2</div>
                    </div>
                     <div>
                        <div>海槿</div>
                        <div>116</div>
                        <div>桔红苔草</div>
                        <div>97950.6</div>
                    </div>
                     <div>
                        <div>红绒球</div>
                        <div>124</div>
                        <div>射干</div>
                        <div>607.1</div>
                    </div>
             </div>
        </div>
  </div>
</template>

<script>
	import '@supermap/iclient-classic/libs/SuperMap-8.1.1-17729'
	import '@supermap/iclient-classic/libs/SuperMap_OGC-8.1.1-17729'
	import axios from '@/utils/http.js'
import fishi from "@/components/fishi"
export default {
    data(){
        return {
			map:null,//地图
			tiandituLayer:null, //矢量底图
			tianMarkerLayer:null,//矢量标签
			tiandituLayer_img:null,//影像底图
			tianMarkerLayer_img:null,//影像标签
			tiandituLayer_ter:null,//地形地图
			tianMarkerLayer_ter:null,//地形标签
			markersMap:null, //定义点图层
			lineLayer:null,//定义线图层
			drawLine:null,//定义测量距离事件
			drawPolygon:null,//定于画面控制
			polygonLayer:null,//定义面矢量图层
			vectorLayer:null,//定义定点图层
			infowin:null,
			zxjd:119.1356,
			zxwd:25.1174,
			zoomm:12,
			marker:null, //定义点图层
			markersSearch:null,//定义搜索点图层
			projectNamewin:null,
			projectNamewinFd:null,
			layer:null,
			themeLayer:null,
			themeLayerCity:null,
			themeLayerCounty:null,
			fullscreen:false,
			ditu:"影像",
			strategy:null,//策略
			callbacks:null,
			selectFeature:null,
			mapBtnActiveIndex:null,
			sectionData:{},
			imgArr:[],
			index:0,
			searchType:-1,
			searchTitle:"",
            time:'',
            show:false,
            checkList:[],
            searchShow:'1',
            leftDown:"鱼类",
            defaultImg:'../assets/niao.png'
        }
    },
   components:{
       'v-fishi':fishi
   },
    created(){
  
    },
    mounted(){
		//location.reload()
		this.chushihua();
        this.getEcharts()
    },
    methods:{
		changeSearchBtn(a){
			if(a==1){
				this.searchType = "1"
			}
			if(a==2){
				this.searchType = "2"
			}
			if(a==3){
				this.searchType = "3"
			}
			if(a==4){
				this.searchType = "4"
			}
		},
		changeMapBtn(a){
			
			var that = this;
			let type = "-1";
			let createTimeBegin = null;
			let createTimeEnd = null;
			let brTitle = null;
			if(a==1){
				type = "1";
			}
			if(a==2){
				type = "2";
			}
			if(a==3){
				type = "3";
			}
			if(a==4){
				type = "4";
			}
			if(a==11){
				type = "1";
				createTimeBegin = this.time[0];
				createTimeEnd = this.time[1];
				
			}
			if(a==12){
				type = "2";
				createTimeBegin = this.time[0];
				createTimeEnd = this.time[1];
				
			}
			if(a==13){
				type = "3";
				createTimeBegin = this.time[0];
				createTimeEnd = this.time[1];
				
			}
			if(a==14){
				type = "4";
				createTimeBegin = this.time[0];
				createTimeEnd = this.time[1];
				
			}
			if(a==0){
				
				brTitle = this.searchTitle;
				createTimeBegin = this.time[0];
				createTimeEnd = this.time[1];
				type = this.searchType;
				
				// alert(brTitle+"--"+type+"--"+createTimeBegin)
			}
			axios({
			  method:'post',
			  url: 'http://127.0.0.1:8082/a/jeeplusapi/biology/getData',
			  params:{
				  brTitle: brTitle,
				  brType: type,
				 createTimeBegin: createTimeBegin,
				 createTimeEnd: createTimeEnd
				  }
			})
			.then(function (response) {
				
			console.log(response.data.body.data);
			var pointList = response.data.body.data;
			that.vectorLayer.removeAllFeatures();
			
			pointList.filter( (item,i) =>{
			        console.log(item);
					that.addPoint(item);
			       
			    } )
			that.map.setCenter(new SuperMap.LonLat(that.zxjd,that.zxwd), 14);
			//that.fpData = response.data.body.latestData;
			//var data = response.data.body.latestData
			//console.log(that.fpData);
			
			
			//alert(this.fpData)
			})
			.catch(function (error) {
			  console.log(error);
			});
		},
		chushihua(){
		      this.initMap();
		      this.tiandituLayer.setVisibility(false);
		      this.tianMarkerLayer.setVisibility(false);
		      this.tiandituLayer_img.setVisibility(true);
		      this.tianMarkerLayer_img.setVisibility(true);
		      this.tiandituLayer_ter.setVisibility(false);
		      this.tianMarkerLayer_ter.setVisibility(false);
		      this.map.setBaseLayer(this.tiandituLayer_img);
			  this.changeMapBtn("all");
			  // if(a==1){
				 //  alert(1)
				 //   this.mBtn("放大");
			  // }
			  // this.mBtn("放大");
		    },
		initMap(){
		        
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
		          this.drawLine = new SuperMap.Control.DrawFeature(this.lineLayer, SuperMap.Handler.Path, {multi: true});
		          /*
		          注册featureadded事件,触发drawCompleted()方法
		          例如注册"loadstart"事件的单独监听
		          events.on({ "loadstart": loadStartListener });
		          */
		          this.drawLine.events.on({"featureadded": this.drawCompleted});
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
		          this.drawPolygon.events.on({"featureadded": this.drawCompleted1});
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
		              visibility:false,
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
		              visibility:false,
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
		              visibility:false,
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
		              visibility:false,
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
		          this.map.setCenter(new SuperMap.LonLat(this.zxjd,this.zxwd), this.zoomm);
		          //this.addMarker();
		          //添加地图缩放事件
		          this.map.events.on({"zoomend": this.callbackFunction});  //地图添加zoom操作完成后被触发。事件
		         // this.map.events.on({"moveend": this.moveendFunction});  //地图pan或zoom操作完成时被触发。
		         // this.addThemeLayer();
		        // 注册 mousemove 事件
		        // this.vectorLayer.events.on("mousemove", this.themeMouseover);
		        // this.vectorLayer.events.on("mouseout", this.themeMouseout);
		    				this.callbacks = {
		    					over : this.themeMouseover,
		    					out : this.themeMouseout,
		    					click : this.themeMouseClick
		    					};
		    					this.selectFeature = new SuperMap.Control.SelectFeature(this.vectorLayer, {
		    						callbacks : this.callbacks
		    				});
		    				this.map.addControl(this.selectFeature);
		    				this.selectFeature.activate();
		       // this.map.zoomIn();
		    
		        
		 },
		 /**
		  * 点击图标
		  */
		 changeRightBtn(index) {
		   const that = this
		   that.activeRightIndex = index
		 		if(index==2){
					
		 			that.mBtn("放大");
		 		}
		 		if(index==3){
		 			that.mBtn("缩小");
		 		}
		 		if(index==4){
		 			that.mBtn("测距");
		 		}
		 		if(index==6){
		 			that.mBtn("清除");
		 		}
		 		if(index==1){
		 			that.mBtn("还原");
		 		}
		 		if(index==5){
		 			let di = that.ditu;
		 			if(di=="矢量"){
		 				that.ditu = "影像"
		 				that.mBtn(that.ditu);
		 			}
		 			if(di=="影像"){
		 				that.ditu = "矢量"
		 				that.mBtn(that.ditu);
		 			}
		 			
		 		}
		 		if(index==0){
		 			
		 				that.screen();
		 			
		 			
		 		}
		 		
		 },
		 mBtn(fun){
			
		     switch (fun) {
		       case "放大" : this.map.zoomIn();break;
		       case "缩小" : this.map.zoomOut();break;
		       case "还原" : this.map.setCenter(new SuperMap.LonLat(this.zxjd,this.zxwd), this.zoomm);this.map.pan;break;
		       case "测距" : this.distanceMeasure();break;
		       case "量算" : this.areaMeasure();break;
		       case "清除" : this.clearFeatures();break;
		       case "矢量" : 
		         this.tiandituLayer.setVisibility(true);
		         this.tianMarkerLayer.setVisibility(true);
		         this.tiandituLayer_img.setVisibility(false);
		         this.tianMarkerLayer_img.setVisibility(false);
		         this.tiandituLayer_ter.setVisibility(false);
		         this.tianMarkerLayer_ter.setVisibility(false);
		         this.map.setBaseLayer(this.tiandituLayer);
		         break;
		       case "影像" : 
		         this.tiandituLayer.setVisibility(false);
		         this.tianMarkerLayer.setVisibility(false);
		         this.tiandituLayer_img.setVisibility(true);
		         this.tianMarkerLayer_img.setVisibility(true);
		         this.tiandituLayer_ter.setVisibility(false);
		         this.tianMarkerLayer_ter.setVisibility(false);
		         this.map.setBaseLayer(this.tiandituLayer_img);
		         break;
		       case "地形" : 
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
		   addPoint(item){
		   
		   	// this.vectorLayer.removeAllFeatures();
		   	var centerPoint = new SuperMap.Geometry.Point(item.longitude, item.latitude);
		   	var pic = "assets/hjjc/lg.png";
		   	var style = {
		   		strokeColor:"#339933",
		   		    strokeOpacity:1,
		   		    strokeWidth:2,
		   		    pointRadius:4

		   	}
		   
		   	
		   	var pointVector = new SuperMap.Feature.Vector(centerPoint, item,style);
		   	this.vectorLayer.addFeatures([pointVector]);
			
			
		   //	this.mapBtnActiveIndex=index;
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
		   myMeasuerService.events.on({"processCompleted": this.measureCompleted});
		 
		   //对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是Mea 	ode.AREA
		   myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;
		   myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
		 },
		 
		 //测量结束调用事件
		 measureCompleted(measureEventArgs) {
		 	
		   var distance = measureEventArgs.result.distance;
		 		distance=distance.toFixed(2);
		 //alert(distance);
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
		 //全屏方法
		 screen(){
		    	
		     // let element = document.documentElement;//设置后就是我们平时的整个页面全屏效果
		     let element = document.getElementById('content');//设置后就是   id==con_lf_top_div 的容器全屏
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
			//地图落点鼠标悬停方法
		themeMouseover() {
			
			// var str="";
			// 	for (var data in e.attributes){
			// 		str +=data+":"+e[data]+"\n";
			// 	}
				
			// 	alert("str==:\n"+str);
				
		},
		 //地图落点鼠标移走方法
		themeMouseout() {
		
		},
		//地图落点鼠标点击方法
		themeMouseClick(e){
			
			this.sectionData = e.data;
			this.imgArr = this.sectionData.filePathList.map(item => 'http://121.199.37.147:8888/ptserver/files/' + item.filePath),
			// this.imgArr = ["../assets/weitu.png","../assets/yu.png","../assets/yuS.png"]
			console.log(e.data);
			this.putChuang();
		},
        gaoSouSuo(){
            this.searchShow == 3? this.searchShow =2: this.searchShow = 3
        },
        putChuang(){
            this.show = true
        },
        xiaoshi(){
            this.show = false
        },
		left(){
			this.index--;
		},
		right(){
		    this.index++;
		    console.log(this.index)
		    
		},
		
        getEcharts(){
            var chartDom = document.getElementById('myChart');
            var myChart = this.$echarts.init(chartDom, 'dark');
              var   option = {
                   backgroundColor: '',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#ffffff'
                            }
                        }
                    },
                    grid:{
                  x:50,
                  y:50,
                  x2:50,
                  y2:60,
                  borderWidth:10
	       },
                legend: {
                    x:'center',
                    y:'bottom',
                    data: ['乔木灌木类', '草本类'],
                    icon:'rect',
                    
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["大爱湖","女儿湾","妈祖阁","祖祠","内湾"],
                        axisPointer: {
                            type: 'shadow'
                        },
                    
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '(株)',
                        min: 0,
                        max: 3000,
                        interval: 1000,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                type:'dashed'
                            }
                        }
                    },
                    {
                        type: 'value',
                        name: '(公顷)',
                        min: 0,
                        max: 15,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        },
                         splitLine:{
                            show:true,
                            lineStyle:{
                                type:'dashed'
                            }
                        }
                    }
                ],
                series: [
                    {
                        showBackground: true,

                        backgroundStyle: {
                            color: 'rgba(160, 193, 216, 0.05)'
                        },
                        name: '乔木灌木类',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: "rgba(16, 144, 255, 0)" // 100% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(16, 144, 255, 1)" // 0% 处的颜色
                                }], false)
                            },
                        },
                        data: [1520,149,1085,417,3105]
                    },
                    {
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(160, 193, 216, 0.05)'
                        },
                        name: '草本类',
                        type: 'bar',
                        yAxisIndex: 1,
                        itemStyle: {
						normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: "rgba(23, 255, 99, 0)" // 0% 处的颜色
                                },
                                {
                                    offset: 0.6,
                                    color: "rgba(23, 255, 99, 1)" // 0% 处的颜色
                                }], false)
                            }
					    },
                        data: [12.9,2.9,2.68,9.9,14.6]
                    },
                ]
            };
            
        myChart.setOption(option)
        // window.onresize = myChart.resize;
        }
    }
}
</script>   

<style>
/* 	* {
	    padding: 0;
	    margin: 0;
	    box-sizing: border-box;
	}
 */    body {
        background-color: #000000;

    }
    .el-progress-circle__track {
        stroke: #20325B;
      }
    #box {
		position: absolute;
        max-width: 24rem;
        min-width: 12.8rem;
        width: 100%;
        /* padding: .1625rem .1875rem; */
        display: flex;
        color: #ffffff;
        overflow: hidden;
        height: 100%;
    }
    .box-left {
        flex:2;
        background-color: #0C204D;
        padding: .2125rem .125rem;
        position: relative;
        border: .0125rem solid rgba(160, 193, 216, 0.3);
		margin-bottom: 10px;
    }
    .box-left>span:first-child {
        position: absolute;
        left: 0;
        top: 0;
        width: .15rem;
        height: .025rem;
        background: #D6E023;
        border-radius: 2px;
    }
    .box-left>span:nth-child(2) {
        position: absolute;
        top: 0;
        right: 0;
        width: .15rem;
        height: .025rem;
        background: #D6E023;
        border-radius: 2px;
    }
    .box-left>span:nth-child(3){
        position: absolute;
        left: 0;
        bottom: 0;
        width: .15rem;
        height: .025rem;
        background: #D6E023;
        border-radius: 2px;
    }
    .box-left>span:nth-child(4) {
        position: absolute;
        right: 0;
        bottom: 0;
        width: .15rem;
        height: .025rem;
        background: #D6E023;
        border-radius: 2px;
    }
    .box-content {
        flex:7;

        /* margin: 0 .225rem; */
		margin: 0 10px;
/*        flex:4;
>>>>>>> a90c5feb85f95b78daa37e27d160cc64eb32339e
        margin: 0 .225rem;
 */
        position: relative;
        border: .0125rem solid rgba(160, 193, 216, 0.6);
		margin-bottom: 10px;
    }
    .box-content>span:nth-child(1){
        position: absolute;
        left: -0.0125rem;
        top: -0.0125rem;
        width: .1rem;
        height: .1rem;
        border-top: .025rem solid #D6E023;
        border-left: .025rem solid #D6E023;
    }
    .box-content>span:nth-child(2){
        position: absolute;
        right: -0.0125rem;
        top: -0.0125rem;
        width: .1rem;
        height: .1rem;
        border-top: .025rem solid #D6E023;
        border-right: .025rem solid #D6E023;
    }
    .box-content>span:nth-child(3){
        position: absolute;
        left: -0.0125rem;
        bottom: -0.0125rem;
        width: .1rem;
        height: .1rem;
        border-bottom: .025rem solid #D6E023;
        border-left: .025rem solid #D6E023;
		
    }
    .box-content>span:nth-child(4){
        position: absolute;
        right: -0.0125rem;
        bottom: -0.0125rem;
        width: .1rem;
        height: .1rem;
        border-bottom: .025rem solid #D6E023;
        border-right: .025rem solid #D6E023;
    }
    .btn {
       position: absolute;
       top: 6.25rem;
       left: 1.25rem;
       width: .25rem;
        height: .25rem;
        background: rgba(57, 243, 255, 0.2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .btn>div {
        width: .1rem;
        height: .1rem;
        background: #39F3FF;
        border-radius: 50%;
    }
    .tanImg {
        position: absolute;
        left: 7.5rem;
        top: 1.75rem;
        width: 5.275rem;
        height: 6.125rem;
        background: linear-gradient(360deg, #007798 0%, #0055A8 100%);
        border: 1px solid #02ADEE;
        padding: .1625rem .1625rem .125rem .225rem;
        font-size: .2rem;
		z-index: 1489;
    }
    .tanImg>span:nth-child(1){
        position: absolute;
        left: 0;
        top: 0;
        width: .1rem;
        height: .1rem;
        background: #D6E023;
    }
    .tanImg>span:nth-child(2){
        position: absolute;
        right: 0;
        top: 0;
        width: .1rem;
        height: .1rem;
        background: #D6E023;
    }
    .tanImg>span:nth-child(3){
        position: absolute;
        left: 0;
        bottom: 0;
        width: .1rem;
        height: .1rem;
        background: #D6E023;
    }
    .tanImg>span:nth-child(4){
        position: absolute;
        right: 0;
        bottom: 0;
        width: .1rem;
        height: .1rem;
        background: #D6E023;
		z-index: 1489;
    }
    .closes {
        display: flex;
        justify-content: space-between;
    }
    .closes>div:first-child {
        padding-top: .125rem;
        font-weight: 600;
    }
    .phonto {
        display: flex;
        margin-top: .125rem;
        font-size: .175rem;
        color: #A0C1D8;
    }
    .phonto>div {
        flex: 1;
    }
    .phonto span {
        color: #ffffff;
    }
    .bai {
        font-size: .3rem;
        margin-top: .25rem;
    }
    .bai span {
        font-size: .225rem;
    }
    .brief {
        font-size: .175rem;
        margin-top: .2rem;
    }
    .briefImg {
        width: 4.825rem;
        height: 2.925rem;
        margin-top: .125rem;
        position: relative;
        display: flex;
        align-items: center;
    }
    .swiper{
        position: absolute;
        width: 100%;
        font-size: .475rem;
        display: flex;
        justify-content: space-between;
    }
    .swiper>i {
        cursor: pointer;
    }
    .box-right {
        flex:2;
        padding: .2125rem .1375rem;
        background-color: #0C204D;
        box-sizing: border-box;
        position: relative;
        border: .0125rem solid rgba(160, 193, 216, 0.3);
		margin-bottom: 10px;
    }
    .box-right>span:first-child {
        position: absolute;
        left: 0;
        top: 0;
        width: .15rem;
        height: .025rem;
        background: #D6E023;
        border-radius: 2px;
    }
    .box-right>span:nth-child(2) {
        position: absolute;
        top: 0;
        right: 0;
        width: .15rem;
        height: .025rem;
        background: #D6E023;
        border-radius: 2px;
    }
    .box-right>span:nth-child(3){
        position: absolute;
        left: 0;
        bottom: 0;
        width: .15rem;
        height: .025rem;
        background: #D6E023;
        border-radius: 2px;
    }
    .box-rightt>span:nth-child(4) {
        position: absolute;
        right: 0;
        bottom: 0;
        width: .15rem;
        height: .025rem;
        background: #D6E023;
        border-radius: 2px;
    }
    .pub-biaoTi {
        font-size: .175rem;
        font-weight: 600;
        font-family: PingFangSC-Semibold, PingFang SC;
    }
    .jilu {
        font-size: .2rem;
        text-align: center;
    }
    .jilu>span {
        font-size: .325rem;
        font-weight: 600;
        color: #D6E023;
    }
    .video_list {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: .125rem;
    }
    .one {
        width: .625rem;
        height: .625rem;
        border: 2px solid rgba(92, 210, 255, 0.7);
        border-radius: 50%;
        background-color: #0c204d;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .one>img {
        width: .3rem;
        height: .3rem;
    }
    .video_list>img {
        width: .625rem;
        height: .625rem;
        border-radius: 50%;
    }
    .two {
        box-sizing: border-box;
        width: 2.175rem;
        height: .4875rem;
        background: rgba(2, 173, 238, 0.25);
        border-radius: .25rem;
        color: #ffffff;
        line-height: .4875rem;
        text-align: center;
        font-size: .2rem;
        margin-left: .1875rem;
    }
    .huanXing {
        display: flex;
        margin-top: .25rem;
    }
    .huanXing>div {
        flex: 1;
        text-align: center;
    }
    .el-progress__text {
        font-size: .25rem !important;
        color: #ffffff !important;
    }
    .tops {
        margin-top: .375rem;
        margin-bottom: .25rem;
    }
    .changeTime {
        display: flex;
        align-items: center;
        margin-top: .25rem;
        box-sizing: border-box;
    }
    .changeTime>div:first-child {
        flex: 1;
        font-size: .15rem;
        color: #A0C1D8;
    }
    .changeTime>div:nth-child(2){
        flex: 3;
    }
    .changeTime>div:last-child {
        flex: 1;
        border: 1px solid #00C7FF;
        height: .35rem;
        margin-left: .125rem;
        font-size: .175rem;
        line-height: .35rem;
        text-align: center;
        color: #39F3FF;
    }
    .el-range-editor {
        width: 100%  !important;
        font-size: .125rem !important;
        color: #A0C1D8 !important;
        height: .35rem !important;
    }
    .el-input__inner {
        border: 1px solid rgba(160, 193, 216, 0.35)  !important;
        background-color: #0C204D  !important;
    }
    .el-range-input {
        background-color: #0C204D  !important;
    }
    .el-range__icon {
        color: rgba(160, 193, 216, 0.35) !important;
        line-height: .275rem !important;
    }
    .el-range__close-icon {
        line-height: .275rem !important;
    }
    .el-range-input {
        color: #A0C1D8 !important;
    }
    .guanCeList {
        width: auto;
        height: 5.625rem;
		/* height: 2.63rem; */
        background: rgba(160, 193, 216, 0.1);
        /* padding: 0 .175rem; */
        font-size: .075rem;
        overflow-y:auto;
    }
    .guanCeList::-webkit-scrollbar {/*滚动条整体样式*/
        width: .125rem;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .guanCeList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(160, 193, 216, 0.2);
            background: rgba(160, 193, 216, 0.2);
        }
    .guanCeList::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(160, 193, 216, 0.1);
            border-radius: 10px;
            background: rgba(160, 193, 216, 0.1);
        }
    .ceList {
        display: flex;
        padding: .1375rem 0 ;
        border-bottom:  1px solid rgba(160, 193, 216, 0.2);
        text-align: center;
        align-items: center;
    }
    .ceList>div:nth-child(2n){
        flex: 2;
    }
    .ceList>div:nth-child(n){
        flex: 1;
    }
    .zhiWu {
        display: flex;
        text-align: center;
        background-color: #0C204D;
    }
    .zhiWu>div{
        flex: 1;
    }
    .zhiWu img {
        width: 1.25rem;
        height: 1rem;
    }
    .echats {
        width: 86%;
        height: 3.75rem;
        margin-top: .0625rem;
        background-color: #0C204D;
    }
    .zW {
        box-sizing: border-box;
        height: 4.75rem;
		/* height: 1.83rem; */
        overflow: hidden;
        /* padding: .1625rem .1875rem; */
        overflow-y:auto;
        background-color: #20325B;
    }
     .zW::-webkit-scrollbar {/*滚动条整体样式*/
        width: .125rem;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .zW::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(160, 193, 216, 0.2);
            background: rgba(160, 193, 216, 0.2);
        }
    .zW::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(160, 193, 216, 0.1);
            border-radius: 10px;
            background: rgba(160, 193, 216, 0.1);
        }
    .zW>div {
        display: flex;
        margin-top: .125rem;
        text-align: center;
        font-size: .15rem;
    }
    .zW>div>div {
        flex: 1;
    }
    .zW_title {
        display: flex;
        padding-bottom: .2rem;
        border-bottom: 1px solid rgba(160,193,216,0.35);
        color: #a0c1d8;
        background-color: #20325B;
        padding-top: .125rem;
    }
    .zW_title>div {
        flex: 1;
        text-align: center;
    }
    .center-search {
        font-size: .175rem;
        position: absolute;
        left: 0;
        top: .625rem;
		z-index: 1501;
    }
    .search1 {
        width: .55rem;
        height: .55rem;
        border-radius: .0625rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        background: rgba(12, 32, 77, 0.9);
        justify-content: center;
        cursor: pointer;
    }
    .search1> img {
        width: .25rem;
        height: .25rem;
		z-index: 1500;
		
    }
    .search2 {
        display: flex;
        align-items: center; 
		z-index: 1500;
		
    }
    .search2>div:nth-child(2){
        width: 3.125rem;
        height: .55rem;
        background-color: rgba(12, 32, 77, 0.9);
    }
    .search2>div:last-child{
        width: 1.25rem;
        height: .55rem;
        text-align: center;
        line-height: .55rem;
        background-color: rgba(12, 32, 77, 0.9);
        margin-left: .075rem;
    }
    .inputs {
        margin: 7px 0;
        flex: 1;
        line-height: .375rem;
        padding-left: .125rem;
        color: #A0C1D8;
        border-right:  1px solid rgba(160, 193, 216, 0.35);
    }
    .search3 {
        width: 4.45rem;
        height: 1.5625rem;
        background-color: rgba(12, 32, 77, 0.9);
        margin: .0625rem .6125rem;
        padding: .1875rem .3125rem;
    }
    .timeFanwei {
        width: .875rem;
        text-align: right;
        padding-right: .0625rem;
    }
    .birder {
        width: .5rem;
        height: .325rem;
        background: rgba(12, 32, 77, 0.9);
        border: 1px solid #ffffff;
        border-radius: 2px;
        margin-left: .125rem;
        text-align: center;
        line-height: .325rem;
        cursor: pointer;
    }
    .search3>div:last-child{
        margin-top: .25rem;
        align-items: center;
    }
    .left_down {
        position: absolute;
        left: .25rem;
        bottom: .3125rem;
        /* border: 1px red solid; */
        font-size: .175rem;
		z-index: 1502;
       /* height: 3.75rem;
       flex-direction: column;
       justify-content: space-around;
       border: 1px red solid; */
    }
     /* .left_down img {
        width: .25rem;
        height: .25rem;
        border-radius: 50%;
    } */
    .top_right {
        position: absolute;
        right: 0;
        top: 0;
        width: .625rem;
        height: 5rem;
        background: rgba(160, 193, 216, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: .25rem 0;
		z-index: 1500;
    }
    .top_right>div {
        flex:1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
		z-index: 1500;
		
    }
    .top_right>div:hover {
        background-color: rgba(160, 193, 216, 0.2);
    }
    .top_right>img {
        width: .2rem;
        height: .2rem;
    }
    .bottom-right {
        position: absolute;
        bottom: .3125rem;
        right: 0;
        width: 1.75rem;
		z-index: 1500;
		
    }
    .el-icon-close {
        font-size: 26px;
    }
    .putContent{
        background:none;  
        outline:none;  
        border:none;
        color: #ffffff;
        padding-left: .125rem;
    }
	.map{
		
		width: 100%;
	    height: 100%;
	  /* background: url(../assets/hjjc/bg.png) no-repeat center; */
	}
	.zik {
	    height: 2rem;
	    display: flex;
	    flex-direction: column;
	    justify-content: space-around;
	}
	.fishi {
	  width: .65rem;
	  height: 0.4rem;
	  display: flex;
	  justify-content: space-between;
	  cursor: pointer;
	  overflow: hidden;
	}
	.fishi > div:first-child {
	 width: .8125rem;
	  height: .4rem;
	  background: url(../assets/yu.png) no-repeat center rgba(92, 210, 255, 0.15);
	  /* border: 1px red solid; */
	  background-size: .225rem .225rem;
	  border-radius: 50%;
	}
	.fishi > div:last-child {
	  width: 0.625rem;
	  height: 0.4rem;
	  line-height: 0.4rem;
	  visibility: hidden;
	  display: flex;
	}
	.fishi:hover {
	  width: 1.375rem;
	  border: 1px solid #5cf6fb;
	  border-radius: 0.1875rem;
	  transition: 0.5s;
	}
	.fishi:hover > div:first-child {
	  background: url(../assets/yuS.png) no-repeat center;
	}
	.fishi:hover > div:last-child {
	  width: 0.625rem;
	  text-align: center;
	  visibility: visible;
	  color: #5cf6fb;
	}
	
	.niao {
	  width: .65rem;
	  height: 0.4rem;
	  display: flex;
	  justify-content: space-between;
	  cursor: pointer;
	  overflow: hidden;
	}
	.niao > div:first-child {
	  width: .8125rem;
	  height: .4rem;
	  background: url(../assets/niao.png) no-repeat center rgba(92, 210, 255, 0.15);
	  background-size: .225rem .225rem;
	  border-radius: 50%;
	}
	.niao > div:last-child {
	  width: 0.625rem;
	  height: 0.4rem;
	  line-height: 0.4rem;
	  visibility: hidden;
	  display: flex;
	}
	.niao:hover {
	  width: 1.375rem;
	  border: 1px solid #5cf6fb;
	  border-radius: 0.1875rem;
	  transition: 0.5s;
	}
	.niao:hover > div:first-child {
	  background: url(../assets/niaoS.png) no-repeat center;
	}
	.niao:hover > div:last-child {
	  width: 0.625rem;
	  text-align: center;
	  visibility: visible;
	  color: #5cf6fb;
	}
	
	.shen {
	   width: .65rem;
	  height: 0.4rem;
	  display: flex;
	  justify-content: space-between;
	  cursor: pointer;
	  overflow: hidden;
	}
	.shen > div:first-child {
	   width: .8125rem;
	  height: 0.4rem;
	  background: url(../assets/shengwu.png) no-repeat center rgba(92, 210, 255, 0.15);
	  border-radius: 50%;
	}
	.shen > div:last-child {
	    width: .8125rem;
	  height: 0.4rem;
	  line-height: 0.4rem;
	  visibility: hidden;
	  display: flex;
	}
	.shen:hover {
	  width: 1.375rem;
	  border: 1px solid #5cf6fb;
	  border-radius: 0.1875rem;
	  transition: 0.5s;
	}
	.shen:hover > div:first-child {
	  background: url(../assets/shengwuS.png) no-repeat center;
	}
	.shen:hover > div:last-child {
	  width: 0.625rem;
	  text-align: center;
	  visibility: visible;
	  color: #5cf6fb;
	}
	
	.hai {
	  width: .65rem;
	  height: 0.4rem;
	  display: flex;
	  justify-content: space-between;
	  cursor: pointer;
	  overflow: hidden;
	}
	.hai > div:first-child {
	   width: .8125rem;
	  height: 0.4rem;
	  background: url(../assets/haicao.png) no-repeat center rgba(92, 210, 255, 0.15);
	  border-radius: 50%;
	}
	.hai > div:last-child {
	  width: 0.625rem;
	  height: 0.4rem;
	  line-height: 0.4rem;
	  visibility: hidden;
	  display: flex;
	}
	.hai:hover {
	  width: 1.375rem;
	  border: 1px solid #5cf6fb;
	  border-radius: 0.1875rem;
	  transition: 0.5s;
	}
	.hai:hover > div:first-child {
	  background: url(../assets/haicaoS.png) no-repeat center;
	}
	.hai:hover > div:last-child {
	  width: 0.625rem;
	  text-align: center;
	  visibility: visible;
	  color: #5cf6fb;
	}
</style>