// TODO: switch vue resource calls to fecth
import Vue from 'vue'
import vm from '../main.js'

const emit = (event, data) => {
  vm.$socket.CHAT_SERVICE.emit(event, data)
}

const actionsList = [
  'ENTER_ROOM', 'SEND_MESSAGE'
]

const actions = {}
actionsList.forEach(action => {
  actions[action] = (obj, data) => emit(action, data)
})

export const room = {
  namespaced: true,
  state: {
    rooms: []
  },
  mutations: {
    CHAT_SERVICE_ENTER_ROOM: (state, value) => {
      Vue.set(state, 'rooms', value)
    },
    CHAT_SERVICE_SEND_MESSAGE: (state, value) => {
      state.rooms.messages.push(value)
    }
  },
  actions
}
