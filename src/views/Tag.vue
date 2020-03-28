<template lang="pug">
    .page-tags
        h2.page-title Live {{tag | capitalize }} Web Cams
        .content-main
            broadcaster-grid(:items="list", v-if="list.length")
            .tag-grid(v-else)
                h3 OOPS! We couldn't find any broadcasters in that category.
                p Checkout more below.
        hr
</template>
<script>
import BroadcasterGrid from '../components/BroadcasterGrid/BroadcasterGrid'
import { mapActions, mapState } from 'vuex'
export default {
  components: { BroadcasterGrid },
  created () {
    this.tag = this.$route.params.tag
      console.log(this.type)
  },
  watch: {
    '$route' (to, from) {
        this.tag = to.params.tag
        this.GET_LIST(this.tag)
    }
  },
  props: ['type'],
  computed: {
    list: function (state) {
      if (state.tag === 'recent') {
        return state.recent.rooms
      } else {
        return this.rooms.filter(b => b.tags.indexOf(state.tag) > -1)
      }
    },
    ...mapState('user', ['slug', 'recent']),
    ...mapState({
          rooms: state => state.rooms.list
    })
  },
  methods: {
      ...mapActions('rooms', ['GET_LIST'])
  },
  data () {
    return {
      tag: ''
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
<style lang="scss">
    .page-title {
        background: #fff;
        position: fixed;
        top: 55px;
        width: 100%;
    }
    .content-main {
        padding-top: 50px;
    }
</style>
