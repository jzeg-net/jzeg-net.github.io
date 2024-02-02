(() => {
  'use strict'

  let audio = document.createElement('audio')
  let source_wav = document.createElement('source')
  let source_mp3 = document.createElement('source')

  source_wav.src = '/static/audio/admission.wav'
  source_mp3.src = '/static/audio/admission.mp3'

  audio.append(source_wav, source_mp3)
  audio.preload = 'auto'
  audio.volume = '.2'
  audio.crossOrigin = 'use-credentials'
  // audio.controls = true
  // audio.controlsList = 'nodownload noplaybackrate'
  // audio.muted = false
  // audio.autoplay = true
  //
  // document.body.append(audio)

  document.addEventListener('visibilitychange', () => {
    let state = document.visibilityState
    if (state === 'visible') {
      audio.play()
        .then(() => console.log('播放完毕'))
        .catch((err) => {
          let errName = err.name
          if (errName === 'NotAllowedError') {
            console.log('不允许该操作，本实例原因是策略限制')
          } else if (errName === 'NotSupportedError') {
            console.log('不支持该操作，本实例为格式不支持')
          }
        })
    }
  })

})()
