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
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0 || entry.isIntersecting) {
        play(element)
      } else {
        pause(element)
      }
    })
  }

  const observer = new IntersectionObserver(animationCallback(selector))

  observer.observe(selector)

}

let bulletin = document.querySelector('.bulletin-animation')
simpleControlOfAnimationState(bulletin)
