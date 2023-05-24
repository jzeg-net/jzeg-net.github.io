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
