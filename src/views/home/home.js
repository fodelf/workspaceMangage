/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-12 20:39:45
 */
import cardNum from '@/components/cardNum/cardNum'
import carousel from '@/components/carousel/carousel.vue'
import todoList from '@/components/todolist/Todolist.vue'
import actionModule from '@/components/actionModule/actionModule.vue'
import linesChart from '@/components/linesChart/LinesChart'
import weather from '@/components/weather/weather.vue'
import { getIndexCount, getTodoList, insertTask } from '@/api/home.js'
export default {
  name: 'home',
  data() {
    return {
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
      todoList: [
        {
          checked: false,
          desc:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
          date: 'yesterday'
        },
        {
          checked: false,
          desc:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
          date: 'yesterday'
        },
        {
          checked: false,
          desc:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
          date: 'yesterday'
        },
        {
          checked: false,
          desc:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
          date: 'yesterday'
        },
        {
          checked: false,
          desc:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
          date: 'yesterday'
        }
      ],
      personalObj: {
        msgTit: '个人动态',
        msgList: [
          {
            url: '',
            name: 'pty',
            desc: 'Lorem Ipsum is simply dummy text',
            date: '09:50'
          },
          { url: '', name: 'wwz', desc: 'ddddd', date: '09:50' },
          { url: '', name: 'sam', desc: 'ddddd', date: '09:50' },
          { url: '', name: 'wuliian', desc: 'ddddd', date: '09:50' },
          { url: '', name: 'beteli', desc: 'ddddd', date: '09:50' },
          { url: '', name: 'gyl', desc: 'ddddd', date: '09:50' }
        ]
      },
      teamObj: {
        msgTit: '团队动态',
        msgList: [
          {
            url: '',
            name: 'tty',
            desc: 'sung a song! See you at',
            date: '09:50'
          },
          {
            url: '',
            name: 'wwz',
            desc: 'sung a song! See you at',
            date: '09:50'
          },
          {
            url: '',
            name: 'sam',
            desc: 'sung a song! See you at',
            date: '09:50'
          },
          {
            url: '',
            name: 'wuliian',
            desc: 'sung a song! See you at',
            date: '09:50'
          },
          {
            url: '',
            name: 'beteli',
            desc: 'sung a song! See you at',
            date: '09:50'
          },
          {
            url: '',
            name: 'gyl',
            desc: 'sung a song! See you at',
            date: '09:50'
          }
        ]
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
    }
  },
  mounted() {},
  created() {
    this.queryIndexCount()
  }
}
