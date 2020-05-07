<!--
 * @Author: 吴文周
 * @Date: 2020-04-12 16:16:34
 * @LastEditTime: 2020-05-07 19:14:12
 * @LastEditors: 吴文周
 * @Description: 首页模块
 * @FilePath: /workespacemanger/src/views/home/Home.vue
 -->
<template>
  <div class="home">
    <div class="cardGroup">
      <div v-for="(item, index) in cardList" :key="index" class="cardItem">
        <!--卡片组件-->
        <cardNum :card="item"></cardNum>
      </div>
    </div>
    <div class="row chartRow">
      <div class="chartBox">
        <div class="realChart">
          <!--折线图组件-->
          <linesChart :chartData ='chartData'></linesChart>
        </div>
      </div>
      <div class="rightRow">
        <div class="realRight">
          <div class="weather">
            <div class="realWeather">
              <!--天气组件-->
              <weather></weather>
            </div>
          </div>
          <div class="advertisement rowBox">
            <!--轮播图广告招租组件-->
            <carousel :carouselList="carouselList"></carousel>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="todoList cardBox">
        <div class="realTodo realCard">
          <!--TODOLIST组件-->
          <todoList :todoList="todoList" @getTodolist = 'getTodoList' @changeTodoList ='changeTodoList'></todoList>
        </div>
      </div>
      <div class="personal cardBox">
        <div class="realPersonal realCard">
          <!--个人动态组件-->
          <actionModule :msgObj="personalObj"></actionModule>
        </div>
      </div>
      <div class="team cardBox">
        <div class="realTeam realCard">
          <!--团队动态组件-->
          <actionModule :msgObj="teamObj"></actionModule>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import home from './home.js'
export default {
  ...home
}
</script>

<style lang="less" scoped>
@import './home.less';
</style>
