// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueCookie from 'vue-cookie'
import store from './vuex/store'
import iview from 'iview'
import VCharts from 'v-charts'
import '../theme/index.css'
import 'iview/dist/styles/iview.css';

import Util from './libs/util';
import Filters from './libs/filters';

import './assets/ambuf/css/manage_v1.0/handleExtraUi.css';
import './assets/ambuf/css/manage_v1.0/message.css';
import './assets/ambuf/css/manage_v1.0/workbench.css';
import './assets/ambuf/css/manage_v1.0/daily.scss';

Filters(Vue);
Vue.use(iview);
Vue.use(VueCookie);
Vue.use(VCharts);
Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'small'});
Vue.use(Util);

// 这里为了让效果明显一些加了延时
router.afterEach((to, from) => {
    store.dispatch("app/onLoading", false);
    iview.LoadingBar.finish();
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
