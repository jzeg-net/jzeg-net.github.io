/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const getStoredFontSize = () => localStorage.getItem('font_size')
  const setStoredFontSize = font_size => localStorage.setItem('font_size', font_size)
  const body = document.body

  const getPreferredFontSize = () => {
    const storedFontSize = getStoredFontSize()
    if (storedFontSize) {
      return storedFontSize
    }

    return 'md'
  }

  const setFontSize = font_size => {
    const size = window.getComputedStyle(body).getPropertyValue('--jg--fs-' + font_size)
    document.documentElement.setAttribute('data-bs-font_size', font_size)
    body.style.setProperty('--bs-body-font-size', size)
  }

  const showCurrentValue = () => {
    const currentFontSizeValue = window.getComputedStyle(body).getPropertyValue('font-size')

    bModal('', '字体尺寸修改成功，<br>当前字体尺寸为：' + currentFontSizeValue, '', 'sm', true)
  }

  setFontSize(getPreferredFontSize())

  const showActiveFontSize = (font_size, focus = false) => {
    const font_sizeSwitcher = document.querySelector('[data-bs-font_size="switcher"]')

    if (!font_sizeSwitcher) {
      return
    }

    const font_sizeSwitcherText = document.querySelector('#font_sizeSwitcher-text')
    const activeFontSizeIcon = document.querySelector('.font_size-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-font_size-value="${font_size}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-font_size-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    // activeFontSizeIcon.setAttribute('href', svgOfActiveBtn)
    // const font_sizeSwitcherLabel = `${font_sizeSwitcherText.textContent} (${btnToActive.title})`
    // font_sizeSwitcher.setAttribute('aria-label', font_sizeSwitcherLabel)

    if (focus) {
      font_sizeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedFontSize = getStoredFontSize()
    if (storedFontSize !== 'light' || storedFontSize !== 'dark') {
      setFontSize(getPreferredFontSize())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveFontSize(getPreferredFontSize())

    document.querySelectorAll('[data-bs-font_size-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const font_size = toggle.getAttribute('data-bs-font_size-value')
          setStoredFontSize(font_size)
          setFontSize(font_size)
          showCurrentValue()
          showActiveFontSize(font_size, true)
        })
      })
  })
})()
