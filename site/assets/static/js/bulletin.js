function simpleControlOfAnimationState (selector) {

  const defaultConfig = {
    play (element) {
      element.style.animationPlayState = 'running'
    },
    pause (element) {
      element.style.animationPlayState = 'paused'
    }
  }

  const { play, pause } = Object.assign({}, defaultConfig)

  const animationCallback = (element) => (entries) => {
    entries.forEach((entry) => {
      if (document.visibilityState === 'visible' && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
        play(entry.target)
      } else {
        pause(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(animationCallback(selector))

  for (let i = 0; i < selector.length; i++) {
    observer.observe(selector[i])
  }

}

let bulletin = document.querySelectorAll('.bulletin-animation')
simpleControlOfAnimationState(bulletin)
