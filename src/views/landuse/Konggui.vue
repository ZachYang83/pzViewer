<template>
  <div>
    <Popup
      id="infoBox"
      v-model="visible"
      title="属性"
      class="info-box"
      @onCancel="onCancel"
    >
      <el-table :data="propsData" border style="width: 100%" height="400">
        <el-table-column align="center" prop="prop" label="属性" width="100">
        </el-table-column>
        <el-table-column align="center" prop="value" label="值" width="195">
        </el-table-column>
      </el-table>
    </Popup>
    <Legend v-model="showLegend" title="图例" class="legend-box">
      <div class="legendBody">
        <div style="font: bold 18px '微软雅黑'; marginbottom: 15px">控规</div>
        <template v-for="item in legendItems">
          <li :index="item.index" :key="item.key" class="legendItem">
            <div class="color" :style="item.style"></div>
            <div class="legendText">{{ item.text }}</div>
          </li>
        </template>
      </div>
    </Legend>
  </div>
</template>

<script>
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import Popup from "@/components/Popup.vue";
import Legend from "@/components/Popup.vue";
export default {
  data() {
    return {
      visible: false,
      propsData: [],
      showLegend: true,
      propsData: [],
      legendItems: [
        { index: 1, text: "A2文化设施用地", style: "backgroundColor:#F584A0" },
        { index: 2, text: "A3教育科研用地", style: "backgroundColor:#F6A282" },
        { index: 3, text: "A33中小学用地", style: "backgroundColor:#F6A283" },
        { index: 4, text: "A35科研用地", style: "backgroundColor:#F6A284" },
        { index: 5, text: "A5医疗卫生用地", style: "backgroundColor:#F38380" },
        { index: 6, text: "A8外事用地", style: "backgroundColor:#F42680" },
        { index: 7, text: "B1商业设施用地", style: "backgroundColor:#F32646" },
        { index: 8, text: "B2商服设施用地", style: "backgroundColor:#F32646" },
        { index: 9, text: "B3娱乐康体用地", style: "backgroundColor:#F32646" },
        {
          index: 10,
          text: "B41加油加气站用地",
          style: "backgroundColor:#F32646",
        },
        { index: 11, text: "C1行政办公用地", style: "backgroundColor:#FF00FF" },
        {
          index: 12,
          text: "C12非市属办公用地",
          style: "backgroundColor:#FF00FF",
        },
        { index: 13, text: "C2商务设施用地", style: "backgroundColor:#FF0000" },
        { index: 14, text: "C25旅馆业用地", style: "backgroundColor:#FF0000" },
        { index: 15, text: "C3文化设施用地", style: "backgroundColor:#FF7F9F" },
        {
          index: 16,
          text: "C34图书展览设施用地",
          style: "backgroundColor:#FF7F9F",
        },
        {
          index: 17,
          text: "C36服务设施用地",
          style: "backgroundColor:#FF7F9F",
        },
        { index: 18, text: "C4体育用地", style: "backgroundColor:#9FFF7F" },
        { index: 19, text: "C5医疗卫生用地", style: "backgroundColor:#FF7FBF" },
        { index: 20, text: "C6教育科研用地", style: "backgroundColor:#FF7FBF" },
        { index: 21, text: "C65科研用地", style: "backgroundColor:#FF7FBF" },
        { index: 22, text: "C7文物古迹用地", style: "backgroundColor:#FF7FBF" },
        { index: 23, text: "C8商务办公用地", style: "backgroundColor:#FF00FF" },
        {
          index: 24,
          text: "C9其它公共设施用地",
          style: "backgroundColor:#4C0013",
        },
        {
          index: 25,
          text: "C9/C5医疗用地兼容社会福利用地",
          style: "backgroundColor:#4C0013",
        },
        { index: 26, text: "CR二类居住用地", style: "backgroundColor:#FF00FF" },
        { index: 27, text: "D1军事用地", style: "backgroundColor:#BABABA" },
        { index: 28, text: "D2外事用地", style: "backgroundColor:#BABABA" },
        { index: 29, text: "E1水域", style: "backgroundColor:#47BDFC" },
        { index: 30, text: "E2农林用地", style: "backgroundColor:#50DC1D" },
        { index: 31, text: "E3园地", style: "backgroundColor:#B6B95F" },
        {
          index: 32,
          text: "E61(C1)村生活用地(行政办公用地)",
          style: "backgroundColor:#A57C00",
        },
        {
          index: 33,
          text: "E61(C2)村生活用地(商业金融业用地)",
          style: "backgroundColor:#A57C00",
        },
        {
          index: 34,
          text: "E61(C3)村生活用地(文化娱乐用地)",
          style: "backgroundColor:#A57C00",
        },
        {
          index: 35,
          text: "E61(C5)村生活用地(医疗卫生用地)",
          style: "backgroundColor:#A57C00",
        },
        {
          index: 36,
          text: "E61(G1)村生活用地(公共绿地)",
          style: "backgroundColor:#A57C00",
        },
        {
          index: 37,
          text: "E61(R2)村生活用地(二类居住用地)",
          style: "backgroundColor:#A57C00",
        },
        {
          index: 38,
          text: "E61(R22)村生活用地(中小学用地)",
          style: "backgroundColor:#A57C00",
        },
        {
          index: 39,
          text: "E62行政办公用地",
          style: "backgroundColor:#A59D00",
        },
        {
          index: 40,
          text: "E62(C2)村经济发展用地(商业金融业用地)",
          style: "backgroundColor:#A59D00",
        },
        {
          index: 41,
          text: "E62(M1)村经济发展用地(一类工业用地)",
          style: "backgroundColor:#A59D00",
        },
        {
          index: 42,
          text: "E62(M2)村经济发展用地(二类工业用地)",
          style: "backgroundColor:#A59D00",
        },
        {
          index: 43,
          text: "E62(R2)村经济发展用地(二类居住用地)",
          style: "backgroundColor:#A59D00",
        },
        { index: 44, text: "G1公共绿地", style: "backgroundColor:#47FC22" },
        {
          index: 45,
          text: "G1/S2公园绿地和广场用地",
          style: "backgroundColor:#47FC22",
        },
        { index: 46, text: "G13景观水用地", style: "backgroundColor:#47FC22" },
        { index: 47, text: "G2防护绿地", style: "backgroundColor:#32B43A" },
        { index: 48, text: "G22防护绿地", style: "backgroundColor:#32B43A" },
        { index: 49, text: "H14村庄建设用地", style: "backgroundColor:#00000" },
        { index: 50, text: "H41军事用地", style: "backgroundColor:#61944C" },
        { index: 51, text: "M1一类工业用地", style: "backgroundColor:#B48B5E" },
        { index: 52, text: "M3三类工业用地", style: "backgroundColor:#6D573B" },
        { index: 53, text: "R2二类居住用地", style: "backgroundColor:#FBFF2E" },
        {
          index: 54,
          text: "R22服务设施用地",
          style: "backgroundColor:#FBFF2E",
        },
        { index: 55, text: "S1城市道路用地", style: "backgroundColor:#818181" },
        {
          index: 56,
          text: "S2城市轨道交通用地",
          style: "backgroundColor:#818181",
        },
        { index: 57, text: "S3交通枢纽用地", style: "backgroundColor:#818181" },
        {
          index: 58,
          text: "S41公共交通场站用地",
          style: "backgroundColor:#818181",
        },
        {
          index: 59,
          text: "S42社会停车场用地",
          style: "backgroundColor:#818181",
        },
        {
          index: 60,
          text: "S9其他交通设施用地",
          style: "backgroundColor:#818181",
        },
        { index: 61, text: "U1供电用地", style: "backgroundColor:#2859B6" },
        {
          index: 62,
          text: "U12供应设施用地",
          style: "backgroundColor:#2859B6",
        },
        {
          index: 63,
          text: "U2公共交通场站用地",
          style: "backgroundColor:#2F9493",
        },
        {
          index: 64,
          text: "U21公共交通用地",
          style: "backgroundColor:#2F9493",
        },
        {
          index: 65,
          text: "U22环卫设施用地",
          style: "backgroundColor:#2F9493",
        },
        {
          index: 66,
          text: "U29加油加气站用地",
          style: "backgroundColor:#2F9493",
        },
        { index: 67, text: "U3邮电设施用地", style: "backgroundColor:#3189B5" },
        {
          index: 68,
          text: "U31消防设施用地",
          style: "backgroundColor:#3189B5",
        },
        { index: 69, text: "U4环境设施用地", style: "backgroundColor:#3189B5" },
        {
          index: 70,
          text: "U41雨水、污水处理用地",
          style: "backgroundColor:#3189B5",
        },
        {
          index: 71,
          text: "U9其他公用设施用地",
          style: "backgroundColor:#528294",
        },
        { index: 72, text: "W1普通仓库用地", style: "backgroundColor:#A36EDC" },
        { index: 73, text: "X待定用地", style: "backgroundColor:#FFFFFF" },
      ],
    };
  },
  components: {
    Popup,
    Legend,
  },
  mounted() {
    init_map(window.MAP, [113.351, 23.094], 13);
    this.initLayers();
    this.mouseEvent();
  },
  methods: {
    initLayers() {
      removeLayers(window.MAP, ["pz_hongxian"]);
      add_wms(window.MAP, "pz_hongxian");

      var industry = {
        "fill-outline-color": "#ea80fc",
        "fill-color": [
          "match",
          ["get", "LAND_CODE"],
          "A2",
          "#F584A0",
          "A3",
          "#F6A282",
          "A33",
          "#F6A283",
          "A35",
          "#F6A284",
          "A5",
          "#F38380",
          "A8",
          "#F42680",
          "B1",
          "#F32646",
          "B2",
          "#F32646",
          "B3",
          "#F32646",
          "B41",
          "#F32646",
          "C1",
          "#FF00FF",
          "C12",
          "#FF00FF",
          "C2",
          "#FF0000",
          "C25",
          "#FF0000",
          "C3",
          "#FF7F9F",
          "C34",
          "#FF7F9F",
          "C36",
          "#FF7F9F",
          "C4",
          "#9FFF7F",
          "C5",
          "#FF7FBF",
          "C6",
          "#FF7FBF",
          "C65",
          "#FF7FBF",
          "C7",
          "#FF7FBF",
          "C8",
          "#FF00FF",
          "C9",
          "#4C0013",
          "C9/C5",
          "#4C0013",
          "CR",
          "#FF00FF",
          "D1",
          "#BABABA",
          "D2",
          "#BABABA",
          "E1",
          "#47BDFC",
          "E2",
          "#50DC1D",
          "E3",
          "#B6B95F",
          "E61(C1)",
          "#A57C00",
          "E61(C2)",
          "#A57C00",
          "E61(C3)",
          "#A57C00",
          "E61(C5)",
          "#A57C00",
          "E61(G1)",
          "#A57C00",
          "E61(R2)",
          "#A57C00",
          "E61(R22)",
          "#A57C00",
          "E62",
          "#A59D00",
          "E62(C2)",
          "#A59D00",
          "E62(M1)",
          "#A59D00",
          "E62(M2)",
          "#A59D00",
          "E62(R2)",
          "#A59D00",
          "G1",
          "#47FC22",
          "G1/S2",
          "#47FC22",
          "G13",
          "#47FC22",
          "G2",
          "#32B43A",
          "G22",
          "#32B43A",
          "H14",
          "#000000",
          "H41",
          "#61944C",
          "M1",
          "#B48B5E",
          "M3",
          "#6D573B",
          "R2",
          "#FBFF2E",
          "R22",
          "#FBFF2E",
          "S1",
          "#818181",
          "S2",
          "#818181",
          "S3",
          "#818181",
          "S41",
          "#818181",
          "S42",
          "#818181",
          "S9",
          "#818181",
          "U1",
          "#2859B6",
          "U12",
          "#2859B6",
          "U2",
          "#2F9493",
          "U21",
          "#2F9493",
          "U22",
          "#2F9493",
          "U29",
          "#2F9493",
          "U3",
          "#3189B5",
          "U31",
          "#3189B5",
          "U4",
          "#3189B5",
          "U41",
          "#3189B5",
          "U9",
          "#528294",
          "W1",
          "#A36EDC",
          "X",
          "#FFFFFF",
          "#FFFFFF",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.9,
        ],
      };
      add_tms(window.MAP, "pz_konggui", "fill", industry);

      window.MAP.addLayer({
        id: "pz_konggui-hl",
        type: "line",
        source: "pz_konggui",
        "source-layer": "pz_konggui",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "OBJECTID", ""],
      });
    },
    mouseEvent() {
      let _this = this;
      window.MAP.on("mousemove", _this.cursorMove);
      window.MAP.on("click", _this.getInfo);
    },
    cursorMove(e) {
      window.MAP.getCanvas().style.cursor = "pointer";
    },
    getInfo(e) {
      let _this = this;
      var features = window.MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "pz_konggui") {
        var props = features[0].properties;
        console.log(props);
        window.MAP.setFilter("pz_konggui-hl", [
          "in",
          "OBJECTID",
          features[0].properties.OBJECTID,
        ]);
        _this.propsData = [
          {
            prop: "用地性质",
            value: props["LAND_NAME"],
          },
          {
            prop: "面积",
            value: props["LANG_AREA"],
          },
          {
            prop: "建筑面积",
            value: props["BUILD_AREA"],
          },
          {
            prop: "建筑退距",
            value: props["BUILD_DEN"],
          },
          {
            prop: "建筑限高",
            value: props["BUILD_HGHT"],
          },
          {
            prop: "容纳人口",
            value: props["PEOPLE_CAP"],
          },
          {
            prop: "规划依据",
            value: props["ACCORDING"],
          },
          {
            prop: "规划建议",
            value: props["ADVISE"],
          },
        ];
      }
      _this.visible = true;
      var infoBox = document.getElementById("infoBox");
      infoBox.style.top = e.originalEvent.clientY - 120 + "px";
      infoBox.style.left = e.originalEvent.clientX + 40 + "px";
    },
    onCancel() {
      this.visible = false;
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(window.MAP, ["pz_konggui-hl", "pz_konggui"]);
    window.MAP.off("click", _this.getInfo);
    window.MAP.off("mousemove", _this.cursorMove);
  },
};
</script>

<style lang="scss" scoped>
.info-box {
  position: absolute;
  width: 300px;
  height: auto;
}

.legend-box {
  position: absolute;
  width: 200px;
  height: 300px;
  bottom: 10px;
  left: 10px;
}

.legendBody {
  width: 100%;
  height: 280px;
  overflow: hidden;
  overflow-y: scroll;
  padding: 10px;
}
::-webkit-scrollbar {
  display: none;
}

.legendItem {
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .color {
    display: flex;
    flex: 1;
    height: 20px;
    margin: 0 10px;
    border-radius: 7px;
    // background: #17c5a5;
  }

  .legendText {
    display: flex;
    flex: 4;
    height: 30px;
    color: #fff;
    align-items: center;
    justify-content: center;
    line-height: 30px;
    font-size: 15px;
  }
}
.legendItem:last-child {
  margin-bottom: 0px;
}
</style>






















































