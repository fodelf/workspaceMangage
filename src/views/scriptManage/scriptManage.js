/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-15 07:40:16
 */
import scriptCard from '@/components/scriptCard/scriptCard'
import AddScript from './childrenComponent/addScript/addScript.vue'
import { queryScriptList } from '@/api/scriptApi.js'
export default {
  name: 'scriptManage',
  data() {
    return {
      scriptCardList: [],
      tablePag: {
        pageNo: 1,
        pageSize: 6,
        totalRecord: 0
      },
      scriptName: '',
      type: 'add',
      itemObj: null
    }
  },
  components: { scriptCard, AddScript },
  methods: {
    getList() {
      queryScriptList({
        scriptName: this.scriptName,
        pageNum: this.tablePag.pageNo,
        pageSize: this.tablePag.pageSize
      }).then(res => {
        this.scriptCardList = res.list
        this.tablePag.totalRecord = res.total
        // this.scriptCardList = []
      })
    },
    modify(itemObj) {
      this.type = 'modify'
      this.itemObj = { ...itemObj }
      this.$refs.proDialog.show()
    },
    addPro() {
      this.type = 'add'
      this.$refs.proDialog.show()
    },
    handleCurrentChange(pageNo) {
      this.tablePag.pageNo = pageNo
      this.queryScriptList()
    }
  },
  mounted() {},
  created() {
    this.getList()
  }
}
