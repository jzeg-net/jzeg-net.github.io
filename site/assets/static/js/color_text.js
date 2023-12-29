(() => {
  'use strict'

  const key = 'color_text'
  const getStoredColorText = () => localStorage.getItem(key)
  const setStoredColorText = color_text => localStorage.setItem(key, color_text)
  const removeStoredColorText = color_text => localStorage.removeItem(key)
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
