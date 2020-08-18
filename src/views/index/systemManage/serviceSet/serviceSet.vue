<!--
 * @Descripttion: 
 * @version: 
 * @Author: pym
 * @Date: 2020-08-11 14:26:54
 * @LastEditors: pym
 * @LastEditTime: 2020-08-18 14:05:35
-->
<template>
  <div class='service-content clearfix'>
    <systemCard v-for="(item,index) in serviceList" :key='index' :item="item" class='systemCard'>
    </systemCard>
  </div>
</template>

<script>
import serviceSet from './serviceSet.js'
export default {
  ...serviceSet
}
</script>

<style lang='less' scoped>
@import './serviceSet.less';
</style>