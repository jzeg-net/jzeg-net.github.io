const vditor =   new Vditor('vditor', {
  toolbarConfig: {
    pin: true
  },
  counter: {
    enable: true
  },
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
