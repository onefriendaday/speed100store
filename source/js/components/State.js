import Vue from 'vue'
import api from '../libs/api'
import store from '../libs/store'

let state = new Vue({
  data: function() {
    return {
      checkout: {},
      checkoutStatus: 'open',
      errors: {}
    }
  }
})

let uuid = store.get('uuid')

if (uuid != null) {
  api().get(`checkouts/${uuid}`)
    .then((res) => {
      state.checkout = res.data
      state.checkoutStatus = 'open'
    })
    .catch((error) => {
      store.set('uuid', '')
    })
}


export default state
