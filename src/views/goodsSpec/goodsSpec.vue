<template>
  <div style="display:flex">
    <div>
      <div>
        <el-form
          ref="form"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="所属模型" prop="name" label-width="80px" size="small">
            <el-select v-model="name1" clearable @change="chaa">
              <el-option v-for="item in arr" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <el-button size="small" icon="el-icon-search" type="primary" style=" margin-left: 10px;">查询</el-button>
    </div>
    <div class="box">
      <el-button size="small" icon="el-icon-refresh">重置</el-button>
    </div>
  </div>
  <div v-if="name1">
    <el-button size="small" icon="el-icon-plus" @click="cliadd">添加规格</el-button>
  </div>
  <div v-else>
    <el-button size="small" icon="el-icon-plus" disabled>添加规格</el-button>
  </div>
  <div class="box1">
    <el-dialog v-model="dialogVisible" title="添加规格" width="30%">
      <el-form ref="form" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="商品规格" prop="guige">
          <el-input v-model="ruleForm.guige" placeholder="请输入规格名称"></el-input>
        </el-form-item>
        <el-form-item label="所属模型" prop="name" label-width="80px">
          <el-select v-model="ruleForm.name" clearable style="width: 100%;">
            <el-option v-for="item in arr" :key="item._id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格项" prop="xiang" label-width="80px">
          <el-input v-model="ruleForm.xiang" type="textarea" placeholder="请输入规格名称，一行一个"></el-input>
        </el-form-item>
        <el-form-item label="展示方式" prop="xuan">
          <el-radio-group v-model="shan" @change="chang">
            <el-radio :label="3">文字</el-radio>
            <el-radio :label="6">图片</el-radio>
            <el-radio :label="9">颜色</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sumit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
      <div style="margin-top:20px">
    <el-table :data="arr2" style="width: 100%">
      <el-table-column type="index" label="#" align="center" width="80" />
      <el-table-column prop="mode" label="模型名称" align="center" />
      <el-table-column prop="model" label="所属模型"  align="center" />
      <el-table-column prop="name" label="展示方式"  align="center" />
      <el-table-column prop="spec_item" label="规格项"  align="center" />
      <el-table-column label="操作" align="center" #default="scope">
        <el-button size="mini" @click="clicsh(scope.row)">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../../http/api'
import { useRoute } from 'vue-router'
import { FormInstance } from '../../types/form'
import { useValidate } from '../../hooks/useValidate'
let form = ref<FormInstance>()
// 表单验证
let ruleForm = ref<any>({
  name: '',
  guige: '',
  xiang: '',
  xuan: '',
  nameing:''
})
let rules = ref<any>({
  name: [
    {
      required: true,
      message: '请输入商品模型',
      trigger: 'blur',
    },
  ],
  guige: [
    {
      required: true,
      message: '请输入商品规格',
      trigger: 'blur',
    },
  ],
  xiang: [
    {
      required: true,
      message: '请输入规格项',
      trigger: 'blur',
    },
  ],
  xuan: [
    {
      required: true,
      message: '请选择展示方式',
      trigger: 'blur',
    },
  ],

})
let route = useRoute();
let name1 = ref<any>()
name1.value = route.query.name;

//显示第几页
let current = ref<number>(1)
//一页显示的数量
let pageSize = ref<number>(5)
// 搜索关键字
let query = ref<string>('')
let arr = ref<any>()
// 获取商品模型请求
let get = () => {
  api.getModel({ current: current.value, query: query.value, pageSize: pageSize.value })
    .then((res: any) => {
      console.log(res)
      if (res.code === 200) {
        arr.value = res.data
      }
    }).catch((err: any) => {
      console.log(err)
    })
}
let arr2 = ref<any>()
// 获取商品规格请求
let geting= ()=>{
  api.getSpec({parentId:name1.value}).then((res:any)=>{
    console.log(res)
  arr2.value=res.data
  }).catch((err:any)=>{
    console.log(err)
  })
}
//添加规格
let cliadd = () => {
  dialogVisible.value = true
}
// 弹出框
let dialogVisible = ref<boolean>(false)
onMounted(() => {
  get()
  geting()
})
let shan = ref<any>(0)
let chang = (val: any) => {
  if (val === 3) {
    ruleForm.value.xuan = '文字'
  } if (val === 6) {
    ruleForm.value.xuan = '图片'
  } if (val === 9) {
    ruleForm.value.xuan = '颜色'
  }
}
let sumit = () => {
  useValidate(form, () => {
   api.addSpec({name:ruleForm.value.guige,model:ruleForm.value.name,spec_item:ruleForm.value.xiang,
   mode:ruleForm.value.xuan,parentId:name1.value})
   .then((res:any)=>{
     console.log(res)
     dialogVisible.value=false
   }).catch((err:any)=>{
     console.log(err)
   })
  })
}
//选中值发生变化时触发
let chaa=(val:any)=>{
  if(val!=""){
    geting()
  }
}
let clicsh=(row:any)=>{
api.delSpec({parentId:name1.value,attrId:row._id})
.then((res:any)=>{
  if(res.code===200){
    geting()
  }
}).catch((err:any)=>{
  console.log(err)
})
}
</script>

<style scoped>
.box {
  margin-left: 10px;
}
</style>