// 浮动工具栏
let floatTools = document.querySelector('#float-tools')
if (floatTools) {
  let collapseToRight = document.querySelector('#collapse-to-right')
  collapseToRight.addEventListener('click', function () {
    floatTools.classList.remove('show')
    getToolsCollapse().classList.remove('show')
  })

  floatTools.querySelector('div').childNodes.forEach(child => {
    if (child.tagName === 'BUTTON' || child.tagName === 'A') {
      new bootstrap.Tooltip(child, {
        placement: 'left',
        trigger: 'hover'
      })
    }
  })
}

function getToolsCollapse (getEl = true) {
  let toolsCollapse = document.querySelector('#tools-collapse')

  return getEl
    ? toolsCollapse
    : bootstrap.Collapse.getOrCreateInstance(toolsCollapse)
}
