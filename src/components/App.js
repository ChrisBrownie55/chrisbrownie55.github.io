import style from './styles/App.styl'

import React from 'react'
import Menu from './Menu.js'
import ThemeButton from './ThemeButton.js'
import Logo from './Logo.js'
import Carousel from './Carousel.js'

import seniorPhoto1 from '../../assets/senior1.jpg'
import seniorPhoto2 from '../../assets/senior2.jpg'
import graduationCap from '../../assets/graduation.svg'

import css3 from '../../assets/skills/css3.svg'

function scroll () {}

export default () => {
  const Link = title => { return {href: `#${title.split(' ').join().toLowerCase()}`, title} }
  const Links = (...titles) => titles.map(title => Link(title))

  const Skill = (src, alt, caption) => { return {src, alt, caption} }
  const skills = [
    Skill(css3, 'CSS3', 'I have become very skilled in the use of modern CSS techniques and I have developed an affinity for its usefulness in animation and cross-browser compatibility.'),
    Skill(null, 'JavaScript', ''),
    Skill(null, 'HTML5', ''),
    Skill(null, 'React', ''),
    Skill(null, 'Golang', ''),
    Skill(null, 'Node.js', ''),
    Skill(null, 'Python', ''),
    Skill(null, 'MobX', '')
  ]

  return (
    <main>
      <Menu links={Links('About', 'Expertise', 'My Work', 'Hire', 'Contact')}/>
      <header>
        <Logo />
        <h1 className={ style.title }>
          Hi, my name is Christopher Brown.<br/>
          I engineer websites.
        </h1>
        <ThemeButton onClick={scroll}>
          Yes, I'm available for hire
        </ThemeButton>
      </header>
      <section id={ style.about }>
        <h1 className={ style.title }>
          About Me |
        </h1>
        <article>
          <img src={ seniorPhoto1 } id={ style.senior1 } />
          <p>
            For the past couple years, I have been working as a Web Developer in educational, professional, and hobbyist capacities. Over these years, in order to serve customers better, I have honed my skills as a Front-End Web Developer.
          </p>
        </article>
        <article>
          <img src={ seniorPhoto2 } id={ style.senior2 } />
          <p>
            During my time as a Front-End Web Developer, I have designed and developed many different projects that constitute a variety of skills that are useful to developing websites more efficiently and effectively.
          </p>
        </article>
        <article>
          <img src={ graduationCap } />
          <p>
            I am also a student at Idaho Arts Charter school, I will be graduating from this school on May 29, 2018. After that I plan to work fulltime in the Front-End Web Development field.
          </p>
        </article>
      </section>
      <section id={ style.expertise }>
        <h1 className={ style.title }>
          Expertise
        </h1>
        <h1 className={ style.subtitle }>
          What am I skilled at?
        </h1>
        <article className={ skills }>
          { skills.map((skill, i) => (
              <figure className={ style.skill } key={ i }>
                <input type='checkbox' id={`skill${i}`} />
                <label htmlFor={`skill${i}`} />
                <div className={ style['skill-wrapper'] }>
                  <img src={ skill.src } alt={ skill.alt } className={ style['skill-icon'] } />
                  <figcaption className={ style['skill-caption'] }>
                    { skill.caption }
                  </figcaption>
                </div>
              </figure>
          ))}
        </article>
      </section>
      <section id={ style['challenge-solution'] }>
        <article>
          <h1 className={ style.title }>
            Challenge
          </h1>
          <p>
            Transforming an idea and design into a fully functional, intuitive, and responsive website can be a difficult and time-consuming process.
          </p>
        </article>
        <article>
          <h1 className={ style.title }>
            Solution
          </h1>
          <p>
            The variety of skills I offer in the Web Development ecosphere allow for this transformative process to be efficient and painless, while still producing a high-quality website.
          </p>
        </article>
      </section>
      <section id={ style.mywork }>
        <h1>
          My Work
        </h1>
        <Carousel bullets>
          <article>1</article>
          <article>2</article>
          <article>3</article>
        </Carousel>
      </section>
      <section id={ style.hire }>
      </section>
      <section id={ style.contact }>
      </section>
      <footer>
      </footer>
    </main>
  )
}