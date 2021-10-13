<template>
  <div>
    <el-input v-model="input" placeholder="请输入分类名称" style="width: 200px;" size="small" @change="chaac"/>
    <el-button size="small" icon="el-icon-search"></el-button>
  </div>
  <div class="boxc">
    <div style="width:50% ">
    <div class="booa"> 
    <el-tree :data="options" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    
    </div>
    <div style="width:50%">
      <div class="booc">
        <div>新增分类</div>
        <div class="boox" @click="clique">确认</div>
      </div>
      <div>
        <el-form
          ref="form"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="ruleForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="上级分类">
            <el-select
              v-model="ruleForm.shang"
              placeholder="请选择上级分类"
              size="small"
              style="width:100%"
              @change="chann"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类别名">
            <el-input v-model="ruleForm.ming" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useValidate } from "../../hooks/useValidate"
import api from '../../http/api'
import { FormInstance } from '../../types/form'

let input = ref<string>('')
let chaac=()=>{
    api.getCategory({ query: input.value })
    .then((res: any) => {
      console.log(res)
      options.value = res.data
    }).catch((err: any) => {
      console.log(err)
    })
}
// 选择器change事件
let chann = (value: any) => {
  id.value = value
}
let form = ref<FormInstance>()
//表单验证
let ruleForm = ref<any>({
  name: '',
  shang: '',
  ming: ''
})
let query = ref<any>('')
// 数组
let options = ref<any>()
let defaultProps=ref<any>({
        children: "list",
        label: 'name',
})
let handleNodeClick=(options:any)=>{
  console.log(options)
}
let val = ref<any>()
let isshow = ref<any>(true)
let id = ref<any>()
let get = () => {
  api.getCategory({ query: query.value })
    .then((res: any) => {
      console.log(res)
      options.value = res.data
    }).catch((err: any) => {
      console.log(err)
    })
}
onMounted(() => {
  get()
})
//确定
let clique = () => {
  console.log()
  useValidate(form, () => {
    if (ruleForm.value.shang) {
      api.addSecondCategory({ name: ruleForm.value.name, parentId: id.value, isShow: isshow.value })
        .then((res: any) => {
          console.log(res)
          get()
        }).catch((err: any) => {
          console.log(err)
        })
    } else {
      api.addCategory({ name: ruleForm.value.name, short_name: '', isShow: true })
        .then((res: any) => {
          console.log(res)
          get()
        }).catch((err: any) => {
          console.log(err)
        })
    }
  })
}
let rules = ref<any>({
  name: [
    {
      required: true,
      message: '请输入分类名称',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 7,
      message: '请输入正确的名称',
      trigger: 'blur',
    },
  ],
})
</script>
<style scoped>
.boxc {
  display: flex;
}
.booc {
  display: flex;
  justify-content: space-around;
}
.boox {
  font-size: 14px;
  color: rgb(181, 219, 255);
}
.booa{
margin-top: 20px;
}
</style>