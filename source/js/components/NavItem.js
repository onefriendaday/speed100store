import ajax from 'axios'
let cache = {}

export default {
  computed: {
    subnavVisible() {
      return this.name == this.$parent.activeTab
    }
  },

  data() {
    return {
      hoverTimeout: null
    }
  },

  created() {
    this.$on('tab-click', this.tabClick)
  },

  props: ['name'],

  methods: {
    doClick() {
      this.$emit('tab-click', this.name)
    },

    enterEditmode() {
      if (typeof window.storyblok != 'undefined') {
        storyblok.pingEditor(function() {
          if (storyblok.inEditor) {
            storyblok.enterEditmode()
          }
        })
      }
    },

    tabClick(tab) {
      clearTimeout(this.hoverTimeout)
      let container = document.querySelector('.subnav__container')
      container.removeEventListener('mouseleave', this.leave)

      if (tab === '0') {
        container.style.display = 'none'
        container.innerHTML = ''
      } else {
        container.style.display = 'block'
        container.innerHTML = ''
        let path = '//' + window.location.host + '/_component/meganav?id=' + this.name

        if (cache[path]) {
          container.innerHTML = cache[path]
          this.enterEditmode()
        } else {
          ajax.get(path)
            .then(function (res) {
              cache[path] = res.data
              container.innerHTML = cache[path]
              this.enterEditmode()
            })
            .catch(function (error) {
              console.log(error)
            })
        }

        container.addEventListener('mouseleave', this.leave)
      }
    },

    leave() {
      this.hoverTimeout = setTimeout(() => {
        if (this.subnavVisible) {
          this.$emit('tab-click', '0')
        }
      }, 500)
    }
  }
}
