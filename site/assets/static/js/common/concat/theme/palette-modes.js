/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'

    const getStoredPalette = () => getLocalStorage('palette')
    const setStoredPalette = palette => setLocalStorage('palette', palette)

    const getPreferredPalette = () => {
        const storedPalette = getStoredPalette()
        if (storedPalette) {
            return storedPalette
        }

        return 'none'
    }

    const setPalette = palette => {
        if (palette === 'none') {
            document.documentElement.setAttribute('data-bs-palette', 'none')
        } else {
            document.documentElement.setAttribute('data-bs-palette', palette)
        }
    }

    setPalette(getPreferredPalette())

    const showActivePalette = (palette, focus = false) => {
        const paletteSwitcher = document.querySelector('[data-bs-palette="switcher"]')

        if (!paletteSwitcher) {
            return
        }

        const paletteSwitcherText = document.querySelector('#paletteSwitcher-text')
        const activePaletteIcon = document.querySelector('.palette-icon-active use')
        const btnToActive = document.querySelector(`[data-bs-palette-value="${palette}"]`)
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

        document.querySelectorAll('[data-bs-palette-value]').forEach(element => {
            element.classList.remove('active')
            element.setAttribute('aria-pressed', 'false')
        })

        btnToActive.classList.add('active')
        btnToActive.setAttribute('aria-pressed', 'true')
        activePaletteIcon.setAttribute('href', svgOfActiveBtn)
        const paletteSwitcherLabel = `${paletteSwitcherText.textContent} (${btnToActive.title})`
        paletteSwitcher.setAttribute('aria-label', paletteSwitcherLabel)

        if (focus) {
            paletteSwitcher.focus()
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedPalette = getStoredPalette()
        if (storedPalette !== 'light' || storedPalette !== 'dark') {
            setPalette(getPreferredPalette())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActivePalette(getPreferredPalette())

        document.querySelectorAll('[data-bs-palette-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const palette = toggle.getAttribute('data-bs-palette-value')
                    setStoredPalette(palette)
                    setPalette(palette)
                    showActivePalette(palette, true)
                })
            })
    })
})()
