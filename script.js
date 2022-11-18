"use strict";

const allSection = document.querySelectorAll('.section');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const navHeight = nav.getBoundingClientRect().height;

//  Observer call back function
const obsCallback = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else
        nav.classList.remove('sticky')
}

//  Observer options object
const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
}

const headerObserver = new IntersectionObserver(obsCallback, obsOptions);

headerObserver.observe(header);

// reveal of sections
const revealSection = function(entries, observer) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

allSection.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add(`section--hidden`);
})