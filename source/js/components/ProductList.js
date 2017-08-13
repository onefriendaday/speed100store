export default {
  props: ['res'],
  computed: {
    resJson() {
      return JSON.stringify(this.res)
    }
  },

  methods: {
    doFilter() {
      this.$emit('filter-changed')
    }
  }
}
