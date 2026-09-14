const backToTop = document.querySelector('.back-to-top')

if (backToTop) {
  const updateBackToTop = () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 400)
  }

  updateBackToTop()
  window.addEventListener('scroll', updateBackToTop, { passive: true })
}
