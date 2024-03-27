(() => {
  'use strict'

  let lang = document.documentElement.lang.replaceAll('-', '_')
  let theme = document.documentElement.dataset['bsTheme']

  const vditor = new Vditor('vditor', {
    mode: 'sv',
    cdn: '/static/vendor/vditor',
    toolbarConfig: {
      pin: true
    },
    cache: {
      id: 'autoSaveContent'
    },
    counter: {
      enable: true,
      max: 10000,
      type: 'markdown'
    },
    lang: lang,
    theme: theme,
    fullscreen: {
      index: 1020
    },
    outline: {
      enable: true,
      position: 'left'
    },
    upload: {
      url: '/',
      fieldName: 'editor_file[]',
      accept: '',
      multiple: true,
    },
    placeholder: '',
    width: '100%',
    height: window.innerHeight / 1.45,
    preview: {
      hljs: {
        lineNumber: true,
      },
      markdown: {
        toc: true,
      },
      theme: {
        current: theme
      },
      actions: [],
    }
  })

})()
