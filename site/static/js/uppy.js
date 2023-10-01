let UppyLocale = {
  'zh_CN': Uppy.locales.zh_CN,
  'en_US': Uppy.locales.en_US,
}

let DashboardOpts = {
  inline: true,
  target: '#uppy',
  theme: 'dark',
  disableLocalFiles: true,
  proudlyDisplayPoweredByUppy: false
}

let uppy = new Uppy.Uppy({
  locale: UppyLocale.zh_CN,
})
  .use(Uppy.Dashboard, DashboardOpts)
  .use(Uppy.Url, { target: Uppy.Dashboard, companionUrl: 'https://your-companion.com' })
  .use(Uppy.ScreenCapture, { target: Uppy.Dashboard })
  .use(Uppy.Webcam, { target: Uppy.Dashboard })
  .use(Uppy.ImageEditor, { target: Uppy.Dashboard })
  // .use(Uppy.Tus, { endpoint: 'https://master.tus.io/files/' })
  // .use(Uppy.Tus, { endpoint: 'https://api.xxxxxx.jzeg.net/shop/upload.php' })
  .use(Uppy.XHRUpload, { endpoint: 'https://api.xxxxxx.jzeg.net/shop/upload.php' })

uppy.on('complete', (result) => {
  console.log('上传完成！我们已经上传了这些文件：', result.successful)
})
