import NavItem from './NavItem'

export default {
  data() {
    return {
      activeTab: '0'
    }
  },

  el: '[data-vue="Navigation"]',

  methods: {
    handleClick(tab) {
      this.activeTab = tab
    }
  },

  components: {
    'nav-item': NavItem
  }
}
