<template>
  <div>
    <el-form ref="form" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-select v-model="ruleForm.title" placeholder="请选择商品分类" style="width:100%">
          <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品原价" prop="money">
        <el-input v-model="ruleForm.money" placeholder="请输入商品原价"></el-input>
      </el-form-item>
      <el-form-item label="商品现价" prop="moneyes">
        <el-input v-model="ruleForm.money" placeholder="请输入商品现价"></el-input>
      </el-form-item>
      <el-form-item label="封面图" prop="tu">
        <el-upload
          action="http://localhost:7001/admin/upload"
          list-type="picture"
          :headers="header"
          :on-change="chang"
          :on-preview="prevew"
        >点击上传图片</el-upload>
      </el-form-item>
            <el-form-item label="商品单位" prop="company">
        <el-input v-model="ruleForm.company" placeholder="请输入商品单位"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../../http/api'
let form = ref<any>(null)
let ruleForm = ref<any>({
  name: '',
  title: '',
  money: '',
  moneyes: '',
  tu: '',
  company:''
})
onMounted(() => {
  get()
})
let get = () => {
  api.getCategory({ query: query.value })
    .then((res: any) => {
      console.log(res)
      options.value = res.data
    }).catch((err: any) => {
      console.log(err)
    })
}
let query = ref<any>('')
let options = ref<any>()
let rules = ref<any>({
  name: [
    {
      required: true,
      message: '请输入商品名称',
      trigger: 'blur',
    },
  ],
  title: [
    {
      required: true,
      message: '请选择商品分类',
      trigger: 'blur',
    },
  ],
  money: [
    {
      required: true,
      message: '请选择商品分类',
      trigger: 'blur',
    },
    {
      type: 'number', message: '请输入数字'
    }
  ],
  moneyes: [
    {
      required: true,
      message: '请选择商品分类',
      trigger: 'blur',
    },
    {
      type: 'number', message: '请输入数字'
    }
  ],
  tu: [
    {
      required: true,
      message: '请上传图片',
      trigger: 'blur',
    }
  ],
  company:[
    {
      required: true,
      message: '请输入商品单位',
      trigger: 'blur',
    }
  ]
})
//设置上传的请求头部
let header = ref<any>({
  Authorization: localStorage.getItem('token')
})
//点击文件列表中已上传的文件时的钩子
let prevew = (file: any) => {
}
//文件状态改变时的钩子
let chang = (fileList: any, file: any) => {
  if (fileList.status === 'success') {
    ruleForm.value.tu = fileList.response.data
  }
}
</script>

<style scoped>
</style>