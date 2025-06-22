// 当文档完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
  // 获取所有步进器输入元素
  let steppers = document.querySelectorAll('.stepper-input')

  // 遍历每个步进器
  steppers.forEach(stepInput => {
    // 获取输入框元素
    let input = stepInput.querySelector('input')
    // 获取减少按钮元素
    let decreaseBtn = stepInput.querySelector('.decrease')
    // 获取增加按钮元素
    let increaseBtn = stepInput.querySelector('.increase')

    // 解析并存储输入框元素的默认值、步长、最小值和最大值，用以遵守 HTML5 的规范
    const defaultValue = parseInt(input.getAttribute('value'))
    const step = parseInt(input.getAttribute('step'))
    const min = parseInt(input.getAttribute('min'))
    const max = parseInt(input.getAttribute('max'))

    const event = new Event('input', {
      bubbles: true,
      cancelable: true
    })

    // 监听输入框值的变化
    input.addEventListener('input', () => {
      // 获取当前输入的值
      const currentValue = parseInt(input.value)
      // 如果当前值不是数字，则重置为默认值
      input.value = Number.isNaN(currentValue)
        ? defaultValue
        : Math.max(min, Math.min(max, currentValue))
    })

    // 监听减少按钮的点击事件
    decreaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(input.value)
      const newMin = currentValue - step

      // 如果减少后的值小于最小值，则不更新输入框的值
      if (newMin < min) return

      input.value = newMin
      input.dispatchEvent(event)
    })

    // 监听增加按钮的点击事件
    increaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(input.value)
      const newMax = currentValue + step

      // 如果增加后的值大于最大值，则不更新输入框的值
      if (newMax > max) return

      input.value = newMax
      input.dispatchEvent(event)
    })
  })
})
