import ajax from 'axios'
import store from '../libs/store'
import api from '../libs/api'
import State from './State'

export default {
  template: require('./Checkout.html'),

  data() {
    return {
      api: null,
      order: null,
      payment: null,
      stripeToken: null,
      stripe: null,
      orderNumber: null,
      loading: false
    }
  },

  computed: {
    checkout: function() {
      return State.checkout
    }
  },

  created() {

  },

  methods: {
    buy() {
      let uuid = store.get('uuid')
      this.loading = true

      api().post(`checkouts/${uuid}/orders`)
        .then((res) => {
          console.log(res.data)
          this.order = res.data
          this.newCharge(this.order.order_number)
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
          State.errors = error.response.data
        })
    },

    getScript(src, resolve, reject) {
      var s
      s = document.createElement('script')
      s.src = src
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    },

    newCharge(orderNumber) {
      this.getScript('https://checkout.stripe.com/checkout.js', () => {
        this.initCheckout(orderNumber)
        this.stripe.open({
          name: 'Checkout',
          description: 'Thanks for buying on kriss.io'
        })
      })
    },

    initCheckout(orderNumber) {
      this.stripe = StripeCheckout.configure({
        key: this.order.payment_methods.stripe.public_key,
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'en',
        allowRememberMe: true,
        billingAddress: true,
        shippingAddress: true,
        token: (token) => {
          this.clearCheckout()
          State.checkoutStatus = 'finalizing'
          this.stripeToken = token
          this.createCharge(orderNumber)
        },
        opened: () => {
          this.loading = false
        }
      })
    },

    clearCheckout() {
      store.set('uuid', '')
      State.checkout = null
    },

    createCharge(orderNumber) {
      api().post(`orders/${orderNumber}/payments`, {
          payment_token: this.stripeToken
        })
        .then((res) => {
          console.log('Payment created')
          console.log(res.data)
          this.payment = res.data
          State.checkoutStatus = 'complete'
        })
        .catch((error) => {
          console.log(error)
          State.errors = error.response.data
        })
    }
  }
}
