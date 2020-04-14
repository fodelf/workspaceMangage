<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-26 21:42:01
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-14 10:56:04
 -->
<template>
  <div class="scriptManage">
    <p class="rightTit clearfix">
      <el-button type="primary" icon="el-icon-plus" @click="addPro"
        >新增</el-button
      >
    </p>
    <!--脚本卡片组件-->
    <div class="tableCon">
      <el-row :gutter="20">
        <el-col
          :span="12"
          class="current_col"
          v-for="(item, index) in scriptCardList"
          :key="index"
        >
          <!-- <div v-for="(item, index) in scriptCardList"
               :key="index"> -->
          <scriptCard :itemObj="item" @getList="getList"></scriptCard>
          <!-- </div> -->
        </el-col>
      </el-row>
    </div>
    <div class="pageBox clearfix">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="tablePag.pageNo"
        :page-size="tablePag.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="tablePag.totalRecord"
      >
      </el-pagination>
    </div>

    <AddScript @getList="getList" ref="proDialog"></AddScript>
  </div>
</template>

<script>
import scriptManage from './scriptManage.js'
export default {
  ...scriptManage
}
</script>

<style lang="less" scoped>
@import './scriptManage.less';
</style>
