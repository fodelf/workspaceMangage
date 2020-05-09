/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-08 20:30:29
 */
import cardNum from '@/components/cardNum/cardNum'
import carousel from '@/components/carousel/carousel.vue'
import todoList from '@/components/todolist/Todolist.vue'
import actionModule from '@/components/actionModule/actionModule.vue'
import linesChart from '@/components/linesChart/LinesChart'
import weather from '@/components/weather/weather.vue'
import { getIndexCount, getTodoList, insertTask ,queryIndexTrend,changeTodoList,getPersonActive} from '@/api/home.js'
export default {
  name: 'home',
  data() {
    return {
      chartData:null,
      cardList: [
        {
          icon: 'icon-xiangmu',
          label: '项目总数',
          num: 123,
          percent: '50%',
          proColor: '#fb9678',
          key: 'projectCount'
        },
        {
          icon: 'icon-mobanguanli1',
          label: '模板总数',
          num: 456,
          percent: '60%',
          proColor: '#01c0c8',
          key: 'templateCount'
        },
        {
          icon: 'icon-mobanguanli',
          label: '组件总数',
          num: 789,
          percent: '70%',
          proColor: '#ab8ce4',
          key: 'componentCount'
        },
        {
          icon: 'icon-gongju',
          label: '脚本总数',
          num: 234,
          percent: '80%',
          proColor: '#00c292',
          key: 'scriptCount'
        }
      ],
      carouselList: [1, 2, 3, 4],
      todoList: [],
      personalObj: {
        msgTit: '个人动态',
        msgList: []
      },
      teamObj: {
        msgTit: '团队动态',
        msgList: []
      }
    }
  },
  components: {
    cardNum,
    carousel,
    todoList,
    actionModule,
    linesChart,
    weather
  },
  methods: {
    /**
     * @name: queryIndexCount
     * @description: 查询文件数量
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    queryIndexCount() {
      getIndexCount().then(res => {
        console.log(res)
        this.cardList.map(item => {
          return (item.num = res[item.key] || 0)
        })
      })
    },
    queryChart() {
      queryIndexTrend().then(res => {
        this.chartData = res
      })
    },
    getTodoList(){
      getTodoList({}).then((res)=>{
        this.todoList = res
      })
    },
    changeTodoList(item){
      changeTodoList(item).then(()=>{
        // this.todoList = res
      })
    },
    getPersonActive(){
      getPersonActive().then((res)=>{
        debugger
        // this.todoList = res
        this.personalObj.msgList = res
      })
    }
  },
  mounted() {
    console.log("pc")
  },
  destroyed(){
    console.log("pd")
  },
  beforeCreate(){
    console.log("pbeforeCreated")
  },
  created() {
    this.queryIndexCount()
    this.queryChart()
    this.getTodoList()
    this.getPersonActive()
  }
}
