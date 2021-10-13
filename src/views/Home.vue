<template>
  <div class="box">
    <div style="width: 50%">
      <div class="box1">小米Lite</div>
      <div class="box2">欢迎来到小米lite后端管理系统</div>
      <div class="boxy">
        <div style="width: 60%">
          <el-form
            :model="user"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="apss" show-password>
              <el-input v-model="user.password"></el-input>
            </el-form-item>
          </el-form>
          <div class="boxbutt">
            <el-button type="primary" style="width: 79%" @click="btn"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "../http/api";
import { useRouter } from "vue-router";
let ruleForm = ref<any>(null);
const user = ref<any>({
  username: "",
  password: "",
});
    const router =useRouter()
let rules = ref<any>({
    username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 5,
      message: "长度在 3 到 5 个字符",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      min: 3,
      max: 7,
      message: "长度在 3 到 7 个字符",
      trigger: "blur",
    },
  ],
});
let btn = () => {
  api
    .login({ username: user.value.username, password: user.value.password })
    .then((res: any) => {
        console.log(res);
      let usery = res.token;
      let name = res.data.username;
      localStorage.setItem("token", usery);
      localStorage.setItem("usename", name);
            router.push({
          path:"/child",
        })
    })
    .catch((err: any) => {
      console.log(err);
    });
};
</script>


<style scoped lang="scss">
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.box1 {
  display: flex;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}
.box2 {
  display: flex;
  justify-content: center;
  color: rgb(169, 169, 169);
  padding: 20px 25px;
  font-size: 14px;
}
.boxbutt {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.boxy {
  display: flex;
  justify-content: center;
}
</style>