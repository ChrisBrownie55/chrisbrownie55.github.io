import { h, Component } from 'preact'
import Flickity from 'flickity'
import style from './styles/Carousel.styl'
import '../../node_modules/flickity/dist/flickity.min.css'

class Carousel extends Component {
  constructor(props) {
    super(props)
  }

  initializeFlickity(ref) {
    const options = Object.assign({
        prevNextButtons: true,
        pageDots: false,
        autoPlay: 5000,
        parallax: null
      }, this.props.options || {}
    )
    
    setTimeout(() => {
      const carousel = new Flickity(ref, options)
    }, 10)
    // imageList = document.querySelectorAll(options.parallax)
    // carousel.on('scroll', () => {
    // })
  }

  render() {
    const className = this.props.className || ''
    const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children]
    return (
      <div ref={ ref => this.initializeFlickity(ref) } className={ `main-carousel ${className}` }>
        {children.map((child, i) => 
          <div key={i} className='carousel-cell'>
            { child }
          </div>
        )}
      </div>
    )
  }
}

export default Carousel