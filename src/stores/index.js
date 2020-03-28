import Vue from 'vue'
import Vuex from 'vuex'
import { app } from './app.store'
import { room } from './room.store'
import { rooms } from './rooms.store'
import { user } from './user.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    room,
    rooms,
    user
  }
})
