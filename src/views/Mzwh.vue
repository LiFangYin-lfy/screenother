<template>
  <div class="page-container mazw-container">
    <div class="left">
      <pt-panel radius>
        <vue-scroll>
          <div class="left-list">
            <div class="pt-bg2-color" style="padding: 5px 10px;">
              <pt-audio title="妈祖背景音乐"/>
            </div>
          </div>
          <mz-list :list="list" />
        </vue-scroll>
      </pt-panel>
    </div>
    <div class="center">
      <pt-panel>
        <div class="map-background"></div>
        <div class="map-container" v-show="!isSubMap">
          <div class="reload-map">
            <el-button type="primary" @click="reloadMap" icon="el-icon-refresh">复原</el-button>
          </div>
          <div class="mzwh-map" :style="{top, left, transform: `scale(${scale})`}"></div>
          <div v-pt-drag="dragEvent" ref="dragEle" class="mzwh-map no-map" v-pt-mousewheel="mousewheelEvent" :style="{transform: `scale(${scale})`}">
            <div class="mzwh-map-content">
              <div class="map-marker" @click="showMarker(marker)" :class="[marker.class]" v-for="(marker, index) in markers" :key="index">
                <img :src="marker.image" alt="">
                <div style="position: relative;">
                  <div class="img-title">{{marker.title}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="map-btnbar">
            <div class="map-btn-container" :class="{active: subMapType === 1}" @click="showSubMap(1)">
              <div class="map-btn ld"></div>
            </div>
            <div class="map-btn-container" :class="{active: subMapType === 3}" @click="showSubMap(3)">
              <div class="map-btn xs"></div>
            </div>
            <div class="map-btn-container" :class="{active: subMapType === 2}" @click="showSubMap(2)">
              <div class="map-btn da"></div>
            </div>
          </div>
        </div>
         <div class="map-container" v-show="isSubMap">
          <div class="reload-map sub">
            <el-button type="primary" @click="goback" icon="el-icon-arrow-left">返回</el-button>
          </div>
          <div class="reload-map">
            <el-button type="primary" @click="reloadSubMap" icon="el-icon-refresh">复原</el-button>
          </div>
          <div class="mzwh-sub-map" :style="{top: subTop, left: subLeft, transform: `scale(${subScale})`}"></div>
          <div v-pt-drag="subDragEvent" ref="subDragEle" class="mzwh-sub-map no-map" v-pt-mousewheel="subMousewheelEvent" :style="{top: subTop, left: subLeft, transform: `scale(${subScale})`}">
            <div class="mzwh-map-content">
              <div class="map-sub-marker" @click="showMarker(marker)" :class="[marker.class]" v-for="marker in subMarkers" :key="marker.title">
                <img :src="marker.image" alt="">
              </div>
            </div>
          </div>
          <div class="map-btnbar">
            <div class="map-btn-container" :class="{active: subMapType === 1}" @click="showSubMap(1)">
              <div class="map-btn ld"></div>
            </div>
            <div class="map-btn-container" :class="{active: subMapType === 3}" @click="showSubMap(3)">
              <div class="map-btn xs"></div>
            </div>
            <div class="map-btn-container" :class="{active: subMapType === 2}" @click="showSubMap(2)">
              <div class="map-btn da"></div>
            </div>
          </div>
        </div>
      </pt-panel>
    </div>
    <div class="right">
      <pt-panel radius>
        <vue-scroll>
          <div class="list">
            <div class="item">
              <div class="title">大爱湖</div>
              <div class="content pt-base-color">世间大爱，人与自然。父母对孩子的爱，本质是奉献，而奉献的可贵之处在于无私和恒久的坚持……</div>
              <div class="image">
                <img src="../assets/mzwh/dah.png" alt="">
              </div>
            </div>
            <div class="item">
              <div class="title" style="margin-top: 20px;">女儿弯</div>
              <div class="content pt-base-color">父母对孩子的爱，本质是奉献，而奉献的可贵之处在于无私和恒久的坚持。父母对孩子的爱，本质是奉献，而奉献的可贵之处在于无私和恒久的坚持……</div>
              <div class="image">
                <img src="../assets/mzwh/nrw1.png" alt="">
              </div>
              <div class="image" style="margin-bottom: 0;">
                <img src="../assets/mzwh/nrw2.png" alt="">
              </div>
            </div>
          </div>
          <div class="pt-title" style="padding-top: 0; cursor: pointer;" @click="openWin1">2012版中央电视台妈祖电视剧</div>
        </vue-scroll>
      </pt-panel>
    </div>
    <el-dialog :visible.sync="markerVisible" :title="curMarker.title" width="400px" class="marker-dialog" :modal="false">
      <div class="marker-content">
        <div class="content" v-for="c in curMarker.content" :key="c">{{c}}</div>
      </div>
      <img :src="curMarker.pimage" class="image">
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
  import MzList from '@/components/mz-list'
  import ToolsUtils from '@/utils/ToolsUtils.js'
  export default {
    name: 'Mzwh',
    components: {PtPanel, PtAudio, MzList},
    data() {
      return {
        list: [{
          title: '妈祖简介',
          image: 'assets/mzwh/mzjj.png',
          content: ['中国首个信俗类世界遗产', '中国海洋文化的代表', '中华民族重要文化瑰宝之一', '联合国有关机构授予妈祖“和平女神”称号']
        }, {
          title: '天钉拴岛',
          image: 'assets/mzwh/tdsd.png',
          content: ['据说，很早的时候，台湾跟大陆是连在一起的一个半岛。有一年，突然从海外游来一条鲨鱼精。当他游到白露洲时，被一个半岛挡住了，他一气之下就用尾巴把半岛给劈了开来，那半岛便飘向了大海，白露洲则留在大陆。当地村民将鲨鱼精刺死了。但那飘走的半岛，还在继续移动着。', '这时候，妈祖化身为一个头上梳帆的少女，驾舟来到他们跟前，对他们说：“要拴住这飘移去的半岛，只有到莆田湄洲去拾一种‘塔螺’，吃了塔螺肉，人就变成‘天钉’；有了这种天钉，就能把那飘移的半岛钉牢了。人们依计形式，果然那飘移的半岛不动了，那个半岛就是现在的台湾岛。']
        }, {
          title: '簪射火龙',
          image: 'assets/mzwh/zshl.png',
          content: ['很早以前永福一带年年风调雨顺，百姓过着富裕安宁的日子。有一年，不知从哪里窜来一条火龙，霸占了永福方圆几十里之地。火龙时常吐烟喷火，使得带雨的云朵一经永福上空，就被驱散了，田间滴雨不见，永福的百姓连喝的水也快找不到了。众乡亲聚集在一起祈求妈祖保佑。一会见，东南方向飘来一朵彩云，直往火龙藏身的方向飞去。', '只见妈祖拔出银簪，向火龙 ，向火龙射去那火龙的眼睛中了银簪，痛得翻滚逃跑，不知去向。妈祖又将衣袖甩了三下，顿时天空乌云密布，下起了大雨。永福的山坡绿了，溪水满了，田里的五谷也长出来了。这一年，永福又丰收了。百姓感激妈祖射火龙除害之恩，就一齐动手修建了一座妈祖庙，又请来最高明的木雕师傅，雕刻了一尊妈祖神像，虔诚地供奉。', '此后，永福人每年秋收完毕，都要过一个欢乐的丰收节。他们在广场上、田野里，载歌载舞，搭台唱戏。同时，推选出一个执事带头、用数千块彩色糯米糕，在神棚内的神台前筑起一座三米高的糕塔，以示驱邪迎祥。']
        }, {
          title: '妙计解厄',
          image: 'assets/mzwh/mjje.png',
          content: ['一天，一个北方的客商带着一宗货物来到泉州，准备从这里发往海外去卖。妈祖献美酒拖延其出行，化解大灾难。']
        }, {
          title: '伏机救亲',
          image: 'assets/mzwh/fjjq.png',
          content: ['相传妈祖十六岁那年秋天的一天，其父兄驾船渡海北上之际，海上掀起狂风恶浪，船只遭损，情况危急。妈祖哭道:父亲得救，哥哥死了!不久有人来报，情况属实。']
        }, {
          title: '收伏晏公',
          image: 'assets/mzwh/sfyg.png',
          content: ['相传妈祖在世时，海上有一怪物叫晏公，时常在海上兴风作浪，弄翻船只。有一天，妈祖驾船驶到东部大海，怪物又开始兴风作浪，妈祖乘坐的船只摇晃的非常厉害。妈祖即令抛锚，见前方波涛中一舟上有一金冠绣袖、掀髯突睛之神在作怪。妈祖不动声色，掀起狂风巨浪与之抗击，晏公害怕妈祖的神威，叩拜荡舟离去。但怪物一时为法力所制有所不服，于是变成一条神龙，继续兴风作浪，妈祖说到：“此妖不除，风波不息”，在中游抛锚，制服神龙。妈祖命令晏公统领水阙仙班（共有十八位），护卫海上船民，後来晏公成为妈祖部下总管。']
        }, {
          title: '天妃神助',
          image: 'assets/mzwh/tfsz.png',
          content: ['明朝永乐七年，钦差尹璋出使，同年钦差陈庆等使往西洋；永乐十三年，钦差内官送甘泉于榜葛剌国，同年太监王贵等又奉命使往西洋；洪熙元年乙未，钦差内官柴山往琉球；嘉靖十一年，钦差给事中陈侃等人往琉球册封；嘉靖三十七年，复遣郭汝霖等出使。以上出使人员均得天妃神助而安全往返。']
        }, {
          title: '圣泉救疫',
          image: 'assets/mzwh/sqjy.png',
          content: ['宋朝绍兴二十五年，兴化一带发生瘟疫，各路医手皆无药可治。妈祖托梦给白湖一村民，说离海边不远的地下有甘泉，喝了即可治愈瘟疫。第二天群众前去控掘并取水饮用，果然灵验。消息传开后，远近人都来取水，络绎不绝，染上瘟疫的人全都得救了，这口井被誉为“圣泉”。']
        }, {
          title: '妈祖髻',
          image: 'assets/mzwh/mzj.png',
          content: ['莆田湄洲岛及附近沿海成年妇女头顶发型常常梳成帆船形状，即在头上中后部梳一个高约10厘米、半弧形、竖立状类似船帆的发髻，传说这种发型系妈祖生前设计的，为了纪念妈祖，祈祝平安、这一特殊的发型被称为“妈祖髻”。']
        }],
        markers: [{
          title: '妈祖阁',
          image: 'assets/mzwh/mzg.png',
          class: 'mzg',
          pimage: 'assets/mzwh/mzg-p.png',
          content: ['坐落于福建省莆田市山亭乡山柄村麒山之巅，是妈祖城的首要景点工程，总体造型端庄古朴，轻盈而又有动感，兼容传统风格和现代气息。阁高四层，总高32.3米，取妈祖农历三月二十三诞辰之意，总建筑面积2685平方米，基座面积1568平方米。", "阁平面为方形，四角减缺，成海棠状，一楼扩出，环四面为敞廊，二、三、四逐层收进，环周边是凭空栏杆，屋顶为歇山顶，成前后三重屋脊，主脊升高拔起，两端为歇山，主朝向对着湄洲妈祖祖庙。']
        }, {
          title: '两岸医疗产业园',
          image: 'assets/mzwh/laylcyy.png',
          class: 'laylcyy',
          pimage: 'assets/mzwh/laylcyy-p.png',
          content: ['天工“智”造，助力莆田打造“健康城", "莆田北岸两岸智能医疗产业园项目致力于打造未来生物技术产业科技城、超大型制药与智能医械制造中心、两岸生物技术融合共享合作区、工业产业观光区和宜居宜业温情小镇，是福建省重点项目妈祖国际健康城的重要配套工程。项目用地面积约81.86亩，总建筑面积为92894.74平方米，由标准化厂房和订制厂房组成。项目致力于以“高起点、高规格、高品质”的要求，打造以“生产和研发”为主的两岸智能医疗产业园，形成立足华东、辐射全国、面向世界的医疗器械产业聚集区。']
        }, {
          title: '大爱湖',
          image: 'assets/mzwh/dah.png',
          class: 'dah',
          pimage: 'assets/mzwh/dah-p.png',
          content: ['大爱湖湿地是莆田市妈祖城片区珍贵的生态斑块，具有重要的生态价值。根据《莆田市蓝色海湾整治行动项目》可行性研究报告中，对“滨海湿地修复”的单项考核指标要求为16.33公顷；施工图阶段大爱湖片区已落实指标6公顷。大爱湖节点设计红线面积为29.1公顷；其中陆域面积9公顷，水域面积20.1公顷。', '经过对大爱湖现状水质的分析检验，水体pH值为8.3。自然环境中淡水pH值6-7，海水pH值8-8.5。现状大爱湖水体以呈盐碱化状态，水体成分变化使得原有挺水植物、沉水植物、近岸植物的生长状态发生变化，对水体周边的动物、植物生境产生非常大影响。本次建设结合内湾片区整体水体规划设计，对大爱湖湿地现有条件较好湿地生境施以保护、对现状不稳定区块进行生态功法修复，并补充湿地植被、营建生境系统、塑造生物栖息地。', '大爱湖片区建设内容包括生态功法、浮箱栈道、陆域植物补充、水域植物治理等。']
        }, {
          title: '港里村',
          image: 'assets/mzwh/glc.png',
          class: 'glc',
          pimage: 'assets/mzwh/glc-p.png',
          content: ['碧水环绕的村落', '本土特色的建筑', '乡村之美源于纯朴 缘于真实', '乡村之美源于生活 缘于相遇', '让我们去发现美、展现美、留住美']
        }, {
          title: '妈祖国际健康城',
          image: 'assets/mzwh/mzgjjkc.png',
          class: 'mzgjjkc',
          pimage: 'assets/mzwh/mzgjjkc-p.png',
          content: ['妈祖国际健康城总规划面积约8.21平方公里，计划总投资100亿元，项目以高端医疗为驱动，旅游医养为特色，集聚带动医疗管理、研发生产、医疗教育及配套服务，形成医疗吸引核、休养集聚区、产业延伸环的环状发展模式，实现医疗、旅游、产业的互融互通，联动发展，形成医疗核心、研发生产、旅游康养、总部管理、教育培训五大医疗健康全产业链集群，力争将健康城打造成世界一流的医疗目的地和医疗高端人才聚集区，成为硬件设施完备、服务水平一流、服务理念国际化的国际医疗旅游示范基地。']
        }, {
          title: '妈祖新城',
          image: 'assets/mzwh/mzxc.png',
          class: 'mzxc',
          pimage: 'assets/mzwh/mzxc-p.png',
          content: ['妈祖新城，位于福建省莆田市湄洲湾的湄洲岛与秀屿港之间，与国家级旅游度假区湄洲岛隔海相望，规划面积为15平方公里，其中围海造地4.87平方公里。整个城区分为7个功能区，包括综合服务区、滨海度假区、文化古迹风貌区、渔港游艇码头区、生态休闲区、紫霄洞风景区和居民迁建区。作为湄洲岛国家级旅游度假区的延伸，“妈祖新城”将严格控制开发强度，建成一个集旅游购物、观光休闲等多种功能于一体，具有南方特色的现代化滨海旅游城市。', '妈祖城还将采用市场化运作方式，广泛吸纳海内外民间资金参与建设。该区域中现有的港里妈祖祖祠、抗倭古城、宋代古码头、紫霄洞风景区等将融入妈祖城总体规划，得到有效的保护和利用。']
        }, {
          title: '妈祖祖祠',
          image: 'assets/mzwh/mzzc.png',
          class: 'mzzc',
          pimage: 'assets/mzwh/mzzc-p.png',
          content: ['妈祖祖祠位于莆田市湄洲湾北岸山亭乡，称：贤良港，亦名“黄螺港”，是海峡女神妈祖的诞生地，妈祖羽化后，乡人建祠纪念。 祖祠始建于宋代，祀妈祖木室像。据《敕封天后志》载：“世传祠内室像，系异人妆塑，各处供奉之偈，皆不能及”。因祠内前殿供大会供奉妈祖室像。额称“天后祠”，后殿供奉圣父母及其先代牌位，额称“林氏祖祠”，故尊为“天后祖祠”。明永乐十九年（1421年）祠坏，朝廷内官司奉旨赴港整修致祭，称“天妃祖祠”。1991年福建省人民政府公布为省级文物保护单位。']
        }, {
          title: '女儿弯',
          image: 'assets/mzwh/new.png',
          class: 'new',
          pimage: 'assets/mzwh/new-p.png',
          content: ['传说妈祖幼年游玩的地方。', '女儿湾处于潮间带范围内，海岸类型主要为沙滩，海岸线呈西北向走向。工程区地貌为海积平原，地形呈月牙状，地势平坦开阔，地表高程一般为1~5m，堤外海域反向海底坡度较缓，一般小于5°，靠近陆域附近坡度变陡，约6°~8°。岸侧地面高程一般为5.0~8.0m，分布村庄房屋、道路以及防风林。', '该堤段海岸风浪及潮水作用较强，靠近海岸线附近滩地倾斜度较大，堤岸以冲刷为主，沿岸线组成岸坡的土层主要为素填土、中细沙、粗砂等，土体抗冲刷性能较差，海岸受冲刷影响大，且工程区处于台风多发区，受恶劣天气影响，海浪对岸坡冲刷较严重。固建设女儿湾排水闸，由闸室及消能放冲设施等组成。', '女儿湾景观工程建筑物主要有栈道、栈桥、盘山步道以及廊架、管理房等建筑物。']
        }, {
          title: '蒲禧古城',
          image: 'assets/mzwh/pxgc.png',
          class: 'pxgc',
          pimage: 'assets/mzwh/pxgc-p.png',
          content: ['蒲禧古城位于莆田莆禧半岛（忠门半岛）南端，离市区约38公里，北岸管委会山亭乡莆禧村境内，距离莆田市区约40公里。与湄洲岛隔海相望。莆禧古地名“浮曦”，明洪武元年（1368年），为加强沿海国防，抵御倭寇侵扰，设莆禧“守御千户所”，隶“平海卫”管辖。“千户所”置正五品官一员，从五品官二员，驻军一千名。明洪武二十年（1387年），福建沿海开始建筑防倭军事城堡，当年拆了莆田东角、遮浪两处“镇海堤”石料，筑了平海城和莆禧城。现存古城墙长1335米，东北两座城门保存完好，西南城墙地段存有古城基遗址。城内宫庙年代久远。有城隍庙、天妃宫等古迹。城外有八卦井和戚继光石像。为福建省文物保护单位。2007年被命名为福建省国防教育基地。']
        }, {
          title: '文甲码头',
          image: 'assets/mzwh/wjmt.png',
          class: 'wjmt',
          pimage: 'assets/mzwh/wjmt-p.png',
          content: ['文甲港 位于湄洲湾湾口北岸文甲村，与平海湾交界。水路可通沿海各地，至湄洲岛3海里。陆路至秀屿39公里。至县城关44公里。有文甲码头1个，长54米，可停泊50吨小轮；轮渡站1座，面积300平方米；机动客轮2艘，供文甲至湄洲岛往返客运。1990年客运量83.54万人次。']
        }],
        scale: 1.1,
        subScale: 1,
        top: null,
        left: null,
        subTop: '-119px',
        subLeft: '-316px',
        WIDTH: 1175,
        HEIGHT: 930,
        markerVisible: false,
        curMarker: {},
        isSubMap: false,
        subMapType: null,
        subMarkers: [{
          title: '读遍神书',
          type: 1,
          image: 'assets/mzwh/dbss.png',
          class: 'dbss',
          pimage: 'assets/mzwh/dbss-p.png',
          content: ['林默从小就聪颖好学，读了许多书。她立誓要用自己的智能去征服大海，解开世人的难题。但她能读到的书实在有限，因此她焚香跪拜，冥思苦想是否有一种无穷的妙法，能达成平生所愿。有一天，她梦见一个鹤发童颜的老翁前来指点，告诉她南面海滨石林中，有一座书库，藏着许许多多奇书。林默依着梦中的指引，果然看到各种琳琅满目的奇书，几个月后，她把书库里的书全部读遍了。那些书也都全变成了石头。']
        }, {
          title: '焚屋引航',
          type: 2,
          image: 'assets/mzwh/fwyh.png',
          class: 'fwyh',
          pimage: 'assets/mzwh/fwyh-p.png',
          content: ['某夜,海面突狂风大作,乌云翻滚,尚有渔人出海未归。危难之际,妈祖点燃了自家的茅屋,冲天的火光使遇险的渔船看到了归航的方向,平安归来']
        }, {
          title: '鼎砂铸杯',
          type: 1,
          image: 'assets/mzwh/dszb.png',
          class: 'dszb',
          pimage: 'assets/mzwh/dszb-p.png',
          content: ['相传宋朝时，著名的铸鼎师傅刘义在为一家渔民铸鼎时屡次不成功，林默本想帮忙，但师傅以为她冲了火神，把怨气撒到她身上，并将烧红的鼎砂给林默，林默伸手接住，捧回家中，往地上一放，只见地上出现两个月牙形状的鼎砂珓杯，一个凸面朝上，一个凸面朝下，可指示阴阳。']
        }, {
          title: '妈祖照镜',
          type: 1,
          image: 'assets/mzwh/mzzj.png',
          class: 'mzzj',
          pimage: 'assets/mzwh/mzzj-p.png',
          content: ['宋雍熙四年的重阳节，默娘独自登上湄峰，放眼远眺，看那万顷汪洋，碧波荡漾；霞光照射在海上，像一条通天的金光大道。默妨看得出神，久久被湄洲岛的美丽风光迷住了。忽然天边飘来一朵彩云，香气袭人。默娘身不由己的义容，可惜没带镜子。俯看海面，发现赤礁小屿上，有一块巨石，光滑如镜，映照着自己的倩影。默娘十分高兴，细细地照了又照，才冉冉上升到天庭。从此，默娘每次显圣护航时，都要到大镜前理发整装。因为这面石镜的颜色很奇特，随着气候的变化，会呈现各种不同的颜色。后来人们就把它称为“妈祖镜”。']
        }, {
          title: '化木成舟',
          type: 1,
          image: 'assets/mzwh/hmcz.png',
          class: 'hmcz',
          pimage: 'assets/mzwh/hmcz-p.png',
          content: ['在湄洲岛西面，有个美丽的渔村叫“门夹”。是商旅、客船往返必经的港口。港里水深流缓，港外漩涡鼓荡，暗礁错 。船只只要稍稍不小心偏离航道，就会触上礁石，使船沉人亡。一天，一艘满载货物的商船刚出这个港口不远，海面就突然刮起大风，并掀起万顷波涛。商船一失控，就像 一样在巨浪中左右飘荡，在危急的时候，妈祖飞步上前，站在岸边的一块礁石上。就将手中的蒲草向海面抛去。随着一道白光闪出，海上立刻飘浮起无数根大杉木。杉木一根根向那商船靠拢，很快就紧紧贴附在商船的两旁。那商船由于杉木的附托，不但没有沉下去，还平安地返回了港内。']
        }, {
          title: '宋古码头',
          type: 1,
          image: 'assets/mzwh/sgmt.png',
          class: 'sgmt ',
          pimage: 'assets/mzwh/wjmt-p.png',
          content: ['港里村古称贤良港，因该村依山面海形成的天然良港而得名。根据史料记载，由于妈祖传说的影响，贤良港在宋代就已闻名遐迩，是一个繁华的港口，北上南下船只，多在这里转泊补给。每当海水涨潮，微波拍岸，浪花如雪，鸥鸟舟楫，相随入港；每年八月十五大潮，便有“螺港秋潮”奇观。', '通过还原宋古码头遗址，让人们在这里仿佛置身当时繁华码头的情境，能够有浸入式的体验感。恢复码头交通功能，将此片区与内湾等外界空间水上动线联通，增加片区交通活力。']
        }, {
          title: '浮光红莲',
          type: 1,
          image: 'assets/mzwh/fghl.png',
          class: 'fghl',
          pimage: 'assets/mzwh/fghl-p.png',
          content: ['利用现有坑塘，将海水引入塘中，恢复为原有的海水与岩石相接的自然状态，并在水中设置优钵灯，来展现妈祖出世的主题，白天可做景观装饰，同时具有夜景点缀功能。旁边的路灯也运用优钵花的形态，并融入妈祖发髻的样式，造型优美，与祖祠等建筑风格相统一。']
        }, {
          title: '妈祖生平',
          type: 1,
          image: 'assets/mzwh/mzsp.png',
          class: 'mzsp',
          pimage: 'assets/mzwh/wjmt-p.png',
          content: ['妈祖诞生地位于妈祖祖祠南部，红线面积3hm²。工程海岸线整治440米，滨水栈道600米，青石板园路510米，广场铺装两个，修复古码头一座。', '本工程将妈祖诞生地文化4个主要文化景点串接，包括妈祖祖祠、三炷香、妈祖印、宋古码头及东宫，将妈祖诞生地形成整体旅游片区。建设滨水栈道，修复岸线水生态，提供亲水空间，通过恢复码头交通功能，将此片区与内湾等外界空间水上动线联通，从而贯通妈祖诞生地-内湾-大爱湖湿地形成独特的旅游、休闲体系。']
        }]
      }
    },
    mounted() {
      const that = this
      that.initScale4Screen()
    },
    methods: {

      // 打开电视剧
      openWin1() {
        window.open('https://tv.cctv.com/2013/01/01/VIDE1357003090921579.shtml')
      },

      // 显示子地图
      showSubMap(type) {
        const that = this
        that.isSubMap = true
        that.subMapType = type
      },

      // 显示当前marker
      showMarker(marker) {
        const content = marker.content
        if (content && content.length > 0) {
          this.curMarker = marker
          this.markerVisible = true
        } else {
          this.$message({
            type: 'success',
            message: '敬请期待'
          })
        }
      },

      // 初始化屏幕
      initScale4Screen() {
        const canvasWidth = this.$refs.dragEle.offsetWidth
        const canvasHeight = this.$refs.dragEle.offsetHeight
        const wh = ToolsUtils.getAssignSize4Scale(canvasWidth, canvasHeight, this.WIDTH, this.HEIGHT)
        const scale = wh.width / this.WIDTH
        this.scale = scale <= 1 ? 1.1 : scale
      },

      // 滚轮监听
      mousewheelEvent(direction){
        const that = this
        switch (direction) {
          case 'up':
            if (that.scale < 5) {
              that.scale += 0.5
            }
            break
          case 'down':
            if (that.scale > 1.1) {
              that.scale -= 0.5
            }
            break
        }
      },

      /**
       * 拖拽回调
       */
      dragEvent(left, top) {
        const that = this
        that.left = left
        that.top = top
      },

      /**
       * 拖拽回调
       */
      subDragEvent(left, top) {
        const that = this
        that.subLeft = left
        that.subTop = top
      },

      // 滚轮监听
      subMousewheelEvent(direction){
        const that = this
        switch (direction) {
          case 'up':
            if (that.subScale < 5) {
              that.subScale += 0.5
            }
            break
          case 'down':
            if (that.subScale > 1) {
              that.subScale -= 0.5
            }
            break
        }
      },

      /**
       * 重置地图
       */
      reloadMap() {
        this.$refs.dragEle.style.left = 'initial'
        this.$refs.dragEle.style.top = 'initial'
        this.top = 'initial'
        this.left = 'initial'
        this.scale = 1.1
      },

      /**
       * 重置地图
       */
      reloadSubMap() {
        this.$refs.subDragEle.style.left = 'initial'
        this.$refs.subDragEle.style.top = 'initial'
        this.subTop = '-119px'
        this.subLeft = '-316px'
        this.subScale = 1
      },

      /**
       * 返回
       */
      goback() {
        this.isSubMap = false
        this.subMapType = null
      }
    }
  }
</script>

<style scoped>
  .mazw-container{
    flex-direction: row;
    min-height: 800px;
  }
  .left, .right{
    flex-basis: 0;
    flex-grow: 1;
    overflow: hidden;
  }
  .center{
    flex-basis: 0;
    flex-grow: 4;
    overflow: hidden;
    margin: 0 10px;
  }
  .left-list, .list{
    padding: 10px 10px 0 10px;
  }
  .list > .item + .item{
    margin-top: 10px;
  }
  .list > .item .title{
    font-size: 14px;
    color: #ffffff;
    margin-top: 10px;
  }
  .list > .item .content{
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 1.5;
    margin-top: 5px;
  }
  .list > .item .image{
    margin: 5px 0;
  }
  .list > .item .image img{
    width: 100%;
  }
  .map-container{
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mzwh-map{
    width: 1175px;
    height: 930px;
    min-width: 1175px;
    min-height: 930px;
    background: url(../assets/mzwh/map.png) no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    display: inline-block;
    transition: all 0.5s;
    left: initial;
    top: initial;
  }
  .mzwh-map.no-map, .mzwh-sub-map.no-map{
    background: transparent;
    z-index: 10;
  }
  .mzwh-sub-map{
    width: 1920px;
    height: 1080px;
    min-width: 1920px;
    min-height: 1080px;
    position: absolute;
    display: inline-block;
    transition: all 0.5s;
    background: url(../assets/mzwh/sub-map.jpg) no-repeat center;
    background-size: 100% 100%;
  }
  .reload-map{
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 20;
  }
  .reload-map.sub{
    left: 20px;
  }
  .map-btnbar{
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
    z-index: 10;
    text-align: center;
  }
  .map-btn{
    display: inline-block;
    width: 80px;
    height: 55px;
  }
  .map-btn-container{
    display: inline-block;
    padding: 10px 20px;
  }
  .map-btn-container:hover, .map-btn-container.active{
    cursor: pointer;
    background: url(../assets/mzwh/lh-b.png) no-repeat center;
    background-size: 100% 100%;
  }
  .map-btn-container + .map-btn-container{
    margin-left: 50px;
  }
  .map-btn.xs{
    background: url(../assets/mzwh/xs.png) no-repeat center;
    background-size: 100% 100%;
  }
  .map-btn.da{
    background: url(../assets/mzwh/da.png) no-repeat center;
    background-size: 100% 100%;
  }
  .map-btn.ld{
    background: url(../assets/mzwh/ld.png) no-repeat center;
    background-size: 100% 100%;
  }
  .mzwh-map-content{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .map-marker{
    position: absolute;
    width: 53px;
    height: 61px;
    cursor: pointer;
  }
  .map-marker img{
    width: 100%;
    -webkit-user-drag: none;
  }
  .img-title{
    font-size: 12px;
    position: absolute;
    transform: scale(0.9);
    top: -48px;
    left: 1px;
    text-align: center;
    width: 50px;
  }
  .map-marker.laylcyy{
    right: 708px;
    top: 167px;
  }
  .map-marker.laylcyy .img-title{
    top: -55px;
  }
  .map-marker.dah{
    right: 579px;
    bottom: 354px;
  }
  .map-marker.mzg{
    right: 650px;
    bottom: 185px;
  }
  .map-marker.glc{
    right: 493px;
    bottom: 488px;
  }
  .map-marker.mzgjjkc{
    right: 588px;
    top: 251px;
  }
  .map-marker.mzgjjkc .img-title{
    top: -55px;
  }
  .map-marker.mzxc{
    right: 350px;
    bottom: 385px;
  }
  .map-marker.mzzc{
    right: 458px;
    bottom: 355px;
  }
  .map-marker.pxgc{
    right: 323px;
    top: 400px;
  }
  .map-marker.new{
    right: 330px;
    top: 295px;
  }
  .map-marker.wjmt{
    right: 170px;
    bottom: 290px;
  }
  .marker-content{
    color: #ffffff;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .map-sub-marker{
    position: absolute;
    width: 116px;
    height: 57px;
    cursor: pointer;
  }
  .map-sub-marker img{
    width: 100%;
  }
  .map-sub-marker.dbss{
    left: 439px;
    bottom: 107px;
  }
  .map-sub-marker.fwyh{
    left: 471px;
    bottom: 234px;
  }
  .map-sub-marker.dszb{
    left: 521px;
    bottom: 307px;
  }
  .map-sub-marker.mzzj{
    left: 690px;
    bottom: 493px;
  }
  .map-sub-marker.hmcz{
    right: 403px;
    top: 508px;
  }
  .map-sub-marker.sgmt{
    left: 482px;
    top: 427px;
  }
  .map-sub-marker.fghl{
    left: 609px;
    top: 398px;
  }
  .map-sub-marker.ybhj{
    left: 185px;
    top: 255px;
  }
  .map-sub-marker.mzsp{
    left: 519px;
    top: 326px;
  }
</style>