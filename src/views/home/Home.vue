<template>
  <div class="home">
    <div class="cardGroup">
      <div v-for="(item,index) in cardList" :key='index' class='cardItem'>
        <!--卡片组件-->
        <cardNum :card='item'></cardNum>
      </div>
    </div>
    <div class='row'>
      <div class='chartBox'>
        <div class='realChart'>
          <!--折线图组件-->
          <!-- <linesChart></linesChart> -->
        </div>
         
      </div>
      <div class='rightRow'>
        <div class='realRight'>
          <div class='weather'>
           <div class='realWeather'>
             <!--天气组件-->
           </div>
          </div>
          <div class='advertisement rowBox'>
              <!--轮播图广告招租组件-->  
              <carousel :carouselList='carouselList'></carousel> 
          </div>
        </div>
         
      </div>
    </div>
    <div class='row'>
      <div class='todoList cardBox'>
        <div class='realTodo realCard'>
          <!--TODOLIST组件-->
          <todoList></todoList>
        </div>
      </div>
      <div class='personal cardBox'>
        <div class='realPersonal realCard'>
          <!--个人动态组件-->
        </div>
      </div>
      <div class='team cardBox'>
        <div class='realTeam realCard'>
          <!--团队动态组件-->
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
