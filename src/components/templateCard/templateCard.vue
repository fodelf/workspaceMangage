<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-30 23:25:05
 * @LastEditors: pym
 * @LastEditTime: 2020-04-06 11:45:38
 -->
<template>
  <div class="cardTemp">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in tempCardList" :key="index">
        <div class="templateCard">
          <img class="cardImg" :src="item.decImg" />
          <div class="cardBody">
            <h4 class="cardTit">{{ item.templateName }}</h4>
            <p class="cardText">{{ item.dec }}</p>
            <el-row>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="pageBox clearfix" v-if="tempCardList.length !== 0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="tablePag.pageNo"
        :page-size="tablePag.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="tablePag.totalRecord"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'templateCard',
  props: {
    tablePag: {
      type: Object,
      default: {
        pageNo: 1,
        pageSize: 15,
        totalRecord: 0,
      },
    },
    tempCardList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {}
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('changePageNo', val)
    },
  },
}
</script>

<style lang="less" scoped>
.templateCard {
  width: 100%;
  height: 150px;
  background: #3c4452;
  margin-bottom: 20px;
  .cardImg {
    width: 100%;
  }
  .cardTit {
    font-weight: 500;
    color: #ced4da;
    margin-bottom: 10px;
  }
  .cardText {
    color: #ced4da;
    margin-bottom: 10px;
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
