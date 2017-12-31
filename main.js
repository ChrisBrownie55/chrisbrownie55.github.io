
document.addEventListener( 'load', () => {
  function smoothScrollTo( element ) {
    element.scrollIntoView( { behavior: 'smooth' } )
  }
  
  learnmore.addEventListener( 'click', () => {
    smoothScrollTo( expertise )
  })
})