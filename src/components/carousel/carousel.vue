<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-21 20:50:26
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-21 21:07:54
 -->
<template>
  <el-carousel height="100%" :interval="3000" indicator-position="none" arrow="nerver">
    <el-carousel-item v-for="item in carouselList" :key="item">
      {{ item }} 
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name:'carousel',
    props:{
      carouselList:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="less" scoped>
.el-carousel {
  height:100%;
  width:100%;
  /deep/.el-carousel__container {
    color:#fff;
  }
}
// .el-carousel--horizontal {
//   height:100%;
//   width:100%;
// }
</style>