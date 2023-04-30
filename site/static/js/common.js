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
let header = document.querySelector("header")
if (header) {
    const headroom = new Headroom(header)
    headroom.init()
}

if (top.location.href !== self.location.href) {
    location.href = self.location.href
}

let donates = document.querySelectorAll('a[data-donate]')
donates.forEach(target => {
    target.addEventListener('click', event => {
        event.preventDefault()
        let type = target.dataset.donate
        donate()
    })
})

function donate() {
    bModal('', donateTab, createSmallCenterText('保存二维码图片，识别后可进行任意金额的捐赠。您捐赠的资金将会用于本站的发展。', 'success'), 'sm', true)
}

let account = document.querySelector('#account')
if (account) {
    account.addEventListener('click', () => {
        bModal('', createSmallCenterText('账号未开放', 'success'), '', 'sm', true)
    })
}
