const vditor = new Vditor('vditor', {
  toolbarConfig: {
    pin: true
  },
  counter: {
    enable: true
  },
  lang: 'zh_CN',
  theme: 'dark',
  icon: 'ant',
  placeholder: '22',
  height: window.innerHeight / 2,
  toolbar: [
    'emoji',
    'link',
    'upload',
    'edit-mode',
    {
      name: 'more',
      toolbar: [
        'insert-after',
        'fullscreen',
        'preview',
        'info',
        'help',
      ],
    },
  ],
})
