let header_height = getComputedStyle(document.querySelector('header')).height
header_height = +header_height.substr(0, header_height.length - 2)
let nav
let update_nav_color_scroll
let rgb = 255
let burger = document.querySelector('.burger')

desktop = () => {
	nav.style.backgroundColor = `rgba(${rgb},${rgb},${rgb},0.5)`
}

mobile = () => {
	if (document.querySelector('.burger:checked') !== null) {
		return
	}
	nav.style.color = `rgb(${rgb},${rgb},${rgb})`
}

let current

if (window.innerWidth >= 550) {
	nav = document.querySelector('nav')
	update_nav_color_scroll = desktop
	current = 'desktop'
} else {
	nav = document.querySelector('.burger')
	update_nav_color_scroll = mobile
	current = 'mobile'
}

let nav_height = getComputedStyle(nav).height
nav_height = +nav_height.substr(0, nav_height.length - 2)
header_height -= nav_height
nav_height *= 3

window.addEventListener('scroll', (e) => {
	if (window.pageYOffset < header_height && window.pageYOffset > header_height - nav_height) {
		rgb = 255 - (255 * ((window.pageYOffset - header_height + nav_height) / nav_height)) | 0
			// if ((window.pageYOffset+1) - header_height + nav_height)/nav_height === 1)
		update_nav_color_scroll()
	} else if (rgb > 0 && window.pageYOffset > header_height) {
		rgb = 0
		update_nav_color_scroll()
		if (current === 'desktop') {
			document.querySelector('nav').classList.add('scrolled')
		}
	} else if (rgb < 255 && window.pageYOffset < header_height) {
		rgb = 255
		update_nav_color_scroll()
		if (current === 'desktop') {
			document.querySelector('nav').classList.remove('scrolled')
		}
	}
})

let update_heights = () => {
	setTimeout(() => {
		header_height = getComputedStyle(document.querySelector('header')).height
		header_height = +header_height.substr(0, header_height.length - 2)
		nav_height = getComputedStyle(nav).height
		nav_height = +nav_height.substr(0, nav_height.length - 2)
		header_height -= nav_height
		nav_height *= 3
	},100)
}

window.addEventListener('resize', (e) => {
	if (current === 'mobile' && window.innerWidth >= 550) {
		current = 'desktop'
		update_nav_color_scroll = desktop
		nav = document.querySelector('nav')
		update_nav_color_scroll()
		update_heights()
	} else if (current === 'desktop' && window.innerWidth < 550) {
		current = 'mobile'
		update_nav_color_scroll = mobile
		nav.style.backgroundColor = ''
		nav = burger
		update_heights()
	}
	burger.checked = false
})

burger.addEventListener('click', (e) => {
	if (burger.style.color !== '') {
		burger.style.color = ''
	} else {
		setTimeout(() => {
			update_nav_color_scroll()
		}, 350)
	}
})