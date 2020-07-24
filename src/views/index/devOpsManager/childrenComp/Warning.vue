<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-22 17:59:36
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-07-24 09:33:42
 -->
<template>
  <el-dialog
    :visible="proVisible"
    width="40%"
    :title="title"
    :before-close="close"
    :close-on-click-modal = "false"
    v-if="proVisible"
  >
    <el-form
      :model="proForm"
      :rules="proRules"
      ref="proForm"
      label-width="100px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="选择项目" prop="projectId">
            <el-select v-model="proForm.projectId" style='width:100%;'>
              <el-option
                v-for="item in projectList"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="埋点类型" prop="type">
            <el-select v-model="proForm.type" style='width:100%;'>
              <el-option
                v-for="item in typeList"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="Webhook"
        prop="Webhook"
      >
        <el-row type="flex">
          <el-col :span="24">
            <el-input
              v-model="proForm.Webhook"
              placeholder="请输入Webhook"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="秘钥"
        prop="secret"
      >
        <el-row type="flex">
          <el-col :span="24">
            <el-input
              v-model="proForm.secret"
              placeholder="请输入秘钥"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="描述信息"
        prop="dec"
       >
       <el-row type="flex" :gutter="20">
          <el-col :span="24">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              rows="5"
              v-model="proForm.dec"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="告警埋点"
       >
       <el-row type="flex" :gutter="20">
          <el-col :span="20">
            <el-input
              readonly
              type="textarea"
              placeholder="请输入内容"
              rows="5"
              v-model="textarea"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small"
              v-clipboard:copy="textarea"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              >复制链接</el-button
            >
          </el-col>
        </el-row>
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
import {
  getProjectList
} from '@/api/index/projectManage.js'
import {
  insertWarning
} from '@/api/index/warning.js'
import selectTem from '@/components/selectTem/selectTem.vue'
import {uuid} from '@/utils/uuid'
export default {
  name: 'proDialog',
  components: {
    selectTem
  },
  props: ['itemObj', 'type'],
  computed:{
    textarea : {
      get: function() {
        return `import * as easyWorkWarning from '@easyWorkHelper/browser';
easyWorkWarning.init({dsn: '${window.location.origin}/api/warning/collect?collectId=${this.proForm.collectId}'});
                `
      }
    }
  },
  data() {
    return {
      proVisible: false,
      proForm: {
        Webhook: '',
        secret: '',
        project: '',
        collectId :'',
        type: '1',
      },
      typeList:[
        {
          typeId:'1',
          typeName:'PC'
        }
      ],
      proRules: {
        Webhook: [
          { required: true, message: '请输入Webhook', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请输入秘钥', trigger: 'blur' }
        ],
        dec:[
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ],
        projectId: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ]
      },
      projectList: []
    }
  },
  methods: {
    getFile(response) {
      this.proForm.decImg = response.resultEntity
    },
    show() {
      this.title = this.$props.type == 'modify' ? '修改项目以及钉钉信息' : '新增项目以及钉钉信息'
      if (this.$props.type == 'modify') {
        this.proForm = this.$props.itemObj
      } else {
        this.proForm = {
          Webhook: '',
          secret: '',
          project: '',
          dec:'',
          collectId:'',
          type: '1',
        }
      }
      this.proVisible = true
      this.proForm.collectId = uuid(32,32);
      this.queryProjectList()
    },
    close() {
      this.proVisible = false
      this.$refs.proForm.resetFields()
    },
    queryProjectList() {
     let params = {
        pageNum: 1,
        pageSize: 100,
        keyword: ''
      }
      getProjectList(params).then((res) => {
        this.projectList = res.list
      })
    },
    selectTem() {
      this.$refs.selectTem.show()
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
          if (this.$props.type == 'add') {
            insertWarning(this.proForm).then(() => {
              this.$message({
                type: 'success',
                message: '新增成功！'
              })
              this.$emit('getList',this.proForm.type)
              this.close()
            })
          } else {
            updateProject(this.proForm).then(() => {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.$emit('getList')
              this.close()
            })
          }
        } else {
          return
        }
      })
    },
    /**
    * @name: onCopy
     * @description: 复制链接成功
     */
    onCopy () {
      this.$message({
        message: '内容复制成功！',
        type: 'success'
      })
    },
    /**
     * @name: onCopy
     * @description: 复制链接失败
     */
    onError () {
      this.$message({
        message: '内容复制失败！',
        type: 'error'
      })
    },
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
