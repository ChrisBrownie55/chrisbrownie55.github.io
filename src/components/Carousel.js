import React, { Component } from 'react'
import Flickity from 'flickity'
import style from './styles/Carousel.styl'
import '../../node_modules/flickity/dist/flickity.min.css'

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.carousel = undefined
    this.carouselRef = React.createRef()
    this.imageList = undefined
  }

  componentDidMount() {
    const options = Object.assign({
        prevNextButtons: true,
        pageDots: false,
        autoPlay: 5000,
        parallax: null
      }, this.props.options || {}
    )
    
    setTimeout(() => {
      this.carousel = new Flickity(this.carouselRef.current, options)
      if (options.parallax) {
        this.imageList = document.querySelectorAll(options.parallax)
        this.carousel.on('scroll', () => {
        })
      }
    }, 10)
  }

  render() {
    const className = this.props.className ? ` ${this.props.className}` : ''
    const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children]
    return (
      <div ref={ this.carouselRef } className={ `main-carousel${className}` }>
        {
          children.map((el, i) => 
            <div key={i} className='carousel-cell'>{ el }</div>)
        }
      </div>
    )
  }
}

export default Carousel