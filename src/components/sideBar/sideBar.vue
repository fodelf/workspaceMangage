<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-21 10:24:56
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-26 07:21:33
 -->
 <template>
  <div class="sideBar"
         :class="isCollapse ? 'min-side' : ''">
      <!-- <p class="bigTit">
        <i class="iconfont icon-renzhengzhongxin-xuanzhong"></i><span></span>
      </p > -->
      <el-menu :default-active="activeModule"
               class="nav"
               :collapse="isCollapse">
        <el-menu-item v-for='(menuItem,index) in menuTree'
                      :key='index'
                      :index="menuItem.name"
                      @click="handleJumpToPath(menuItem)">
          <i class="iconfont"
             :class="menuItem.icon"></i>
          <span>{{menuItem.label}}</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  name:'sideBar',
  data(){
    return {
      isCollapse:false,
      menuTree:[
        {name:'home',icon:'',label:'首页'},
        {name:'projectManage',icon:'',label:'项目管理'},
        {name:'templateManage',icon:'',label:'模板管理'},
        {name:'terminal',icon:'',label:'终端管理'},
      ],
      activeModule:'home',
    }
  },
  methods:{
    handleJumpToPath(item){
      this.$router.push({
        name:item.name
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sideBar {
    transition: all .3s;
    position: relative;
    // width: 250px;
    height: 100%;
    flex: 0 0 180px;
    background-color:#353c48;

    .bigTit {
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 16px;
      margin: 0 auto;
      text-align: center;
      border-bottom: 1px #999 solid;
      margin-bottom: 10px;

      i {
        margin-right: 0;
      }

      span {
        margin-left: 8px;
      }
    }

    .iconfont {
      font-size: 20px;
      margin-right: 8px;
    }

  }
  /deep/.el-menu {
    background-color:#353c48;
    border-right:none;
    .el-menu-item {
      color:#8d97ad;
    }
    .el-menu-item.is-active {
      background:none;
      color:#fb9678
    }
    .el-menu-item:hover {
      color:#fb9678;
      background:#272c36;
    }
  }

  .min-side {
    width: 64px;
    flex: 0 0 64px;

    .bigTit {
      width: 34px;

      span {
        display: none;

      }
    }

    /deep/.el-menu {
      
      .el-menu-item {
        span {
          display: none;
        }
      }
    }
  }
</style>