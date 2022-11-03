<template>
  <div>
    <div class="drawGroup">
      <div
        v-for="(item, index) in drawItems"
        :key="index"
        class="drawItem"
        @click.stop="addpolygon(index, item.val)"
        :class="{ isActive: position === index }"
      >
        <img
          :src="item.src"
          style="width: 25px; height: 25px; margin: 0 auto"
        />
      </div>
    </div>
    <div class="dataPan" v-show="showData" v-bind:class="{ active: showData }">
      <div class="item changzhu">
        <div class="title">
          <h2>常 住 人 口</h2>
        </div>
        <div class="content">
          <keep-alive>
            <component
              :is="isJuzhu"
              ref="juzhu_pan"
              :datas="juzhuDatas"
            ></component>
          </keep-alive>
        </div>
        <div class="foot">
          <div
            class="foot-item"
            @click="isJuzhu = 'jz_hj'"
            :class="{ active: isJuzhu == 'jz_hj' }"
          >
            户籍
          </div>
          <div
            class="foot-item"
            @click="isJuzhu = 'jz_nl'"
            :class="{ active: isJuzhu == 'jz_nl' }"
          >
            年龄
          </div>
          <div
            class="foot-item"
            @click="isJuzhu = 'jz_xl'"
            :class="{ active: isJuzhu == 'jz_xl' }"
          >
            学历
          </div>
        </div>
      </div>
      <div class="item jiuye">
        <div class="title">
          <h2>就 业 人 口</h2>
        </div>
        <div class="content">
          <keep-alive>
            <component
              :is="isJiuye"
              ref="jiuye_pan"
              :datas="jiuyeDatas"
            ></component>
          </keep-alive>
        </div>
        <div class="foot">
          <div
            class="foot-item"
            @click="isJiuye = 'jy_hj'"
            :class="{ active: isJiuye == 'jy_hj' }"
          >
            户籍
          </div>
          <div
            class="foot-item"
            @click="isJiuye = 'jy_nl'"
            :class="{ active: isJiuye == 'jy_nl' }"
          >
            年龄
          </div>
          <div
            class="foot-item"
            @click="isJiuye = 'jy_xl'"
            :class="{ active: isJiuye == 'jy_xl' }"
          >
            学历
          </div>
          <div
            class="foot-item"
            @click="isJiuye = 'jy_hy'"
            :class="{ active: isJiuye == 'jy_hy' }"
          >
            行业
          </div>
        </div>
      </div>
      <div class="item bianhua">
        <div class="title">
          <h2>人口变化（手机信令）</h2>
        </div>
        <div class="content">
          <keep-alive>
            <component
              :is="isWorkLive"
              ref="worklive_pan"
              :datas="workLive"
            ></component>
          </keep-alive>
        </div>
        <div class="foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as turf from "@turf/turf";
import { init_map } from "utils/initMap.js";
import { add_wms } from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
import { circleEvt } from "utils/draw/circle.js";
import { polygonEvt } from "utils/draw/polygon.js";
import { rectangleEvt } from "utils/draw/rectangle.js";
import { deleteEvt } from "utils/draw/delete.js";
import { postWorkLive } from "api/population/queryMap.js";

import jy_hj from "../workLive/dataPan/Jy_huji";
import jy_nl from "../workLive/dataPan/Jy_nianling";
import jy_xl from "../workLive/dataPan/Jy_xueli";
import jy_hy from "../workLive/dataPan/Jy_hangye";
import jz_hj from "../workLive/dataPan/Jz_huji";
import jz_nl from "../workLive/dataPan/Jz_nianling";
import jz_xl from "../workLive/dataPan/Jz_xueli";
import workLive from "../workLive/dataPan/WL2019_2022";

