(() => {
  'use strict'

  const key = 'admission'
  const getStored = () => getLocalStorage(key)
  const setStored = value => setLocalStorage(key, value)
  const removeStored = () => removeLocalStorage(key)

  const getPreferredStored = () => getStored()
  const isAllowed = () => getPreferredStored() === "true"

  const audioPlayConfirm = () => {
    // 只有在未设置的时候继续
    if (getPreferredStored() !== null) {
      return
    }

    let cResult = confirm('是否希望在每次切换到本站页面的时候，播放提示音么？')

    setStored(cResult)
  }

  const getAudio = (volume = '.4', crossOrigin = 'use-credentials') => {
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

  const audioPlay = (audioEl = getAudio()) => {
    if (!isAllowed()) return

    let playPromise = audioEl.play()

    // 在大部分正在主流使用的浏览器都支持play()的返回值的时候，可以取消对其进行判断。
    if (playPromise !== undefined) {
      playPromise
        .catch((err) => {
          switch (err.name) {
            case 'NotSupportedError':
              console.log('不支持该操作，格式不支持')
              break
            case 'NotAllowedError':
              console.log('不允许该操作，自动播放策略限制，首次访问没有具体操作之前不允许执行自动播放')
              break
            default:
              console.log('其他错误：', err.name)
              break
          }
        })
    }
  }

  const listenerVisibilitychange = () => {
    if (!isAllowed()) {
      return
    }

    document.addEventListener('visibilitychange', () => {
      let state = document.visibilityState
      if (state === 'visible') audioPlay()
    })
  }

  window.addEventListener('load', () => {
    audioPlayConfirm()
    listenerVisibilitychange()
  })
})()
