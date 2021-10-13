<template>
  <div style="display:flex">
    <div>
      <el-input v-model="input" placeholder="请输入搜索内容" clearable size="small" style="width: 200px" />
      <el-button size="small" icon="el-icon-search" @click="clicsear"></el-button>
    </div>
    <div class="box" @click="clicc">
      <el-button size="small" type="primary">添加用户</el-button>
    </div>
  </div>
  <div class="box1">
    <el-dialog v-model="dialogVisible" title="添加用户" width="30%">
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
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="from.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="from.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="from.telphen"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="from.emile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="cliok">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <div>
    <el-table :data="arr" style="width: 100%">
      <el-table-column prop="avatar" label="用户头像" width="180" align="center">
        <template #default="scope">
          <el-image :src="scope.row.avatar" style="width:80px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="280" align="center" />
      <el-table-column prop="mobile" label="用户电话" align="center" width="280" />
      <el-table-column prop="email" label="用户邮箱" align="center" />
      <el-table-column prop="status" label="是否禁用" align="center" #default="scope">
        <el-switch v-model="scope.row.status" @change="chaning(scope.row)" />
      </el-table-column>
      <el-table-column label="操作" align="center" #default="scope">
        <el-button type="primary" size="mini" @click="clibian(scope.row)">编辑</el-button>
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
import { useValidate } from "../../hooks/useValidate"
import api from '../../http/api';
let input = ref<any>()
let ruleForm = ref<any>(null);
// 搜索
let clicsear = () => {
  api.getUser({ current: current.value, pageSize: pageSize.value, query: input.value })
    .then((res: any) => {
      if (res.code === 200) {
        arr.value = res.data
        console.log(res)
      }
    }).catch((err: any) => {
      console.log(err)
    })
}
//是否禁用
let isshow = ref<boolean>(true)
//添加用户
let clicc = () => {
  dialogVisible.value = true
}
// 弹出框
let dialogVisible = ref<boolean>(false)
//设置上传的请求头部
let header = ref<any>({
  Authorization: localStorage.getItem('token')
})
//文件状态改变时的钩子
let chang = (fileList: any, file: any) => {
  if (fileList.status === 'success') {
    from.value.tu = fileList.response.data
  }
}
// 表单验证
let from = ref<any>({
  tu: "",
  name: '',
  password: '',
  telphen: '',
  emile: '',
})
//确定
let cliok = () => {
  useValidate(ruleForm, () => {
    if (id.value) {
      api.updateUser({
        id: id.value, username: ruleForm.value.model.name,
        email: ruleForm.value.model.emile, mobile: ruleForm.value.model.telphen,
        avatar: ruleForm.value.model.tu, status: isshow.value
      })
        .then((res: any) => {
          if (res.code === 200) {
            console.log(res)
            dialogVisible.value = false
            get()
          }

        }).catch((err: any) => {
          console.log(err)
        })
    } else {
      api.addUser({
        username: ruleForm.value.model.name,
        avatar: ruleForm.value.model.tu, email: ruleForm.value.model.emile,
        mobile: ruleForm.value.model.telphen, password: ruleForm.value.model.password, status: isshow.value
      })
        .then((res: any) => {
          get()
          dialogVisible.value = false
        }).catch((err: any) => {
          console.log(err)
        })
    }
  })
}
//点击文件列表中已上传的文件时的钩子
let prevew = (file: any) => {
}
//验证规则
let rules = ref<any>({
  tu: [
    {
      required: true,
      message: '请上传图片',
      trigger: 'blur ',
    }
  ],
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    {
      min: 2,
      max: 5,
      message: '请输入正确的用户名',
      trigger: 'blur',
    }
  ],
  password: [
    {
      required: true,
      message: '请输入用户密码',
      trigger: 'blur',
    },
    {
      min: 2,
      max: 7,
      message: '密码错误',
      trigger: 'blur',
    }
  ]
})
//显示第几页
let current = ref<number>(1)
//一页显示的数量
let pageSize = ref<number>(3)
// 搜索关键字
let query = ref<string>('')
//表格数组
let arr = ref<any>()
// 获取用户请求
let get = () => {
  api.getUser({ current: current.value, pageSize: pageSize.value, query: query.value })
    .then((res: any) => {
      if (res.code === 200) {
        arr.value = res.data
          arr1.value=res.total
        console.log(res)
      }
    }).catch((err: any) => {
      console.log(err)
    })
}
onMounted(() => {
  get()
})
//是否禁用
let chaning = (row: any) => {
  isshow.value = row.status
  api.showUser({id:row._id,status:row.status})
  .then((res:any)=>{
    if(res.code===200){
      get()
    }
  }).catch((err:any)=>{
    console.log(err)
  })
}
let id = ref<string>('')
//编辑
let clibian = (row: any) => {
  id.value = row._id
  if (row._id) {
    dialogVisible.value = true
  }

}
//删除
let clicsh = (row: any) => {
api.delUser(row._id).then((res:any)=>{
  if(res.code===200){
    get()
  }
}).catch((err:any)=>{
  console.log(err)
})
}
//total
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
</script>

<style scoped>
.box {
  margin-left: 20px;
}
.box1 {
  margin-top: 20px;
}
</style>