export default {
  data() {
    return {
      drawItems: [
        {
          index: 1,
          val: "circle",
          src: require("assets/drawControl/circle.png"),
        },
        {
          index: 2,
          val: "rectangle",
          src: require("assets/drawControl/rectangle.png"),
        },
        {
          index: 3,
          val: "polygon",
          src: require("assets/drawControl/polygon.png"),
        },
        {
          index: 4,
          val: "delete",
          src: require("assets/drawControl/delete.png"),
        },
      ],
      position: "",
      showData: false,
      isJiuye: "jy_hj",
      isJuzhu: "jz_hj",
      isWorkLive: "workLive",
      juzhuDatas: {},
      jiuyeDatas: {},
      workLive: {},
    };
  },
  components: {
    jy_hj: jy_hj,
    jy_nl: jy_nl,
    jy_xl: jy_xl,
    jy_hy: jy_hy,
    jz_hj: jz_hj,
    jz_nl: jz_nl,
    jz_xl: jz_xl,
    workLive: workLive,
  },
  mounted() {
    this.init();
    this.initLayers();
  },
  methods: {
    init() {
      init_map(window.MAP, [113.351, 23.094], 13);
    },
    initLayers() {
      removeLayers(window.MAP, ["pz_hongxian"]);
      add_wms(window.MAP, "pz_hongxian");
      window.MAP.addSource("pz_heatmap", {
        type: "raster",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gpzi/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES&LAYERS=gpzi:pz_heatmap&exceptions=application/vnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=769&HEIGHT=750&BBOX={bbox-epsg-3857}",
        ],
        tileSize: 512,
      });
      window.MAP.addLayer({
        id: "pz_heatmap",
        type: "raster",
        source: "pz_heatmap",
        paint: {
          "raster-opacity": 0.3,
        },
      });
    },
    addpolygon(index, val) {
      let _this = this;
      this.position = index;
      var features = [];
      window.MAP.getCanvas().style.cursor = "crosshair";
      switch (val) {
        case "circle":
          circleEvt(function () {
            var circle = window.MAP.getSource("circle");
            console.log(circle, "circle");
            features = circle._data.geometry.coordinates[0];
            features.push(features[0]);
            _this.loadWFS(features);
          }, window.MAP);
          break;
        case "rectangle":
          rectangleEvt(function () {
            var rectangle = window.MAP.getSource("rectangle");
            console.log(rectangle, "rectangle");
            features = rectangle._data.features[0].geometry.coordinates[0];
            features.push(features[0]);
            _this.loadWFS(features);
          }, window.MAP);
          break;
        case "polygon":
          polygonEvt(function () {
            var points_area = window.MAP.getSource("points-area");
            console.log(points_area, "points_area");
            points_area._data.features.forEach((element) => {
              if (!features.includes(element.geometry.coordinates)) {
                features.push(element.geometry.coordinates);
              }
            });
            features.push(features[0]);
            _this.loadWFS(features);
          }, window.MAP);
          break;
        case "delete":
          deleteEvt(window.MAP);
          break;
      }
    },
    loadWFS(features) {
      let _this = this;
      let ids = [];
      var searchWithin = turf.polygon([features]);
      this.axios
        .get("http://8.134.70.156:8181/geoserver/wfs", {
          params: {
            service: "WFS",
            version: "1.1.0",
            request: "GetFeature",
            typeName: "gpzi:pz_juzhu_grid",
            outputFormat: "application/json",
            srsName: "EPSG:4326",
          },
        })
        .then((res) => {
          var stations = res.data.features;
          stations.forEach((item) => {
            // stations.push(item.geometry.coordinates);
            let pt = turf.point(item.geometry.coordinates);
            if (turf.booleanPointInPolygon(pt, searchWithin)) {
              ids.push(item.properties.Id);
            }
          });
          if (ids.length == 0) {
            _this.$message.error("查询超出琶洲范围");
            return;
          } else {
            postWorkLive("/pop_perceive/pz-live-grid/getLivePop", {
              ids: JSON.stringify(ids),
            }).then((res) => {
              // _this.$message.success("获取数据成功");
              _this.juzhuDatas = res.data.data[0];
              console.log(_this.juzhuDatas, "juzhuDatas");
              _this.showData = true;
              _this.$refs["juzhu_pan"].setChart(_this.juzhuDatas);
            });
          }
        });
      this.axios
        .get("http://8.134.70.156:8181/geoserver/wfs", {
          params: {
            service: "WFS",
            version: "1.1.0",
            request: "GetFeature",
            typeName: "gpzi:pz_jiuye_grid",
            outputFormat: "application/json",
            srsName: "EPSG:4326",
          },
        })
        .then((res) => {
          var stations = res.data.features;
          stations.forEach((item) => {
            // stations.push(item.geometry.coordinates);
            let pt = turf.point(item.geometry.coordinates);
            if (turf.booleanPointInPolygon(pt, searchWithin)) {
              ids.push(item.properties.Id);
            }
          });
          if (ids.length == 0) {
            _this.$message.error("查询超出琶洲范围");
            return;
          } else {
            postWorkLive("/pop_perceive/pz-work-grid/getWorkPop", {
              ids: JSON.stringify(ids),
            }).then((res) => {
              // _this.$message.success("获取数据成功");
              _this.jiuyeDatas = res.data.data[0];
              console.log(_this.jiuyeDatas, "juzhuDatas");
              _this.showData = true;
              _this.$refs["jiuye_pan"].setChart(_this.jiuyeDatas);
            });
          }
        });
      window.setTimeout(()=>{
        this.axios
        .get("http://8.134.70.156:8181/geoserver/wfs", {
          params: {
            service: "WFS",
            version: "1.1.0",
            request: "GetFeature",
            typeName: "gpzi:pz_worklive",
            outputFormat: "application/json",
            srsName: "EPSG:4326",
          },
        })
        .then((res) => {
          var stations = res.data.features;
          stations.forEach((item) => {
            // stations.push(item.geometry.coordinates);
            let pt = turf.point(item.geometry.coordinates);
            if (turf.booleanPointInPolygon(pt, searchWithin)) {
              ids.push(item.properties.net_id);
            }
          });
          if (ids.length == 0) {
            _this.$message.error("查询超出琶洲范围");
            return;
          } else {
            postWorkLive("/pop_perceive/pz-zhizhu/getWorkLive", {
              ids: JSON.stringify(ids),
            }).then((res) => {
              // _this.$message.success("获取数据成功");
              _this.workLive = res.data.data[0];
              console.log(_this.workLive, "workLive");
              _this.showData = true;
              _this.$refs["worklive_pan"].setChart(_this.workLive);
            });
          }
        });
      },1750)
    },
  },
  destroyed() {
    removeLayers(window.MAP, ["pz_heatmap"]);
    deleteEvt(window.MAP);
  },
};
</script>

