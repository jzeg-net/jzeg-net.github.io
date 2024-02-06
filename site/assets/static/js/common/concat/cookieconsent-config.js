/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
let CookieConsentTranslations = {
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
      title: '我们使用cookies',
      description:
        'Cookie 模态描述',
      acceptAllBtn:
        '全都接受',
      acceptNecessaryBtn:
        '全部拒绝',
      showPreferencesBtn:
        '管理个人偏好'
    }
    ,
    preferencesModal: {
      title: '管理 cookie 首选项',
      acceptAllBtn:
        '全都接受',
      acceptNecessaryBtn:
        '全部拒绝',
      savePreferencesBtn:
        '接受当前选择',
      closeIconLabel:
        '关闭模式',
      sections:
        [
          {
            title: '有人说……饼干？',
            description: '我要一个！'
          },
          {
            title: '绝对必要的 cookie',
            description: '这些 cookie 对于网站的正常运行至关重要，无法禁用。',

            //this field will generate a toggle linked to the 'necessary' category
            linkedCategory: 'necessary'
          },
          {
            title: '性能和分析',
            description: '这些 cookie 收集有关您如何使用我们网站的信息。所有数据都是匿名的，无法用于识别您的身份。',
            linkedCategory: 'analytics'
          },
          {
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
  mode: dynamicMode,

  categories: {
    necessary: {
      enabled: true,  // this category is enabled by default
      readOnly: true  // this category cannot be disabled
    },
    analytics: {}
  },

  cookie: {
    name: 'cookies_management',
    domain: window.location.hostname,
    path: '/',
    expiresAfterDays: 182,
    sameSite: 'Lax',
    useLocalStorage: false
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
  }
})
