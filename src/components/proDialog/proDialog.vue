<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-22 17:59:36
 * @LastEditors: pym
 * @LastEditTime: 2020-03-30 23:04:05
 -->
 <template>
   <el-dialog :visible='proVisible' width='40%' title='新增项目' :before-close="close" v-if='proVisible'>
     <el-form :model='proForm' :rules='proRules' ref='proForm' label-width='100px' label-position='left'>
       <el-form-item label='新增方式'>
         <el-radio-group v-model="proForm.addMethod">
          <el-radio label="createNew">创建新项目</el-radio>
          <el-radio label="localImport">本地导入</el-radio>
        </el-radio-group>
       </el-form-item>    
       <el-form-item label='选择模板' v-if='proForm.addMethod == "createNew"'>
         <el-row type='flex'>
           <el-col :span='12'>
              <el-input v-model='proForm.templateUrl' readonly placeholder='模板路径'></el-input>
           </el-col>
             <el-col :span='3' :offset='1'>
              <el-button type='primary' @click='selectTem' size='small'>选择模板</el-button>
           </el-col>  
         </el-row>
          
       </el-form-item>
       <el-row :gutter='20'>
         <el-col :span='12'>
            <el-form-item label='项目名称' prop='projectName'>
              <el-input v-model='proForm.projectName' placeholder="请输入项目名称"></el-input>
            </el-form-item>
         </el-col>
         <el-col :span='12'>
           <el-form-item label='项目类型' prop='type'>
            <el-select v-model='proForm.type'>
              <el-option v-for='item in typeList' :key='item.value' :label='item.label' :value='item.value'></el-option>
            </el-select>
          </el-form-item>
         </el-col>
       </el-row>
       <el-form-item label='项目路径' prop='pathUrl'>
         <el-input type='text' v-model='proForm.pathUrl' placeholder='请输入项目路径'></el-input>
       </el-form-item>
       <el-form-item label='Git路径' prop='gitUrl'>
         <el-input type='text' v-model='proForm.gitUrl' placeholder='请输入Git路径'></el-input>
       </el-form-item>
       <el-form-item label='关键字' prop='keyword'>
         <el-input type='text' v-model='proForm.keyword' placeholder='请输入关键字'></el-input>
       </el-form-item> 
       <el-form-item label='项目描述'>
         <el-input type='textarea' v-model='proForm.dec' :rows='2' placeholder='项目描述'></el-input>
       </el-form-item>
       <el-row type="flex" justify="end">
          <el-form-item>
            <el-button type='primary' @click='confirm'>确认</el-button>
            <el-button type='info' @click='close'>取消</el-button>
          </el-form-item>
       </el-row>
     </el-form>
     <!--二级模态框-->
     <selectTem ref='selectTem' v-model='proForm.templateUrl'></selectTem>
   </el-dialog>
</template>
 
<script>
import { getProjectType, addProject } from '@/api/projectManage.js'
import selectTem from '@/components/selectTem/selectTem.vue'
export default {
  name:'proDialog',
  components:{
    selectTem
  },
  props:['itemObj'],
  data() {
    return {
      proVisible:false,
      proForm:{
        addMethod:'createNew',
        projectName:'',
        type:'',
        pathUrl:'',
        gitUrl:'',
        keyword:'',
        dec:'',
        templateUrl:''
      },
      proRules:{
        projectName:[{required:true,message:'请输入项目名称',trigger:'blur'}],
        type:[{required:true,message:'请输入项目类型',trigger:'change'}],
        pathUrl:[{required:true,message:'请输入项目路径',trigger:'blur'}],
        gitUrl:[{required:true,message:'请输入Git路径',trigger:'blur'}],
        keyword:[{required:true,message:'请输入关键字',trigger:'blur'}]
      },
      typeList:[]
    }
  },
  methods:{
    show(){
      this.proVisible = true
      this.queryProTypeList()
    },
    close(){
      this.proVisible = false
      this.$refs.proForm.resetFields()
    },
    queryProTypeList(){
      getProjectType({}).then(res=>{
        console.log(res)
        this.typeList = res || []
      })
    },
    selectTem(){
      this.$refs.selectTem.show()
    },
    /**
     * @name: confirm
     * @description: 弹窗确认
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    confirm(){
      this.$refs.proForm.validate((valid)=>{
        if(valid){
          addProject(this.proForm).then(res=>{
            this.$message({
              type:'success',
              message:'新增成功！'
            })
            this.proVisible = false
            this.$router.push({
              path:'/project/terminalManage'
            })
            // this.$emit('getList',this._props.itemObj)
          })
        }else {
          return
        }
      })
    }
  },
  
  
}

</script>
 
 <style lang='less' scoped>
 /deep/.el-dialog {
   margin-top:5vh !important;
   margin-bottom:0;
   background-color:#303641;
   .el-dialog__header {
     border-bottom:1px solid #4F5467;
     .el-dialog__title {
       color:#ced4da;
     }
   }
   .el-dialog__body {
    padding:10px 20px;
    .el-form-item__label {
      color:#ced4da;
    }
    .el-input__inner {
      background-color:#353c48;
      border:none;
      color:#ced4da;
    }
    .el-textarea__inner {
      background-color:#353c48;
      border:none;
      color:#ced4da;
    }
    .el-radio__inner {
      background-color: #272c36;
      border:1px #adb5bd solid;
      outline:none;
    }
    .is-checked {
      .el-radio__inner {
        background-color:#fb9678;
        border:1px solid #fb9678;
      }
    }
  }
 }
  
 </style>
