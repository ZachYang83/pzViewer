<template>
  <div id="jy_hujiData"></div>
</template>

<script>
let dataChart;
export default {
  name: "jy_hj",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var dataDom = document.getElementById("jy_hujiData");
    dataChart = echarts.init(dataDom);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      this.$nextTick(() => {
        dataChart.resize();
      });
      console.log(datas, "datas");
      let hujidata = [
        { key: "北京", value: datas.beijing },
        { key: "天津", value: datas.tianjin },
        { key: "河北", value: datas.hebei },
        { key: "山西", value: datas.shanxi },
        { key: "内蒙古", value: datas.neimenggu },
        { key: "辽宁", value: datas.liaoning },
        { key: "吉林", value: datas.jilin },
        { key: "黑龙江", value: datas.heilongjia },
        { key: "上海", value: datas.shanghai },
        { key: "江苏", value: datas.jiangsu },
        { key: "浙江", value: datas.zhejiang },
        { key: "安徽", value: datas.anhui },
        { key: "福建", value: datas.fujian },
        { key: "江西", value: datas.jiangxi },
        { key: "山东", value: datas.shandong },
        { key: "河南", value: datas.henan },
        { key: "湖北", value: datas.hubei },
        { key: "湖南", value: datas.hunan },
        { key: "广东", value: datas.guangdong },
        { key: "广西", value: datas.guangxi },
        { key: "海南", value: datas.hainan },
        { key: "重庆", value: datas.chongqing },
        { key: "四川", value: datas.sichuan },
        { key: "贵州", value: datas.guizhou },
        { key: "云南", value: datas.yunnan },
        { key: "西藏", value: datas.xizang },
        { key: "陕西", value: datas.shannxi },
        { key: "甘肃", value: datas.gansu },
        { key: "青海", value: datas.qinghai },
        { key: "宁夏", value: datas.ningxia },
        { key: "新疆", value: datas.xinjiang },
      ];
      hujidata.sort((a, b) => {
        return a.value - b.value;
      });
      console.log(hujidata, "hujidata");
      let datax = [];
      let datay = [];
      hujidata.forEach((item) => {
        datay.push(item.key);
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
    },
  },
};
</script>

<style lang='scss' scoped>
#jy_hujiData {
  width: 100%;
  height: 100%;
  padding: 5px;
}
</style>