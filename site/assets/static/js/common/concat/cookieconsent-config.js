const logConsent = text => {
  // 获取所有字段
  const cookie = CookieConsent.getCookie()
  const preferences = CookieConsent.getUserPreferences()

  // 在此示例中，我们仅保存 4 个字段
  const userConsent = {
    consentId: cookie.consentId,
    acceptType: preferences.acceptType,
    acceptedCategories: preferences.acceptedCategories,
    rejectedCategories: preferences.rejectedCategories
  }

  fetch('/endpoint-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userConsent)
  })
    .then(r => r.json())
    .then(r => {
      bModal('', createSmallCenterText(text, 'success'), '', 'sm', true)
    })
    .catch(err => {
      console.log(err)
    })
}

const runConsent = () => {
  const CookieConsentTranslations = {
    en: {
      consentModal: {
        title: 'We use cookies',
        description:
          'Cookie modal description',
        acceptAllBtn:
          'Accept all',
        acceptNecessaryBtn:
          'Reject all',
        showPreferencesBtn:
          'Manage Individual preferences'
      }
      ,
      preferencesModal: {
        title: 'Manage cookie preferences',
        acceptAllBtn:
          'Accept all',
        acceptNecessaryBtn:
          'Reject all',
        savePreferencesBtn:
          'Accept current selection',
        closeIconLabel:
          'Close modal',
        sections:
          [
            {
              title: 'Somebody said ... cookies?',
              description: 'I want one!'
            },
            {
              title: 'Strictly Necessary cookies',
              description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

              //this field will generate a toggle linked to the 'necessary' category
              linkedCategory: 'necessary'
            },
            {
              title: 'Performance and Analytics',
              description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
              linkedCategory: 'analytics'
            },
            {
              title: 'More information',
              description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
            }
          ]
      }
    },
    zh: {
      consentModal: {
        title: '我们正在使用 cookie',
        description: '{{revisionMessage}}点击 “全部接受” 按钮，即表示您同意我们可以在您的设备上存储 cookie 并根据我们的 Cookie 政策披露信息。<br>点击 “管理个人偏好” 按钮，可以进行个性化选择您的个人 cookie 偏好设置。',
        revisionMessage: '<p class="fw-bold text-danger-emphasis">您好，自您上次访问以来，我们对 Cookie 政策进行了一些更改！</p><br>',
        acceptAllBtn: '全部接受',
        acceptNecessaryBtn: '全部拒绝',
        showPreferencesBtn: '管理个人偏好'
      },
      preferencesModal: {
        title: '管理 cookie 首选项',
        acceptAllBtn: '全部接受',
        acceptNecessaryBtn: '全部拒绝',
        savePreferencesBtn: '保存当前的选择',
        closeIconLabel: '关闭模态框',
        serviceCounterLabel: '服务',
        sections: [
          {
            title: 'Cookie 同意选项中心',
            description: '当您访问我们的任何网站时，它可能会在您的浏览器上存储或检索信息，主要以 cookie 的形式。这些信息可能与您、您的偏好或您的设备有关，主要用于使网站按照您的预期运行。这些信息通常不会直接识别您的身份，但可以为您提供更加个性化的体验。由于我们尊重您的隐私权，因此您可以选择不允许某些类型的 cookie。点击不同的类别标题以了解更多信息并管理您的首选项。请注意，阻止某些类型的 cookie 可能会影响您对网站的体验以及我们能够提供的服务。'
          }, {
            title: '绝对必要的 Cookies',
            description: '这些 cookie 是网站正常运行所必需的，并且无法在我们的系统中关闭。它们通常只是为了响应您所做的相当于服务请求的操作而设置，例如设置您的隐私首选项、登录或填写表格。您可以将浏览器设置为阻止或提醒您有关这些 cookie，但网站的某些部分将无法工作。这些 cookie 不存储任何个人身份信息。',
            linkedCategory: 'necessary'
          }, {
            title: '性能的 Cookies',
            description: '这些 cookie 使我们能够计算访问量和流量来源，以便我们能够衡量和改进我们网站的性能。它们帮助我们了解哪些页面最受欢迎和最不受欢迎，并了解访问者如何在网站上移动。这些 cookie 收集的所有信息都是汇总的，因此是匿名的。如果您不允许这些 cookie，我们将不知道您何时访问了我们的网站，也无法监控其性能。',
            linkedCategory: 'performance'
          }, {
            title: '功能性的 Cookies',
            description: '这些 cookie 使网站能够提供增强的功能和个性化。它们可能由我们或我们已将其服务添加到我们页面的第三方提供商设置。如果您不允许这些 cookie，那么部分或全部这些服务可能无法正常运行。',
            linkedCategory: 'functional'
          }, {
            title: '广告的 Cookies',
            description: '此外，本站和第三方使用广告 cookie 向您展示基于您已经看过的广告的新广告。Cookie 还会跟踪您点击的广告或点击广告后进行的购买行为。这样做是为了向您展示与您更相关的广告，并出于与我们的广告合作伙伴的商业目的。例如，Cookie 用于检测您何时点击广告，并根据您的社交媒体兴趣和网站浏览历史记录向您展示广告。',
            linkedCategory: 'advertising'
          }, {
            title: '分析的 Cookies',
            description: '我们允许第三方使用分析 cookie 来了解您如何使用我们的网站，以便我们改进网站。例如，cookie 用于收集有关您访问的页面以及完成任务所需的点击次数的信息。我们还使用一些分析 cookie 来提供个性化广告。',
            linkedCategory: 'analytics',
            cookieTable: {
              headers: {
                name: '名称',
                domain: '服务',
                description: '描述',
                expiration: '到期日期'
              },
              body: [
                {
                  name: '_ga',
                  domain: 'Google Analytics',
                  description: 'Cookie 设置通过 <a href="#das">Google Analytics</a>',
                  expiration: 'Expires after 12 days'
                },
                {
                  name: '_gid',
                  domain: 'Google Analytics',
                  description: 'Cookie 设置通过 <a href="#das">Google Analytics</a>',
                  expiration: 'Session'
                }
              ]
            }
          }, {
            title: '定位的 Cookies',
            description: '这些 cookie 用于使广告信息与您更相关，并且可能由我们或我们的广告合作伙伴通过我们的网站进行设置。它们可能用于建立您的兴趣档案，并在我们的网站或其他网站上向您展示相关广告。它们不直接存储个人信息，而是基于唯一标识您的浏览器和互联网设备的信息。',
            linkedCategory: 'targeting'
          }, {
            title: '更多信息',
            description: '如果对我的 cookie 政策和您的选择有任何疑问，请 <a href="#">联系我们</a>'
          }
        ]
      }
    },
  }

  const euCountries = ['de', 'fr', 'it',]
  const userCountry = document.documentElement.getAttribute('lang')
  const dynamicMode = euCountries.includes(userCountry) ? 'opt-in' : 'opt-out'

  const getColorSchemes = document.documentElement.dataset['bsTheme']
  getColorSchemes === 'dark' ? document.documentElement.classList.add('cc--darkmode') : ''

  CookieConsent.run({
    revision: 20240101,
    mode: dynamicMode,
    disablePageInteraction: false,
    categories: {
      necessary: {
        enabled: true,
        readOnly: true
      },
      performance: {
        enabled: false
      },
      functional: {
        enabled: false
      },
      advertising: {
        enabled: false
      },
      analytics: {
        enabled: false,
        services: {
          _ga: { label: '_ga' },
          _gid: { label: '_gid' },
        }
      },
      targeting: {
        enabled: false
      },
    },
    cookie: {
      name: 'cookies_management',
      domain: window.location.hostname,
      path: '/',
      expiresAfterDays: 182,
      sameSite: 'Lax',
      useLocalStorage: true
    },
    guiOptions: {
      consentModal: {
        layout: 'bar inline',
        position: 'bottom center',
        flipButtons: true,
        equalWeightButtons: false
      },
      preferencesModal: {
        layout: 'box',
        // position: 'left right',
        flipButtons: true,
        equalWeightButtons: false
      }
    },
    language: {
      default: 'zh',
      rtl: [],
      autoDetect: 'document',
      translations: CookieConsentTranslations
    },
    services: {},
    onChange: () => {
      let text = 'Cookie 设置已经更新'
      logConsent(text)
    },
    onFirstConsent: () => {
      let text = '在以后的访问中，如果我们的 Cookie 政策发生新的变化，我们将会再次提示您，您可以随时通过 Cookie 政策页面进行调整。'
      bModal('', createSmallCenterText(text, 'success'), '', '', true)
    },
  })
}

runConsent()

let ResetCookieConsent = document.querySelector('#ResetCookieConsent')
if (ResetCookieConsent) {
  ResetCookieConsent.addEventListener('click', () => {
    let confirmResult = confirm('是否需要恢复 Cookie 选项到默认设置？')
    if (confirmResult) {
      CookieConsent.reset(true)
      runConsent()
      bModal('', createSmallCenterText('已经恢复 Cookie 选项到默认设置', 'success'), '', 'sm', true)
    } else {
      bModal('', createSmallCenterText('取消恢复 Cookie 选项到默认设置', 'success'), '', 'sm', true)
    }
  })
}
