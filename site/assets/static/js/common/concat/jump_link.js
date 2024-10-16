(() => {
  'use strict'

  const storageKey = 'jump'

  const hrefType = href => {
    if (!href || !href.length) return null

    href = href.toLowerCase()

    if (href.startsWith('mailto:')) return 'mailto'
    if (href.startsWith('tel:')) return 'tel'
    if (href.startsWith('sms:')) return 'sms'

    if (href.startsWith('https://')) return 'absolute'
    if (href.startsWith('http://')) return 'absolute'

    if (href.startsWith('file://')) return 'file'

    if (href.startsWith('javascript:')) return 'script'
    if (href.startsWith('vbscript:')) return 'script'

    if (href.startsWith('data:')) return 'data'

    if (href.contains('://')) return 'protocol'
    if (href.startsWith('//')) return 'protocolRelative'
    if (href.startsWith('/')) return 'rooted'
    if (href.startsWith('#')) return 'fragment'

    return 'relative'
  }

  const checkTargetLink = str => hrefType(str) !== 'absolute'

  const allowDomains = domain => {
    let allowDomain = [
      'localhost',
      'www.github.com',
      'github.com'
    ]

    return allowDomain.includes(domain)
  }

  const selfDomain = domain => {
    let selfDomain = self.location.host

    return domain === selfDomain
  }

  const addJumpPre = range => {
    let origin = document.location.origin
    let lang = document.documentElement.lang.toLowerCase()
    let gotoLink = `${origin}/${lang}/jump_link/?target=`

    range.querySelectorAll('a').forEach(targetLink => {
      if (!targetLink.hasAttribute('href')) return

      if (checkTargetLink(targetLink.href)) return
      if (allowDomains(targetLink.host)) return
      if (selfDomain(targetLink.host)) return

      targetLink.href = gotoLink + encodeURIComponent(targetLink.href)
    })
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (getLocalStorage(storageKey) === 'false') return

    let content = document.querySelector('#content')
    if (content) {
      addJumpPre(content)
    }
  })

  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return

    const key = event.key
    const oldValue = event.oldValue
    const newValue = event.newValue

    console.log(`存储键: ${key}`)
    console.log(`旧值: ${oldValue}`)
    console.log(`新值: ${newValue}`)

    document.location.reload()
  })

})()
