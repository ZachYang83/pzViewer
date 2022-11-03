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
        <div style="font: bold 18px '微软雅黑'; marginbottom: 15px">行业</div>
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
      legendItems: [
        { index: 1, text: "采矿业", style: "backgroundColor:#dce775" },
        {
          index: 2,
          text: "电力、热力、燃气及水生产和供应业",
          style: "backgroundColor:#ff80ab",
        },
        { index: 3, text: "房地产业", style: "backgroundColor:#4fc3f7" },
        { index: 4, text: "国际组织", style: "backgroundColor:#ba68c8" },
        { index: 5, text: "建筑业", style: "backgroundColor:#ff9800" },
        {
          index: 6,
          text: "交通运输、仓储和邮政业",
          style: "backgroundColor:#69f0ae",
        },
        { index: 7, text: "教育", style: "backgroundColor:#b388ff" },
        { index: 8, text: "金融业", style: "backgroundColor:#1de9b6" },
        {
          index: 9,
          text: "居民服务、修理和其他服务业",
          style: "backgroundColor:#ffff00",
        },
        {
          index: 10,
          text: "科学研究和技术服务业",
          style: "backgroundColor:#ffff00",
        },
        {
          index: 11,
          text: "农、林、牧、渔业",
          style: "backgroundColor:#ffd54f",
        },
        { index: 12, text: "批发和零售业", style: "backgroundColor:#aeea00" },
        {
          index: 13,
          text: "水利、环境和公共设施管理业",
          style: "backgroundColor:#64b5f6",
        },
        { index: 14, text: "卫生和社会工作", style: "backgroundColor:#ffb74d" },
        {
          index: 15,
          text: "文化、体育和娱乐业",
          style: "backgroundColor:#00e5ff",
        },
        {
          index: 16,
          text: "信息传输、软件和信息技术服务业",
          style: "backgroundColor:#ff4081",
        },
        { index: 17, text: "制造业", style: "backgroundColor:#e040fb" },
        { index: 18, text: "住宿和餐饮业", style: "backgroundColor:#00e5ff" },
        {
          index: 19,
          text: "租赁和商务服务业",
          style: "backgroundColor:#ff4081",
        },
      ],
    };
  },
  components: {
    Popup,
    Legend,
  },
  mounted() {
    init_map(window.MAP, [113.351, 23.094], 14);
    this.initLayers();
    this.mouseEvent();
  },
  methods: {
    initLayers() {
      removeLayers(window.MAP, ["pz_hongxian"]);
      add_wms(window.MAP, "pz_hongxian");
      var circle = {
        "circle-radius": 6,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
        "circle-color": [
          "match",
          ["get", "行业名称"],
          "采矿业",
          "#dce775",
          "电力、热力、燃气及水生产和供应业",
          "#ff80ab",
          "房地产业",
          "#4fc3f7",
          "国际组织",
          "#ba68c8",
          "建筑业",
          "#ff9800",
          "交通运输、仓储和邮政业",
          "#69f0ae",
          "教育",
          "#b388ff",
          "金融业",
          "#1de9b6",
          "居民服务、修理和其他服务业",
          "#ffff00",
          "科学研究和技术服务业",
          "#ffff00",
          "农、林、牧、渔业",
          "#ffd54f",
          "批发和零售业",
          "#aeea00",
          "水利、环境和公共设施管理业",
          "#64b5f6",
          "卫生和社会工作",
          "#ffb74d",
          "文化、体育和娱乐业",
          "#00e5ff",
          "信息传输、软件和信息技术服务业",
          "#ff4081",
          "制造业",
          "#e040fb",
          "住宿和餐饮业",
          "#00e5ff",
          "租赁和商务服务业",
          "#ff4081",
          "#d4e157",
        ],
      };
      add_tms(window.MAP, "pz_qiyeshui", "circle", circle);

      window.MAP.addLayer({
        id: "pz_qiyeshui-hl",
        type: "circle",
        source: "pz_qiyeshui",
        "source-layer": "pz_qiyeshui",
        paint: {
          "circle-color": "#18ffff",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
        filter: ["in", "ID", ""],
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
      if (features[0].layer.id == "pz_qiyeshui") {
        var props = features[0].properties;
        window.MAP.setFilter("pz_qiyeshui-hl", [
          "in",
          "ID",
          features[0].properties.ID,
        ]);
        _this.propsData = [
          {
            prop: "企业名称",
            value: props["企业名称"],
          },
          {
            prop: "行业类型",
            value: props["行业名称"],
          },
          {
            prop: "注册类型",
            value: props["注册类型"],
          },
          {
            prop: "税额",
            value: props["税额"],
          },
          {
            prop: "成立日期",
            value: props["成立日期"].slice(0, -5),
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
    removeLayers(window.MAP, ["pz_qiyeshui-hl", "pz_qiyeshui"]);
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
  background-color: rgba(38, 40, 41, 0.9);
  color: #fff;
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