import Vue from 'vue';
import App from './App.vue';
import message from './components/index';
// import ElementUI from 'element-ui'

Vue.use(message)
// Vue.use(ElementUI)
Vue.prototype.$bus = new Vue()

new Vue({
  render: (h) => h(App),
}).$mount('#app')
