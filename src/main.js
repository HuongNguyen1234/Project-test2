import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'
import VueRouter from 'vue-router'
 import 'bootstrap/dist/css/bootstrap.css';
 import 'bootstrap-vue/dist/bootstrap-vue.css';
 import VModal from 'vue-js-modal'
import {routes} from './routes'
Vue.use(VModal,{dialog:true})
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
Vue.config.productionTip = false
Vue.use(BootstrapVue)

 new Vue({
   router,
   render: h => h(App),
 }).$mount('#app')
