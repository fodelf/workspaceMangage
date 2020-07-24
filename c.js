/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2020-07-20 16:47:49
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-07-20 18:16:27
 */
var q = 'tasks';
var open = require('amqplib').connect('amqp://admin:admin@111.229.133.9:5672');
// Publisher
// for (let index = 0; index < 1000; index++) {
//   open.then(function(conn) {
//     return conn.createChannel();
//   }).then(function(ch) {
//     return ch.assertQueue(q).then(function(ok) {
//       return ch.sendToQueue(q, Buffer.from(`something ${index} do`));
//     });
//   }).catch(console.warn);
// }
// open.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
//   ch.prefetch(1);
//   return ch.assertQueue(q).then(function(ok) {
//     return ch.sendToQueue(q, Buffer.from('something toxxx do'));
//   });
// }).catch(console.warn);

//Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    ch.prefetch(1);
    ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        // ch.ack(msg);
        setTimeout(function() {
          console.log(" [x] Done");
          ch.ack(msg);
        }, 5000);
      }
    });
  });
}).catch(console.warn);