<style lang='scss' scoped>
.drawGroup {
  position: absolute;
  top: 40px;
  left: 10px;
  width: fit-content;
  height: auto;
  cursor: pointer;
  z-index: 999;
  // padding:3px;
  border-radius: 5px;
  background-color: aliceblue;

  .drawItem {
    width: 42px;
    height: 42px;
    // background-color: aquamarine;
    padding: 1px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-bottom: solid 2px darkgrey;
  }

  .drawItem:hover {
    background-color: rgba(102, 102, 102, 0.2);
  }

  div:not(:last-child) {
    border-bottom: solid 2px darkgrey;
  }

  .isActive {
    background-color: rgba(102, 102, 102, 0.4);
  }
}

.dataPan {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 40px;
  right: 10px;
  width: 0px;
  height: calc(100% - 50px);
  background: linear-gradient(to left, #17c5a5, #17c5a5) left top no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) left top no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right top no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) right top no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) left bottom no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) left bottom no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right bottom no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right bottom no-repeat;
  background-size: 1px 15px, 15px 1px;
  background-color: rgba(44, 47, 48, 0.7);
  transition: width 0.25s;
  z-index: 999;
  &.active {
    width: 600px;
  }

  .item {
    height: 100%;
    flex: 1;

    .title {
      width: 100%;
      height: 50px;
      text-align: center;
      background-color: RGBA(8, 32, 52, 0.8);
      line-height: 50px;
      color: #bdbdbd;
    }
    .content {
      width: 100%;
      height: calc(100% - 90px);

      #data2019_2022 {
        width: 100%;
        height: 60%;
      }
    }
    .foot {
      display: flex;
      width: 100%;
      height: 40px;
      background-color: RGBA(8, 32, 52, 0.8);
    }

    .foot-item {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      color: #bdbdbd;
      cursor: pointer;
    }
    .active {
      background-color: yellowgreen;
      color: #2a8d8d;
      font-size: 17px;
      font-weight: 800;
    }
  }

  .changzhu {
    border-right: #003366 2px solid;
  }

  .jiuye {
    border-right: #003366 2px solid;
  }
}
</style>