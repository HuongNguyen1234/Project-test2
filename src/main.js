import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'

 import 'bootstrap/dist/css/bootstrap.css';
 import 'bootstrap-vue/dist/bootstrap-vue.css';
 import VModal from 'vue-js-modal'

Vue.use(VModal,{dialog:true})

//import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

 new Vue({
   render: h => h(App),
 }).$mount('#app')
