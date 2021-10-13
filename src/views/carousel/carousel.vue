<template>
  <div style="display:flex ">
    <div>
      <el-input v-model="input" placeholder="请输入搜索内容" clearable size="small" style="width: 200px"  @change="changeinput"/>
      <el-button size="small" icon="el-icon-search"></el-button>
    </div>
    <div class="box" @click="clicc">
      <el-button size="small" type="primary">添加轮播图</el-button>
    </div>
  </div>
  <div>
    <el-dialog v-model="dialogVisible" title="添加轮播图" width="30%">
      <el-form
        ref="ruleForm"
        :model="from"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="图片地址" prop="tu">
          <el-upload
            action="http://localhost:7001/admin/upload"
            list-type="picture"
            :headers="header"
            :on-change="chang"
            :on-preview="prevew"
          >点击上传图片</el-upload>
        </el-form-item>
        <el-form-item label="图片标题">
          <el-input v-model="from.name"></el-input>
        </el-form-item>
        <el-form-item label="图片链接">
          <el-input v-model="from.lian"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="cliccs">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <div>
    <el-table :data="arr" style="width: 100%">
      <el-table-column prop="url" label="图片" width="180" align="center">
        <template #default="scope">
          <el-image :src="scope.row.url" style="width:80px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="路径" width="280" align="center" />
      <el-table-column prop="title" label="标题" align="center" width="280" />
      <el-table-column prop="link" label="链接" align="center" />
      <el-table-column prop="isShow" label="是否显示" align="center" #default="scope">
        <el-switch v-model="scope.row.isShow"  @change="chaning(scope.row)"/>
      </el-table-column>
      <el-table-column  label="操作" align="center" #default="scope">
      <carousel :scope="scope"></carousel>
      </el-table-column>
    </el-table>
  </div>
  <div>
      <el-pagination
      v-model:currentPage="current"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="arr1"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import carousel from '../../components/carousel/carousel.vue'
import api from "../../http/api";
let input = ref<string>("");
let ruleForm = ref<any>(null);
let current = ref<number>(1)
let pageSize = ref<number>(3)
let query = ref<string>('')
let arr = ref<any>([])
let arr1 = ref<number>(6)
let id = ref<string>('')
let isshow = ref<boolean>(true)
let vale = ref<number>(0)
let handleSizeChange =(val:any)=>{
// console.log(val)
}
let handleCurrentChange =(val:any)=>{
current.value=val
console.log(current.value)
if(current.value){
  asdfsdaf()
}
}
let changeinput=()=>{
   api.getBanner({ current: current.value, pageSize: pageSize.value, query: input.value }).then((res) => {
    arr.value = res.data
  }).catch((err) => {
    console.log(err)
  })
}
let chaning=(row:any)=>{
id.value = row._id
isshow.value=row.isShow
cha()

}
let cha = ()=>{
  api.showBanner({id:id.value,isShow:isshow.value}).then((res:any)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}
let chang = (fileList: any, file: any) => {
  if (fileList.status === 'success') {
    rul.value = fileList.response.data
  }
}
let rul = ref<any>('')
//添加轮播图请求
let cliccs = () => {
  dialogVisible.value = false
  api.addBanner({ title: from.value.name, link: from.value.lian, url: rul.value }).then((res) => {
   asdfsdaf()
  }).catch((err) => {
    console.log(err)
  })
}
let asdfsdaf=()=>{
   api.getBanner({ current: current.value, pageSize: pageSize.value, query: query.value }).then((res) => {
    arr.value = res.data
    arr1.value=res.total
  }).catch((err) => {
    console.log(err)
  })
}
onMounted(() => {
 asdfsdaf()
})
let prevew = (file: any) => {
  // console.log(file)
}
let header = ref<any>({
  Authorization: localStorage.getItem('token')
})
let rules = ref<any>({
  tu: [
    {
      required: true,
      message: '请上传图片',
      trigger: 'blur ',
    },
  ],
})
let from = ref<any>({
  name: '',
  tu: '',
  lian: ''
})
let dialogVisible = ref<boolean>(false)
let clicc = () => {
  dialogVisible.value = true
}
</script>
<style lang="scss" scoped>
.box {
  margin-left: 20px;
}
</style>