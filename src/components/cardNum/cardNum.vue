<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-18 22:29:01
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-21 11:38:01
 -->
<template>
  <div class="card">
    <div class="cardCon">
      <div class="leftCon">
        <i class="conPng" :class="card.icon"></i>
        <p class="conDesc">{{card.label}}</p>
      </div>
      <div class="rightCon" :style="{color:card.proColor}">
        {{card.num}}
      </div>
    </div>
    <div class="progress">
      <span class="progressContent" :style="{background:card.proColor,width:card.percent}"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardNum',
  props:{
    card:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {}
  },

  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.card {
  width: 100%;
  height: 150px;
  padding:1.25rem;
  background-color: #353c48;
  color: #ced4da;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .cardCon {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .leftCon {
      font-size:14px;
    }
    .rightCon {
      font-size:1.875rem;
      // text-align: right;
    }
  }

  .progress {
    width: 100%;
    height: 6px;
    position:relative;
    background-color: #303641;
    border-radius:2px;
    .progressContent {
      position:absolute;
      left:0;
      top:0;
      height:6px;
      display:block;
    }
  }
}
</style>
