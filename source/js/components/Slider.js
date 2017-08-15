import ajax from 'axios'
let cache = {}

export default {
  el: '[data-vue="Slider"]',

  data: function() {
    return {
      current: 0
    }
  },

  methods: {
    goTo(index) {
      this.current = index

      let path = '//' + window.location.host + '/_component/slide?id=' + this.current
      let container = this.$el.querySelector('.teaser__inner')

      if (cache[path]) {
        container.innerHTML = cache[path]
      } else {
        ajax.get(path)
          .then(function (res) {
            cache[path] = res.data
            container.innerHTML = cache[path]
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
