import vm from '../main.js'
import Vue from 'vue'

const emit = (event, data) => {
  vm.$socket.ROOM_SEARCH_SERVICE.emit(event, data)
}

const actionsList = []
const actions = {
  GET_LIST: (obj, data) => {
    emit('GET_LIST', data)
  }
}
actionsList.forEach(action => {
  actions[action] = (obj, data) => emit(action, data)
})

export const rooms = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    ROOM_SEARCH_SERVICE_CONNECTED: (state, data) => {
        Vue.set(state, 'list', data)
    }
  },
  actions
}
