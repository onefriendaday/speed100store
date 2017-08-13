const PREFIX = '_storblok_'

export default {
  set(key, data) {
    window.localStorage.setItem(PREFIX + key, data)
  },

  get(key) {
    return window.localStorage.getItem(PREFIX + key)
  }
}
