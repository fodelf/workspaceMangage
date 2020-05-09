<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-30 23:25:05
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-04-17 09:14:02
 -->
<template>
  <div class="cardTemp">
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in compCardList" :key="index">
        <div class="templateCard">
          <img class="cardImg" :src="item.decImg" />
          <div class="cardBody">
            <h4 class="cardTit">{{ item.componentName }}</h4>
            <p class="cardText">{{ item.dec }}</p>
            <el-row>
              <el-button type="primary" size="small" @click="update(item)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="deleteAtion(item.componentId)"
                >删除</el-button
              >
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="pageBox clearfix" v-if="compCardList.length !== 0">
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
import { deleteComponent } from '@/api/componentApi.js'
import tempDialog from '@/components/tempDialog/tempDialog.vue'
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
  components: {
    tempDialog
  },
  data() {
    return {
      itemObj: null,
      actionType: 'modify'
    }
  },
  methods: {
    deleteAtion(templateId) {
      this.$confirm('确认删除此组件？')
        .then(() => {
          deleteComponent({ templateId: templateId }).then(() => {
            this.$message({
              type: 'success',
              message: '组件已删除'
            })
            this.$emit('getList')
          })
        })
        .catch(() => {})
    },
    handleCurrentChange(val) {
      this.$emit('changePageNo', val)
    },
    getTempList() {
      this.$emit('getTempList')
    },
    update(item) {
      this.$emit('update', item)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-row {
  flex-wrap: wrap;
  display: flex;
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
