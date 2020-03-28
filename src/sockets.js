import Vue from 'vue'
import store from './stores'
import VueSocketIO from '../vendor/Vue-Socket.io/src/'
// import VueSocketIO from 'vue-socket.io'

const makeSocketConfig = namespace => ({
  debug: true,
  connection: process.env[`VUE_APP_${namespace}_URL`],
  options: {
    useConnectionNamespace: true,
    namespaceName: namespace
  },
  vuex: {
    store,
    actionPrefix: namespace + '_',
    mutationPrefix: namespace + '_'
  }
})

const createSockets = arr => {
  arr.forEach(item => {
    Vue.use(new VueSocketIO(makeSocketConfig(item)))
  })
}

export default createSockets
