import { h } from 'preact'
import style from './styles/Logo.styl'

export default props => (
  <svg {...props} className={ `${style.logo} ${props.className || ''}` } xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
    <rect x='15' y='15' fill='#fed766' width='370' height='370' rx='40' />
    <path fill='#232322' d='M198.4 82.4c-67.8 5-113.8 68.6-100 138.6 14.6 73.6 93.9 110.3 163.4 75.5 11-5.5 14.2-8.6 14.3-13.4 0-7.7-7.3-11.5-14.8-7.6a134.3 134.3 0 0 1-22.5 10.4c-56.1 18.6-111-13.3-120.8-70.3-10.8-63 29.2-114.5 89-114.5a97 97 0 0 1 52.6 14.6c9 5 16 2.4 16.3-5.9.3-5.5-3.3-9-15.3-15-19.8-9.8-40.5-14-62.2-12.4'/>
  </svg>
)