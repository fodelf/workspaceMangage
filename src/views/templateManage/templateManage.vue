<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-30 23:14:42
 * @LastEditors: pym
 * @LastEditTime: 2020-04-06 18:08:38
 -->
<template>
  <div class="templateManage">
    <div class="leftMenu">
      <!--左侧列表组件-->
      <menuList :menuObj="menuObj" @clickMenu="queryTempCard"></menuList>
    </div>
    <div class="rightList">
      <p class="rightTit clearfix">
        <el-button type="primary" @click="addPro" icon="el-icon-plus"
          >新增</el-button
        >
        <el-input
          v-model="keyword"
          class="keyInpt"
          placeholder="请输入关键字"
        ></el-input>
      </p>
      <div class="cardCon">
        <el-tabs v-model="tempKind">
          <el-tab-pane
            v-for="item in tabTemp"
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
              :tempCardList="tempCardList"
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
    <tempDialog
      ref="tempDialog"
      :itemObj="itemObj"
      @getTempList="getTempList"
    ></tempDialog>
  </div>
</template>

<script>
import templateManage from './templateManage.js'
export default {
  ...templateManage,
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import './templateManage.less';
</style>
