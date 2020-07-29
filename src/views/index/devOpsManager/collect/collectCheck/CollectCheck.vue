<template>
  <div class="projectManage">
    <div class="rightList">
      <p class="rightTit clearfix">
        <el-button type="primary" icon="el-icon-plus" @click="showWarning"
          >查询</el-button
        >
        <el-input
          v-model="keyword"
          class="keyInpt"
          placeholder="请输入关键字"
        ></el-input>
      </p>
    </div>
    <div class="tableCon">
     <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="错误名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="错误发生次数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="错误发生最早时间"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="错误发生最新时间"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="错误关联git提交人员"
          label="地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">催办</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import collectCheck from './collectCheck.js'
export default {
  ...collectCheck
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import './collectCheck.less';
</style>
