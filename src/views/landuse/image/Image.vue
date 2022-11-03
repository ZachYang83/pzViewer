<template>
  <div class="timeLine">
    <Timeline @changeData="changeLayer"></Timeline>
  </div>
</template>

<script>
import { init_map } from "utils/initMap.js";
import { removeLayers } from "utils/removeLayers.js";
import Timeline from "./Timeline.vue";
export default {
  components: {
    Timeline,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      init_map(window.MAP, [113.351, 23.094], 13);
      window.MAP.setStyle("mapbox://styles/mapbox/light-v10");
      window.setTimeout(() => {
        window.MAP.addSource("pzImage", {
          type: "raster",
          tiles: [
            "https://8.134.70.156:6443/arcgis/rest/services/pazhou/pz_2014/MapServer/tile/{z}/{y}/{x}",
          ],
          tileSize: 256,
        });
        window.MAP.addLayer({
          id: "pzImage",
          type: "raster",
          source: "pzImage",
        });
      },500);
      // window.MAP.setStyle('mapbox://styles/mapbox/light-v10');
    },
    changeLayer(index) {
      var field;
      console.log(index, "index");
      switch (index) {
        case 0:
          field = "pz_" + 2014;
          this.addLayer(field);
          break;
        case 1:
          field = "pz_" + 2015;
          this.addLayer(field);
          break;
        case 2:
          field = "pz_" + 2017;
          this.addLayer(field);
          break;
        case 3:
          field = "pz_" + 2018;
          this.addLayer(field);
          break;
        case 4:
          field = "pz_" + 2019;
          this.addLayer(field);
          break;
        case 5:
          field = "pz_" + 2020;
          this.addLayer(field);
          break;
        case 6:
          field = "pz_" + 2021;
          this.addLayer(field);
          break;
        case 7:
          field = "pz_" + 2022;
          this.addLayer(field);
          break;
      }
    },
    addLayer(name) {
      removeLayers(window.MAP, ["pzImage"]);
      window.MAP.addSource("pzImage", {
        type: "raster",
        tiles: [
          "https://8.134.70.156:6443/arcgis/rest/services/pazhou/" +
            name +
            "/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
      });
      window.MAP.addLayer({
        id: "pzImage",
        type: "raster",
        source: "pzImage",
      });
    },
  },
  destroyed() {
    removeLayers(window.MAP, ["pzImage"]);
  },
};
</script>

<style lang='scss' scoped>
.timeLine {
  position: absolute;
  bottom: 30px;
  width: 35%;
  right: 50%;
  transform: translateX(50%);
  height: 60px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 0px;
  border-radius: 40px;
}
</style>