<template>
  <div style="display:flex">
    <div>
      <el-input v-model="input" placeholder="请输入搜索内容" clearable size="small" style="width: 200px" />
      <el-button size="small" icon="el-icon-search" @click="clicsear"></el-button>
    </div>
    <div class="box" @click="clicc">
      <el-button size="small" type="primary">添加商品模型</el-button>
    </div>
  </div>
  <div class="box1">
    <el-dialog v-model="dialogVisible" title="添加导航" width="30%">
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品模型" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="cliokk">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
    <div>
    <el-table :data="arr" style="width: 100%">
      <el-table-column type="index" label="#" align="center" width="80" />
      <el-table-column prop="name" label="用户名称" width="280" align="center" />
      <el-table-column label="操作" align="center" #default="scope">
        <el-button type="primary" size="mini" @click="clibian(scope.row)">编辑</el-button>
        <el-button type="primary" size="mini" @click="cligui(scope.row)">添加规格</el-button>
        <el-button size="mini" @click="clicsh(scope.row)">删除</el-button>
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
import { ref, onMounted } from 'vue'
import { useValidate } from '../../hooks/useValidate'
import api from '../../http/api'
import { FormInstance } from '../../types/form'
import { useRouter } from "vue-router";
import { useRouterPush } from '../../hooks/useRouterPush';
const router =useRouter()
// 表单验证
let ruleForm = ref<any>({
  name: ''
})
//验证规则
let rules = ref<any>({
  name: [
    {
      required: true,
      message: '请输入商品模型名称',
      trigger: 'blur',
    },
    {
      min: 2,
      max: 5,
      message: '请输入正确商品模型名称',
      trigger: 'blur',
    }
  ]
})
let form = ref<FormInstance>()
//搜索框 双向绑定
let input = ref<string>('')
// 弹出框
let dialogVisible = ref<boolean>(false)
//搜索
let clicsear = () => {
  api.getModel({current:current.value,query:input.value,pageSize:pageSize.value})
  .then((res:any)=>{
    if(res.code===200){
      arr.value=res.data
    }
  }).catch((err:any)=>{
    console.log(err)
  })
}
//添加导航的点击事件
let clicc = () => {
  dialogVisible.value = true
}
//显示第几页
let current = ref<number>(1)
//一页显示的数量
let pageSize = ref<number>(5)
// 搜索关键字
let query = ref<string>('')
let arr = ref<any>()
// 获取商品模型请求
let get =()=>{
  api.getModel({current:current.value,query:query.value,pageSize:pageSize.value})
  .then((res:any)=>{
    console.log(res)
    if(res.code===200){
      arr.value=res.data
      arr1.value=res.total
    }
  }).catch((err:any)=>{
    console.log(err)
  })
}
onMounted(()=>{
  get()
})
//确定
let cliokk = () => {
  useValidate(form, () => {
    if(id.value){
      api.updateModel({id:id.value,name:ruleForm.value.name})
      .then((res:any)=>{
        console.log(res)
        if(res.code===200){
       dialogVisible.value = false
       get()
        }
      }).catch((err:any)=>[
        console.log(err)
      ])
    }else{
     api.addModel({name:ruleForm.value.name})
    .then((res:any)=>{
      console.log(res)
       dialogVisible.value = false
      if(res.code===200){
        get()
      }
    }).catch((err:any)=>{
      console.log(err)
    })
    }

  })
}
let id =ref<any>()
//编辑
let clibian=(row:any)=>{
id.value=row._id
if(row._id){
       dialogVisible.value = true
}
}
//删除
let clicsh=(row:any)=>{
     api.delModel(row._id)
    .then((res:any)=>{
      if(res.code===200){
        get()
      }
    }).catch((err:any)=>{
      console.log(err)
    })
}
//tatal
let arr1= ref<any>()
//pageSize 改变时会触发	每页条数
let handleSizeChange =(val:any)=>{
// console.log(val)
}
//currentPage 改变时会触发	当前页
let handleCurrentChange =(val:any)=>{
current.value=val
if(current.value){
  get()
}
}
//添加规格
let cligui=(row:any)=>{
router.push({
  path:'/goodsSpec',
  query:{
    name:row._id
  }
})
}
</script>

<style scoped>
.box {
  margin-left: 20px;
}
.box1{
  margin-top: 20px;
}
</style>