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

const scroll = require('smoothscroll')

const MenuSection = () => {
  const Link = title => { return {href: `#${style[`${title.split(' ').join('').toLowerCase()}`]}`, title} }
  const Links = (...titles) => titles.map(title => Link(title))
  return <Menu links={Links('About', 'Expertise', 'My Work', 'Hire', 'Contact')}/>
}

const HeaderSection = () => (
  <header>
    <Logo className={ style.logo } />
    <h1 className={ style.title }>
      Hi, my name is Christopher Brown.
      <br />
      I engineer websites.
    </h1>
    <ThemeButton className={ style['theme-button'] } onClick={ scroll }>
      Yes, I'm available for hire
    </ThemeButton>
    <p tabIndex='0' className={ style['learn-more'] } onClick={ scroll }>
      Learn More About What I Do
      <br />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
        <path d="M420.75 202l-185.5 185.25c-6.25 6.25-16.25 6.25-22.5 0l-185.5-185.25c-6.25-6.25-6.25-16.5 0-22.75l41.5-41.25c6.25-6.25 16.25-6.25 22.5 0l132.75 132.75 132.75-132.75c6.25-6.25 16.25-6.25 22.5 0l41.5 41.25c6.25 6.25 6.25 16.5 0 22.75z"></path>
      </svg>
    </p>
  </header>
)

const AboutSection = () => (
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
)

const ExpertiseSection = () => {
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
    <section id={ style.expertise }>
      <h1 className={ style.title }>
        Expertise
      </h1>
      <h1 className={ style.subtitle }>
        What am I skilled at?
      </h1>
      <article className={ style.skills }>
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
  )
}

const ChallengeSection = () => (
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
)

const WorkSection = () => (
  <section id={ style.mywork }>
    <h1 className={ style.title }>
      My Work
    </h1>
    <Carousel bullets className={ style.slides } options={{
      prevNextButtons: true,
      pageDots: true,
      autoPlay: 5000,
      wrapAround: true,
      arrowShape: 'M 50 0A 1 1 0 0 1 50 100A 1 1 0 0 1 50 0ZM51.13,23.39C53.30,25.55,53.30,29.05,51.14,31.22C48.50,33.87,44.47,37.89,41.83,40.54C40.38,41.99,41.41,44.46,43.45,44.46C51.43,44.46,69.81,44.46,77.79,44.46C80.85,44.46,83.33,46.94,83.33,50.00C83.33,51.11,83.33,48.89,83.33,50.00C83.33,53.06,80.85,55.54,77.79,55.54C69.81,55.54,51.43,55.54,43.46,55.54C41.41,55.54,40.39,58.02,41.83,59.46C44.48,62.11,48.50,66.12,51.15,68.77C53.31,70.93,53.31,74.44,51.14,76.59C50.34,77.39,51.88,75.86,51.08,76.65C48.91,78.81,45.40,78.80,43.24,76.63C37.92,71.31,25.90,59.25,20.58,53.92C18.42,51.75,18.42,48.25,20.58,46.08C25.90,40.75,37.92,28.69,43.24,23.36C45.40,21.19,48.91,21.19,51.08,23.34C51.88,24.13,50.33,22.60,51.13,23.39Z'
    }}>
      <article className={ style.slide }>
        <img src='https://i.imgur.com/8lEJtbg.jpg' />
        <img src='https://i.imgur.com/8lEJtbg.jpg' />
        <img src='https://i.imgur.com/8lEJtbg.jpg' />
      </article>
        <article className={ style.slide }>
        <img src='https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/indian-peafowl-closeup.ngsversion.1396531041348.jpg' />
        <img src='https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/indian-peafowl-closeup.ngsversion.1396531041348.jpg' />
        <img src='https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/indian-peafowl-closeup.ngsversion.1396531041348.jpg' />
      </article>
      <article className={ style.slide }>
        <img src='https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/a-female-african-elephant-loxodonta-joel-sartore.jpg' />
        <img src='https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/a-female-african-elephant-loxodonta-joel-sartore.jpg' />
        <img src='https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/a-female-african-elephant-loxodonta-joel-sartore.jpg' />
      </article> 
    </Carousel>
  </section>
)

const HireSection = () => (
  <section id={ style.hire }>
  </section>
)

import facebook from '../../assets/contact/facebook.svg'
import github from '../../assets/contact/github.svg'
import email from '../../assets/contact/email.svg'
import codepen from '../../assets/contact/codepen.svg'
import linkedin from '../../assets/contact/linkedin.svg'
import twitter from '../../assets/contact/twitter.svg'

const ContactSection = () => (
  <section id={ style.contact }>
    <h1 className={ style.title }>Get in contact or see what I'm up to</h1>
    <div>
      {
        [
          [facebook, 'Facebook', 'https://www.facebook.com/chbchb55'],
          [github, 'Github', 'https://github.com/ChrisBrownie55'],
          [email, 'Email', 'mailto:chbphone55@gmail.com'],
          [codepen, 'Codepen', 'https://codpen.io/chbchb55'],
          [linkedin, 'LinkedIn', 'https://www.linkedin.com/in/chrisbrownie55'],
          [twitter, 'Twitter', 'https://twitter.com/ChrisHBrown55']
        ].map((data, index) =>
          <a href={ data[2] } key={ index }>
            <img src={ data[0] } alt={ data[1] } />
          </a>
        )
      }
    </div>
  </section>
)

const FooterSection = () => {
  const startYear = 2018
  const thisYear = new Date().getFullYear()
  return (
    <footer>
      <p>© {startYear !== thisYear ? `${startYear}–${thisYear}` : thisYear} Christopher H. Brown</p>
    </footer>
  )
}

export default () => (
  <main>
    <MenuSection />
    <HeaderSection />
    <AboutSection />
    <ExpertiseSection />
    <ChallengeSection />
    <WorkSection />
    <HireSection />
    <ContactSection />
    <FooterSection />
  </main>
)