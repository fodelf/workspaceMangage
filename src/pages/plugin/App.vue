<!--
 * @Description:
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-08-12 22:23:09
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-09 15:02:12
 -->
<template>
  <div>
    <mainArea :list="propData"></mainArea>
  </div>
</template>
<script>
import mainArea from '../../../src/views/plugin/mainArea/mainArea.vue'
export default {
  name: 'ces',
  props: {
    propData: {
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
  components: {
    mainArea
  }
}
</script>

<style rel="stylesheet/less" lang="less">
@import "../../assets/css/base.css";
.widget {
  font-size: 14px;
}
</style>
