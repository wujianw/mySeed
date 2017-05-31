import Vue from 'vue'
import App from './App'
// import components from 'src/components'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
})