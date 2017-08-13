export default {
  init() {
    var scrollListener = function(e) {
      document.removeEventListener('scroll', scrollListener, true)
      document.getElementsByTagName( 'html' )[0].className += ' scrolled'
    }

    document.addEventListener('scroll', scrollListener, true)
  }
}
