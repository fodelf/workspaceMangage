<template>
  <div class="home">
    <div class="cardGroup">
      <div v-for="(item,index) in cardList" :key='index' class='cardItem'>
        <cardNum :card='item'></cardNum>
      </div>
    </div>
    <div class='row'>
      <div class='chartBox'>
        <div class='realChart'>
          <linesChart></linesChart>
        </div>
         
      </div>
      <div class='rightRow'>
        <div class='realRight'>
          <div class='weather'>
           <div class='realWeather'></div>
          </div>
          <div class='advertisement rowBox'>

          </div>
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
