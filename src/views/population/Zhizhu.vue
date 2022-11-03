<template>
  <Legend
    :title="title"
    :items="items"
    style="bottom: 20px; left: 10px; width: 200px; height: auto"
  >
  </Legend>
</template>

<script>
import Legend from "components/common/Legend.vue";
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
export default {
  data() {
    return {
      title: "居住人数",
      items: [
        {
          index: 1,
          text: "0",
          style: "backgroundColor:RGB(69,117,181)",
        },
        {
          index: 2,
          text: "1 - 20",
          style: "backgroundColor:RGB(141,165,186)",
        },
        {
          index: 3,
          text: "21 - 100",
          style: "backgroundColor:RGB(217,224,191)",
        },
        {
          index: 4,
          text: "101 - 300",
          style: "backgroundColor:RGB(252,211,154)",
        },
        {
          index: 5,
          text: "301 - 1000",
          style: "backgroundColor:RGB(240,129,89)",
        },
        {
          index: 6,
          text: "1000以上",
          style: "backgroundColor:RGB(214,47,39)",
        },
      ],
    };
  },
  components: {
    Legend,
  },
  mounted() {
    this.init();
    this.loadWMS();
  },
  methods: {
    init() {
      window.MAP.getCanvas().style.cursor = "pointer";
      init_map(window.MAP, [113.351, 23.094], 11);
    },
    loadWMS() {
      window.MAP.addSource("pz_zzfb", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Apz_zzfb@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
      });
      window.MAP.addLayer({
        id: "pz_zzfb",
        source: "pz_zzfb",
        "source-layer": "pz_zzfb",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "work_h_xz"], 1],
            "RGB(69,117,181)", //<10.8
            ["<", ["get", "work_h_xz"], 20],
            "RGB(141,165,186)", //>=10.8 & <17.2
            ["<", ["get", "work_h_xz"], 100],
            "RGB(217,224,191)",
            ["<", ["get", "work_h_xz"], 300],
            "RGB(252,211,154)",
            ["<", ["get", "work_h_xz"], 1000],
            "RGB(240,129,89)",
            "RGB(214,47,39)", // 默认值, >=50.1
          ],
        },
      });
      window.MAP.addLayer({
        id: "pz_zzfb_sym",
        source: "pz_zzfb",
        "source-layer": "pz_zzfb",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{ZLDWMC}\n{work_h_xz}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
      });
      add_wms(window.MAP, "pz_hongxian");

      var paint = {
        "line-color": "#fff",
        "line-width": 2,
      };

      add_tms(window.MAP, "gz_line", "line", paint);
    },
  },
  destroyed() {
    removeLayers(window.MAP, [
      "pz_zzfb_sym",
      "pz_zzfb",
      "pz_hongxian",
      "gz_line",
    ]);
  },
};
</script>

<style lang='scss' scoped>
.legend {
  width: 100%;
  height: calc(100% - 40px);
  z-index: 999;

  .legend_item {
    width: 95%;
    height: 30px;
    margin-top: 10px;
    box-sizing: border-box;
  }

  .color {
    float: left;
    width: 25%;
    height: 100%;
    margin: 0px 10px;
    box-sizing: border-box;
  }

  .text {
    float: left;
    width: 55%;
    height: 100%;
    line-height: 30px;

    box-sizing: border-box;
    text-align: center;
    color: aliceblue;
  }
}
</style>