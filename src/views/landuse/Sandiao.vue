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
        {
          index: 1,
          text: "城镇村道路用地",
          style: "backgroundColor:RGBA(178,178,178,0.9)",
        },
        {
          index: 2,
          text: "城镇住宅用地",
          style: "backgroundColor:RGBA(255,255,0,0.9)",
        },
        {
          index: 3,
          text: "港口码头用地",
          style: "backgroundColor:RGBA(225,225,225,0.9)",
        },
        {
          index: 4,
          text: "高教用地",
          style: "backgroundColor:RGBA(225,225,225,0.9)",
        },
        {
          index: 5,
          text: "工业用地",
          style: "backgroundColor:RGBA(168,112,0,0.9)",
        },
        {
          index: 6,
          text: "公路用地",
          style: "backgroundColor:RGBA(225,225,225,0.9)",
        },
        {
          index: 7,
          text: "公用设施用地",
          style: "backgroundColor:RGBA(0,132,168,0.9)",
        },
        {
          index: 8,
          text: "公园与绿地",
          style: "backgroundColor:RGBA(85,255,0,0.9)",
        },
        {
          index: 9,
          text: "沟渠",
          style: "backgroundColor:RGBA(160,205,240,0.9)",
        },
        {
          index: 10,
          text: "灌木林地",
          style: "backgroundColor:RGBA(38,115,0,0.9)",
        },
        {
          index: 11,
          text: "广场用地",
          style: "backgroundColor:RGBA(130,130,130,0.9)",
        },
        {
          index: 12,
          text: "轨道交通用地",
          style: "backgroundColor:RGBA(178,178,178,0.9)",
        },
        {
          index: 13,
          text: "果园",
          style: "backgroundColor:RGBA(250,201,0,0.9)",
        },
        {
          index: 14,
          text: "旱地",
          style: "backgroundColor:RGBA(215,194,158,0.9)",
        },
        {
          index: 15,
          text: "河流水面",
          style: "backgroundColor:RGBA(115,225,255,0.9)",
        },
        {
          index: 16,
          text: "机关团体新闻出版用地",
          style: "backgroundColor:RGBA(255,0,197,0.9)",
        },
        {
          index: 17,
          text: "交通服务场站用地",
          style: "backgroundColor:RGBA(178,178,178,0.9)",
        },
        {
          index: 18,
          text: "科教文卫用地",
          style: "backgroundColor:RGBA(255,0,197,0.9)",
        },
        {
          index: 19,
          text: "可调整果园",
          style: "backgroundColor:RGBA(255,170,0,0.9)",
        },
        {
          index: 20,
          text: "可调整养殖坑塘",
          style: "backgroundColor:RGBA(215,255,255,0.9)",
        },
        {
          index: 21,
          text: "坑塘水面",
          style: "backgroundColor:RGBA(215,255,255,0.9)",
        },
        {
          index: 22,
          text: "内陆滩涂",
          style: "backgroundColor:RGBA(215,255,255,0.9)",
        },
        {
          index: 23,
          text: "农村道路",
          style: "backgroundColor:RGBA(170,85,80,0.9)",
        },
        {
          index: 24,
          text: "农村宅基地",
          style: "backgroundColor:RGBA(0,112,255,0.9)",
        },
        {
          index: 25,
          text: "其他草地",
          style: "backgroundColor:RGBA(205,205,102,0.9)",
        },
        {
          index: 26,
          text: "其他林地",
          style: "backgroundColor:RGBA(38,115,0,0.9)",
        },
        {
          index: 27,
          text: "其他园地",
          style: "backgroundColor:RGBA(245,202,122,0.9)",
        },
        {
          index: 28,
          text: "乔木林地",
          style: "backgroundColor:RGBA(38,115,0,0.9)",
        },
        {
          index: 29,
          text: "商业服务业设施用地",
          style: "backgroundColor:RGBA(255,0,0,0.9)",
        },
        {
          index: 30,
          text: "设施农用地",
          style: "backgroundColor:RGBA(220,180,130,0.9)",
        },
        {
          index: 31,
          text: "水工建筑用地",
          style: "backgroundColor:RGBA(180,220,250,0.9)",
        },
        {
          index: 32,
          text: "水浇地",
          style: "backgroundColor:RGBA(255,255,190,0.9)",
        },
        {
          index: 33,
          text: "水田",
          style: "backgroundColor:RGBA(255,255,115,0.9)",
        },
        {
          index: 34,
          text: "特殊用地",
          style: "backgroundColor:RGBA(114,137,68,0.9)",
        },
        {
          index: 35,
          text: "物流仓储用地",
          style: "backgroundColor:RGBA(197,0,255,0.9)",
        },
        {
          index: 36,
          text: "竹林地",
          style: "backgroundColor:RGBA(38,115,0,0.9)",
        },
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
          ["get", "DLMC"],
          "城镇村道路用地",
          "RGBA(178,178,178,0.9)",
          "城镇住宅用地",
          "RGBA(255,255,0,0.9)",
          "港口码头用地",
          "RGBA(225,225,225,0.9)",
          "高教用地",
          "RGBA(225,225,225,0.9)",
          "工业用地",
          "RGBA(168,112,0,0.9)",
          "公路用地",
          "RGBA(225,225,225,0.9)",
          "公用设施用地",
          "RGBA(0,132,168,0.9)",
          "公园与绿地",
          "RGBA(85,255,0,0.9)",
          "沟渠",
          "RGBA(160,205,240,0.9)",
          "灌木林地",
          "RGBA(38,115,0,0.9)",
          "广场用地",
          "RGBA(130,130,130,0.9)",
          "轨道交通用地",
          "RGBA(178,178,178,0.9)",
          "果园",
          "RGBA(250,201,0,0.9)",
          "旱地",
          "RGBA(215,194,158,0.9)",
          "河流水面",
          "RGBA(115,225,255,0.9)",
          "机关团体新闻出版用地",
          "RGBA(255,0,197,0.9)",
          "交通服务场站用地",
          "RGBA(178,178,178,0.9)",
          "科教文卫用地",
          "RGBA(255,0,197,0.9)",
          "可调整果园",
          "RGBA(255,170,0,0.9)",
          "可调整养殖坑塘",
          "RGBA(215,255,255,0.9)",
          "坑塘水面",
          "RGBA(215,255,255,0.9)",
          "内陆滩涂",
          "RGBA(215,255,255,0.9)",
          "农村道路",
          "RGBA(170,85,80,0.9)",
          "农村宅基地",
          "RGBA(0,112,255,0.9)",
          "其他草地",
          "RGBA(205,205,102,0.9)",
          "其他林地",
          "RGBA(38,115,0,0.9)",
          "其他园地",
          "RGBA(245,202,122,0.9)",
          "乔木林地",
          "RGBA(38,115,0,0.9)",
          "商业服务业设施用地",
          "RGBA(255,0,0,0.9)",
          "设施农用地",
          "RGBA(220,180,130,0.9)",
          "水工建筑用地",
          "RGBA(180,220,250,0.9)",
          "水浇地",
          "RGBA(255,255,190,0.9)",
          "水田",
          "RGBA(255,255,115,0.9)",
          "特殊用地",
          "RGBA(114,137,68,0.9)",
          "物流仓储用地",
          "RGBA(197,0,255,0.9)",
          "竹林地",
          "RGBA(38,115,0,0.9)",
          "#FFFFFF",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.9,
        ],
      };
      add_tms(window.MAP, "pz_sandiao", "fill", industry);

      window.MAP.addLayer({
        id: "pz_sandiao-hl",
        type: "line",
        source: "pz_sandiao",
        "source-layer": "pz_sandiao",
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
      if (features[0].layer.id == "pz_sandiao") {
        var props = features[0].properties;
        console.log(props);
        window.MAP.setFilter("pz_sandiao-hl", [
          "in",
          "OBJECTID",
          features[0].properties.OBJECTID,
        ]);
        _this.propsData = [
          {
            prop: "用地性质",
            value: props["DLMC"],
          },
          {
            prop: "面积",
            value: props["AREA2019"],
          },
          {
            prop: "建筑面积",
            value: props["建面"],
          },
          {
            prop: "容积率",
            value: props["容积率"],
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
    removeLayers(window.MAP, ["pz_sandiao-hl", "pz_sandiao"]);
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


























































