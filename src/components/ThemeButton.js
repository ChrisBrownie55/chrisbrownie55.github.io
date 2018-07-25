import style from './styles/ThemeButton.styl'

import { h } from 'preact'

export default props =>
  <button {...props} className={ `${style['theme-button']} ${props.className}` } />