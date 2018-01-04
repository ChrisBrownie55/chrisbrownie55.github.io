
document.addEventListener( 'DOMContentLoaded', () => {
  
  learnmore.addEventListener( 'click', () => {
    expertise.smoothScrollIntoView( 'easeInOutExpo', 1500, 'start' )
  })
  
  availableForHireBanner.addEventListener( 'click', () => {
    if ( getComputedStyle( availableForHireBanner ).backgroundColor === "rgba(255, 182, 131, 0.9)" )
      hireForm.smoothScrollIntoView( 'easeInOutExpo', 1500, 'start' )
  })
  
  Array.from( document.querySelectorAll( '.float-input > input, .float-input > textarea' ) )
    .forEach( el => el.addEventListener( 'input',
      event => event.target.value === '' ?
        event.target.classList.remove( 'notempty' ) :
        event.target.classList.add( 'notempty' ) ) )
  
})

document.addEventListener( 'keydown', event => {
  if ( event.key === 'Escape' )
    event.target.blur()
})