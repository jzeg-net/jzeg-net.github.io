(() => {
  'use strict'

  const getStoredColorLink = () => localStorage.getItem('color_link')
  const setStoredColorLink = color_link => localStorage.setItem('color_link', color_link)
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
