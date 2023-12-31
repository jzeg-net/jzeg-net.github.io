(() => {
  'use strict'

  const getStoredFontSize = () => localStorage.getItem('font_size')
  const setStoredFontSize = font_size => localStorage.setItem('font_size', font_size)
  const body = document.body
  let fontSizeSliderValues = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
  let fontSizeSlider = document.querySelectorAll('.fontSizeSlider')

  let fontSizeRangeInput = document.querySelectorAll('.fontSizeRangeInput')

  const getPreferredFontSize = () => getStoredFontSize() || 'md'

  const getRealSize = (font_size) => {
    return window.getComputedStyle(body).getPropertyValue('--jg--fs-' + font_size)
  }

  const setFontSizeInputValue = (fsValue) => {
    let index = fontSizeSliderValues.indexOf(fsValue)

    fontSizeSlider.forEach((sliderEL) => {
      sliderEL.value = index
    })
  }

  const setFontSize = font_size => {
    const realSize = getRealSize(font_size)
    document.documentElement.setAttribute('data-bs-font_size', font_size)
    body.style.setProperty('--bs-body-font-size', realSize)
    setStoredFontSize(font_size)
  }

  const listenFontSizeRangeInputChange = () => {
    fontSizeRangeInput.forEach((rangeInputEL) => {
      rangeInputEL.addEventListener('change', (event) => {
        console.log(event)
        console.log(rangeInputEL.value)
      })
    })
  }

  const showCurrentValue = () => {
    const currentFontSizeValue = window.getComputedStyle(body).getPropertyValue('font-size')
    const currentFontSize = document.querySelectorAll('.currentFontSize')

    currentFontSize.forEach((fsEL) => {
      fsEL.innerHTML = currentFontSizeValue
    })
  }

  const sliderController = () => {
    let fontSizeSliderController = document.querySelectorAll('.fontSizeSliderController')
    let fontSizeIndex = fontSizeSliderValues.indexOf(getPreferredFontSize())

    fontSizeRangeInput.forEach(EL => {
      EL.value = fontSizeIndex
    })

    fontSizeSliderController.forEach((contrEL) => {
      contrEL.addEventListener('click', () => {
        if (contrEL.tagName !== 'BUTTON') return

        let fontSizeIndex = fontSizeSliderValues.indexOf(getPreferredFontSize())

        if (contrEL.classList.contains('controllerUp')) {
          fontSizeIndex++
        } else if (contrEL.classList.contains('controllerDown')) {
          fontSizeIndex--
        }

        if (fontSizeIndex >= fontSizeSliderValues.length) return

        fontSizeRangeInput.forEach(EL => {
          EL.value = fontSizeIndex
        })

        setStoredFontSize(fontSizeSliderValues[fontSizeIndex])
        setFontSize(getPreferredFontSize())
        showCurrentValue()
      })
    })
  }

  setFontSize(getPreferredFontSize())

  window.addEventListener('DOMContentLoaded', () => {
    sliderController()
    listenFontSizeRangeInputChange()
    setFontSizeInputValue(getPreferredFontSize)
    showCurrentValue()
  })

  window.addEventListener('storage', () => {
    let fontSize = getPreferredFontSize()
    setFontSize(fontSize)
    setFontSizeInputValue(fontSize)
    showCurrentValue()
  })

})()
