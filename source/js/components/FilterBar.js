export default {
  data() {
    return {
      selection: {}
    }
  },
  props: ['res'],
  methods: {
    doFilter() {
      this.$emit('filter-changed', this.selection)
    },

    unselect(key) {
      this.$delete(this.selection, key)
    }
  },
  watch: {
    selection: {
      handler: function() {
        this.doFilter()
      },
      deep: true
    }
  }
}
