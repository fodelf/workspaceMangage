/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-21 11:41:01
 */
import cardNum from '@/components/cardNum/cardNum'
import linesChart from '@/components/linesChart/LinesChart'
export default {
  name: 'home',
  data() {
    return {
      cardList:[
        {icon:"",label:'xxxxx',num:123,percent:'50%',proColor:'#fb9678'},
        {icon:"",label:'xxxxx',num:456,percent:'60%',proColor:'#01c0c8'},
        {icon:"",label:'xxxxx',num:789,percent:'70%',proColor:'#ab8ce4'},
        {icon:"",label:'xxxxx',num:234,percent:'80%',proColor:'#00c292'}
      ]
    }
  },
  components: {
    cardNum,
    linesChart
  },
  methods: {},
  mounted() {}
}
