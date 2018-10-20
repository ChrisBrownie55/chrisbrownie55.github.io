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

const setValue = key => value => obj => obj[key] = value

function flipAllCards() {
  const flipCards = Array.from(document.querySelectorAll('flip-card'))
  const setFlipped = setValue('flipped')

  if (flipCards.some(flipCard => flipCard.flipped)) {
    flipCards.forEach(setFlipped(false))
  } else {
    flipCards.forEach(setFlipped(true))
  }
}
