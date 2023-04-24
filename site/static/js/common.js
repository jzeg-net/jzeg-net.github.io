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

const createSmallCenterText = (text, color = '') => {
    const div = document.createElement('div')

    div.className = color
        ? 'small text-center text-' + color
        : 'small text-center'
    div.innerHTML = text

    return div
}

// select your header or whatever element you wish
// const header = document.querySelector("header")
// if (header) {
//     const headroom = new Headroom(header)
//     headroom.init()
// }

if (top.location.href !== self.location.href) {
    location.href = self.location.href
}
