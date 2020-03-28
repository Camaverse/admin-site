<template lang="pug">
    .chat-container
        .chat-advisories(v-if="showChatRules")
            carousel( :perPage="1", :autoplay="false", :paginationEnabled="false", :navigateTo="page")
                slide.slide
                    .slide-inner
                        h1 Since this is your first time chatting here.
                        p We are gonna lay down the law.
                        p
                            button.btn.btn-primary(@click="nextPage()") NEXT
                slide.slide
                    .slide-inner
                        h1 #1
                        h2 Don't Be Demanding
                        p There is a time and place for it. But free chat ain't it.
                        p
                            button.btn.btn-primary(@click="nextPage()") NEXT
                        p
                            button.btn.btn-danger(@click="lastPage()") Back
                slide.slide
                    .slide-inner
                        h1 #2
                        h2 Don't Be Disruptive
                        p No spamming the chat room.
                            br
                            | No Arguing.
                            br
                            | No Heckling The Broadcasters.
                            br
                            | Don't Be Rude
                        p
                            button.btn.btn-primary(@click="nextPage()") NEXT
                        p
                            button.btn.btn-danger(@click="lastPage()") Back
                slide.slide
                    .slide-inner
                        h1 #3
                        h2 Don't Give Out Personal Info
                        p We can't protect your privacy if you're giving out your info.
                        p
                            button.btn.btn-primary(@click="nextPage()") NEXT
                        p
                            button.btn.btn-danger(@click="lastPage()") Back
                slide.slide
                    .slide-inner
                        h1 That's It!
                        h2 Ok You're Ready to Chat.
                        b-btn.btn.btn-primary(@click="finishChatRules()") Start Chatting
        beautiful-chat#chat(
        :participants="participants",
        :titleImageUrl="titleImageUrl",
        :onMessageWasSent="sendMessage",
        :messageList="messages",
        :newMessagesCount="newMessagesCount",
        :isOpen="showChat",
        :close="blank",
        :open="blank",
        :showEmoji="true",
        :showFile="true",
        :showTypingIndicator="showTypingIndicator",
        :colors="colors",
        :alwaysScrollToBottom="alwaysScrollToBottom")
</template>

<script>
import Vue from 'vue'
import Chat from 'vue-beautiful-chat'
import { mapActions, mapState } from 'vuex'
Vue.use(Chat)
export default {
  name: 'chat-panel',
  data () {
    return {
      page: 0,
      showChat: false,
      showChatRules: true,
      participants: [
        {
          id: 'system',
          name: 'Camaverse System'
        },
        {
          id: 'user2',
          name: 'Support'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: true, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    }
  },
  created () {
    if (localStorage.getItem('chatRulesAck')) {
      this.openChat()
    }
  },
  computed: {
    messages: function () {
      return (this.rooms && this.rooms.messages) ? this.rooms.messages : []
    },
    ...mapState('room', ['rooms'])
  },
  methods: {
    finishChatRules () {
      localStorage.setItem('chatRulesAck', 'true')
      this.openChat()
    },
    openChat () {
      this.showChatRules = false
      this.showChat = true
    },
    lastPage () {
      this.page--
    },
    nextPage () {
      this.page++
    },
    sendMessage (msg) {
      console.log('sendMessage', msg)
      if (msg.data.text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        msg.room = this.$route.params.slug
        msg.user = this.$store.state.user.slug
        console.log({ msg })
        this.SEND_MESSAGE(msg)
      }
    },
    blank () {},
    ...mapActions('room', ['SEND_MESSAGE'])
  }
}
</script>

<style lang="scss">
#chat {
    height: 100%;
    .sc-launcher {
        display: none;
    }
    .sc-chat-window {
        bottom: unset;
        box-shadow: unset;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        right: unset;
    }
    .sc-header {
        display: none;
    }
    .sc-message-list {
        flex: 1
    }
}
.chat-container {
    position: relative;
    .chat-advisories {
        background-color: #005f85;
        color: #fff;
        height: 500px;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 2;
        .slide {
            padding: 5px;
            display: flex;
            align-items: center;
            text-align: center;
        }
        .slide-inner {
            width: 100%;
        }
        .VueCarousel, .VueCarousel-wrapper, .VueCarousel-inner {
            height: 100% !important;
        }
    }
}

</style>
