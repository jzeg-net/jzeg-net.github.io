const init = function () {
    let sections = document.querySelector(".fullPage").querySelectorAll("section")
    let slides = document.querySelector(".fullPage").querySelectorAll(".slidesContainer > .slide")

    for (let i = 0; i < sections.length; i++) {
        sections[i].style.color = "#fff"
        sections[i].style.background = randomColor(
            {
                luminosity: "random",
                hue: "random"
            }
        )
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.background = randomColor(
            {
                luminosity: "random",
                hue: "random"
            }
        )
    }
}
init()
