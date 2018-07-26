import { h } from 'preact'
import style from './styles/BgImg.styl'

export default props => {
    const src = props.src || ''
    const background = {
        backgroundImage: `url(${src})`
    }
    return <div className={ style.bgImg } style={ background } {...props}></div>
}