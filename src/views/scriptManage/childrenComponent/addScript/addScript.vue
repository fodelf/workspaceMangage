<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-12 14:15:17
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-12 15:46:17
 -->
<template>
  <el-dialog
    :visible="proVisible"
    width="60%"
    title="新增项目"
    :before-close="close"
    v-if="proVisible"
  >
    <el-form
      :model="proForm"
      :rules="proRules"
      ref="proForm"
      label-width="100px"
      label-position="left"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="脚本名称" prop="scriptName">
            <el-input
              v-model="proForm.scriptName"
              placeholder="请输入脚本名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="脚本内容" prop="scriptContent">
        <el-input
          type="textarea"
          :rows="5"
          v-model="proForm.scriptContent"
          placeholder="请输入脚本内容"
        ></el-input>
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
import { insertScript } from '@/api/scriptApi.js'
export default {
  name: 'addScript',
  props: ['itemObj'],
  data() {
    return {
      proVisible: false,
      proForm: {
        scriptName: '',
        scriptContent: ''
      },
      proRules: {
        scriptName: [
          { required: true, message: '请输入脚本名称', trigger: 'blur' }
        ],
        scriptContent: [
          { required: true, message: '请输入脚本内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show() {
      this.proVisible = true
    },
    close() {
      this.proVisible = false
    },
    /**
     * @name: confirm
     * @description: 弹窗确认
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    confirm() {
      this.$refs.proForm.validate(valid => {
        if (valid) {
          insertScript(this.proForm).then(() => {
            this.$message({
              type: 'success',
              message: '新增成功！'
            })
            this.proVisible = false
            this.$emit('getList')
          })
        } else {
          return
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
