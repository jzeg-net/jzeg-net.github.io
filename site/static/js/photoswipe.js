import PhotoSwipeLightbox from '/static/vendor/photoswipe/dist/photoswipe-lightbox.esm.min.js'

const lightbox = new PhotoSwipeLightbox({
  gallery:'.gallery',
  children: '.img-thumbnail',
  bgOpacity: 0.8,
  pswpModule:()=>import('/static/vendor/photoswipe/dist/photoswipe.esm.min.js'),
  preloadFirstSlide: false,
  loop: true,
  spacing: 0.5 // 50% of viewport width
});
lightbox.init();
