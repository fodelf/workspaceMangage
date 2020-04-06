<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-06 16:39:24
 * @LastEditors: pym
 * @LastEditTime: 2020-04-06 17:40:17
 -->
<template>
  <div class="weather">
    <div class="temperature">
      <span class="weatherAir">36<sup>°C</sup></span>
      <div class="location">NANJING,CHINA</div>
    </div>
    <div class="weatherBg">
      <div class="iconfont icon-ziyuan"></div>
      <div class="weatherDec">SUNNEY DAY</div>
      <div class="weatherDate">Aprial 6</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'weather',
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.weather {
  width: 100%;
  height: 100%;
  background: #01c0c8;
  padding: 20px;
  // display: flex;
  position: relative;
  .temperature {
    // flex: 0 0 50%;
    width: 50%;
    position: absolute;
    left: 20px;
    bottom: 30px;

    .weatherAir {
      font-size: 60px;
      sup {
        font-size: 30px;
      }
    }
    .location {
      font-size: 14px;
    }

    color: #fff;
  }
  .weatherBg {
    flex: 0 0 50%;

    .iconfont {
      font-size: 26px;
      color: #fff;
      display: flex;
      width: 100%;
      justify-content: flex-end;
      margin-bottom: 10px;
    }
    .weatherDec {
      color: #fff;
      font-size: 14px;
      display: flex;
      width: 100%;
      margin-bottom: 8px;
      justify-content: flex-end;
    }
    .weatherDate {
      font-size: 14px;
      display: flex;
      width: 100%;
      justify-content: flex-end;
      color: #fff;
      opacity: 0.5;
    }
  }
}
</style>
