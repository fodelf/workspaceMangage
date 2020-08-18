/*
 * @Descripttion: 
 * @version: 
 * @Author: pym
 * @Date: 2020-08-11 14:27:02
 * @LastEditors: pym
 * @LastEditTime: 2020-08-18 16:03:27
 */
import systemCard from '@/components/systemCard/systemCard'
import serviceEdit from '@/components/serviceEdit/serviceEdit'
export default {
   name:'serviceSet',
   components:{
    systemCard,
    serviceEdit
   },
   data() {
     return {
      serviceList:[
        {
          title:'RabbitMQ配置用于日志监控消息',
          ip:'localhost',
          host:'5002',
          userName:'pym',
          password:'123'
        },
        {
          title:'RabbitMQ配置用于日志监控消息',
          ip:'localhost',
          host:'5002',
          userName:'pym',
          password:'234'
        },
        {
          title:'RabbitMQ配置用于日志监控消息',
          ip:'localhost',
          host:'5002',
          userName:'pym',
          password:'456'
        },
        {
          title:'RabbitMQ配置用于日志监控消息',
          ip:'localhost',
          host:'5002',
          userName:'pym',
          password:'789'
        }
      ]
     }
   },
   methods: {
    showEdit() {
      this.$refs.editService.show()
    }
   }
 }