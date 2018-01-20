/*
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  if (mX1 !== mY1 || mX2 !== mY2) {
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    if (mX1 === mY1 && mX2 === mY2) {
      return x; // linear
    }
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/*
 * https://github.com/ChrisBrownie55/animatescroll.js
 * animatescroll.js - use bezier curve to animate scrolling
 * requires bezier-easing.js from https://github.com/gre/bezier-easing
 * by Christopher Brown 2018 – MIT License
 */


// MAKE A PULL REQUEST FOR MORE EASING FUNCTIONS
const easingFunctions = {
  linear: [ 0, 0, 1, 1 ],
  ease: [ .25, .1, .25, 1 ],
  easeIn: [ .42, 0, 1, 1 ],
  easeOut: [ 0,0,.58,1 ],
  easeInOut: [ .42, 0, .58, 1 ],
  easeInExpo: [ 0.95, 0.05, 0.795, 0.035 ],
  easeOutExpo: [ 0.19, 1, 0.22, 1 ],
  easeInOutExpo: [ .99,.08,.14,.97 ]
}

class ValueError extends Error {
  constructor( ...params ) {
    super( ...params )
    
    this.name = 'ValueError'
    
    if ( Error.captureStackTrace )
      Error.captureStackTrace( this, ValueError )
  }
}

function preventEvent( event ) {
  event.preventDefault()
  event.returnValue = false
  return false
}

window.disableScroll = function() {
  window.addEventListener( 'scroll', preventEvent )
  window.addEventListener( 'wheel', preventEvent )
  window.addEventListener( 'touchmove', preventEvent )
}

window.enableScroll = function() {
  window.removeEventListener( 'scroll', preventEvent )
  window.removeEventListener( 'wheel', preventEvent )
  window.removeEventListener( 'touchmove', preventEvent )
}

window.smoothScrollTo = function( x=0, y=0, easing=easingFunctions.linear, duration=250 ) {
  /* x: type:Number
   * y: type:Number
   * easing: type:String or type:Array( Float ) length:4
   * block: type:String
   */
  
  // Check x
  if ( typeof x !== 'number' )
    throw TypeError( `x is of type: ${ typeof x }; it should be of type: number` )
  if ( x > document.body.clientWidth )
    // x is past full width
    x = document.body.clientWidth - window.innerWidth
  else if ( x + window.innerWidth > document.body.clientWidth  )
    // x is less than a screens length away from the end of the document
    x -= ( window.innerWidth - ( document.body.clientWidth - x ) )
  
  // Check y
  if ( typeof y !== 'number' )
    throw TypeError( `y is of type: ${ typeof y }; it should be of type: number` )
  if (y > document.body.clientHeight )
    // y is past full height
    y = document.body.clientHeight - window.innerHeight
  else if ( y + window.innerHeight > document.body.clientHeight )
    // y is less than a screens length away from the end of the document
    y -= ( window.innerHeight - ( document.body.clientHeight - y ) )
  
  // Check easing
  if ( typeof easing !== 'string' && !( easing instanceof Array ) )
    throw TypeError( `easing is of type: ${ typeof easing }; it should be of type: string or array` )
  if ( typeof easing === 'string' ) {
    /* get easing function corresponding to string */
    let easingFunction = easingFunctions[ easing ]
    if ( easingFunction === undefined )
      throw new ValueError( `${ easing } is not an easing function` )
    easing = easingFunction
  } else if ( easing.length !== 4 ) {
    throw new ValueError( `easing requires 4 values not ${ easing.length }`)
  }
  
  // Check duration
  if ( typeof duration !== 'number' )
    throw TypeError( `duration is of type: ${ typeof duration}; it should be of type: number` )
  
  // Stop user from scrolling
  window.disableScroll()
  
  // Run animation loop every 1/60 of a second
  const startTime = new Date()
  const easingFunc = bezier( ...easing ),
        startX = window.scrollX,
        startY = window.scrollY,
        loop = setInterval( () => {
          let elapsed = new Date() - startTime
          
          if ( elapsed >= duration ) {
            window.scrollTo( x, y )
            clearInterval( loop )
            window.enableScroll()
            return
          }
          
          const timePercentage = elapsed / duration,
                scrollPercentage = easingFunc( timePercentage )
          
          window.scrollTo(
            startX + ( ( x - startX ) * scrollPercentage ),
            startY + ( ( y - startY ) * scrollPercentage )
          )
        }, ( 1 / 60 ) * 1000 )
}

Object.defineProperty( HTMLElement.prototype, 'smoothScrollIntoView', {
  value: function ( easing, duration, block = 'center' ) {
    /* easing: type:String or type:Array( Float ) length:4
     * duration: type:Number; duration is in milliseconds
     * block: type:String
     */
    
    // Check block
    if ( typeof block !== 'string' )
      throw TypeError( `block is of type: ${ typeof block }; it should be of type: string` )
    
    let rect = this.getBoundingClientRect(),
        y,
        x
    if ( block === 'start' ) {
      y = window.scrollY + rect.y
      x = window.scrollX + rect.x
    } else if ( block === 'center' ) {
      y = window.scrollY + rect.y - ( rect.height / 2 )
      x = window.scrollX + rect.x - ( rect.width / 2 )
    } else if ( block === 'end' ) {
      y = window.scrollY + rect.y - rect.height
      x = window.scrollX + rect.x - rect.width
    } else {
      throw new ValueError( `block is: '${ block }'; it should be one of the following values: 'center', 'start', or 'end'` )
    }
    window.smoothScrollTo( x, y, easing, duration )
  },
  enumerable: false
})



/*
 * https://github.com/ChrisBrownie55/chrisbrownie55.github.io
 * My personal website
 * by Christopher Brown 2018 – MIT License
 */

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