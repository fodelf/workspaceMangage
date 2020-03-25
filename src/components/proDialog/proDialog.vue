<!--
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2020-03-22 17:59:36
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-03-22 20:46:12
 -->
 <template>
   <el-dialog :visible='proVisible' title='新增项目' v-if='proVisible'>
     <el-form :model='proForm'>
       <el-form-item label='新增方式'>
         <el-radio-group v-model="proForm.addMethod">
          <el-radio label="3">创建新项目</el-radio>
          <el-radio label="6">本地导入</el-radio>
        </el-radio-group>
       </el-form-item>
       <el-form-item label='项目名称'>
         <el-input v-model='proForm.projectName' placeholder="请输入项目名称"></el-input>
       </el-form-item>
       <el-form-item label='项目类型'>
         <el-select v-model='proForm.type'>
           <el-option v-for='item in typeList' :key='item.value' :label='item.label' :value='item.value'></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label='项目路径'>
         <!-- <form name="form1" enctype="multipart/form-data" method="post" action="">
  <input type="file" name="file">
</form> -->
         <!-- <input type="file" id="file_input" webkitdirectory directory enctype="multipart/form-data" /> -->
         <el-button @click='BrowseFolder' type='primary'>选择</el-button>
       </el-form-item>
     </el-form>
   </el-dialog>
 </template>
 
<script>
export default {
  name:'proDialog',
  data() {
    return {
      proVisible:false,
      proForm:{
        addMethod:'',
        projectName:'',
        type:''
      },
      typeList:[]
    }
  },
  methods:{
    show(){
      this.proVisible = true
    },
    BrowseFolder() {
    try {
        var Message = "Please select the folder path.";  //选择框提示信息
        var Shell = new ActiveXObject("Shell.Application");
        var Folder = Shell.BrowseForFolder(0, Message, 0x0040, 0x11); //起始目录为：我的电脑
        //var Folder = Shell.BrowseForFolder(0,Message,0); //起始目录为：桌面
        if (Folder != null) {
            Folder = Folder.items();  // 返回 FolderItems 对象
            Folder = Folder.item();  // 返回 Folderitem 对象
            Folder = Folder.Path;   // 返回路径
            if (Folder.charAt(Folder.length - 1) != "\\") {
                Folder = Folder + "\\";
            }
            return Folder;
        }
    } catch (e) {
        alert(e.message);
    }
}
  }
  
}

</script>
 
 <style>
 
 </style>
