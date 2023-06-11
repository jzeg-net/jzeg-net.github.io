let tableOfContentsPin = document.querySelector('#tableOfContents-pin')
if (tableOfContentsPin) {
    tableOfContentsPin.addEventListener('click', () => {
        if (tableOfContentsPin.classList.contains('active')) {
            tableOfContentsPin.firstElementChild.classList.toggle('d-none')
            tableOfContentsPin.lastElementChild.classList.toggle('d-none')
        } else {
            tableOfContentsPin.firstElementChild.classList.toggle('d-none')
            tableOfContentsPin.lastElementChild.classList.toggle('d-none')
        }
    })
}

let sidebarCollapse = document.querySelector('#sidebar-collapse')
if (sidebarCollapse) {
    sidebarCollapse.addEventListener('click', () => {
        if (sidebarCollapse.classList.contains('active')) {
            sidebarCollapse.firstElementChild.classList.toggle('d-none')
            sidebarCollapse.lastElementChild.classList.toggle('d-none')
        } else {
            sidebarCollapse.firstElementChild.classList.toggle('d-none')
            sidebarCollapse.lastElementChild.classList.toggle('d-none')
        }
    })
}

lazyLoad('.lazyImg')

let postContentMore = document.querySelector('#post-content-more')
if (postContentMore) {
    postContentMore.addEventListener('click', (event) => {
        if ('DIV' === event.target.tagName) return

        let postContent = document.querySelector('#post-content')
        postContent.classList.toggle('article_shrink')

        postContentMore.classList.toggle('shrink-post-content')
        postContentMore.classList.toggle('sticky-bottom')

        postContentMore.childNodes.forEach(currentChildEl => {
            if ('BUTTON' === currentChildEl.tagName) {
                currentChildEl.classList.toggle('d-none')

                if (!currentChildEl.classList.contains('d-none')) {
                    setTimeout(function () {
                        // currentChildEl.focus({ preventScroll: false })
                        currentChildEl.scrollIntoView(false)
                    }, 400)
                }

            }
        })
    })
}
