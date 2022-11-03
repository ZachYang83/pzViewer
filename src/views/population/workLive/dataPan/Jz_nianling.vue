<template>
<div id="juzhu_nl">
  <div id="jz_nlData"></div>
  <div id="jz_nlpie"></div>
</div>
</template>

<script>
let dataChart;
let pieChart;
export default {
  name: "jz_nl",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var dataDom = document.getElementById("jz_nlData");
    dataChart = echarts.init(dataDom);
     var pieDom = document.getElementById("jz_nlpie");
      pieChart = echarts.init(pieDom);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      var dataDom = document.getElementById("jz_nlData");
      dataChart = echarts.init(dataDom);
        this.$nextTick(() => {
          dataChart.resize();
        });
      let nianlingdata = [
        { name: "0_11", value: datas.nl011 },
        { name: "12_15", value: datas.nl1215 },
        { name: "16_18", value: datas.nl1618 },
        { name: "19_22", value: datas.nl1922 },
        { name: "23_25", value: datas.nl2325 },
        { name: "26_35", value: datas.nl2635 },
        { name: "36_45", value: datas.nl3645 },
        { name: "46_55", value: datas.nl4655 },
        { name: "56_65", value: datas.nl5665 },
        { name: "65以上", value: datas.nl65over },
      ];
      var nianling_sort = [...nianlingdata]
        nianling_sort.sort((a, b) => {
          return a.value - b.value;
        });
      console.log(nianlingdata, "nianlingdata");
      let datax = [];
      let datay = [];
      nianlingdata.forEach((item) => {
        datay.push(item.name);
        datax.push(item.value);
      });
      let hj_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}",
        },
        grid: {
          x: 50,
          y: 10,
          y2: 20,
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
          data: datay,
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
            interval: 0,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
        },
        color: "#00FFFF",
        series: [
          {
            type: "bar",
            data: datax,
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
      dataChart.setOption(hj_option, true);

      let pie_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}{d}%"
        },
        series: [
          {
            name: "全市类型占比",
            type: "pie",
            radius: ["40%", "90%"],
            avoidLabelOverlap: true,
            selectedMode: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inner",
                  textStyle: {
                    color: "#fff",
                    fontSize: 13
                  },
                  formatter: "{b}\n{d}%"
                },
                labelLine: {
                  show: false
                },
                color: function(params) {
                  //自定义颜色
                  var colorList = [
                    "#536dfe",
                    "#64ffda",
                    "#ff5722",
                    "#ffff00",
                    "#dfcf20",
                    "#80df20",
                    "#20dfdf",
                    "#2060df",
                    "#8020df",
                    "#df20af",
                  ];
                  return colorList[params.dataIndex];
                }
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: "{b}\n{d}%"
                }
              }
            },
            data: nianling_sort
          }
        ]
      };
      pieChart.setOption(pie_option, true);
    },
  },
};
</script>

<style lang='scss' scoped>
#juzhu_nl {
  width: 100%;
  height: 100%;
}

#jz_nlData {
  width: 100%;
  height: 60%;
  padding: 5px;
}

#jz_nlpie {
  width: 100%;
  height: 40%;
  padding: 5px;
}

</style>