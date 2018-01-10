const checkForInput = event => event.target.value === '' ?
        event.target.classList.remove( 'notempty' ) :
        event.target.classList.add( 'notempty' )

document.addEventListener( 'DOMContentLoaded', () => {
  
  learnmore.addEventListener( 'click', () => {
    expertise.smoothScrollIntoView( 'easeInOutExpo', 1500, 'start' )
  })
  
  hireButton.addEventListener( 'click', () => {
    hireForm.smoothScrollIntoView( 'easeInOutExpo', 1500, 'start' )
  })

  hireForm.addEventListener( 'keydown', event => {
  if ( event.key === 'Escape' )
    event.target.blur()
  })
  
  Array.from( document.querySelectorAll( '.float-input > input, .float-input > textarea' ) )
    .forEach( el => el.addEventListener( 'input', checkForInput ) | checkForInput( { target: el } ) )
  
  Array.from( phrases.children ).forEach( el => {
    el.getAttribute( 'value' ).split( '' ).forEach( letter => {
      const child = document.createElement( 'span' )
      child.innerText = letter
      el.appendChild( child )
    })
  })

  animatePhrases()
})

function animatePhrases() {
  const phraseList = phrases.children

  let phraseListIndex = phraseLetterIndex = 0,
      phraseLetterList = phraseList[ phraseListIndex ].children

  function clearPhrase( ) {
    // Select Phrase
    phraseList[ phraseListIndex ].classList.remove( 'blink' )
    phraseList[ phraseListIndex ].classList.add( 'selected' )
    phraseList[ phraseListIndex ].classList.add( 'hide-cursor' )
    setTimeout( () => {
      // Clear Phrase and input Next one
      Array.from( phraseLetterList ).forEach( letter => letter.classList.remove( 'on' ) )
      phraseLetterIndex = 0
      phraseList[ phraseListIndex ].classList = ''
      if ( ++phraseListIndex >= phraseList.length )
        phraseListIndex = 0
      phraseList[ phraseListIndex ].classList.add( 'active' )
      phraseLetterList = phraseList[ phraseListIndex ].children
      setTimeout( animatePhrase, 80 )
    }, 200 )
  }

  function animatePhrase() {

    // Animate Here
    phraseLetterList[ phraseLetterIndex ].classList.add( 'on' )

    // Next Letter / Phrase
    if ( ++phraseLetterIndex >= phraseLetterList.length ) {
        phraseList[ phraseListIndex ].classList.add( 'blink' )
        setTimeout( clearPhrase, 2000 )
    } else {
      setTimeout( animatePhrase, 65 )
    }
  }

  animatePhrase()
}