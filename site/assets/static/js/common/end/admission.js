(() => {
  'use strict'

  const key = 'admission'
  const getStored = () => localStorage.getItem(key)
  const setStored = value => localStorage.setItem(key, value)
  const removeStored = () => localStorage.removeItem(key)

  const getPreferredStored = () => getStored() ?? 0
  console.log(getPreferredStored())

  const getAudio = (volume = '.2', crossOrigin = 'use-credentials') => {
    let audio = document.createElement('audio')
    let source_wav = document.createElement('source')
    let source_mp3 = document.createElement('source')

    audio.preload = 'auto'
    audio.volume = volume
    audio.crossOrigin = crossOrigin

    source_mp3.src = '/static/audio/admission.mp3'
    source_wav.src = '/static/audio/admission.wav'
    audio.append(source_mp3, source_wav)

    return audio
  }

  const audioPlay = () => {
    let audio = getAudio()
    let startPlayPromise = audio.play()

    // 在大部分正在主流使用的浏览器都支持play()的返回值的时候，可以取消对其进行判断。
    if (startPlayPromise !== undefined) {
      startPlayPromise
        .then(() => console.log('播放完毕'))
        .catch((err) => {
          switch (err.name) {
            case 'NotSupportedError':
              console.log('不支持该操作，本实例为格式不支持')
              break
            case 'NotAllowedError':
              console.log('不允许该操作，本实例原因是自动播放策略限制')
              break
          }

          if (audioPlayConfirm()) {
            // audio.play()
            console.log('用户确认')
            setStored(1)
            listenerVisibilitychange()
          } else {
            // audio.pause()
            console.log('用户取消')
            setStored(0)
          }

        })
    }
  }

  const audioPlayConfirm = () => {
    return confirm('你是否希望在每次切换到本站点页面的时候，播放提示音么？')
  }

  const listenerVisibilitychange = () => {
    document.addEventListener('visibilitychange', () => {
      let state = document.visibilityState
      if (state === 'visible') audioPlay()
    })
  }

  window.addEventListener('DOMContentLoaded', audioPlay)
})()