<template>
  <div class="page-container mazw-container">
    <div class="left">
      <pt-panel radius>
        <vue-scroll>
          <div class="list" v-if="!isSubMap">
            <div class="item" style="margin: 10px 0;">
              <div class="title">湿地修复与保护</div>
              <div class="content pt-base-color content2">本次建设结合内湾片区整体水体规划设计，对大爱湖湿地现有条件较好湿地生境施以保护、对现状不稳定区块进行生态工法修复，并补充湿地植被、营建生境系统、塑造生物栖息地。</div>
              <div class="image" style="margin-top: 20px;">
                <img src="assets/dasj/sdbh1.png" alt="">
              </div>
            </div>
            <div class="item">
              <div class="content pt-base-color content2">结合内湾片区整体水体规划设计，对大爱湖湿地现有条件较好湿地生境施以保护、对现状不稳定区块进行生态工法修复，并补充湿地植被。</div>
              <div class="image" style="margin-top: 20px;">
                <img src="assets/dasj/sdbh2.png" alt="">
              </div>
              <div class="image" style="margin-bottom: 0; margin-top: 20px;">
                <img src="assets/dasj/sdbh3.png" alt="">
              </div>
            </div>
          </div>
          <div class="list" v-else>
            <div class="item" style="margin: 10px 0;">
              <div class="title">生境系统营造</div>
              <div class="content pt-base-color content2">水质盐碱度的变化导致的湿地生境系统改变；需要针对现有的水质、水位，进行生境系统的重建；以保障这一重要生态斑块的可持续生长。</div>
              <div class="image">
                <img src="assets/dasj/sdbh4.png" alt="">
              </div>
            </div>
            <div class="item">
              <div class="title">生物栖息地塑造</div>
              <div class="content pt-base-color content2">针对重要栖息物种，塑造其需要的生存环境，以自然的手法塑造环境，吸引更多食物链环节的动物在此生存。</div>
              <div class="image">
                <img src="assets/dasj/sdbh5.png" alt="">
              </div>
              <div class="image" style="margin-bottom: 0;">
                <img src="assets/dasj/sdbh6.png" alt="">
              </div>
            </div>
          </div>
        </vue-scroll>
      </pt-panel>
    </div>
    <div class="center">
      <pt-panel>
        <div class="map-background"></div>
        <div class="map-container">
          <div class="reload-map">
            <el-button type="primary" v-if="!isSubMap" @click="reloadMap" icon="el-icon-refresh">复原</el-button>
            <el-button type="primary" v-if="isSubMap && subRadioValue === 1" @click="reloadSubMap" icon="el-icon-refresh">复原</el-button>
            <el-button type="primary" v-if="isSubMap && subRadioValue === 2" @click="reloadSubMap2" icon="el-icon-refresh">复原</el-button>
          </div>
          <div class="dasj-tabs">
            <div @click="isSubMap = false" class="tab-btn" :class="{active: !isSubMap}">生态工法修复</div>
            <div @click="isSubMap = true" class="tab-btn" :class="{active: isSubMap}">生态系统营造</div>
          </div>
          <div v-show="!isSubMap" class="dasj-map" :style="{top, left, transform: `scale(${scale})`}"></div>
          <div v-show="!isSubMap" v-pt-drag="dragEvent" ref="dragEle" class="dasj-map no-map" v-pt-mousewheel="mousewheelEvent" :style="{transform: `scale(${scale})`}">
            <div class="dasj-map-content">
              <div class="map-marker" @mouseout="hideText" @mouseover="showText(marker)" @click="showMarker(marker)" :class="[marker.class]" v-for="(marker, index) in markers" :key="index">
                <img :src="marker.image" alt="">
              </div>
            </div>
          </div>
          <div v-show="isSubMap && subRadioValue === 1" class="dasj-map dasj-sub-map" :style="{top: subTop, left: subLeft, transform: `scale(${subScale})`}"></div>
          <!-- <div v-show="isSubMap && subRadioValue === 1" v-pt-drag="subDragEvent" ref="subDragEle" class="dasj-map no-map" v-pt-mousewheel="subMousewheelEvent" :style="{transform: `scale(${subScale})`}"> -->
          <div v-show="isSubMap && subRadioValue === 1" ref="subDragEle" class="dasj-map no-map" :style="{transform: `scale(${subScale})`}">
            <div class="dasj-map-content">
              <div class="map-marker" @mouseout="hideText" @mouseover="showText(marker)" @click="showMarker(marker)" :class="[marker.class]" v-for="(marker, index) in subMarkers" :key="index">
                <img :src="marker.image" alt="">
              </div>
            </div>
          </div>
          <div v-show="isSubMap && subRadioValue === 2" class="dasj-map dasj-sub-map2" :style="{top: subTop2, left: subLeft2, transform: `scale(${subScale2})`}"></div>
          <div v-show="isSubMap && subRadioValue === 2" v-pt-drag="subDragEvent2" ref="subDragEle2" class="dasj-map no-map" v-pt-mousewheel="subMousewheelEvent2" :style="{transform: `scale(${subScale2})`}">
            <div class="dasj-map-content">
              <div class="marker3-container" @mouseout="hideText" @mouseover="showText(marker)" :class="[marker.class]" v-for="(marker, index) in subMarkers2" :key="index">
                <div class="marker3-image-container">
                  <div class="image-text">{{marker.title}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="dasj-tl" :class="{tl2: isSubMap, tl3: isSubMap && subRadioValue === 2}"></div>
          <div class="dasj-text">
            <div v-for="(c, index) in lsMarker.content" :key="index">{{c}}</div>
          </div>
          <div class="dasj-radio-bar" v-if="isSubMap">
            <div style="margin-bottom: 15px;">
              <el-radio style="color: #ffffff;" v-model="subRadioValue" :label="1">栖息地斑块</el-radio>
            </div>
            <div>
              <el-radio style="color: #ffffff;" v-model="subRadioValue" :label="2">大爱湖水深</el-radio>
            </div>
          </div>
        </div>
      </pt-panel>
    </div>
    <div class="right">
      <pt-panel radius>
        <div style="height: 100%;" v-if="!isSubMap">
          <div style="height: calc(50% - 20px); padding-bottom: 20px" id="chart" :key="chartKey"></div>
          <div style="height: 50%" id="chart1" :key="`${chartKey}-1`"></div>
        </div>
        <div style="height: 100%;" v-if="isSubMap">
          <div class="top-chart">
            <div class="list">
              <div class="item">
                <div class="title" style="font-weight: lighter;">栖息地面积</div>
              </div>
            </div>
            <div class="chart" id="chart2" :key="`${chartKey}-2`"></div>
          </div>
          <div class="bottom-list">
            <div class="list">
              <div class="item">
                <div class="title">大爱文化延续</div>
                <div class="content pt-base-color">大爱湖之由来即是妈祖文化的延续。传说林默专心专研医术，治病救人，救助了附近的贫苦百姓等传说。大爱湖植物选择中也多有要用价值品种选择，同时结合文化科普、医药科普，建设综合型湿地示范区。</div>
                <div class="image">
                  <img src="assets/dasj/dah.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </pt-panel>
    </div>
    <el-dialog :visible.sync="markerVisible" :title="curMarker.title" width="400px" class="marker-dialog" :modal="false">
      <div class="marker-content">
        <div class="content" v-for="(c, index) in curMarker.content" :key="index">{{c}}</div>
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
  import ToolsUtils from '@/utils/ToolsUtils.js'
  export default {
    name: 'Dasj',
    components: {PtPanel},
    data() {
      return {
        scale: 1.1,
        subScale: 1.1,
        subScale2: 1.1,
        top: null,
        left: null,
        subTop: null,
        subLeft: null,
        subTop2: null,
        subLeft2: null,
        WIDTH: 1175,
        HEIGHT: 930,
        isSubMap: false,
        markerVisible: false,
        curMarker: {},
        lsMarker: {},
        subRadioValue: 1,
        chartKey: new Date().valueOf(),
        markers: [{
          title: '芦苇卷',
          image: 'assets/dasj/lwj-1.png',
          class: 'lwj-1',
          pimage: 'assets/dasj/lwj-p.png',
          content: ['基于自然的软质驳岸设计，适应自然河道的弯曲和地形。', '从常水位到最高水位，芦苇卷构成梯度分布的植物群落，创造出丰富的动植物生境。', '适应特定的流速和冲击力，防止水土流失，保护植被。', '打造本土植物群落，生态自然的景观效果']
        }, {
          title: '芦苇卷',
          image: 'assets/dasj/lwj-2.png',
          class: 'lwj-2',
          pimage: 'assets/dasj/lwj-p.png',
          content: ['基于自然的软质驳岸设计，适应自然河道的弯曲和地形。', '从常水位到最高水位，芦苇卷构成梯度分布的植物群落，创造出丰富的动植物生境。', '适应特定的流速和冲击力，防止水土流失，保护植被。', '打造本土植物群落，生态自然的景观效果']
        }, {
          title: '松木桩',
          image: 'assets/dasj/smz-1.png',
          class: 'smz-1',
          pimage: 'assets/dasj/smz-p.png',
          content: ['选材时严格控制松木桩桩身质量，单面弯曲度小', '严格筛选用于蓝色海湾工程区域的松木桩品种，并做防腐处理', '稳定潮汐带堤岸强度，防止水土流失', '桩之间有缝，不影响水体和土壤之间透水及岸边植物生长']
        }, {
          title: '松木桩',
          image: 'assets/dasj/smz-2.png',
          class: 'smz-2',
          pimage: 'assets/dasj/smz-p.png',
          content: ['选材时严格控制松木桩桩身质量，单面弯曲度小', '严格筛选用于蓝色海湾工程区域的松木桩品种，并做防腐处理', '稳定潮汐带堤岸强度，防止水土流失', '桩之间有缝，不影响水体和土壤之间透水及岸边植物生长']
        }, {
          title: '松木桩',
          image: 'assets/dasj/smz-3.png',
          class: 'smz-3',
          pimage: 'assets/dasj/smz-p.png',
          content: ['选材时严格控制松木桩桩身质量，单面弯曲度小', '严格筛选用于蓝色海湾工程区域的松木桩品种，并做防腐处理', '稳定潮汐带堤岸强度，防止水土流失', '桩之间有缝，不影响水体和土壤之间透水及岸边植物生长']
        }, {
          title: '松木桩',
          image: 'assets/dasj/smz-4.png',
          class: 'smz-4',
          pimage: 'assets/dasj/smz-p.png',
          content: ['选材时严格控制松木桩桩身质量，单面弯曲度小', '严格筛选用于蓝色海湾工程区域的松木桩品种，并做防腐处理', '稳定潮汐带堤岸强度，防止水土流失', '桩之间有缝，不影响水体和土壤之间透水及岸边植物生长']
        }, {
          title: '活柴捆扦插',
          image: 'assets/dasj/hck-1.png',
          class: 'hck-1',
          pimage: 'assets/dasj/hck-p.png',
          content: ['就地取材于河岸两侧灌木和枝条，重新焕发河岸活力。', '高郁闭度设计，为水鸟和鱼类创造出舒适的生境，避免打扰。', '稳固的土工结构设计，适应高流速和冲击力，防止水土流失，确保洪水安全。', '自然生长的河岸，打造本土植物群落，生态自然的景观效果']
        }, {
          title: '网格灌木丛',
          image: 'assets/dasj/wggmc-1.png',
          class: 'wggmc-1',
          pimage: 'assets/dasj/wggmc-p.png',
          content: ['就地取材于河岸两侧灌木和枝条，重新焕发河岸活力。', '高郁闭度设计，为水鸟和鱼类创造出舒适的生境，避免打扰。', '高郁闭度设计，为水鸟和鱼类创造出舒适的生境，避免打扰。', '自然生长的河岸，打造本土植物群落，生态自然的景观效果']
        }, {
          title: '缓坡入水',
          image: 'assets/dasj/hprs-1.png',
          class: 'hprs-1',
          pimage: 'assets/dasj/hprs-p.png',
          content: ['基于自然的软质驳岸设计，适应自然河道的弯曲和地形。', '从常水位到最高水位，适应特定的流速和冲击力，防止水土流失，保护植被。', '打造本土植物群落，生态自然的景观效果。', '低施工成本，适合规模化改造。']
        }, {
          title: '缓坡入水',
          image: 'assets/dasj/hprs-2.png',
          class: 'hprs-2',
          pimage: 'assets/dasj/hprs-p.png',
          content: ['基于自然的软质驳岸设计，适应自然河道的弯曲和地形。', '从常水位到最高水位，适应特定的流速和冲击力，防止水土流失，保护植被。', '打造本土植物群落，生态自然的景观效果。', '低施工成本，适合规模化改造。']
        }, {
          title: '缓坡入水',
          image: 'assets/dasj/hprs-3.png',
          class: 'hprs-3',
          pimage: 'assets/dasj/hprs-p.png',
          content: ['基于自然的软质驳岸设计，适应自然河道的弯曲和地形。', '从常水位到最高水位，适应特定的流速和冲击力，防止水土流失，保护植被。', '打造本土植物群落，生态自然的景观效果。', '低施工成本，适合规模化改造。']
        }, {
          title: '缓坡入水',
          image: 'assets/dasj/hprs-4.png',
          class: 'hprs-4',
          pimage: 'assets/dasj/hprs-p.png',
          content: ['基于自然的软质驳岸设计，适应自然河道的弯曲和地形。', '从常水位到最高水位，适应特定的流速和冲击力，防止水土流失，保护植被。', '打造本土植物群落，生态自然的景观效果。', '低施工成本，适合规模化改造。']
        }],
        subMarkers: [{
          title: '两栖类栖息地',
          image: 'assets/dasj/lq-1.png',
          class: 'lq-1',
          pimage: 'assets/dasj/lq-p.png',
          content: ['海陆蛙（学名：Fejervarya cancrivora）是叉舌蛙科、陆蛙属的两栖动物。头长等于或略大于头宽；吻端钝尖；鼻孔略近吻端；眼间距窄；两眼前角之间有一白痣粒；鼓膜大而明显。前肢较短；指端钝圆。后肢粗壮而短；趾末端钝尖；趾间全蹼。内蹠突长而侧扁；无外蹠突；有跗褶。背面皮肤较粗糙；腹面皮肤光滑。生活时颜色变异较大，深浅有所不同，一般背面褐黄色，背面及体侧有黑褐色斑纹', '雌蛙生活于海拔10米左右近海边的咸水或半咸水地区。成蛙常栖息于海边的海潮能够波击的海岸区，以红树林地区较为常见。此蛙白天多隐蔽在洞穴或红树林根系之间，傍晚出外到海滩觅食，主要以蟹、虾、鱼、螺类、软体动物、蚁类、鞘翅目和其他昆虫为食。分布于文莱、柬埔寨、中国、印度、印度尼西亚、老挝、马来西亚、菲律宾、新加坡、泰国、越南、关岛。']
        }, {
          title: '两栖类栖息地',
          image: 'assets/dasj/lq-2.png',
          class: 'lq-2',
          pimage: 'assets/dasj/lq-p.png',
          content: ['海陆蛙（学名：Fejervarya cancrivora）是叉舌蛙科、陆蛙属的两栖动物。头长等于或略大于头宽；吻端钝尖；鼻孔略近吻端；眼间距窄；两眼前角之间有一白痣粒；鼓膜大而明显。前肢较短；指端钝圆。后肢粗壮而短；趾末端钝尖；趾间全蹼。内蹠突长而侧扁；无外蹠突；有跗褶。背面皮肤较粗糙；腹面皮肤光滑。生活时颜色变异较大，深浅有所不同，一般背面褐黄色，背面及体侧有黑褐色斑纹', '雌蛙生活于海拔10米左右近海边的咸水或半咸水地区。成蛙常栖息于海边的海潮能够波击的海岸区，以红树林地区较为常见。此蛙白天多隐蔽在洞穴或红树林根系之间，傍晚出外到海滩觅食，主要以蟹、虾、鱼、螺类、软体动物、蚁类、鞘翅目和其他昆虫为食。分布于文莱、柬埔寨、中国、印度、印度尼西亚、老挝、马来西亚、菲律宾、新加坡、泰国、越南、关岛。']
        }, {
          title: '两栖类栖息地',
          image: 'assets/dasj/lq-3.png',
          class: 'lq-3',
          pimage: 'assets/dasj/lq-p.png',
          content: ['海陆蛙（学名：Fejervarya cancrivora）是叉舌蛙科、陆蛙属的两栖动物。头长等于或略大于头宽；吻端钝尖；鼻孔略近吻端；眼间距窄；两眼前角之间有一白痣粒；鼓膜大而明显。前肢较短；指端钝圆。后肢粗壮而短；趾末端钝尖；趾间全蹼。内蹠突长而侧扁；无外蹠突；有跗褶。背面皮肤较粗糙；腹面皮肤光滑。生活时颜色变异较大，深浅有所不同，一般背面褐黄色，背面及体侧有黑褐色斑纹', '雌蛙生活于海拔10米左右近海边的咸水或半咸水地区。成蛙常栖息于海边的海潮能够波击的海岸区，以红树林地区较为常见。此蛙白天多隐蔽在洞穴或红树林根系之间，傍晚出外到海滩觅食，主要以蟹、虾、鱼、螺类、软体动物、蚁类、鞘翅目和其他昆虫为食。分布于文莱、柬埔寨、中国、印度、印度尼西亚、老挝、马来西亚、菲律宾、新加坡、泰国、越南、关岛。']
        }, {
          title: '底栖类栖息地',
          image: 'assets/dasj/dq-1.png',
          class: 'dq-1',
          pimage: 'assets/dasj/dq-p.png',
          content: ['蛤蜊属于软体动物门（Mollusea），双壳纲（Bivalvia），异齿亚纲（Heterodonta），帘蛤目（Veneroida），蛤蜊总科（Mactroidea），蛤蜊科（Mactridae）。该科动物有暖水种也有热水种，世界各大洋都有分布。我国沿海已发现30多种，多栖息在潮间带的中、下区和潮下带百米以内的浅海海底，少数能生活在百米以上的深海，营穴居生活。蛤蜊科的动物具有很高的经济价值，肉鲜嫩味美，营养丰富，也是我国的滩涂养殖的主要品种。', '我国沿海常见的有西施舌（Coelomactra antiquate），四角蛤蜊（Mactra veneriformis）和中国蛤蜊（Mactra chinensis）等种。']
        }, {
          title: '底栖类栖息地',
          image: 'assets/dasj/dq-2.png',
          class: 'dq-2',
          pimage: 'assets/dasj/dq-p2.png',
          content: ['蛤蜊属于软体动物门（Mollusea），双壳纲（Bivalvia），异齿亚纲（Heterodonta），帘蛤目（Veneroida），蛤蜊总科（Mactroidea），蛤蜊科（Mactridae）。该科动物有暖水种也有热水种，世界各大洋都有分布。我国沿海已发现30多种，多栖息在潮间带的中、下区和潮下带百米以内的浅海海底，少数能生活在百米以上的深海，营穴居生活。蛤蜊科的动物具有很高的经济价值，肉鲜嫩味美，营养丰富，也是我国的滩涂养殖的主要品种。', '我国沿海常见的有西施舌（Coelomactra antiquate），四角蛤蜊（Mactra veneriformis）和中国蛤蜊（Mactra chinensis）等种。']
        }, {
          title: '长脚类栖息地-中白鹭',
          image: 'assets/dasj/cj-1.png',
          class: 'cj-1',
          pimage: 'assets/dasj/cj-p.png',
          content: ['中白鹭是一种中型涉禽，大型鹭类，个体大小介于大白鹭和白鹭之间，略较白鹭为大。嘴和颈相对较白鹭短，嘴长而尖直，翅大而长，脚和趾均细长，胫部部分裸露，脚三趾在前一趾在后，中趾的爪上具梳状栉缘。雌雄同色。体形呈纺锤形，体羽疏松，具有丝状蓑羽，胸前有饰羽，头顶有的有冠羽，腿部被羽。', '全身白色；夏羽背部有一列长的蓑状饰羽，向后超过尾端，头后有不甚明显的冠羽，胸部亦有一簇长的羽枝分散的蓑状饰羽。冬羽无蓑状饰羽和冠羽，嘴黄色，嘴尖黑色，脚和趾黑色。', '虹膜黄色；嘴黑色；眼先裸露皮肤绿黄色；脚和趾黑色；冬季嘴黄色；嘴尖黑色；脚和趾黑色。', '大小量度：体长620-700毫米，嘴峰68-75毫米，翅383-800毫米，尾113-128毫米，跗跖110-116毫米。']
        }, {
          title: '长脚类栖息地2-小白鹭',
          image: 'assets/dasj/cj-2.png',
          class: 'cj-2',
          pimage: 'assets/dasj/cj-p-2.png',
          content: ['小白鹭（学名：Egretta garzetta）：体长52-68厘米，为中型涉禽，全身体羽颇似大、中白鹭，体形纤瘦，全身白色。夏羽枕部有两根细长饰羽，前颈和背着生蓑羽。冬季饰羽及蓑羽脱落。眼先裸皮夏季粉红色，冬季黄绿色。生殖期在枕部有两枚长羽，如双辫状。胸前亦簇生矛状长羽，但没有枕部冠翎长。背上蓑羽的先端均微向上卷曲。生殖期后，冠翎和蓑羽均脱落。眼黄色，嘴黑色，下嘴基部带苍白色，面部裸皮灰色，脚、腿黑色，趾上常杂有黄色。栖息于平原、丘陵和低海拔之湖泊、沼泽地带与滩涂地。以鞘翅目及鳞翅目幼虫、水生昆虫等动物性食物为食，也吃少量谷物等植物性食物。', '主要分布于非洲、欧洲和亚洲一带。中国主要分布于长江以南、江苏沿海中部地区及台湾和广东、海南。保护等级为无危']
        }, {
          title: '游禽类栖息地',
          image: 'assets/dasj/yq-1.png',
          class: 'yq-1',
          pimage: 'assets/dasj/yq-p.png',
          content: ['红嘴鸥（学名：Larus ridibundus）：俗称“水鸽子”，体形和毛色都与鸽子相似，体长37-43厘米，翼展94-105厘米，体重225-350克，寿命32年。嘴和脚皆呈红色，身体大部分的羽毛是白色，尾羽黑色。脚和趾赤红色，冬时转为橙黄色；爪黑色。', '红嘴鸥数量大，喜集群，在世界的许多沿海港口、湖泊都可看到。一般生活在江河、湖泊、水库、海湾。主食是鱼、虾、昆虫、水生植物和人类丢弃的食物残渣。繁殖范围非常广泛，从格陵兰岛的南端和整个冰岛一直延伸到欧洲和中亚的大部分地区，堪察加半岛东部，俄罗斯的乌苏里兰和中国东北的黑龙江，在北美东北部并不常见。']
        }, {
          title: '游禽类类栖息地',
          image: 'assets/dasj/yq-2.png',
          class: 'yq-2',
          pimage: 'assets/dasj/yq-p.png',
          content: ['红嘴鸥（学名：Larus ridibundus）：俗称“水鸽子”，体形和毛色都与鸽子相似，体长37-43厘米，翼展94-105厘米，体重225-350克，寿命32年。嘴和脚皆呈红色，身体大部分的羽毛是白色，尾羽黑色。脚和趾赤红色，冬时转为橙黄色；爪黑色。', '红嘴鸥数量大，喜集群，在世界的许多沿海港口、湖泊都可看到。一般生活在江河、湖泊、水库、海湾。主食是鱼、虾、昆虫、水生植物和人类丢弃的食物残渣。繁殖范围非常广泛，从格陵兰岛的南端和整个冰岛一直延伸到欧洲和中亚的大部分地区，堪察加半岛东部，俄罗斯的乌苏里兰和中国东北的黑龙江，在北美东北部并不常见。']
        }, {
          title: '游禽类类栖息地',
          image: 'assets/dasj/yq-3.png',
          class: 'yq-3',
          pimage: 'assets/dasj/yq-p.png',
          content: ['红嘴鸥（学名：Larus ridibundus）：俗称“水鸽子”，体形和毛色都与鸽子相似，体长37-43厘米，翼展94-105厘米，体重225-350克，寿命32年。嘴和脚皆呈红色，身体大部分的羽毛是白色，尾羽黑色。脚和趾赤红色，冬时转为橙黄色；爪黑色。', '红嘴鸥数量大，喜集群，在世界的许多沿海港口、湖泊都可看到。一般生活在江河、湖泊、水库、海湾。主食是鱼、虾、昆虫、水生植物和人类丢弃的食物残渣。繁殖范围非常广泛，从格陵兰岛的南端和整个冰岛一直延伸到欧洲和中亚的大部分地区，堪察加半岛东部，俄罗斯的乌苏里兰和中国东北的黑龙江，在北美东北部并不常见。']
        }, {
          title: '游禽类类栖息地',
          image: 'assets/dasj/yq-4.png',
          class: 'yq-4',
          pimage: 'assets/dasj/yq-p.png',
          content: ['红嘴鸥（学名：Larus ridibundus）：俗称“水鸽子”，体形和毛色都与鸽子相似，体长37-43厘米，翼展94-105厘米，体重225-350克，寿命32年。嘴和脚皆呈红色，身体大部分的羽毛是白色，尾羽黑色。脚和趾赤红色，冬时转为橙黄色；爪黑色。', '红嘴鸥数量大，喜集群，在世界的许多沿海港口、湖泊都可看到。一般生活在江河、湖泊、水库、海湾。主食是鱼、虾、昆虫、水生植物和人类丢弃的食物残渣。繁殖范围非常广泛，从格陵兰岛的南端和整个冰岛一直延伸到欧洲和中亚的大部分地区，堪察加半岛东部，俄罗斯的乌苏里兰和中国东北的黑龙江，在北美东北部并不常见。']
        }],
        subMarkers2: [{
          title: '1.25-1.50米',
          class: 'ss1',
          content: ['1.25-1.50米']
        }, {
          title: '1.75-2.00米',
          class: 'ss2',
          content: ['1.75-2.00米']
        }, {
          title: '2.00-2.25米',
          class: 'ss3',
          content: ['2.00-2.25米']
        }, {
          title: '0.75-1.00米',
          class: 'ss4',
          content: ['0.75-1.00米']
        }]
      }
    },
    watch: {

      /**
       * 切换视图
       */
      isSubMap(value) {
        this.chartKey = new Date().valueOf()
        this.$nextTick(() => {
          value ? this.drawChart2() : this.drawChart()
        })
      }
    },
    mounted() {
      const that = this
      const t = setTimeout(() => {
        that.drawChart()
        clearTimeout(t)
      }, 500)
      this.initScale4Screen()
    },
    methods: {

      /**
       * 绘制图表
       */
      drawChart() {
        this.drawChartO()
        this.drawChartT()
      },

      /**
       * 绘制统计图表
       */
      drawChartO() {
        const $chart = echarts.init(document.getElementById('chart'))
        const option = {
          title: {
            text: '生态工法长度',
            padding: [20, 10],
            itemGap: 20,
            subtext: '（m）',
            subtextStyle: {
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 'lighter'
            },
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'lighter'
            }
          },
          xAxis: {
            type: 'category',
            data: ['缓坡入水', '松木桩', '活柴捆', '芦苇卷', '网格灌木丛'],
            nameTextStyle: {
              color: '#ffffff'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff',
                opacity: 0.3
              }
            },
            axisLabel: {
              interval: 0,
              lineHeight: 15,
              fontWeight: 'lighter',
              formatter(value) {
                return value.split('').join('\n')
              }
            }
          },
          grid: {
            top: 80,
            bottom: 100,
            left: 15
          },
          yAxis: {
            type: 'value',
            interval: 400,
            axisLabel: {
              show: false
            },
            nameTextStyle: {
              color: '#ffffff'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ffffff',
                opacity: 0.3
              }
            },
            splitLine: {
              interval: 2,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          label: {
            position: 'top',
            show: true,
            textBorderWidth: 0,
            color: '#ffffff'
          },
          series: [{
            data: [{
              name: '缓坡入水',
              value: 1100,
              itemStyle: {
                color: 'rgb(91, 156, 213)'
              }
            }, {
              name: '松木桩',
              value: 497.3,
              itemStyle: {
                color: 'rgb(214, 168, 29)'
              }
            }, {
              name: '活柴捆',
              value: 319.4,
              itemStyle: {
                color: 'rgb(138, 202, 70)'
              }
            }, {
              name: '芦苇卷',
              value: 50,
              itemStyle: {
                color: 'rgb(255, 87, 153)'
              }
            }, {
              name: '网格灌木丛',
              value: 53,
              itemStyle: {
                color: 'rgb(231, 128, 60)'
              }
            }],
            type: 'bar',
            showBackground: true,
            barWidth: 25,
            backgroundStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderRadius: [30, 30, 0, 0],
            },
            itemStyle: {
              borderRadius: [30, 30, 0, 0]
            }
          }]
        }
        $chart.setOption(option)
      },

      /**
       * 绘制统计图表
       */
      drawChartT() {
        const $chart = echarts.init(document.getElementById('chart1'))
        const option = {
          title: {
            text: '生态工法占比',
            padding: [60, 0, 0, 10],
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'lighter'
            }
          },
          legend: {
            left: 'center',
            top: 'bottom',
            itemGap: 30,
            padding: [0, 0, 60, 0],
            textStyle: {
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 'lighter'
            },
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10
          },
          grid: {
            top: 50,
            bottom: 150,
            left: 10,
            right: 10
          },
          label: {
            show: true,
            textBorderWidth: 0,
            color: '#ffffff',
            formatter: '{d}%'
          },
          series: [
            {
              name: '生态工法占比',
              type: 'pie',
              radius: '50%',
              data: [{
                name: '缓坡入水',
                value: 6596,
                itemStyle: {
                  color: 'rgb(91, 156, 213)'
                }
              }, {
                name: '松木桩',
                value: 1212,
                itemStyle: {
                  color: 'rgb(214, 168, 29)'
                }
              }, {
                name: '活柴捆',
                value: 627,
                itemStyle: {
                  color: 'rgb(138, 202, 70)'
                }
              }, {
                name: '网格灌木丛',
                value: 603,
                itemStyle: {
                  color: 'rgb(231, 128, 60)'
                }
              }, {
                name: '芦苇卷',
                value: 553,
                itemStyle: {
                  color: 'rgb(255, 87, 153)'
                }
              }, {
                name: '原始',
                value: 409,
                itemStyle: {
                  color: 'rgb(255, 255, 255)'
                }
              }],
              labelLine: {
                length2: 0
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        $chart.setOption(option)
      },

      /**
       * 绘制第三个面板chart表
       */
      drawChart2() {
        const $chart = echarts.init(document.getElementById('chart2'))
        const option = {
          title: {
            text: '（公顷）',
            padding: [20, 0, 10, 10],
            textStyle: {
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 'lighter',
            }
          },
          xAxis: {
            type: 'category',
            data: ['底栖类栖息地', '游禽类类栖息地', '两栖类栖息地', '长脚类栖息地'],
            nameTextStyle: {
              color: '#ffffff',
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff',
                opacity: 0.3
              }
            },
            axisLabel: {
              interval: 0,
              fontWeight: 'lighter',
              lineHeight: 15,
              formatter(value) {
                return value.split('').join('\n')
              }
            }
          },
          grid: {
            top: 40,
            bottom: 150
          },
          yAxis: {
            max: 8,
            type: 'value',
            interval: 2,
            nameTextStyle: {
              color: '#ffffff'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ffffff',
                opacity: 0.3
              }
            },
            splitLine: {
              interval: 2,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            },
          },
          label: {
            position: 'top',
            show: true,
            textBorderWidth: 0,
            color: '#ffffff'
          },
          series: [{
            data: [{
              name: '底栖类栖息地',
              value: 3.8,
              itemStyle: {
                color: 'rgb(91, 156, 213)'
              }
            }, {
              name: '游禽类类栖息地',
              value: 6.3,
              itemStyle: {
                color: 'rgb(214, 168, 29)'
              }
            }, {
              name: '两栖类栖息地',
              value: 2.8,
              itemStyle: {
                color: 'rgb(138, 202, 70)'
              }
            }, {
              name: '长脚类栖息地',
              value: 3.4,
              itemStyle: {
                color: 'rgb(231, 128, 60)'
              }
            }],
            type: 'bar',
            showBackground: true,
            barWidth: 25,
            backgroundStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderRadius: [30, 30, 0, 0],
            },
            itemStyle: {
              borderRadius: [30, 30, 0, 0]
            }
          }]
        }
        $chart.setOption(option)
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

      /**
       * 显示当前值
       */
      showText(marker) {
        this.lsMarker = marker
      },

      /**
       * 隐藏当前值
       */
      hideText() {
        this.lsMarker = {}
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

      /**
       * 拖拽回调
       */
      subDragEvent2(left, top) {
        const that = this
        that.subLeft2 = left
        that.subTop2 = top
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
            if (that.subScale > 1.1) {
              that.subScale -= 0.5
            }
            break
        }
      },

      // 滚轮监听
      subMousewheelEvent2(direction){
        const that = this
        switch (direction) {
          case 'up':
            if (that.subScale2 < 5) {
              that.subScale2 += 0.5
            }
            break
          case 'down':
            if (that.subScale2 > 1.1) {
              that.subScale2 -= 0.5
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
        this.subTop = 'initial'
        this.subLeft = 'initial'
        this.subScale = 1.1
      },

      /**
       * 重置地图
       */
      reloadSubMap2() {
        this.$refs.subDragEle2.style.left = 'initial'
        this.$refs.subDragEle2.style.top = 'initial'
        this.subTop2 = 'initial'
        this.subLeft2 = 'initial'
        this.subScale2 = 1.1
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
  .dasj-container{
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
  .list{
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
  .list > .item .content.content2{
    line-height: 1.8;
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
  .dasj-map{
    width: 1175px;
    height: 930px;
    min-width: 1175px;
    min-height: 930px;
    background: url(../assets/dasj/map.png) no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    display: inline-block;
    transition: all 0.5s;
    left: initial;
    top: initial;
  }
  .dasj-map.dasj-sub-map{
    background: url(../assets/dasj/sub-map.png) no-repeat center;
    background-size: 100% 100%;
  }
  .dasj-map.dasj-sub-map2{
    background: url(../assets/dasj/sub-map2.png) no-repeat center;
    background-size: 100% 100%;
  }
  .dasj-map.no-map{
    background: transparent;
    z-index: 10;
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
  .dasj-map-content{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .marker-content{
    color: #ffffff;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .map-marker{
    position: absolute;
    cursor: pointer;
  }
  .map-marker img{
    width: 100%;
    display: none;
    -webkit-user-drag: none;
  }
  .map-marker:hover img{
    display: inherit;
  }
  .map-marker.lwj-1{
    width: 100px;
    height: 82px;
    left: 406px;
    top: 354px;
  }
  .map-marker.lwj-2{
    width: 152px;
    height: 83px;
    left: 518px;
    top: 238px;
  }
  .map-marker.smz-1{
    width: 109px;
    height: 122px;
    left: 413px;
    top: 239px;
  }
  .map-marker.smz-2{
    width: 89px;
    height: 234px;
    left: 65px;
    top: 318px;
  }
  .map-marker.smz-3{
    width: 83px;
    height: 86px;
    right: 141px;
    top: 357px;
  }
  .map-marker.smz-4{
    width: 197px;
    height: 129px;
    right: 481px;
    top: 300px;
  }
  .map-marker.hck-1{
    width: 250px;
    height: 137px;
    right: 50px;
    top: 127px;
  }
  .map-marker.wggmc-1{
    width: 49px;
    height: 121px;
    left: 127px;
    top: 321px;
    z-index: 1;
  }
  .map-marker.hprs-1{
    width: 140px;
    height: 152px;
    left: 121px;
    top: 327px;
  }
  .map-marker.hprs-2{
    width: 97px;
    height: 103px;
    right: 49px;
    top: 259px;
  }
  .map-marker.hprs-3{
    width: 311px;
    height: 205px;
    right: 204px;
    top: 438px;
  }
  .map-marker.hprs-4{
    width: 499px;
    height: 209px;
    left: 136px;
    top: 559px;
  }
  .map-marker.lq-1{
    width: 235px;
    height: 211px;
    right: 98px;
    top: 316px;
  }
  .map-marker.lq-2{
    width: 189px;
    height: 116px;
    right: 307px;
    top: 523px;
  }
  .map-marker.lq-3{
    width: 264px;
    height: 164px;
    right: 588px;
    top: 556px;
  }
  .map-marker.cj-1{
    width: 192px;
    height: 233px;
    left: 117px;
    top: 547px;
  }
  .map-marker.cj-2{
    width: 230px;
    height: 170px;
    right: 191px;
    top: 282px;
  }
  .map-marker.dq-1{
    width: 312px;
    height: 229px;
    left: 347px;
    top: 364px;
  }
  .map-marker.dq-2{
    width: 256px;
    height: 160px;
    right: 366px;
    top: 186px;
  }
  .map-marker.yq-1{
    width: 236px;
    height: 301px;
    left: 270px;
    top: 219px;
  }
  .map-marker.yq-2{
    width: 203px;
    height: 210px;
    left: 147px;
    top: 445px;
  }
  .map-marker.yq-3{
    width: 320px;
    height: 200px;
    right: 311px;
    top: 355px;
  }
  .map-marker.yq-4{
    width: 303px;
    height: 215px;
    right: 75px;
    top: 134px;
  }
  .dasj-tl{
    width: 104px;
    height: 110px;
    position: absolute;
    left: 50px;
    bottom: 50px;
    background: url(../assets/dasj/tl.png) no-repeat center;
    background-size: 100% 100%;
    z-index: 2;
  }
  .dasj-tl.tl2{
    width: 102px;
    height: 86px;
    background: url(../assets/dasj/tl2.png) no-repeat center;
    background-size: 100% 100%;
  }
  .dasj-tl.tl3{
    width: 69px;
    height: 188px;
    background: url(../assets/dasj/tl3.png) no-repeat center;
    background-size: 100% 100%;
  }
  .dasj-radio-bar{
    position: absolute;
    right: 50px;
    bottom: 50px;
    color: #ffffff;
    font-size: 12px;
    z-index: 20;
  }
  .dasj-text{
    position: absolute;
    left: 180px;
    bottom: 50px;
    margin-right: 180px;
    color: #ffffff;
    font-size: 12px;
    z-index: 2;
  }
  .dasj-tabs{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 20;
  }
  .tab-btn{
    display: inline-block;
    padding: 5px 15px;
    background: #04637e;
    color: #ffffff;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid transparent;
  }
  .tab-btn:hover, .tab-btn.active{
    border-color: #5cf6fb;
  }
  .tab-btn + .tab-btn{
    margin-left: 100px;
  }
  .marker3-container{
    width: 22px;
    height: 22px;
    position: absolute;
    cursor: pointer;
  }
  .marker3-container.ss1{
    top: 488px;
    left: 198px;
  }
  .marker3-container.ss2{
    top: 456px;
    left: 367px;
  }
  .marker3-container.ss3{
    top: 426px;
    right: 355px;
  }
  .marker3-container.ss4{
    top: 240px;
    right: 393px;
  }
  .marker3-container .image-text{
    position: absolute;
    width: 85px;
    height: 26px;
    display: none;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 12px;
    background: url(../assets/dasj/m3.png) no-repeat center;
    background-size: 100% 100%;
    padding-bottom: 6px;
    top: -30px;
    left: -30px;
  }
  .marker3-container:hover .image-text{
    display: flex;
  }
  .marker3-image-container{
    position: relative;
  }
  .bottom-list{
    height: 330px;
  }
  .top-chart{
    height: calc(100% - 380px);
  }
  .top-chart > .list{
    height: 30px;
  }
  .top-chart > .chart{
    height: calc(100% - 50px);
  }
</style>