<template>
  <el-dialog v-model="dialogVisible" title="添加轮播图" width="30%">
    <el-form ref="ruleForm" :model="from" :rules="rules" label-width="120px" class="demo-ruleForm">
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
  <el-button type="primary" size="mini" @click="clicc(scope.row)">编辑</el-button>
  <el-button size="mini" @click="clicsh(scope.row)">删除</el-button>
</template>

<script setup lang="ts">
import { dialogProps } from "element-plus";
import { defineComponent, ref, onMounted } from "vue";
import api from "../../http/api";
let dialogVisible = ref<boolean>(false)
let props = defineProps({
  scope: {
    type: null,
    requery: true,
  }
})
let current = ref<number>(1)
let pageSize = ref<number>(5)
let query = ref<string>('')
let header = ref<any>({
  Authorization: localStorage.getItem('token')
})
let chang = (fileList: any, file: any) => {
  if (fileList.status === 'success') {
    rul.value = fileList.response.data
  }
}
let rul = ref<any>('')
let prevew = (file: any) => {
  // console.log(file)
}
let rules = ref<any>({
  tu: [
    {
      required: true,
      message: '请上传图片',
      trigger: 'blur ',
    },
  ],
})
let clicc = (row: any) => {
  dialogVisible.value = true
  id.value = row._id
}
let id = ref<string>('')
let from = ref<any>({
  name: '',
  tu: '',
  lian: ''
})
let arr = ref<any>([])
//编辑轮播图请求
let cliccs = () => {
  dialogVisible.value = false
  api.updateBanner
    ({ id: id.value, url: rul.value, title: from.value.name, link: from.value.lian })
    .then((res: any) => {
     sdfasd()
    }).catch((err) => {
      console.log(err)
    })
}
// 删除轮播图
let clicsh = (row: any) => {
  api.delBanner(row._id).then((res: any) => {
    console.log(res)
     sdfasd()
  }).catch((err: any) => {
    console.log(err)
  })
}
onMounted(() => {
 sdfasd()
})
let sdfasd=()=>{
   api.getBanner({ current: current.value, pageSize: pageSize.value, query: query.value }).then((res) => {
        arr.value = res.data
      }).catch((err) => {
        console.log(err)
      })
}
</script>

<style lang="scss" scoped>
</style>