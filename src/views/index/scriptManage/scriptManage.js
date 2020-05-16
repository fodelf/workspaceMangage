/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-16 14:28:29
 */
import scriptCard from '@/components/scriptCard/scriptCard'
import AddScript from './childrenComponent/addScript/addScript.vue'
import { queryScriptList } from '@/api/scriptApi.js'
export default {
  name: 'scriptManage',
  data() {
    return {
      scriptCardList: [],
      selfList:[],
      tablePag: {
        pageNo: 1,
        pageSize: 6,
        totalRecord: 0
      },
      scriptName: '',
      type: 'add',
      itemObj: null,
      activeName:'self'
    }
  },
  components: { scriptCard, AddScript },
  methods: {
    getList(type) {
      if(type){
        this.activeName = type
      }
      queryScriptList({
        scriptName: this.scriptName,
        pageNum: this.tablePag.pageNo,
        pageSize: this.tablePag.pageSize,
        scriptType: this.activeName
      }).then(res => {
        this.scriptCardList = res.list
        this.tablePag.totalRecord = res.total
        // this.scriptCardList = []
      })
    },
    handleClick(){
      this.tablePag.pageNo = 1;
      this.getList()
    },
    modify(itemObj) {
      this.type = 'modify'
      this.itemObj = { ...itemObj }
      this.$nextTick(() => {
        this.$refs.proDialog.show()
      })
    },
    addPro() {
      this.type = 'add'
      this.$nextTick(() => {
        this.$refs.proDialog.show()
      })
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
