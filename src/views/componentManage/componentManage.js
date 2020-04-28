/*
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-30 23:15:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-28 09:27:08
 */
import menuList from '@/components/menuList/menuList.vue'
import compDialog from './compDialog/compDialog.vue'
import compCard from './compCard/compCard.vue'
import { getCompSum, getComponentList } from '@/api/componentApi.js'
export default {
  name: 'componentManage',
  data() {
    return {
      actionType: 'add',
      menuObj: {
        title: '本地组件总计',
        total: 0,
        menuList: [],
        active:''
      },
      keyword: '',
      itemObj: {},
      item: {},
      compKind: 'localComp',
      tabComp: [
        { label: '本地组件', value: 'localComp' },
        { label: '全局组件', value: 'wholeComp' }
      ],
      compCardList: [],
      tablePag: {
        pageNo: 1,
        pageSize: 9,
        totalRecord: 0
      }
    }
  },
  components: {
    menuList,
    compDialog,
    compCard
  },
  methods: {
    addComp() {
      this.$refs.compDialog.show()
    },
    /**
     * @name: queryProList
     * @description: 获取本地模板列表
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    queryCompList(flag) {
      getCompSum({}).then(res => {
        this.menuObj.total = res.total || 0
        this.menuObj.menuList = res.list || []
        this.menuObj.active = this.itemObj.type ? this.itemObj.type : this.menuObj.menuList[0].type
        if (this.menuObj.menuList.length !== 0 && flag) {
          this.queryCompCard(this.menuObj.menuList[0])
        }
      })
    },
    queryCompCard(item) {
      let params = {
        type: item.type,
        pageNum: this.tablePag.pageNo,
        pageSize: this.tablePag.pageSize,
        keyword: this.keyword
      }
      this.item = item
      getComponentList(params).then(res => {
        this.compCardList = (res.list || []).map((item, index) => {
          item.index =
            index + (this.tablePag.pageNo - 1) * this.tablePag.pageSize + 1
          return item
        })
        this.tablePag.totalRecord = res.total || 0
      })
    },
    getList(type) {
      this.item.type = type
      this.queryCompCard(this.item)
    },
    /**
     * @name: getPageNo
     * @description: 切换分页查询
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    getPageNo(val) {
      this.tablePag.pageNo = val
      this.queryCompCard(this.item)
    },
    update(itemObj) {
      this.itemObj = itemObj
      this.actionType = 'modify'
      this.$nextTick(() => {
        this.$refs.compDialog.show()
      })
    }
  },
  mounted() {},
  created() {
    this.queryCompList(true)
  }
}
