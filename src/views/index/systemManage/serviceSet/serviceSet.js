/*
 * @Descripttion: 
 * @version: 
 * @Author: pym
 * @Date: 2020-08-11 14:27:02
 * @LastEditors: pym
 * @LastEditTime: 2020-08-18 14:09:01
 */
import systemCard from '@/components/systemCard/systemCard'
export default {
   name:'serviceSet',
   components:{
    systemCard
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

   }
 }