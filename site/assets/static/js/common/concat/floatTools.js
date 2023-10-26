// 浮动工具栏
let floatTools = document.querySelector('#float-tools')
if (floatTools) {
  let collapseToRight = document.querySelector('#collapse-to-right')
  collapseToRight.addEventListener('click', function () {
    floatTools.classList.add('hide')
    getToolsCollapse().classList.remove('show')
  })
}

function getToolsCollapse (getEl = true) {
  let toolsCollapse = document.querySelector('#tools-collapse')

  return getEl
    ? toolsCollapse
    : bootstrap.Collapse.getOrCreateInstance(toolsCollapse)
}
