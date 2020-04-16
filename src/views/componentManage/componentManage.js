/*
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-30 23:15:02
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-16 07:47:27
 */
import menuList from '@/components/menuList/menuList.vue'
import tempDialog from '@/components/tempDialog/tempDialog.vue'
import templateCard from '@/components/templateCard/templateCard.vue'
import { getTempSum, getTempCard } from '@/api/templateApi.js'
export default {
  name: 'componentManage',
  data() {
    return {
      menuObj: {
        title: '本地模板总计',
        total: 0,
        menuList: []
      },
      keyword: '',
      itemObj: {},
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
    tempDialog,
    templateCard
  },
  methods: {
    addComp() {
      this.$refs.tempDialog.show()
    },
    /**
     * @name: queryProList
     * @description: 获取本地模板列表
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    queryCompList() {
      getTempSum({}).then(res => {
        this.menuObj.total = res.total || 0
        this.menuObj.menuList = res.list || []
        if (this.menuObj.menuList.length !== 0) {
          this.queryTempCard(this.menuObj.menuList[0])
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
      getTempCard(params).then(res => {
        this.compCardList = (res.list || []).map((item, index) => {
          item.index =
            index + (this.tablePag.pageNo - 1) * this.tablePag.pageSize + 1
          return item
        })
        this.tablePag.totalRecord = res.total || 0
      })
    },
    /**
     * @name: getPageNo
     * @description: 切换分页查询
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    getPageNo(val) {
      this.tablePag.pageNo = val
      this.queryCompCard(this.itemObj)
    }
  },
  mounted() {},
  created() {
    this.queryCompList()
  }
}
