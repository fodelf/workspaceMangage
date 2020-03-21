<!--
 * @Description:
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-06-11 18:59:40
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-21 10:48:57
 -->
<template>
  <div id="contentMain" class="clearfix">
    <!-- <div class="sideBar"> -->
      <sideBar></sideBar>
    <!-- </div> -->
    <div class="mainContent">
      <router-view />
    </div>
  </div>
</template>

<script>
import sideBar from '@/components/sideBar/sideBar.vue'
export default {
  name: 'Main',
  components:{
    sideBar
  },
  data() {
    return {
      userName: '',
      activePath: '/',
      meslist: []
    }
  },
  mounted() {},
  methods: {
    /**
     * @name: handleSelect
     * @description: 路由跳转
     */
    handleSelect(key) {
      this.$router.push({
        path: key
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './layout.less';
</style>
