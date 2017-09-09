import {lory} from 'lory.js'

export default {
  init(simple_dots) {
    let dot_count         = simple_dots.querySelectorAll('.js_slide').length
    let dot_container     = simple_dots.querySelector('.js_dots')
    let dot_list_item     = document.createElement('button')
    dot_list_item.classList.add('pag__dot')

    function handleDotEvent(e) {
      if (e.type === 'before.lory.init') {
        for (let i = 0, len = dot_count; i < len; i++) {
          let clone = dot_list_item.cloneNode()
          dot_container.appendChild(clone)
        }

        dot_container.children[0].classList.add('pag__dot--current')
      }

      if (e.type === 'after.lory.init') {
        for (let i = 0, len = dot_count; i < len; i++) {
          dot_container.children[i].addEventListener('click', function(e) {
            e.preventDefault()
            dot_navigation_slider.slideTo(Array.prototype.indexOf.call(dot_container.children, e.target))
          })
        }
      }

      if (e.type === 'after.lory.slide') {
        for (let i = 0, len = dot_container.children.length; i < len; i++) {
          dot_container.children[i].classList.remove('pag__dot--current')
        }

        dot_container.children[e.detail.currentSlide].classList.add('pag__dot--current')
      }

      if (e.type === 'on.lory.resize') {
        for (let i = 0, len = dot_container.children.length; i < len; i++) {
          dot_container.children[i].classList.remove('pag__dot--current')
        }
        dot_container.children[0].classList.add('pag__dot--current')
      }
    }

    simple_dots.addEventListener('before.lory.init', handleDotEvent)
    simple_dots.addEventListener('after.lory.init', handleDotEvent)
    simple_dots.addEventListener('after.lory.slide', handleDotEvent)
    simple_dots.addEventListener('on.lory.resize', handleDotEvent)

    let dot_navigation_slider = lory(simple_dots, {
      enableMouseEvents: true
    })
  }
}
