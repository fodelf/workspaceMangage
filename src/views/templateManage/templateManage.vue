<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-30 23:14:42
 * @LastEditors: pym
 * @LastEditTime: 2020-03-30 23:17:47
 -->
<template>
  <div class="templateManage">
     <div class='leftMenu'>
       <!--左侧列表组件-->
       <menuList :menuObj='menuObj' @clickMenu='selectMenu'></menuList>
     </div>
     <div class='rightList'>
       <p class='rightTit clearfix'>
         <el-button type='primary' @click='addPro'>新增</el-button>
         <el-input v-model='keyword' class='keyInpt' placeholder="请输入关键字"></el-input>
       </p>
       <!--表格组件-->
       <div class='tableCon'>
          <tableBox ref='table' :tablePag='tablePag' :dataList='dataList' :headerList='headerList' @changePageNo='getPageNo'></tableBox>
       </div>
     </div>
     <!--弹窗组件-->
     <!-- <proDialog ref='proDialog' :itemObj='itemObj' @getList='getProList'></proDialog> -->
  </div>
</template>

<script>
import templateManage from './templateManage.js'
export default {
  ...templateManage
}
</script>

<style rel="stylesheet/less"  lang="less" scoped>
@import "./templateManage.less";
</style>
