const browserSync = require('browser-sync')
const reload = browserSync.reload

// themeId: The space id which you can find on storyblok app.storyblok.com in the space settings.
// domain: The domain without the protocol. Example: city.me.storyblok.com

module.exports = {
  blok: {
    apiVersion: 2,
    themeId: '40810',
    domain: '0387bdac.me.storyblok.com',
    apiKey: require('./token'),
    basePath: 'views',
    quickstartToken: '40022-MwpAM58Us86ydBzzQ_WQ',
    environment: 'live',
    uploadDone: function(res) {
      if (res.file.indexOf('.liquid') > -1 && res.file.indexOf('_above_fold_css.liquid') <= -1) {
        browserSync.reload()
      }
    }
  }
}
