const svgEditor = new Editor(document.querySelector('#svg_editor'))
svgEditor.setConfig({
  lang: document.querySelector('html').lang,
  imgPath: '/static/vendor/svgedit/dist/editor/images',
  extPath: '/static/vendor/svgedit/dist/editor/extensions',
  allowInitialUserOverride: true,
  extensions: [],
  noDefaultExtensions: false,
  userExtensions: [
    /* { pathName: '/packages/react-test/dist/react-test.js' } */
  ]
})
svgEditor.init()

try { // try clause to avoid js to complain if XDOMAIN undefined
  if (XDOMAIN) {
    svgEditor.setConfig({
      canvasName: 'xdomain', // Namespace this
      allowedOrigins: ['*']
    })
    console.info('xdomain config activated')
  }
} catch (error) {
  console.log(error)
}
