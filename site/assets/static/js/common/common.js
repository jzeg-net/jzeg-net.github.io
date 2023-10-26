(() => {
  'use strict'

  // 获取页面语言值
  const getPageLanguage = () => {
    return document.querySelector('html').lang.toLowerCase()
  }

  // 获取本地存储中的主题值
  const getStorageTheme = () => {
    let themeValue = localStorage.getItem('theme')

    // 排除 auto 值
    if (themeValue && 'auto' !== themeValue) {
      return themeValue
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  window.addEventListener('DOMContentLoaded', () => {
    let lang = getPageLanguage()

    // 选中当前页面语言项
    document.querySelectorAll('[data-language-value]')
      .forEach(toggle => {
        let toggleLang = toggle.getAttribute('data-language-value')
        if (lang === toggleLang) {
          toggle.classList.add('active')
        }
      })

    // 验证码图片加载出错时，使用备用图片占位处理。（默认是base64透明色，懒加载验证码图片节省资源，适配多语言静态目录）
    let theme = getStorageTheme()
    document.querySelectorAll('.lazyCaptcha')
      .forEach(img => {
        img.addEventListener('error', () => {
          img.src = `/static/svg/${lang}/captcha-${theme}.svg`
        })
      })
  })
})()
let xxxApiURL = 'https://api.xxxxxx.jzeg.net'

const createSmallCenterText = (text, color = '') => {
  const div = document.createElement('div')

  div.className = color
    ? 'small text-center text-' + color
    : 'small text-center'
  div.innerHTML = text

  return div
}

// 懒加载
const lazyLoad = (selector = '') => {
  const observer = lozad(selector)
  observer.observe()
}
// 懒加载文章特色图片
lazyLoad('.lazy_featuredImagePreview')

// 简易防镜像
if (top.location.href !== self.location.href) {
  location.href = self.location.href
}

let account = document.querySelector('#account')
if (account) {
  account.addEventListener('click', () => {
    bModal('', createSmallCenterText('账号未开放', 'success'), '', 'sm', true)
  })
}

document.querySelectorAll('time').forEach(currentEl => {
  let locale = document.querySelector('html').lang.replaceAll('-', '_')

  let realTime = dayjs(currentEl.getAttribute('datetime')).format()
  currentEl.title = realTime
  currentEl.innerHTML = timeago.format(realTime, locale)
})

const modalSuccessMsg = (message, title = '') => {
  bModal(title, createSmallCenterText(message, 'success'), '', 'sm', true)
}

const modalFailMsg = (message, title = '') => {
  bModal(title, createSmallCenterText(message, 'danger'), '', 'sm', true)
}
