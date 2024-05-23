// get dom of logo-l
const logoLarge = document.getElementById('logo-l');
// get dom of logo-s
const logoSmall = document.getElementById('logo-s');


// get scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // console.log(scrollPosition);

    // position marked as smallest logo
    const thresholdL = 12 * 14;
    // position for logo start opacity change
    const thresholdS = 167;

    let newWidth = Math.max(6, 30 - scrollPosition / 8);

    // scrollPosition: 167->190
    // logoLargeOpacity: 1->0
    // logoSmallOpacity: 0->1
    let logoLargeOpacity = 1 - 0.0435 * (scrollPosition - 167);
    let logoSmallOpacity = 0.0435 * (scrollPosition - 167);

    if (scrollPosition <= thresholdL) {
        // large logo:
        // width from 30rem -> 6rem 
        logoLarge.firstElementChild.style.width = newWidth + 'rem';
    }
    if (scrollPosition >= thresholdS) {
        // large logo:
        logoLarge.firstElementChild.style.opacity = logoLargeOpacity;
        // small logo:
        logoSmall.firstElementChild.style.opacity = logoSmallOpacity;
    } else {
        logoLarge.firstElementChild.style.opacity = 1;
        logoSmall.firstElementChild.style.opacity = 0;
    }
})
