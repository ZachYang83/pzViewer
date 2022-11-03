<template>
  <div id="worklive">
    <div id="wl_barpan"></div>
    <div id="wl_piepan"></div>
  </div>
</template>

<script>
let barChart;
let pieChart;
export default {
  name: "workline",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var barDom = document.getElementById("wl_barpan");
    barChart = echarts.init(barDom);
    var pieDom = document.getElementById("wl_piepan");
    pieChart = echarts.init(pieDom);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      this.$nextTick(() => {
        barChart.resize();
        pieChart.resize();
      });
      let data2019 = [datas.live2019, datas.work2019];
      let data2022 = [datas.live2022, datas.work2022];
      let bar_option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          top: 15,
          textStyle: {
            color: "#00FFFF",
          },
        },
        grid: {
          x: 30,
          y: 50,
          x2: 40,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.02],
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: ["就业人口", "居住人口"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
            rotate: 90,
            // interval: 0,
          },
        },
        series: [
          {
            name: "2019",
            type: "bar",
            data: data2019,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFFF",
                    fontSize: 10,
                  },
                },
              },
            },
          },
          {
            name: "2022",
            type: "bar",
            data: data2022,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFFF",
                    fontSize: 10,
                  },
                },
              },
            },
          },
        ],
      };
      barChart.setOption(bar_option, true);

      let pie_option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          top: 15,
          textStyle: {
            color: "#00FFFF",
          },
        },
        grid: {
          x: 20,
          y: 20,
          x2: 20,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          axisTick: {
            show: false,
          },
        },
        xAxis: {
          type: "category",
          data: ["居住人口", "就业人口"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
            rotate: 40,
            interval: 0,
          },
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.value > 0) {
                    return "#df20af";
                  } else {
                    return "#80df20";
                  }
                },
              },
            },
            label: {
              show: true, //开启显示
              // position: function (params) {
              //   if (params.value > 0) {
              //     return 'inside';
              //   } else {
              //     return 'inside';
              //   }
              // }, //在上方显示
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: 15,
              },
            },
            data: [
              datas.work2022 - datas.work2019,
              datas.live2022 - datas.live2019,
            ],
          },
        ],
      };
      pieChart.setOption(pie_option, true);
    },
  },
};
</script>

<style lang='scss' scoped>
#worklive {
  width: 100%;
  height: 100%;
}

#wl_barpan {
  width: 100%;
  height: 60%;
  padding: 5px;
}

#wl_piepan {
  width: 100%;
  height: 40%;
  padding: 5px;
}
</style>