<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2020-07-23 20:17:52
 * @LastEditors: pym
 * @LastEditTime: 2020-08-11 09:46:33
--> 
<template>
  <div class="cardTemp">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in compCardList" :key="item.projectId">
        <div class="templateCard">
          <img class="cardImg" :src="item.decImg?item.decImg:bg" />
          <div class="cardBody">
            <h4 class="cardTit">{{ item.projectName }}</h4>
            <p class="cardText">{{ item.dec }}</p>
            <el-form ref="form" :model="form" label-width="40px" style="margin-top: 10px">
              <el-form-item style="margin-bottom:10px;display: flex;justify-content: flex-end;">
                <el-button type="primary" size="small" @click="check(item)"
                  >查看</el-button
                >
                <el-button type="primary" size="small" @click="update(item)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="deleteAtion(item)"
                  >删除</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'templateCard',
  props: {
    tablePag: {
      type: Object,
      default: function() {
        return {
          pageNo: 1,
          pageSize: 15,
          totalRecord: 0
        }
      }
    },
    compCardList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      form:{
        region:'1',
        param:''
      },
      itemObj: null,
      actionType: 'modify',
      bg:require("../../../../assets/img/edit/bg.jpg")
    }
  },
  methods: {
    action(item) {
      if(item.param){
        item.param = item.param.trim()
        this.$emit('action',Object.assign(item))
      }else{
      this.$message({
        type:'warning',
        mes:'请填写参数！'
      })
      }
    },
    deleteAtion(item) {
      this.$emit('delete', item)
    },
    handleCurrentChange(val) {
      this.$emit('changePageNo', val)
    },
    getTempList() {
      this.$emit('getTempList')
    },
    update(item) {
      this.$emit('edit', item)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-form-item__label{
  color: white;
}
/deep/ .el-row {
  flex-wrap: wrap;
  display: flex;
}
/deep/.el-form-item{
  margin-bottom:0px
}
/deep/.el-input__inner {
    background-color: #353c48;
    border: none;
    color: #ced4da;
}
.templateCard {
  width: 100%;
  // height: 150px;
  background: #3c4452;
  margin-bottom: 20px;
  .cardBody {
    padding: 20px;
  }
  .cardImg {
    width: 100%;
    height: 180px;
  }
  .cardTit {
    font-weight: 500;
    color: #ced4da;
    margin-bottom: 10px;
  }
  .cardText {
    color: #ced4da;
    margin-bottom: 10px;
    height: 63px;
  }
}
.pageBox {
  width: 100%;
  margin-top: 5px;
  /deep/.el-pagination {
    float: right;
    .btn-prev {
      background: #303641;
    }
    .btn-next {
      background: #303641;
    }
    .el-input__inner {
      background: #303641;
    }
  }
}
</style>
