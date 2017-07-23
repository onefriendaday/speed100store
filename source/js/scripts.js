import {MDCTemporaryDrawer} from '@material/drawer'

let drawer = null

document.querySelector('.menu').addEventListener('click', () => {
  if (drawer == null) {
    drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'))
  }

  drawer.open = true
})
