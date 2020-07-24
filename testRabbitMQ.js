/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2020-07-20 16:38:26
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-07-20 16:39:29
 */
const Producer = require('./producer.js');

let mq = new Producer();

mq.sendQueueMsg('testQueue', 'my first message', (error) => {
    console.log(error)
})