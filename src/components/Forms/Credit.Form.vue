<template lang="pug">
    .getCoins.header-form(:class="{hasError}")

        // page 1
        div(v-if="page === 1")
            .text-center
                h3 Get Coins
                p Select A Package
            .carousel-container
                carousel(
                    :perPage="4", :autoplay="false", :paginationEnabled="false",
                    :loop="true" :navigation-enabled="true")
                    slide.slide(v-for="(item, index) in creditAmountsComputed", :key="index")
                        div.text-center(@click="selectIndex(index)")
                            small Coins:
                            br
                            span.credit-amount {{item.amount}}
                            hr
                            | ${{item.price}}
                            br
                            div.save-amount
                                small(v-if="item.discount") Save ${{item.saved}} ({{item.discount}}%)

        // page 2
        div.text-center(v-if="page === 2")
            h3 You Selected
            h2 {{selectedItem.amount}} Coins for ${{selectedItem.price}}
            p
                b-btn(@click="startAutoload(selectedItem.index)") Turn on AUTOLOAD and save 2% more!
            p
                b-btn(@click="setAutoloadNone(selectedItem.index)") No Thanks! I don't want AUTOLOAD.
            p
                b-btn(@click="unsetAutoload(selectedItem.index)") Go Back

        // page 3
        div.text-center(v-if="page === 3")
            h3 Select A Payment Method
            div
                .carousel-container
                    carousel(
                    :perPage="4", :autoplay="false", :paginationEnabled="false",
                    :loop="true" :navigation-enabled="true")
                        slide.slide(v-for="(item, index) in paymentMethods", :key="index")
                            div.text-center(@click="selectPayment(index)")
                               h3 {{item}}
                        h3 You Selected
            h3 You Selected
            h2 {{selectedItem.amount}} Coins for ${{selectedItem.price}}
            p
                b-btn(@click="unsetAutoload(selectedItem.index)") Go Back
        // page 4
        div.text-center(v-if="page === 4")
            h3 You Selected
            h2 {{selectedItem.amount}} Coins for ${{selectedItem.price}}

        div(v-if='submitted')
            div(v-if='hasError')
                h2 There was an error.
                p
                    a(href="#", @click.prevent="openForm()") Please try again.
            div(v-if='!hasError')
                h2 Please Check Your Inbox.
                p A login link has been sent to the email.
                p
                    a(href="#", @click.prevent="openForm()") Resend
</template>
<style lang="scss">
    .carousel-container {
        padding: 0 20px 20px 20px;
        .slide {
            padding-bottom: 10px;
            cursor: pointer;
        }
        .slide:nth-child(even) {
            background-color: #005f85;
        }
        .slide:hover {
            background-color: #50c588;
        }
    }
    .credit-amount {
        font-size: 2em;
    }
    .credit-btn {
        background-color: gold;
        color: #000;
    }
    .save-amount {
        color: #50c588;
        height: 25px;
    }
</style>
<script>
import FormMixin from '@/components/Forms/Forms.Mixin'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'credit-form',
  mixins: [FormMixin],
  data () {
    return {
      autoLoadPercentage: 2,
      creditBase: 1.4,
      creditAmounts: [
        { amount: 50 },
        { amount: 100 },
        { amount: 250 },
        { amount: 500, discount: 10 },
        { amount: 1000, discount: 20 },
        { amount: 2500, discount: 30 },
        { amount: 5000, discount: 30 },
        { amount: 10000, discount: 30 }
      ],
      hasAutoload: null,
      form: {
        email: 'larry.l.sharpe@gmail.com',
        username: 'lovinlyfehard'
      },
      page: 1,
      paymentMethods: [
        'credit',
        'Paypal',
        'Crypto',
        'Gift Card'
      ],
      selected: null
    }
  },
  computed: {
    selectedItem: function () {
      return this.creditAmountsComputed[this.selected]
    },
    creditAmountsComputed: function () {
      return this.creditAmounts.map((item, index) => {
        const fullPrice = (item.amount * this.creditBase) / 10
        if (this.hasAutoload) item.discount += 2
        let price =
          item.discount ? (item.amount * (this.creditBase * ((100 - item.discount) / 100)))
            : item.amount * this.creditBase

        price = (price / 10).toFixed(2)
        item.price = price
        item.saved = fullPrice - price
        item.index = index
        return item
      })
    },
    ...mapState({
      deviceID: state => state.app.deviceID
    })
  },
  methods: {
    selectIndex (i) {
      this.selected = i
      this.page = 2
    },
    selectPaymentMethod (i) {
      this.selectedItem.paymentMethod = i
      this.page = 4
    },
    toggleAutoLoad () {
      this.hasAutoload = -this.hasAutoload
    },
    startAutoload (i) {
      this.creditAmounts[i].autoload = 100
      this.page = 3
    },
    setAutoloadNone (i) {
      this.creditAmounts[i].autoload = false
      this.page = 3
    },
    unsetAutoload (i) {
      delete this.creditAmounts[i].autoload
      this.selectIndex(null)
      this.page = 1
    },
    onSubmit () {
      this.submitted = true
      const { form: { email, username }, deviceID } = this
      this.join({ email, username })
        .then(() => this.loginLink({ email, deviceID }))
        .catch(() => {
          this.hasError = true
        })
    },
    ...mapActions('user', { join: 'join', loginLink: 'loginLink' })
  }
}
</script>
