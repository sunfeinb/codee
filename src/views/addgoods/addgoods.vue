<template>
  <div style="display:flex" v-if="dialogVisible === false">
    <div>
      <el-input v-model="input" placeholder="请输入搜索内容" clearable size="small" style="width: 200px" />
      <el-button size="small" icon="el-icon-search"></el-button>
    </div>
    <div class="box" @click="clichang">
      <el-button size="small" type="primary">添加商品</el-button>
    </div>
  </div>
  <div v-else>
    <div>添加商品</div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础设置" name="firs">
        <first></first>
        </el-tab-pane>
        <el-tab-pane label="媒体信息" name="second"></el-tab-pane>
        <el-tab-pane label="商品规格" name="third">Role</el-tab-pane>
        <el-tab-pane label="商品详情" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import first from '../../components/first/first.vue'
let input = ref<any>()
let dialogVisible = ref<Boolean>(false)
let clichang = () => {
  dialogVisible.value = true
}
//点击标签页的点击事件
let handleClick = () => {

}
//默认显示标签页
let activeName = ref<any>('firs')
</script>

<style scoped>
.box {
  margin-left: 20px;
}
</style>