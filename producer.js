/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2020-07-20 16:14:32
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-07-20 16:45:47
 */

let amqp = require('amqplib/callback_api');

class Producer {
  constructor() {

    this.hosts = ["amqp://www.wuwenzhou.com.cn:15672"];

    this.index = 0;

    this.length = this.hosts.length;

    this.open = amqp.connect(this.hosts[this.index]);
  }
  sendQueueMsg(queueName, msg, errCallBack) {
    let self = this;
    self.open
    .then(function (conn) {

        return conn.createChannel();

    })
    .then(function (channel) {

        return channel.assertQueue(queueName).then(function (ok) {

            return channel.sendToQueue(queueName, new Buffer(msg), {

                persistent: true

            });

        })
        .then(function (data) {

            if (data) {

                errCallBack && errCallBack("success");

                channel.close();

            }

        })
        .catch(function () {
            setTimeout(() => {

                if (channel) {

                    channel.close();

                }

            }, 500)
        });
    })
    .catch(function () {

        let num = self.index++;

        if (num <= self.length - 1) {

            self.open = amqp.connect(self.hosts[num]);

        } else {
          self.index == 0;
        }
    });
  }
}
module.exports  = Producer;