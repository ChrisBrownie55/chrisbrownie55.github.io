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

  asyncLoadImage( 'headerBackground.jpg' )
    .then( () => document.querySelector( 'header' ).classList.add( 'hdBackground' ) )
    .catch( err => console.error( err ) )
  

  testNotificationsButton.addEventListener( 'click', () => {
    basicNotification( 'Test', 'Hello World, this is a test notification!', 'iconC.png' )
      .then( event => {
        if ( event.type === 'click' ) {
          alert( 'You clicked the notification.' )
        } else {
          alert( 'You closed the notification.' )
        }
      })
      .catch( err => console.error( err ) )
  })
})

function animatePhrases() {
  const phraseList = phrases.children,
        phraseInfoList = phraseInfo.children

  let phraseListIndex = phraseLetterIndex = 0,
      phraseLetterList = phraseList[ phraseListIndex ].children

  function clearPhrase( ) {
    // Select Phrase
    phraseList[ phraseListIndex ].classList.remove( 'blink' )
    phraseList[ phraseListIndex ].classList.add( 'selected' )
    phraseInfoList[ phraseListIndex ].classList.add( 'selected' )
    phraseList[ phraseListIndex ].classList.add( 'hide-cursor' )
    setTimeout( () => {
      // Clear Phrase and input Next one
      Array.from( phraseLetterList ).forEach( letter => letter.classList.remove( 'on' ) )
      phraseLetterIndex = 0
      phraseList[ phraseListIndex ].classList = ''
      phraseInfoList[ phraseListIndex ].classList = ''
      if ( ++phraseListIndex >= phraseList.length )
        phraseListIndex = 0
      phraseList[ phraseListIndex ].classList.add( 'active' )
      phraseInfoList[ phraseListIndex ].classList.add( 'active' )
      phraseLetterList = phraseList[ phraseListIndex ].children
      setTimeout( animatePhrase, 80 )
    }, 350 )
  }

  function animatePhrase() {
    const { y: phraseY, height: phraseH } = phrases.getBoundingClientRect()
    if ( phraseY + phraseH < 0 || phraseY > window.innerHeight ) {
      setTimeout( animatePhrase, 500 )
      return
    }

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

function asyncLoadImage( url ) {
  return new Promise( ( resolve, reject ) => {
    const newImage = new Image()
    
    newImage.onload = function() {
      resolve( newImage )
    }

    newImage.onerror = newImage.onabort = error => reject( error )
    newImage.src = url
  })
}

function spawnNotification( title, options=null ) {
  
  return new Promise( ( resolve, reject ) => {
    if ( !( 'Notification' in window ) )
      reject( 'Notification does not exist' )
    
    Notification.requestPermission()
      .then( result => {
        if ( result !== 'granted' )
          return

        let notification = new Notification( title, options )
        notification.onclick = notification.onclose = event => resolve( event )
        notification.onerror = notification.onabort = error => reject( error )
      })
      .catch( err => reject( err ) )
  })
}

function basicNotification( title, body, icon ) {
  return spawnNotification( title, { body: body, icon: icon } )
}