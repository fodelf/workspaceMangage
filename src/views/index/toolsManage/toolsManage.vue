<!--
 * @Description:主页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-06-11 18:59:40
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-16 11:22:37
 -->
<template>
  <div class="production">
    <div class='topPro clearfix'>
      <el-button type="primary"
                 class='addSiteBtn'
                 icon="el-icon-plus"
                 @click="add">新增资源</el-button>
    </div>
    <div class="bottomDiv">
      <div class='addSite'
           v-if="toolsList.length == 0">
        <div class='addContent'>
          <i class='iconfont icon-meiyoudingdan'></i>
          <span>当前暂无资源哦</span>
          <!-- <div class='noSiteBg'></div>
          <p>当前暂无站点哦~</p> -->
          <el-button type="primary"
                     icon="el-icon-plus"
                     @click="add">新增第一个资源</el-button>
        </div>
      </div>
      <ul class='siteList clearfix'
          v-if="toolsList.length != 0">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in toolsList" :key="index">
              <div class="templateCard">
                <img class="cardImg" :src="item.decImg?item.decImg:bg" />
                <div class="cardBody">
                  <h4 class="cardTit">{{ item.toolName }}</h4>
                  <p class="cardText">
                    {{item.dec}}
                  </p>
                  <el-button type='primary' @click='download(item.url)'>下载</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
      </ul>
    </div>
  </div>
</template>

<script>
import toolsManage from '@/views/index/toolsManage/toolsManage.js'
export default {
  ...toolsManage
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "./toolsManage.less";
</style>
