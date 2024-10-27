if (!window.tooltipInitialized) {
  // 初始化完成
  window.tooltipInitialized = true;

  // 避免过早的执行，防止页面加载时触发
  window.addEventListener('load', () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    window.addEventListener('beforeunload', () => {
      tooltipList.forEach(tooltip => tooltip.dispose())
    }, { once: true })
  }, { once: true })
}
