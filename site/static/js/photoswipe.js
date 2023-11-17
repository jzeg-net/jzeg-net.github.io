import PhotoSwipeLightbox from '/static/vendor/photoswipe/dist/photoswipe-lightbox.esm.min.js'

const lightbox = new PhotoSwipeLightbox({
  gallery: '.gallery',
  children: '.img-thumbnail',
  bgOpacity: 0.8,
  preloadFirstSlide: false,
  loop: true,
  spacing: 0.5, // 50% of viewport width
  pswpModule: () => import('/static/vendor/photoswipe/dist/photoswipe.esm.min.js')
})

lightbox.init()
