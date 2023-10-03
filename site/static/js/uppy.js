let UppyLocale = {
  'zh_CN': Uppy.locales.zh_CN,
  'en_US': Uppy.locales.en_US,
}

let uppyTheme = document.querySelector('html').getAttribute('data-bs-theme')

// let TUS_ENDPOINT = 'https://master.tus.io/files/'
let TUS_ENDPOINT = 'https://tusd.tusdemo.net/files/'
let XHR_ENDPOINT = 'https://api.xxxxxx.jzeg.net/shop/upload.php'

let DashboardOpts = {
  inline: true,
  autoProceed: true,
  target: '#uppy',
  theme: uppyTheme,
  disableLocalFiles: false,
  proudlyDisplayPoweredByUppy: false
}

let FormOpts = {
  target: '#shop_add',
  resultName: 'photoHash',
  getMetaFromForm: false
}

let WebcamOpts = {
  target: Uppy.Dashboard,
  preferredImageMimeType: 'image/webp',
  preferredVideoMimeType: 'video/webm'
}

let ScreenCaptureOpts = {
  target: Uppy.Dashboard,
  preferredVideoMimeType: 'video/webm'
}

let FileInputOpts = {
  target: Uppy.Dashboard
}

let ImageEditorOpts = {
  target: Uppy.Dashboard
}

let uppy = new Uppy.Uppy({
  locale: UppyLocale.zh_CN,
  restrictions: {
    maxFileSize: 0,
    minFileSize: 111,
    maxTotalFileSize: 83886080,
    maxNumberOfFiles: 3,
    minNumberOfFiles: 1,
    allowedFileTypes: ['image/*', 'video/*'],
    requiredMetaFields: [],
  },
})
  .use(Uppy.Dashboard, DashboardOpts)
  .use(Uppy.FileInput, FileInputOpts)
  .use(Uppy.Webcam, WebcamOpts)
  .use(Uppy.ScreenCapture, ScreenCaptureOpts)
  .use(Uppy.ImageEditor, ImageEditorOpts)
  .use(Uppy.Form, FormOpts)
  // .use(Uppy.Tus, { endpoint: TUS_ENDPOINT })
  // .use(Uppy.Tus, { endpoint: XHR_ENDPOINT })
  .use(Uppy.XHRUpload, { endpoint: XHR_ENDPOINT })

uppy.on('complete', (result) => {
  console.log('上传完成！我们已经上传了这些文件：', result.successful)
})
