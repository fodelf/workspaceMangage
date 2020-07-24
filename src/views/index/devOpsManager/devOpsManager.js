/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-07-24 09:36:01
 */
// import menuList from 'components/menuList/menuList.vue'
// import tableBox from 'components/tableBox/tableBox.vue'
import childWarning from './childrenComp/childWarning.vue'
import Warning from './childrenComp/Warning.vue'
import {
  queryWarningList
} from '@/api/index/warning.js'
export default {
  name: 'projectManage',
  data() {
    return {
      type: 'add',
      tablePag: {
        pageNo: 1,
        pageSize: 15,
        totalRecord: 0
      },
      dataList: [],
      keyword: '',
      itemObj: {},
      proFormObj: {}
    }
  },
  components: {
    Warning,
    childWarning
  },
  methods: {
    showWarning() {
      this.type = 'add'
      this.$refs.Warning.show()
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
    deleteRow(data) {
      this.$confirm('确认删除此项目？')
        .then(() => {
          deleteProject({ projectId: data.projectId }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList(data.type)
          })
        })
        .catch(() => {})
    },
    editRow(data) {
      this.type = 'modify'
      this.itemObj = data
      this.$nextTick(() => {
        this.$refs.proDialog.show()
      })
    },
    // 新建分支
    newBranch(data){
      this.itemObj = data
      this.$nextTick(() => {
        this.$refs.proDialog.show()
      })
    },
    getList(type){
      this.itemObj.type = type;
      this.queryProList(true)
    },
    action(data){
      action(data).then(() => {
        this.$message({
          type: 'success',
          message: '脚本已经启动'
        })
      })
    },
    queryList(){
      queryWarningList().then((result) => {
        this.dataList = result.list
      })
    }
  },
  mounted() {
    this.queryList(true)
  },
  created() {
    
  }
}
