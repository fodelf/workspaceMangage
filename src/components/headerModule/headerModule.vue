<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-30 23:29:01
 * @LastEditors: pym
 * @LastEditTime: 2020-03-30 23:36:00
 -->
<template>
  <div>
    <span class='iconfont'
          :class="isCollapse?'icon-daohangzhankai-':'icon-daohangshouqi-'"
          @click="changeMenu()"></span>

    <div class='headerTit clearfix'>
      <p class='clearfix'><span>{{userName}}</span></p>
      <span class="setIcon">设置</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'headerModule',
    data() {
      return {
        isCollapse:false
      }
    }
  }
</script>