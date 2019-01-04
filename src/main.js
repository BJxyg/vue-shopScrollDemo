import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Axios from 'axios';
// import Jsonp from 'jsonp';
import $ from 'jquery';


// Vue.prototype.$axios = Axios;
// Vue.prototype.$jsonp = Jsonp;

new Vue({
    el: '#app',
    router,
    render: c => c(App)
})