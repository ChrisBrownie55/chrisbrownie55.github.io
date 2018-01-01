
function smoothScrollTo( element ) {
  element.scrollIntoView( { behavior: 'smooth', block: 'start' } )
}

document.addEventListener( 'DOMContentLoaded', () => {
  
  learnmore.addEventListener( 'click', () => {
    smoothScrollTo( expertise )
  })
  
  availableForHireBanner.addEventListener( 'click', () => {
    if ( getComputedStyle( availableForHireBanner ).backgroundColor === "rgba(255, 182, 131, 0.9)" )
      smoothScrollTo( hireForm )
  })
  
})