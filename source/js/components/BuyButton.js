import store from '../libs/store'
import api from '../libs/api'
import State from './State'

export default {
  el: '[data-vue="BuyButton"]',

  data() {
    return {
      loading: false
    }
  },

  computed: {
    checkout: function() {
      return State.checkout
    }
  },

  methods: {
    addToCart(sku) {
      this.loading = true
      let uuid = store.get('uuid')

      if (uuid) {
        this.addOrderItem(sku, uuid)
      } else {
        api().post('checkouts', {})
          .then((res) => {
            if (res.data.uuid) {
              store.set('uuid', res.data.uuid)
              this.addOrderItem(sku, res.data.uuid)
            } else {
              this.loading = false
            }
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
          })
      }
    },

    addOrderItem(sku, uuid) {
      let jsonLds = document.querySelectorAll('script[type="application/ld+json"]')
      let meta_data = {}
      let value = 0

      for (var i = 0; i < jsonLds.length; i++) {
        let json = JSON.parse(jsonLds[i].innerText)
        if (json['@type'] == 'ProductInfo' && json.sku == sku) {
          meta_data = json
          value = json.price
        }
      }

      let orderItem = {
        sku: sku,
        url: window.location.href,
        value: value,
        quantity: 1,
        meta_data: meta_data
      }

      api().post(`checkouts/${uuid}/order_items`, orderItem)
        .then((res) => {
          State.checkout = res.data.checkout
          window.location.href = '/cart'
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    }
  }
}
