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

// 简易防镜像
if (top.location.href !== self.location.href) {
    location.href = self.location.href
}

let donates = document.querySelectorAll('[data-donate]')
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

// 滚动监听
let new_scroll_position = 0
let last_scroll_position
setTimeout(scrollListener, 500)

function scrollListener() {
    document.addEventListener('scroll', () => {
        last_scroll_position = scrollY
        scrollMainNavbar()
        scrollFloatTools()
        new_scroll_position = last_scroll_position
    })
}

function scrollFloatTools() {
    let floatTools = document.querySelector('#float-tools')
    if (!floatTools) return

    if (new_scroll_position > last_scroll_position) {
        floatTools.classList.add('hide')
        getToolsCollapse().classList.remove('show')
    } else if (new_scroll_position < last_scroll_position) {
        floatTools.classList.remove('hide')
    }
}

function scrollMainNavbar() {
    let navbar = document.querySelector('#mainNavbar')
    if (!navbar) return

    if (new_scroll_position < last_scroll_position && last_scroll_position > 64) {
        navbar.classList.add('tY-n100')
    } else if (new_scroll_position > last_scroll_position) {
        navbar.classList.remove('tY-n100')
    }
}

// 浮动工具栏
let floatTools = document.querySelector('#float-tools')
if (floatTools) {
    let collapseToRight = document.querySelector('#collapse-to-right')
    collapseToRight.addEventListener('click', function () {
        floatTools.classList.add('hide')
        getToolsCollapse().classList.remove('show')
    })
}

function getToolsCollapse(getEl = true) {
    let toolsCollapse = document.querySelector('#tools-collapse')

    return getEl
        ? toolsCollapse
        : bootstrap.Collapse.getOrCreateInstance(toolsCollapse)
}

document.querySelectorAll('time').forEach(currentEl => {
    let locale = document.querySelector('html').lang.replaceAll('-','_')

    let realTime = dayjs(currentEl.getAttribute('datetime')).format()
    currentEl.innerHTML = timeago.format(realTime, locale)
})
