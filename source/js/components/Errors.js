import State from './State'

export default {
  el: '[data-vue="Errors"]',

  template: require('./Errors.html'),

  data: function() {
    return {

    }
  },

  computed: {
    errors: function() {
      return State.errors
    },

    hasErrors: function() {
      return Object.keys(State.errors).length > 0
    }
  },

  created() {

  },

  methods: {
    close() {
      State.errors = {}
    }
  }
}
