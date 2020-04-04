/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-01 10:47:47
 */
import cardNum from '@/components/cardNum/cardNum'
import carousel from '@/components/carousel/carousel.vue'
import todoList from '@/components/todolist/Todolist.vue'
// import linesChart from '@/components/linesChart/LinesChart'
import { getIndexCount } from '@/api/home.js'
export default {
  name: 'home',
  data() {
    return {
      cardList:[
        {icon:"",label:'项目总数',num:123,percent:'50%',proColor:'#fb9678',key:'projectCount'},
        {icon:"",label:'模板总数',num:456,percent:'60%',proColor:'#01c0c8',key:'templateCount'},
        {icon:"",label:'组件总数',num:789,percent:'70%',proColor:'#ab8ce4',key:'componentCount'},
        {icon:"",label:'工具总数',num:234,percent:'80%',proColor:'#00c292',key:'utilCount'}
      ],
      carouselList:[1,2,3,4]
    }
  },
  components: {
    cardNum,
    carousel,
    todoList
    // linesChart
  },
  methods: {
    /**
     * @name: queryIndexCount
     * @description: 查询文件数量
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    queryIndexCount(){
      getIndexCount().then(res=>{
        console.log(res)
        this.cardList.map(item=>{
           return item.num = res[item.key] || 0
        })
      })
    }
  },
  mounted() {},
  created(){
    this.queryIndexCount()
  }
}
