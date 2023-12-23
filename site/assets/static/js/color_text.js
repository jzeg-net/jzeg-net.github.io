(() => {
  'use strict'

  const getStoredColorText = () => localStorage.getItem('color_text')
  const setStoredColorText = color_text => localStorage.setItem('color_text', color_text)
  const body = document.body
  let textColorPicker = document.querySelectorAll('.textColorPicker')

  let textColorPickerInput = document.querySelectorAll('.textColorPickerInput')

  const getRealColor = () => {
    return window.getComputedStyle(body).getPropertyValue('--bs-body-color')
  }

  const getPreferredColorText = () => getStoredColorText() || getRealColor()

  const setColor = (color) => {
    body.style.setProperty('--bs-body-color', color)
  }

  const showColorText = () => {
    textColorPickerInput.forEach((inputEL) => {
      inputEL.value = getRealColor()
    })
  }

  setColor(getPreferredColorText())

  textColorPickerInput.forEach((inputEL) => {
    inputEL.addEventListener('input', (e) => {
      setColor(inputEL.value)
      setStoredColorText(inputEL.value)
    })
  })

  window.addEventListener('DOMContentLoaded', () => {
    showColorText()
  })

  window.addEventListener('storage', () => {
    showColorText()
  })

})()
