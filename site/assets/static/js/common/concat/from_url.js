/**
 * 定义一个用于转义 HTML 特殊字符的函数，以防止 XSS 攻击
 *
 * 该函数接收一个字符串，并替换掉其中的特殊字符，以它们的 HTML 实体表示
 *
 * 自定义HTML转义函数
 */
const htmlEscape = unsafe => unsafe
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

/**
 * 验证输入值的函数
 *
 * 根据输入框的类型进行不同的验证
 */
const sanitizeInputValue = (inputType, value) => {
  let validatedValue = ''

  switch (inputType) {
    case 'text':
    case 'textarea':
      validatedValue = value.substring(0, 255) // 限制为255个字符
      break
    case 'hidden':
    case 'range':
    case 'month':
    case 'week':
    case 'datetime':
    case 'time':
    case 'image':
    case 'reset':
    case 'button':
    case 'submit':
    case 'search':
    case 'color':
    case 'datetime-local':
    case 'number':
    case 'email':
    case 'tel':
    case 'url':
    case 'password':
    case 'checkbox':
    case 'radio':
    case 'select':
    case 'date':
      validatedValue = value
      break
    case 'file':
    default:
      break
  }

  return validatedValue
}

/**
 * 根据 URL 参数中的键名，查找是否有对应的可输入表单元素
 *
 * 如果有则设置其值为对应键名的值，并且在全部设置完以后，提示用户自动填写信息的数量。
 *
 * 如果找不到则不设置，并且不做任何提示。
 */
const populateFormFromUrl = () => {
  // 获取查询字符串部分，即 URL 中?后面的内容
  const queryString = window.location.search

  if (!queryString) return

  // 创建一个 URLSearchParams 对象，方便访问查询字符串中的参数
  const urlParams = new URLSearchParams(queryString)

  // 收集页面上所有的输入元素，仅仅只包括 input、textarea 和 select
  const inputElements = document.querySelectorAll('input, textarea, select')
  const inputMap = new Map()
  // 将所有输入元素的 id 和 name 作为键，元素本身作为值存储在 Map 中
  inputElements.forEach(inputElement => {
    if (inputElement.id) inputMap.set(inputElement.id, inputElement)
    if (inputElement.name) inputMap.set(inputElement.name, inputElement)
  })

  // 初始化计数器
  let count = 0

  // 遍历 URL 参数，检查每个参数是否对应页面上的某个输入元素
  urlParams.forEach((value, key) => {
    const inputElement = inputMap.get(key)

    if (inputElement && !inputElement.value.trim()) {
      // 解码并转义
      const sanitizedValue = htmlEscape(decodeURIComponent(value))
      // 排除空值的情况
      if (!sanitizedValue) return

      // 统一赋值
      inputElement.value = sanitizeInputValue(inputElement.type, sanitizedValue)
      count++
    }
  })

  // 在所有设置操作完成后只打印一次成功设置的元素数量
  if (count > 0) {
    const spanCount = `<span class="fs-5 text-danger">${count}</span>`
    const msg = `根据当前网址的参数，已经成功在 ${spanCount} 个输入框中，填入对应内容。`
    bModal('', createSmallCenterText(msg, 'warning'), '', 'sm', true)
  }
}

// 当文档加载完成时，执行 populateFormFromUrl 函数
document.addEventListener('DOMContentLoaded', populateFormFromUrl)
