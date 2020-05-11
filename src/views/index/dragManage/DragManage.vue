<!--
 * @Description:主页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-06-11 18:59:40
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-11 15:58:24
 -->
<template>
  <div class="production">
    <div class='topPro clearfix'>
      <!-- <el-button type="primary"
                 class='addSiteBtn'
                 icon="el-icon-plus"
                 @click="dialogVisible=true">新增站点</el-button> -->
      <el-button type="primary"
                 class='addSiteBtn'
                 icon="el-icon-plus"
                 @click="open">新增站点</el-button>
      <!-- <el-form ref="form"
               :model="form">
        <el-form-item>
          <el-select v-model="time">
            <el-option label="默认排序未"
                       value="默认排序"></el-option>
            <el-option label="最后创建时间"
                       value="最后创建时间"></el-option>
            <el-option label="最后修改时间"
                       value="最后修改时间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="site">
            <el-option label="全部站点未"
                       value="全部站点"></el-option>
            <el-option label="已发布"
                       value="已发布"></el-option>
            <el-option label="已下线"
                       value="已下线"></el-option>
            <el-option label="未发布"
                       value="未发布"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="keyWords"
                    placeholder="请输入页面标题关键字"><em slot="suffix">|</em><i slot="suffix"
               class="el-icon-search"></i></el-input>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="bottomDiv">
      <div class='addSite'
           v-if="templateList.length == 0">
        <div class='addContent'>
          <i class='iconfont icon-meiyoudingdan'></i>
          <span>当前暂无站点哦</span>
          <!-- <div class='noSiteBg'></div>
          <p>当前暂无站点哦~</p> -->
          <el-button type="primary"
                     icon="el-icon-plus"
                     @click="open">新增第一个站点</el-button>
        </div>
      </div>
      <ul class='siteList clearfix'
          v-if="templateList.length != 0">
          <el-row :gutter="20">
              <el-col :span="6" v-for="(item, index) in templateList" :key="index">
                <div class="templateCard">
                  <img class="cardImg" :src="item.decImg?item.decImg:bg" />
                  <div class="cardBody">
                    <h4 class="cardTit">{{ item.templateName }}</h4>
                    <p class="cardText">
                      地址：{{host}}/preview.html?templateId={{item.templateId}}
                    </p>
                    <el-row>
                      <el-button type="primary" size="small"
                        v-clipboard:copy="host +'/preview.html?templateId=' + item.templateId"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                        >复制链接</el-button
                      >
                      <!-- <el-button type="primary" size="small" @click="gotoEdit(item)"
                        >编辑</el-button
                      > -->
                      <!-- <el-button
                        type="danger"
                        size="small"
                        @click="deleteTem(item.templateId)"
                        >删除</el-button
                      > -->
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
        <!-- <li v-for="(item,index) in templateList"
            :key="index"
            class='site clearfix'>
          <div class='leftSide'>
            <div class='sideBg'></div>
          </div>
          <div class='rightSide'>
            <span class='name'
                  :title="item.templateName">{{item.templateName}}</span>
            <span class='url'
                  :title="item.templateUrl">http://easymarket.chehe88.com/preview.html?templateId={{item.templateId}}</span>
            <p class='locationUrl clearfix'>
              <span v-clipboard:copy="'http://easymarket.chehe88.com/preview.html?templateId=' + item.templateId"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"><i class='iconfont icon-fuzhi'></i>复制链接</span>
              <span @click="createAppFn('http://easymarket.chehe88.com/preview.html?templateId=' + item.templateId)"
                    style="curor:pointer"></span>
            </p>
            <p class='operation'>
              <el-button type="primary"
                         @click="gotoEdit(item.templateId)">编辑</el-button>
              <el-button type="danger"
                         @click="deleteTem(item.templateId)"
                         icon="el-icon-delete">删除</el-button>
            </p>
          </div>
        </li> -->
      </ul>
    </div>
    <!-- <el-dialog title="新建站点"
               class="clearfix"
               center
               :visible.sync="dialogVisible">
      <div class="createBox createBlank">
        <span>创建空白页</span>
      </div>
      <div class="createBox createTem">
        <span>使用模板创建</span>
      </div>
    </el-dialog> -->

    <!-- <el-dialog title="创建App，这个弹出是告诉你功能"
               class="clearfix"
               center
               :visible.sync="dialogApp">
      <div>
        <span></span>
      </div>
      <div>
        <el-button type="primary"
                   @click="create">生成app</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>

<script>
import dragManage from '@/views/index/dragManage/dragManage.js'
export default {
  ...dragManage
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "./dragManage.less";
</style>
