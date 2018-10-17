document.querySelectorAll('*[scroll-target]')
  .forEach(node =>
    node.addEventListener('click', () =>
      smoothScroll(
        document.querySelector(node.getAttribute('scroll-target'))
      )
    )
  )

document.addEventListener('DOMContentLoaded', () => {
  const image = new Image()
  image.onload = () => {
    const header = document.getElementById('main-header')
    header.style.backgroundImage = `url(${image.src})`
  }
  image.src = 'assets/header-background-min.jpg'
})
