import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AppInit from './mixins/appInit.mixin'

import createSockets from './sockets'

import App from './App.vue'
import router from './router'
import store from './stores'
import './registerServiceWorker'
// import { faFacebookSquare } from '@fortawesome/fontawesome-free-brands';
import VueCarousel from 'vue-carousel'

Vue.config.productionTip = false
Vue.use(VueCarousel)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

createSockets(['CHAT_SERVICE', 'ROOM_SEARCH_SERVICE'])

Vue.component('v-icon', Icon)

export default new Vue({
  router,
  store,
  render: h => h(App),
  computed: {
    ...mapState({
      cookiePolicyAccepted: state => state.app.cookiePolicyAccepted
    })
  },
  created () {
    this.checkCookie()
    this.hideSplash()
    if (this.cookiePolicyAccepted) {
      this.storageDataInit()
    }
  },
  methods: {
    ...mapMutations('app', { hideSplash: 'HIDE_SPLASH', checkCookie: 'CHECK_COOKIE_ACCEPTED' })
  },
  mixins: [AppInit]
}).$mount('#app')
