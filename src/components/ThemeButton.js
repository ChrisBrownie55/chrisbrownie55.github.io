import style from './styles/ThemeButton.styl'

import React from 'react'

export default props => <button {...props} className={ `${style['theme-button']} ${props.className}` } />