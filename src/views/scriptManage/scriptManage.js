/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-12 15:50:47
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
        pageSize: 4,
        totalRecord: 0
      },
      scriptName: ''
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
        this.scriptCardList = res
      })
    },
    addPro() {
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
