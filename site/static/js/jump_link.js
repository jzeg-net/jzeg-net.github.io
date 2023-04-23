(() => {
    let targetLink = new URLSearchParams(window.location.search).get("target")
    let linkText = document.querySelector("#link_text")
    let toExternal = document.querySelector("#to_external")

    if (!targetLink) return

    let result = decodeURIComponent(targetLink)

    linkText.innerText = result
    toExternal.href = result
})()
