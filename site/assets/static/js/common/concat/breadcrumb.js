const breadcrumb_container = document.querySelector('ol.breadcrumb')
const breadcrumb_titles = []
const breadcrumb_itemList = breadcrumb_container.querySelectorAll('li.breadcrumb-item')
breadcrumb_itemList.forEach((item, index) => {
  breadcrumb_titles[index] = item.querySelector('a')?.innerText
})
const current_title = breadcrumb_titles[breadcrumb_titles.length - 1]
const parent_title = breadcrumb_titles[breadcrumb_titles.length - 2]
