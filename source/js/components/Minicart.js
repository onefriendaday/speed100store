import State from './State'

export default {
  el: '[data-vue="Minicart"]',

  template: require('./Minicart.html'),

  data: function() {
    return {

    }
  },

  computed: {
    itemCount: function() {
      if (State.checkout !== null && typeof State.checkout.order_items !== 'undefined') {
        return State.checkout.order_items.length
      } else {
        return 0
      }
    }
  },

  created() {

  }
}
