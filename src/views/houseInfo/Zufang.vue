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
  </div>
</template>

<script>
import leftPan from "@/components/common/leftPan.vue";
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import {
  getCiv,
  getMed,
  getEdu,
  getPal,
  getHousePrice,
  getZufang,
} from "@/api/pubinfo/pubInfo.js";
import Popup from "@/components/Popup.vue";
export default {
  data() {
    return {
      visible: false,
      propsData: [],
    };
  },
  components: {
    leftPan,
    Popup,
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
      //   var circle = {
      //     "circle-color": "#ea80fc",
      //     "circle-radius": 6,
      //     "circle-stroke-width": 1,
      //     "circle-stroke-color": "#fff",
      //   };
      //   add_tms(window.MAP, "pz_zufang", "circle", circle);
      window.MAP.addSource("pz_zufang", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:/8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Apz_zufang@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        cluster: true,
        clusterMaxZoom: 20,
        clusterRadius: 20,
        // maxzoom: 8,
      });
      window.MAP.addLayer({
        id: "pz_zufang",
        type: "circle",
        source: "pz_zufang",
        "source-layer": "pz_zufang",
        paint: {
          "circle-color": "#ea80fc",
          "circle-radius": 6,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        // filter: ["!",["has", "countTotal"]],
        // paint: {
        //   //*蓝色，当点数小于100时为20px圆
        //   //*点计数在100到750之间时为黄色，21px圆
        //   //*点计数大于或等于750时为22像素的粉红色圆圈
        //   "circle-color": [
        //     "step",
        //     ["get", "countTotal"],
        //     "rgba(81, 187, 214, 0.8)",
        //     2,
        //     "rgba(241, 240, 117, 0.8)",
        //     5,
        //     "rgba(242, 140, 177, 0.8)",
        //   ],
        //   "circle-radius": [
        //     "step",
        //     ["get", "countTotal"],
        //     5, //蓝色，当点数小于100时为20px圆
        //     2, //对应上面circle-color 数字，意思为100以内
        //     10, //点计数在100到750之间时为黄色，21px圆
        //     5, //对应上面circle-color 数字，意思为750以内
        //     15, //点计数大于或等于750时为22像素的粉红色圆圈
        //   ],
        // },
      });
      window.MAP.addLayer({
        id: "pz_zufang-hl",
        type: "circle",
        source: "pz_zufang",
        "source-layer": "pz_zufang",
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
      if (features[0].layer.id == "pz_zufang") {
        var props = features[0].properties;
        window.MAP.setFilter("pz_zufang-hl", [
          "in",
          "ID",
          features[0].properties.ID,
        ]);
        _this.propsData = getZufang(props);
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
    removeLayers(window.MAP, ["pz_hongxian", "pz_zufang-hl", "pz_zufang"]);
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
</style>