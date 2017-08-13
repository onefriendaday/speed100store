import State from './State'
import store from '../libs/store'
import api from '../libs/api'

export default {
  el: '[data-vue="Cart"]',

  template: require('./Cart.html'),

  data: function() {
    return {

    }
  },

  computed: {
    checkout: function() {
      return State.checkout
    },

    checkoutStatus: function() {
      return State.checkoutStatus
    },

    itemCount: function() {
      if (State.checkout !== null && typeof State.checkout.order_items !== 'undefined') {
        return State.checkout.order_items.length
      } else {
        return 0
      }
    }
  },

  created() {

  },

  methods: {
    updateQuantity(id, e) {
      let uuid = store.get('uuid')

      let orderItem = {
        quantity: e.currentTarget.value
      }

      api().put(`checkouts/${uuid}/order_items/${id}`, orderItem)
        .then((res) => {
          State.checkout = res.data.checkout
        })
        .catch((error) => {
          console.log(error)
          State.errors = error.response.data
        })
    },

    removeOrderItem(id) {
      let uuid = store.get('uuid')

      api().delete(`checkouts/${uuid}/order_items/${id}`)
        .then((res) => {
          State.checkout = res.data.checkout
        })
        .catch((error) => {
          console.log(error)
          State.errors = error.response.data
        })
    }
  }
}
