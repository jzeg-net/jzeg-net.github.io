(() => {
  'use strict'

  const key = 'color_link'
  const getStoredColorLink = () => localStorage.getItem(key)
  const setStoredColorLink = color_text => localStorage.setItem(key, color_text)
  const removeStoredColorLink = color_text => localStorage.removeItem(key)
  const body = document.body
  let linkColorPicker = document.querySelectorAll('.linkColorPicker')

  let linkColorPickerInput = document.querySelectorAll('.linkColorPickerInput')

  const getRealColor = () => {
    return window.getComputedStyle(body).getPropertyValue('--bs-link-color')
  }

  const getPreferredColorLink = () => getStoredColorLink() || getRealColor()

  const setColor = (color) => {
    body.style.setProperty('--bs-link-color', color)
  }

  const showColorLink = () => {
    linkColorPickerInput.forEach((inputEL) => {
      inputEL.value = getRealColor()
    })
  }

  setColor(getPreferredColorLink())

  linkColorPickerInput.forEach((inputEL) => {
    inputEL.addEventListener('input', (e) => {
      setColor(inputEL.value)
      setStoredColorLink(inputEL.value)
    })
  })

  window.addEventListener('DOMContentLoaded', () => {
    showColorLink()
  })

  window.addEventListener('storage', () => {
    showColorLink()
  })

})()
