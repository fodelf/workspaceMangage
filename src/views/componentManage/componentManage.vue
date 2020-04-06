<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-06 12:46:09
 * @LastEditors: pym
 * @LastEditTime: 2020-04-06 12:47:42
 -->
<template>
  <div class="componentManage">
    <div class="leftMenu">
      <!--左侧列表组件-->
      <menuList :menuObj="menuObj" @clickMenu="queryCompCard"></menuList>
    </div>
    <div class="rightList">
      <p class="rightTit clearfix">
        <el-button type="primary" @click="addComp" icon="el-icon-plus"
          >新增</el-button
        >
        <el-input
          v-model="keyword"
          class="keyInpt"
          placeholder="请输入关键字"
        ></el-input>
      </p>
      <div class="cardCon">
        <el-tabs v-model="compKind">
          <el-tab-pane
            v-for="item in tabComp"
            :label="item.label"
            :name="item.value"
            :key="item.value"
          >
            <!-- <el-row :gutter="20">
              <el-col
                :span="6"
                v-for="(item, index) in tempCardList"
                :key="index"
              > -->
            <!--卡片组件-->
            <templateCard
              :tempCardList="compCardList"
              :tablePag="tablePag"
              @changePageNo="getPageNo"
            ></templateCard>
            <!-- </el-col>
            </el-row> -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!--弹窗组件-->
    <!-- <tempDialog
      ref="tempDialog"
      :itemObj="itemObj"
      @getTempList="queryTempCard"
    ></tempDialog> -->
  </div>
</template>

<script>
import componentManage from './componentManage.js'
export default {
  ...componentManage,
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import './componentManage.less';
</style>
