<template>
  <div id="juzhu_xueli">
    <div id="jz_xlData"></div>
    <div id="jz_xlpie"></div>
  </div>
</template>

<script>
let dataChart;
let pieChart;
export default {
  name: "jz_xl",
  props: {
    datas: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    var dataDom = document.getElementById("jz_xlData");
    dataChart = echarts.init(dataDom);
    var pieDom = document.getElementById("jz_xlpie");
    pieChart = echarts.init(pieDom);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      this.$nextTick(() => {
        dataChart.resize();
      });
      let xuelidata = [
        { name: "其他", value: datas.qita },
        { name: "小学", value: datas.xiaoxue },
        { name: "初中", value: datas.chuzhong },
        { name: "高中", value: datas.gaozhong },
        { name: "专科", value: datas.zhuanke },
        { name: "本科", value: datas.benke },
        { name: "硕士", value: datas.shuoshi },
        { name: "博士", value: datas.boshi }
      ];
      var xueli_sort = [...xuelidata];
      console.log(xueli_sort);
      xueli_sort.sort((a, b) => {
        return a.value - b.value;
      });
      console.log(xuelidata, "xuelidata");
      let datax = [];
      let datay = [];
      xuelidata.forEach(item => {
        datay.push(item.name);
        datax.push(item.value);
      });
      let hj_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}"
        },
        grid: {
          x: 50,
          y: 10,
          y2: 20
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.02],
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: datay,
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#00FFFF"
            },
            interval: 0
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF"
            }
          }
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
                    fontSize: 10
                  }
                }
              }
            }
          }
        ]
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
                    "#ff5722",
                    "#ffff00",
                    "#dfcf20",
                    "#80df20",
                    "#20dfdf",
                    "#2060df",
                    "#8020df",
                    "#df20af"
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
            data: xueli_sort
          }
        ]
      };
      pieChart.setOption(pie_option, true);
    }
  }
};
</script>

<style lang='scss' scoped>
#juzhu_xueli {
  width: 100%;
  height: 100%;
}

#jz_xlData {
  width: 100%;
  height: 60%;
  padding: 5px;
}

#jz_xlpie {
  width: 100%;
  height: 40%;
  padding: 5px;
}
</style>