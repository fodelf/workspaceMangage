/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2020-06-29 08:44:08
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-06-29 09:39:52
 */
const request = require('request')
const app_key='ding8iosm3c3lnyebmzp'
const app_secret='kX2HFTR4N4TlYqQGFHNoUr8wVT-GVPqI5c_YiPx6dLPCPBADlP2PbRBTmFtrjxm_'
const api = function(url){
  return  new Promise((resolve, reject) =>{
    request(url, function (error, response, body) {
      if (!error &&response.statusCode == 200) {
        resolve(JSON.parse(body))
      }else{
        reject(new Error())
      }
    });
  })
}
// var access_token =''
// const agent_id=''
// const corp_id=''
async function getAccess(){
  let url = `https://oapi.dingtalk.com/gettoken?appkey=${app_key}&appsecret=${app_secret}`
  let res = await api(url)
  return res.access_token
}
async function getDp (token) {
  let url = `https://oapi.dingtalk.com/department/list?access_token=${token}`
  let res =  await api(url)
  return res.department
}
async function getAllUsers (){
  let access_token = await getAccess()
  console.log(access_token)
  let Dp = await getDp(access_token)
  console.log(Dp)
}
getAllUsers()


// function getUsers(token,deptId){
//   url = "https://oapi.dingtalk.com/user/getDeptMember?access_token={0}&deptId={1}".format(token,deptId)
//   users = json.loads(requests.get(url).text)
//   return users['userIds']
// }

// function getUserInfo(token,userId){
//   url = "https://oapi.dingtalk.com/user/get?access_token={0}&userid={1}".format(token,userId)
//   info = json.loads(requests.get(url).text)
//   return info['name'],info['userid']
// }

 
//   token = getAccess()
// dp = []
// if len(dp)==0:
//     dp  = getDp(token)
 
// import cx_Oracle
// def save(id,name):
//     sql = 'update t_user set dingtalk = \'{0}\' where name =\'{1}\' '.format(
//         id,name)
//     print('sql:'+sql)XXX
//     db = cx_Oracle.connect('XX/XX@XXX.XXX.XXX.XXX:1521/XXX')  # 连接数据库
//     # print(db.version)  # 打印版本看看 显示 11.2.0.1.0
//     try:
//         cur = db.cursor()  # 游标操作
//         cur.execute(sql)
//         db.commit()
//         print("db success")
//     except Exception as e:
//         print("DB Exception:=>")
//         print(e)
//     finally:
//         db.close
 
// for d in dp:
//     print("开始 部门:"+(d['name'])+'------>')
//     if d['id']==1:
//         continue;
//     users = getUsers(token,d['id'])
//     for u in users:
//         username, id = getUserInfo(token, u)
//         print( 'userId:' + u+'  '+username + ':' + id )
//         save(id,username)