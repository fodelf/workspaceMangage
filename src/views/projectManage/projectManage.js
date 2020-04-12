/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-12 14:11:00
 */
import menuList from 'components/menuList/menuList.vue'
import tableBox from 'components/tableBox/tableBox.vue'
import proDialog from 'components/proDialog/proDialog.vue'
import { getProjectSum, getProjectList } from '@/api/projectManage.js'
export default {
  name: 'projectManage',
  data() {
    return {
      menuObj: {
        title: '项目总计',
        total: 0,
        menuList: []
      },
      tablePag: {
        pageNo: 1,
        pageSize: 15,
        totalRecord: 0
      },
      dataList: [],
      headerList: [
        { name: '序号', code: 'index', width: 60 },
        { name: '项目名称', code: 'projectName' },
        { name: '项目类型', code: 'type' },
        { name: '项目关键字', code: 'keyword' },
        { name: '创建时间', code: 'createTime' },
        { name: '本地路径', code: 'pathUrl' }
      ],
      keyword: '',
      itemObj: {},
      proFormObj: {}
    }
  },
  components: {
    menuList,
    tableBox,
    proDialog
  },
  methods: {
    addPro() {
      this.$refs.proDialog.show()
    },
    /**
     * @name: getPageNo
     * @description: 切换分页查询
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    getPageNo(val) {
      this.tablePag.pageNo = val
      this.selectMenu(this.itemObj)
    },
    getProList(item) {
      // console.log(item)
      this.tablePag.pageNo = 1
      this.selectMenu(item)
    },
    /**
     * @name: selectMenu
     * @description: 根据项目类型查询项目
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    selectMenu(item) {
      this.itemObj = item
      let params = {
        type: item.type,
        pageNum: this.tablePag.pageNo,
        pageSize: this.tablePag.pageSize,
        keyword: this.keyword
      }
      getProjectList(params).then(res => {
        this.dataList = (res.list || []).map((item, index) => {
          item.index =
            index + (this.tablePag.pageNo - 1) * this.tablePag.pageSize + 1
          return item
        })
        this.tablePag.totalRecord = res.total || 0
        // this.$nextTick(() => {
        //   this.$refs.table.doLayout()
        // })
      })
    },
    /**
     * @name: queryProList
     * @description: 获取项目列表
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    queryProList() {
      getProjectSum({}).then(res => {
        // console.log(res)
        this.menuObj.total = res.total || 0
        this.menuObj.menuList = res.list || []
        if (this.menuObj.menuList.length !== 0) {
          this.selectMenu(this.menuObj.menuList[0])
        }
      })
    }
  },
  mounted() {},
  created() {
    this.queryProList()
  }
}
