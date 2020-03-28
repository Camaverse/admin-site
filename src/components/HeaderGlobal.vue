<template lang="pug">
    header.header-global(:class="{hasDrop, hasBackground}")
        b-navbar.nav-primary.hasTagList(toggleable='lg', type='dark')
            b-navbar-brand(to='/') {{appTitle}}
            b-collapse#nav_collapse(is-nav='')
                b-navbar-nav
                b-navbar-nav.ml-auto
                    b-nav-text {{username}}
            b-navbar-nav.ml-2
                b-nav-item(@click='openLogin()', v-if='!isLoggedIn') Login
                b-nav-item(@click='logout()', v-if='isLoggedIn') Logout
        .header-drop(v-if="showDrop")
            .header-drop-inner
                a.header-drop-close(@click="hideDrop()") X
                login-form.flex-1.mr-2(:onSubmit="onSubmitLogin", v-if="showLogin")
</template>
<script>
import LoginForm from '@/components/Forms/Login.Form'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'header-global',
  components: { LoginForm },
  data () {
    return {
      broadcastersURL: process.env.VUE_APP_SITE_BROADCASTERS,
      dropContent: null,
      scrollPosition: null
    }
  },
  computed: {
    appTitle: function () {
      if (process.env.VUE_APP_NSFW === 'false') {
        return process.env.VUE_APP_TITLE_SFW
      } else {
        return process.env.VUE_APP_TITLE
      }
    },
    hasBackground: function () {
      return this.scrollPosition >= 360
    },
    hasDrop: function () {
      return this.dropContent !== null
    },
    showDrop: function () {
      return this.dropContent !== null
    },
    showLogin: function () {
      return this.dropContent === 'login'
    },
    ...mapState({
      username: state => state.user.username,
      isLoggedIn: state => state.user.isLoggedIn
    })
  },
  destroy () {
    window.removeEventListener('scroll', this.updateScroll)
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    hideDrop () {
      this.dropContent = null
    },
    onSubmitLogin () {
      console.log('login submitted')
    },
    openLogin () {
      this.dropContent = 'login'
    },
    updateScroll () {
      this.scrollPosition = window.scrollY
    },
    ...mapActions('user', { logout: 'logout' })
  }
}
</script>
<style lang="scss">
.coins-indicator {
    cursor: pointer;
    display: flex;
    align-content: center;
    align-items: center;
    margin: 0 10px;
    .amount {
        margin: 0 5px;
        padding: 5px;
        color: #000;
        font-weight: bold;
        &.coins-high {
            background-color: gold;
        }
        &.coins-medium {
            background-color: silver;
        }
        &.coins-low {
            background-color: rosybrown;
        }
        &.coins-none {
            background-color: red;
        }
    }
}
.header-global {
    position: fixed;
    width: 100%;
    z-index: 10;
    -webkit-backface-visibility: hidden;
}
.header-drop {
    display: flex;
    justify-content: flex-end;
    .header-drop-inner {
        width: 40%;
    }

    @media (max-width: 599px) {
        .header-drop-inner {
            width: 80%;
        }
    }
    .header-drop-close {
        background: #ccc;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        height: 25px;
        position: absolute;
        right: 0;
        text-align: center;
        width: 25px;
    }
}
.header-form {
    background: #006992;
    border-radius: 10px;
    color: #fff;
    margin-top: 5px;
    padding: 20px;
    &.submitted {
        background-color: #c47800;
    }
    &.hasError {
        background-color: #c41400;
    }
}
.nav-primary {
    background-color: #006992;
    padding: 0 10px;
}

.nav-secondary {
    padding: 0 10px;
}

</style>
