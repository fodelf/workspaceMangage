<template>
  <div class="projectManage">
    <div class="rightList">
      <p class="rightTit clearfix">
        <el-button type="primary" icon="el-icon-plus" @click="showWarning"
          >新增</el-button
        >
        <el-input
          v-model="keyword"
          class="keyInpt"
          placeholder="请输入关键字"
        ></el-input>
      </p>
      <div class="tableCon">
        <childWarning
            :compCardList="dataList"
            @edit="editRow"
            @delete='deleteRow'
            :getList="queryList"
            :tablePag="tablePag"
            @changePageNo="getPageNo"
            @action ="action"
          ></childWarning>
      </div>
    </div>
    <!--弹窗组件-->
    <Warning
      ref="Warning"
      :itemObj="itemObj"
      :type="type"
      @getList="getList"
    ></Warning>
  </div>
</template>

<script>
import devOpsManager from './devOpsManager.js'
export default {
  ...devOpsManager
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import './devOpsManager.less';
</style>
