import React, { Component } from 'react'
import Flickity from 'flickity'
import style from './styles/Carousel.styl'

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.carousel = undefined
    this.carouselRef = React.createRef()
  }

  componentDidUpdate() {
    this.carousel = new Flickity(this.carouselRef, this.options || {})
  }

  render() {
    return (
      <div ref={ this.carouselRef } className={ this.props.bullets ? style['has-bullets'] : '' }>
        {
          this.props.children.map((el, i) => 
            <li key={i} className=''>{ el }</li>)
        }
      </div>
    )
  }
}

export default Carousel