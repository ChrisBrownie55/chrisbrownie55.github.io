import { h } from 'preact'
import style from './styles/Menu.styl'

export default props => {
  const { links } = props

  return (
    <nav>
      <input type='checkbox' id='menu-checkbox' style={{ visibility: 'hidden' }} />
      <label className={ style.hamburger } style={{ visibility: 'hidden' }} htmlFor='menu-checkbox'>
        <svg className={ style['menu-icon'] } xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path className={ style.bar } d='M4,8h12c1,0,2,0,2,-2s-1,-2,-2,-2h-12c-1,0,-2,0,-2,2s1,2,2,2z' />
          <path className={ style.bar } d='M0,10h4c-1,0,-2,0,-2,2s1,2,2,2h16c1,0,2,0,2,-2s-1,-2,-2,-2z' />        
          <path className={ style.bar } d='M4,20h12c1,0,2,0,2,-2s-1,-2,-2,-2h-12c-1,0,-2,0,-2,2s1,2,2,2z' />
        </svg>
      </label>
      <section className={ style.links } style={{ visibility: 'hidden' }}>
        { links.map((link, i) => 
          <a key={i} href={link.href || ''} onClick={link.onClick || null}>
            {link.title}
          </a>
        )}
      </section>
    </nav>
  )
}