/*
 * @Description: 时间格式
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-06 14:28:52
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-06 14:52:26
 */
function formatTime(time) {
  var result = ''
  let dateTimeStamp = new Date(time).getTime()
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  // var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return
  }
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  // var hourC = diffValue / hour
  // var minC = diffValue / minute
  if (monthC >= 1) {
    result = {
      label: '' + parseInt(monthC) + '月前',
      value: 'month'
    }
  } else if (weekC >= 1) {
    result = {
      label: '' + parseInt(weekC) + '周前',
      value: 'week'
    }
  } else if (dayC > 1 && dayC < 2) {
    result = {
      label: '' + parseInt(dayC) + '昨天',
      value: 'yesterday'
    }
  } else {
    result = {
      label: '今天',
      value: 'today'
    }
  }
  return result
}
module.exports = {
  formatTime
}
