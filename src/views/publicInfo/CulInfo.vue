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
import { getCul } from "@/api/pubinfo/pubInfo.js";
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
    init_map(window.MAP, [113.351,23.094], 13);
    this.initLayers();
    this.mouseEvent();
  },
  methods: {
    initLayers() {
      removeLayers(window.MAP, ["pz_hongxian"]);
      add_wms(window.MAP, "pz_hongxian");
      var circle = {
        "circle-color": "#ffff00",
        "circle-radius": 6,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      };
      add_tms(window.MAP, "pz_jcss_cul", "circle", circle);
      window.MAP.addLayer({
        id: "pz_jcss_cul-hl",
        type: "circle",
        source: "pz_jcss_cul",
        "source-layer": "pz_jcss_cul",
        paint: {
          "circle-color": "#18ffff",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
        filter: ["in", "id", ""],
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
      if (features[0].layer.id == "pz_jcss_cul") {
        var props = features[0].properties;
        window.MAP.setFilter("pz_jcss_cul-hl",[
          "in",
          "id",
          features[0].properties.id
        ])
        _this.propsData = getCul(props);
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
    removeLayers(window.MAP, [
      "pz_jcss_cul-hl",
      "pz_jcss_cul",
    ]);
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