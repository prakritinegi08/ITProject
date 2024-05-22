// Select the transitioning section
const transitionSection = document.querySelector('.section1');

// Add event listener for scroll
window.addEventListener('scroll', () => {
    // Calculate the distance scrolled from the top
    const scrollDistance = window.scrollY;
    
    // Apply a transform to the transitioning section based on scroll distance
    transitionSection.style.transform = `translateY(-${scrollDistance}px)`;
});
