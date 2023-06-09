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
    
    selectHeadItem(target);

    scrollTo.scrollIntoView({ behavior: 'smooth' });
    
    selectHeadItem(headItems[sectionIds].indexOf(link));
});

//Header toggle button for small screen
const headerToggleBtn = document.querySelector('.header__toggle-btn i');
headerToggleBtn.addEventListener('click', ()=> {
    headerMenu.classList.toggle('close');
});

// Store current location
function saveScrollPosition() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  sessionStorage.setItem('scrollPosition', scrollPosition);
}

// Store current location and redirect another page
function navigateToPage(targetPage) {
  saveScrollPosition();

  if (targetPage === 'kor') {
    location.href = 'english.html';
  } else if (targetPage === 'eng') {
    location.href = 'index.html';
  }
}

// Move to stored location
const headerLanguageBtn = document.querySelector('.header__language');
headerLanguageBtn.addEventListener('click', () => {
  const name = headerLanguageBtn.name;

  navigateToPage(name);
});

const headerLanguageMobileBtn = document.querySelector('.header__toggle-btn img')
headerLanguageMobileBtn.addEventListener('click', () => {
  const name = headerLanguageMobileBtn.name;

  navigateToPage(name);
});

function scrollToSavedPosition() {
  const scrollPosition = sessionStorage.getItem('scrollPosition');

  if (scrollPosition) {
    window.scrollTo(0, scrollPosition);
    sessionStorage.removeItem('scrollPosition');
  }
}

scrollToSavedPosition();


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
    scrollTo.scrollIntoView();    
    selectHeadItem(headItems[sectionIds.indexOf('#home')]);
});


const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const headItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedHeadIndex = 0;
let selectedHeadItem = headItems[0];

function selectHeadItem(selected) {
  selectedHeadItem.classList.remove('active');
  selectedHeadItem = selected;
  selectedHeadItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);      
      if (entry.boundingClientRect.y < 0) {
        selectedHeadIndex = index + 1;
      } else {
        selectedHeadIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
      selectedHeadIndex = 0;
    } else if (
      window.scrollY + window.innerHeight ===
      document.body.clientHeight
    ) {
        selectedHeadIndex = navItems.length - 1;
    }
    selectHeadItem(headItems[selectedHeadIndex]);
  });
  