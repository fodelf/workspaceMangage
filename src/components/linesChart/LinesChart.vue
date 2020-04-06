<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:59:55
 * @LastEditors: pym
 * @LastEditTime: 2020-04-06 16:36:31
 -->
<template>
  <div id="chart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'linesChart',
  data() {
    return {
      option: {
        title: {
          text: '项目提交记录',
          textStyle: {
            color: '#ced4da',
            fontWeight: 500,
          },
        },
        color: ['#01c0c8', '#fb9678', '#ab8ce4'],
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['项目一', '项目二', '项目三'],
          icon: 'circle',
          right: 0,
          itemWidth: 10, //图例的宽度
          itemHeight: 10, //图例的高度
          textStyle: {
            //图例文字的样式
            color: '#ced4da',
            fontSize: 12,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLabel: {
            color: '#888',
          },
          axisLine: {
            lineStyle: {
              color: '#666',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#888',
          },
          splitLine: {
            lineStyle: {
              color: '#666',
            },
          },
        },
        series: [
          {
            name: '项目一',
            type: 'line',
            stack: '总量',
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '项目二',
            type: 'line',
            smooth: true,
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '项目三',
            type: 'line',
            stack: '总量',
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      },
    }
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById('chart'))
      myChart.setOption(this.option)
    },
  },
  mounted() {
    this.initChart()
  },
  created() {},
}
</script>

<style lang="less" scoped>
#chart {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style>
