import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Common from './utils/common';
import './api/index';
import './network/request';
import './libs/element-ui';
import 'normalize.css';
import './assets/css/general.css';

Vue.config.productionTip = false;
Vue.prototype.Common = Common;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
