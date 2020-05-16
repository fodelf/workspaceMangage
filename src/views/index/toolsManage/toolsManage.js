/*
 * @Description:
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-08-21 15:40:46
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-16 11:34:52
 */
import { queryToolsList} from '@/api/index/tools.js'
export default {
  name: 'Control',
  data () {
    return {
      time: '默认排序',
      site: '全部站点',
      dialogVisible: false,
      toolsList: [],
      bg:require("../../.././assets/img/edit/bg.jpg"),
      host:window.location.host
    }
  },
  components: {},
  created () {
    this.init()
  },
  mounted () {},
  methods: {
    add(){
      this.$message({
        type:'warning',
        message:'暂未开放'
      })
    },
    download(url){
      var link = document.createElement('a')
      link.setAttribute('download', '')
      link.href = url;
      link.click();
    },
    /**
     * @name: init
     * @description: 查询列表
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    init () {
      let param = {
        // userId: localStorage.getItem('userId') * 1,
        isPreview: false,
        pageNum: 1,
        pageSize: 10
      }
      var self = this
      queryToolsList(param).then(res => {
        self.toolsList = res.list
      })
    },
    /**
     * @name: deleteTem
     * @description: 删除站点
     * @param {type}: String
     * @return {type}: 默认类型
     */
    deleteTem (id) {}
  }
}
