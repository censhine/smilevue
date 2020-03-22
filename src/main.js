// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button,Row,Col,Swipe,SwipeItem,List,Field,NavBar,Tab,Tabs,PullRefresh,Toast} from 'vant'

Vue.config.productionTip = false
Vue.use(Button)
.use(Row).use(Col).use(Swipe).use(SwipeItem).use(List)
.use(Field).use(NavBar)
.use(Tab).use(Tabs)
.use(PullRefresh)
.use(Toast)

// const VueServerRenderer = require('vue-server-renderer')
// const renderer = VueServerRenderer.createRenderer()

// renderer.renderToString(App).then(html=>{
//   console.log(html)
// }).catch((err)=>{
//   console.log(err)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
