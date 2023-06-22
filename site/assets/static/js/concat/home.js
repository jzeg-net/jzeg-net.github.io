let animationTimingFuncOpts = {
  default:   'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  bounce:    'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
  linear:    'linear',
  ease:      'ease',
  easeIn:    'ease-in',
  easeOut:   'ease-out',
  easeInOut: 'ease-in-out',
}

let htmlDir = document.querySelector('html').getAttribute('dir')

let glideOpts = {
  // https://glidejs.com/docs/options/
  type: 'carousel', // slider | carousel
  startAt: 0,
  peek: 0,
  perView: 1,
  gap: 10, // A size of the gap added between slides
  animationTimingFunc: animationTimingFuncOpts['ease'],
  animationDuration: 2000,
  throttle: 25, // Throttle costly events at most once per every wait milliseconds
  direction: htmlDir || 'ltr',
  rewindDuration: 800,
  autoplay: 6000, // Number | false
  focusAt: 'center', // center | Number 0
  hoverpause: true,
  keyboard: true,
}

if (document.querySelector('#home-carousel')) {
  [
    document.querySelectorAll('.glide__slides'),
    document.querySelectorAll('.glide__slide__item'),
    document.querySelectorAll('[class*=border]')
  ].forEach((x) => {
    x.forEach((el) => {
      el.style.background = randomColor(
        {
          luminosity: 'random',
          hue: 'random'
        }
      )
      el.style.color = randomColor(
        {
          luminosity: 'random',
          hue: 'random'
        }
      )
    })
  })

}

if (document.querySelector('#home-carousel')) {
  let main_glide = new Glide('.main_glide', glideOpts)
  main_glide.mount()

  let grid_glide = new Glide('.grid_glide', glideOpts)
  grid_glide.mount()
}
