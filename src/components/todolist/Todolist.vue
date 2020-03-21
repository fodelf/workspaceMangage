<!--
 * @Description:待办列表
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 22:16:59
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-16 23:47:51
 -->
<template>
  <el-form-item :label="mes.controllerName">
    <el-input v-model="value"
              @input="changeValue"
              type="textarea"></el-input>
  </el-form-item>
</template>
<script>
export default {
  name: 'todolist',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }

}
</script>

<style lang="less">
</style>
