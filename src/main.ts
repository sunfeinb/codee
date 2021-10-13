import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' 
import * as Icons from '@element-plus/icons'
import { toLine } from './utils';
import mitt from 'mitt';


const app = createApp(App)
for(let i in Icons){
  app.component(`el-icon${toLine(i)}`,(Icons as any)[i])
}
app.use(router)
app.use(store)
app.use(ElementPlus,{
  locale: zhCn,
})
app.config.globalProperties.$EventBus = mitt()
app.mount('#app')

