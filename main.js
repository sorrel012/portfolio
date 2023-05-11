'use strict';

//Make header transparent when it is on the top
const header = document.querySelector('#header');
const headerHeight = header.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if(window.scrollY > headerHeight) {
        header.classList.add('header--dark');
    } else {
        header.classList.remove('header--dark');
    }
});


//Handle scrolling when tapping on the header menu
const headerMenu = document.querySelector('.header__menu');

headerMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if(link == null) {
        return;
    }

    const scrollTo = document.querySelector(link);
    console.log(document.querySelector(link));
    scrollTo.scrollIntoView();
});

//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

