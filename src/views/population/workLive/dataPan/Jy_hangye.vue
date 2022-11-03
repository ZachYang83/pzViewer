<template>
  <div id="jiuye_hy">
    <div id="jy_hyData"></div>
    <div id="jy_hypie"></div>
  </div>
</template>

<script>
let dataChart;
let pieChart;
export default {
  name: "jy_hy",
  props: {
    datas: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    var dataDom = document.getElementById("jy_hyData");
    dataChart = echarts.init(dataDom);
    var pieDom = document.getElementById("jy_hypie");
    pieChart = echarts.init(pieDom);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      this.$nextTick(() => {
        dataChart.resize();
      });
      let hangyedata = [
        { name: "交通运输业", value: datas.jiaotong },
        { name: "住宿餐饮业", value: datas.zhusu },
        { name: "信息技术服务业", value: datas.xinxi },
        { name: "公共管理", value: datas.gonggong },
        { name: "农林牧渔业", value: datas.nlmy },
        { name: "制造业", value: datas.zhizao },
        { name: "卫生和社会工作", value: datas.weisheng },
        { name: "居民服务", value: datas.jumin },
        { name: "建筑业", value: datas.jianzhu },
        { name: "房地产业", value: datas.fangdi },
        { name: "批发零售业", value: datas.pifa },
        { name: "教育", value: datas.jiaoyu },
        { name: "文体娱乐业", value: datas.wenhua },
        { name: "水利环境", value: datas.shuili },
        { name: "电热气水", value: datas.dianli },
        { name: "科学研究", value: datas.kexue },
        { name: "租赁商服业", value: datas.zulin },
        { name: "金融业", value: datas.jinrong }
      ];
      hangyedata.sort((a, b) => {
        return a.value - b.value;
      });
      var hangye_sort = [...hangyedata];
      hangye_sort = hangye_sort.slice(0,9);
      let datax = [];
      let datay = [];
      hangyedata.forEach(item => {
        datay.push(item.name);
        datax.push(item.value);
      });
      let hj_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}"
        },
        grid: {
          x: 70,
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
            rotate: 45,
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
            data: hangye_sort
          }
        ]
      };
      pieChart.setOption(pie_option, true);
    }
  }
};
</script>

<style lang='scss' scoped>
#jiuye_hy {
  width: 100%;
  height: 100%;
}

#jy_hyData {
  width: 100%;
  height: 60%;
  padding: 5px;
}

#jy_hypie {
  width: 100%;
  height: 40%;
  padding: 5px;
}
</style>