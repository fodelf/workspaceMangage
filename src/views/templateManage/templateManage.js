/*
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-30 23:15:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-28 09:14:18
 */
import menuList from '@/components/menuList/menuList.vue'
import tempDialog from '@/components/tempDialog/tempDialog.vue'
import templateCard from '@/components/templateCard/templateCard.vue'
import { getTempSum, getTempCard } from '@/api/templateApi.js'
export default {
  name: 'templateManage',
  data() {
    return {
      actionType: 'add',
      menuObj: {
        title: '本地模板总计',
        total: 0,
        active:'',
        menuList: []
      },
      keyword: '',
      itemObj: {},
      proFormObj: {},
      tempKind: 'localTemp',
      tabTemp: [
        { label: '本地模板', value: 'localTemp' },
        { label: '全局模板', value: 'wholeTemp' }
      ],
      tempCardList: [],
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
    addPro() {
      this.$refs.tempDialog.show()
    },
    /**
     * @name: queryProList
     * @description: 获取本地模板列表
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    queryTempList(flag) {
      getTempSum({}).then(res => {
        this.menuObj.total = res.total || 0
        this.menuObj.menuList = res.list || []
        this.menuObj.active = this.itemObj.type ? this.itemObj.type : this.menuObj.menuList[0].type
        if (this.menuObj.menuList.length !== 0 && flag) {
          this.queryTempCard(this.menuObj.menuList[0])
        }
      })
    },
    getTempList(type) {
      // console.log(item)
      this.itemObj.type = type
      this.tablePag.pageNo = 1
      this.queryTempCard(this.itemObj)
      this.queryTempList()
    },
    queryTempCard(item) {
      let params = {
        type: item.type,
        pageNum: this.tablePag.pageNo,
        pageSize: this.tablePag.pageSize,
        keyword: this.keyword
      }
      this.itemObj = item
      getTempCard(params).then(res => {
        this.tempCardList = (res.list || []).map((item, index) => {
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
      this.queryTempCard(this.itemObj)
    }
  },
  mounted() {},
  created() {
    this.queryTempList(true)
  }
}
