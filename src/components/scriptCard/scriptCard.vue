<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-10 21:26:24
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-12 16:15:10
 -->
<template>
  <div class="scriptCard">
    <p class="cardTit">{{ itemObj.scriptName }}</p>
    <el-input
      type="textarea"
      v-model="itemObj.scriptContent"
      :rows="7"
    ></el-input>
    <el-row>
      <el-button type="primary">修改</el-button>
      <el-button type="danger">删除</el-button>
      <el-button type="primary" @click="action">立即执行</el-button>
    </el-row>
  </div>
</template>

<script>
import { actionScript } from '@/api/scriptApi.js'
export default {
  name: 'scriptCard',
  props: {
    itemObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    action() {
      actionScript({
        scriptContent: this.itemObj.scriptContent
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '脚本已经启动'
          })
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '脚本报错了！'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.scriptCard {
  width: 100%;
  height: 100%;
  background: #353c48;
  .cardTit {
    height: 40px;
    line-height: 40px;
    width: 100%;
    background: #303641;
  }
  /deep/.el-textarea__inner {
    background: #353c48;
    outline: none;
    border: none;
  }
}
</style>
