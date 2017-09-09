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

      for (let i = 0, len = container.children.length; i < len; i++) {
        container.children[i].style.display = 'none'
      }
      container.children[tab].style.display = 'block'

      if (tab === '0') {
        container.style.display = 'none'
      } else {
        container.style.display = 'block'
        container.addEventListener('mouseleave', this.leave)
        this.enterEditmode()
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
