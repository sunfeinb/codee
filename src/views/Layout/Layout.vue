<template>
  <el-container>
    <el-aside width="auto">
    <navleft :isCollapse='isCollapse'></navleft>
    </el-aside>
    <el-container>
    <el-header>
    <navhear v-model:isCollapse='isCollapse'></navhear>
    </el-header>
    <el-main class="elbox"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import navhear from '../../components/navhear/navhear.vue';
import navleft from '../../components/navleft/navleft.vue';

let isCollapse = ref<boolean>(false)
</script>

<style scoped lang="scss">
.el-header{
height: 50px;
padding: 0px;
}
.elbox{
  background: rgb(241,243,246);
}
</style>