<!--
 * @Descripttion: 
 * @version: 
 * @Author: pym
 * @Date: 2020-08-18 15:06:40
 * @LastEditors: pym
 * @LastEditTime: 2020-08-18 16:05:33
-->
<template>
  <el-dialog
    :visible="serviceVisible"
    width="40%"
    title="编辑"
    :before-close="close"
    :close-on-click-modal = "false"
    v-if="serviceVisible"
  >
    <el-form :model='serviceForm' 
      label-width="100px"
      label-position="left">
      <el-form-item label='ip'>
        <el-input type='text' v-model='serviceForm.ip'></el-input>
      </el-form-item>
      <el-form-item label='端口号'>
        <el-input type='text' v-model='serviceForm.host'></el-input>
      </el-form-item>
      <el-form-item label='用户名'>
        <el-input type='text' v-model='serviceForm.userName'></el-input>
      </el-form-item>
       <el-form-item label='密码'>
        <el-input type='password' v-model='serviceForm.password'></el-input>
      </el-form-item>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" @click="confirm">确认</el-button>
          <el-button type="info" @click="close">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'serviceEdit',
  data() {
    return {
      serviceVisible:false,
      serviceForm:{}
    }
  },
  methods:{
    close() {
      this.serviceVisible = false
    },
    show() {
      this.serviceVisible = true
    },
    confirm() {
      
    }
  }
}
</script>

<style lang='less' scoped>
/deep/.el-dialog {
  margin-top: 5vh !important;
  margin-bottom: 0;
  background-color: #303641;
  .el-dialog__header {
    border-bottom: 1px solid #4f5467;
    .el-dialog__title {
      color: #ced4da;
    }
  }
  .el-dialog__body {
    padding: 10px 20px;
    .el-form-item__label {
      color: #ced4da;
    }
    .el-input__inner {
      background-color: #353c48;
      border: none;
      color: #ced4da;
    }
    .el-textarea__inner {
      background-color: #353c48;
      border: none;
      color: #ced4da;
    }
    .el-radio__inner {
      background-color: #272c36;
      border: 1px #adb5bd solid;
      outline: none;
    }
    .is-checked {
      .el-radio__inner {
        background-color: #fb9678;
        border: 1px solid #fb9678;
      }
      .el-radio__label {
        color: #fb9678;
      }
    }
  }
}
</style>