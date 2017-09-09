import 'core-js/es6/promise'
import 'core-js/fn/promise'
import {MDCTemporaryDrawer} from '@material/drawer/dist/mdc.drawer'
import ScrollListener from './components/ScrollListener'
import TouchSlider from './components/TouchSlider'
import Vue from 'vue'
import Accounting from 'accounting'
import LazySizes from 'lazysizes'

ScrollListener.init()

let sliders = document.querySelectorAll('.js_slider')
for (var i = 0; i < sliders.length; i++) {
  TouchSlider.init(sliders[i])
}

let drawer = null

document.querySelector('.menu').addEventListener('click', () => {
  if (drawer == null) {
    drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'))
  }

  drawer.open = true
})

import Navigation from './components/Navigation'
import Catalogue from './components/Catalogue'
import Checkout from './components/Checkout'
import Minicart from './components/Minicart'
import Cart from './components/Cart'
import Errors from './components/Errors'
import BuyButton from './components/BuyButton'

const vues = {
  Navigation,
  Checkout,
  Minicart,
  Cart,
  Errors,
  BuyButton,
  Catalogue
}

Vue.component('checkout', Checkout)

Vue.filter('resize', function(image, option) {
  var imageService = '//img2.storyblok.com/'
  var path = image.replace('//a.storyblok.com', '')
  return imageService + option + path
})

Vue.filter('currency', function(value) {
  return Accounting.formatMoney(value, '€', 2, '.', ',')
})

let vueElements = document.querySelectorAll('[data-vue]')

for (var i = 0; i < vueElements.length; i++) {
  new Vue(vues[vueElements[i].getAttribute('data-vue')])
}
