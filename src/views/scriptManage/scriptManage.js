/*
 * @Description: 首页
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-16 21:55:11
 * @LastEditors: pym
 * @LastEditTime: 2020-04-12 13:59:53
 */
import scriptCard from '@/components/scriptCard/scriptCard'
import { getIndexCount } from '@/api/home.js'
export default {
  name: 'scriptManage',
  data() {
    return {
      scriptCardList: [{ title: '1', scriptText: '2' }],
      tablePag: {
        pageNo: 1,
        pageSize: 4,
        totalRecord: 0,
      },
    }
  },
  components: { scriptCard },
  methods: {},
  mounted() {},
  created() {},
}
