<template>
  <div class="header">
    <div @click="toggle">
      <el-icon-expand v-if="isCollapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </div>
    <div class="box">
      <div>
        <iframe
          width="350"
          height="25"
          frameborder="0"
          scrolling="no"
          hspace="0"
          src="https://i.tianqi.com/?c=code&id=40"
        ></iframe>
      </div>
      <div>
        <el-icon-user></el-icon-user>
      </div>
      <div style="font-size:14px">
      {{name}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
let props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
let name=ref<any>(localStorage.getItem('usename'))
let emits = defineEmits(["update:isCollapse"]);
let toggle = () => {
  emits("update:isCollapse", !props.isCollapse);
};
</script>
<style lang="scss" scoped>
svg {
  width: 20px;
  height: 20px;
}
.header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
}
.box{
  display: flex;
}
</style>