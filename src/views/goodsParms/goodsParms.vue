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
          <el-form-item label="所属商品" prop="name" label-width="80px" size="small">
            <el-select v-model="ruleForm.name" clearable @change="chaa">
              <el-option v-for="item in arr" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="ruleForm.name" @click="clibutt">
      <el-button size="small" style=" margin-left: 10px;">添加参数</el-button>
    </div>
    <div v-else>
      <el-button size="small" style=" margin-left: 10px;" disabled>添加参数</el-button>
    </div>
  </div>
  <div>
    <el-dialog v-model="dialogVisible" title="添加商品参数" width="30%">
      <el-form
        ref="form"
        :model="ruleForm"
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
        <el-form-item label="参数名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="参数描述" prop="lian">
          <el-input v-model="ruleForm.lian"></el-input>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useValidate } from '../../hooks/useValidate'
import api from '../../http/api'
import { FormInstance } from '../../types/form'
import { useRouter } from "vue-router";
let dialogVisible = ref<boolean>(false)
let form = ref<FormInstance>()
let header = ref<any>({
  Authorization: localStorage.getItem('token')
})
let chang = (fileList: any, file: any) => {
  if (fileList.status === 'success') {
    rul.value = fileList.response.data
    ruleForm.value.tu=rul
  }
}
let prevew = (file: any) => {
  // console.log(file)
}
let cliccs = () => {
  useValidate(form, () => {
   api.addParams({
     parentId:id.value,url:ruleForm.value.tu,name:ruleForm.value.title,desc:ruleForm.value.lian
     }).then((res:any)=>{
       console.log(res)
     }).catch((err:any)=>{
       console.log(err)
     })
  })
}
//添加参数
let clibutt = () => {
  dialogVisible.value = true
}
let rul = ref<any>('')
//显示第几页
let current = ref<number>(1)
//一页显示的数量
let pageSize = ref<number>(5)
// 搜索关键字
let query = ref<string>('')
let arr = ref<any>()
// 表单验证
let ruleForm = ref<any>({
  name: '',
  tu: '',
  lian: '',
  title: ""
})
let rules = ref<any>({
  name: [
    {
      required: true,
      message: '请输入商品模型',
      trigger: 'blur',
    },
  ],
  tu: [
    {
      required: true,
      message: '请上传图片',
      trigger: 'blur ',
    }
  ],
  title: [
    {
      required: true,
      message: '请输入参数名称',
      trigger: 'blur ',
    },
    {
      min: 2,
      max: 5,
      message: '请输入正确参数名称',
      trigger: 'blur',
    }
  ],
  lian: [
    {
      required: true,
      message: '请输入参数描述',
      trigger: 'blur ',
    },
        {
      min: 2,
      max: 5,
      message: '请输入正确参数描述',
      trigger: 'blur',
    }
  ]
})
let id = ref<any>('')
//选中值发生变化时触发
let chaa = (val: any) => {
id.value= val
}
// 获取商品模型请求
// let get = () => {
//   api.getModel({ current: current.value, query: query.value, pageSize: pageSize.value })
//     .then((res: any) => {
//       console.log(res)
//       if (res.code === 200) {
//         arr.value = res.data
//       }
//     }).catch((err: any) => {
//       console.log(err)
//     })
// }
onMounted(() => {
  // get()
})
</script>

<style scoped>
</style>