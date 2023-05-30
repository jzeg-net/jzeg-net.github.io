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

let sidebarIndent = document.querySelector('#sidebar-indent')
if (sidebarIndent) {
    sidebarIndent.addEventListener('click', () => {
        if (sidebarIndent.classList.contains('active')) {
            sidebarIndent.firstElementChild.classList.toggle('d-none')
            sidebarIndent.lastElementChild.classList.toggle('d-none')
        } else {
            sidebarIndent.firstElementChild.classList.toggle('d-none')
            sidebarIndent.lastElementChild.classList.toggle('d-none')
        }
    })
}
