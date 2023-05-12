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

    headerMenu.classList.remove('close');

    const scrollTo = document.querySelector(link);
    console.log(document.querySelector(link));
    scrollTo.scrollIntoView();
});


//Header toggle button for small screen
const headerToggleBtn = document.querySelector('.header__toggle-btn');
headerToggleBtn.addEventListener('click', ()=> {
    headerMenu.classList.toggle('close');
});


//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});


//Show arrow-up button when scrolling down
const arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
});

//Handle click on the arrow-up button
arrowUp.addEventListener('click', () => {
    const scrollTo = document.querySelector('#home');
    console.log(document.querySelector('#home'));
    scrollTo.scrollIntoView();
});
