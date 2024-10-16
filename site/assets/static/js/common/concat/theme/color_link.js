(() => {
  'use strict'

  const key = 'color_link'
  const getStoredColorLink = () => getLocalStorage(key)
  const setStoredColorLink = color_text => setLocalStorage(key, color_text)
  const removeStored = () => removeLocalStorage(key)
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

  const removeColorStored = () => {
    linkColorPicker.forEach((pickerEL) => {
      pickerEL.querySelector('.remove_color').addEventListener('click', removeStored)
    })
  }

  setColor(getPreferredColorLink())
  removeColorStored()

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
