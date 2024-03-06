/* import Editor from './xdomain-Editor.js' */
/* for available options see the file `docs/tutorials/ConfigOptions.md */
const svgEditor = new Editor(document.querySelector('#svg_editor'))
svgEditor.setConfig({
  allowInitialUserOverride: true,
  extensions: [],
  noDefaultExtensions: false,
  userExtensions: [/* { pathName: '/packages/react-test/dist/react-test.js' } */]
})
svgEditor.init()
// Variable XDOMAIN below is created by Rollup for the Xdomain build (see rollup.config.js)
/* globals XDOMAIN */
try { // try clause to avoid js to complain if XDOMAIN undefined
  if (XDOMAIN) {
    svgEditor.setConfig({
      canvasName: 'xdomain', // Namespace this
      allowedOrigins: ['*']
    })
    console.info('xdomain config activated')
  }
} catch (error) { /* empty fn */ }
