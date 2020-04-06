<!--
 * @Description:待办列表
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 22:16:59
 * @LastEditors: pym
 * @LastEditTime: 2020-04-06 15:35:10
 -->
<template>
  <div class="toDoList">
    <p class="toDoTit">
      <span>TO&nbsp;DO&nbsp;LIST</span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addTask"
      ></el-button>
    </p>
    <div class="taskToDo">
      <el-scrollbar>
        <ul class="taskList">
          <li v-for="(item, index) in todoList" :key="index">
            <div class="singleTask clearfix">
              <el-checkbox
                v-model="item.checked"
                true-label="1"
                false-label="0"
              ></el-checkbox>
              <span
                class="taskDesc"
                :style="{
                  'text-decoration': item.checked === '1' ? 'line-through' : '',
                }"
                >{{ item.desc }}</span
              >
              <span
                class="taskDate"
                :style="{
                  'text-decoration': item.checked === '1' ? 'line-through' : '',
                }"
                >{{ item.date }}</span
              >
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <el-dialog :visible="dialogVisible" title="新增任务" :before-close="close">
      <el-form>
        <el-form-item label="任务描述">
          <el-input type="textarea" :rows="2" v-model="taskDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" class="row-bg" justify="end">
        <el-button type="primary">确认</el-button>
        <el-button type="info" @click="close">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'todolist',
  props: {
    todoList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      taskDesc: '',
    }
  },
  methods: {
    addTask() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.toDoList {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  .toDoTit {
    display: flex;
    justify-content: space-between;
    color: #ced4da;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    /deep/.el-button {
      color: #fff;
      width: 40px;
      height: 40px;
      padding: 0;
      background-color: #00c292;
      border-color: #00c292;
      border-radius: 50%;
    }
  }
  .taskToDo {
    height: calc(100% - 60px);
    overflow: hidden;
    /deep/.el-scrollbar {
      height: 100%;
      .el-scrollbar__wrap {
        overflow: scroll;
        overflow-x: auto;
      }
      .el-scrollbar__bar {
        .el-scrollbar__thumb {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
  .taskList {
    width: 100%;
    margin-top: 20px;
    height: 100%;
    // overflow: auto;
    li {
      padding: 10px 15px 10px 0;
      .singleTask {
        // display: flex;
        // align-items: flex-start;
        .taskDesc {
          float: left;
          color: #adb5bd;
          margin-left: 8px;
          line-height: 25px;
          // display: inline-block;
          width: 70%;
          font-size: 14px;
        }
        .taskDate {
          float: right;
          // display: inline-block;
          // align-content: flex-end;
          padding: 5px 5px;
          color: #fff;
          font-size: 12px;
          border-radius: 10px;
          background-color: #e46a76;
        }
      }
    }
    /deep/.el-checkbox {
      float: left;
      margin-top: 4px;
      .el-checkbox__inner {
        background-color: #272c36;
        border: 1px #adb5bd solid;
        outline: none;
      }
      .is-checked {
        .el-checkbox__inner {
          background-color: #fb9678;
          border: 1px solid #fb9678;
        }
      }
    }
  }
}
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
    .el-textarea__inner {
      background-color: #353c48;
      border: none;
      color: #ced4da;
    }
  }
}
</style>
