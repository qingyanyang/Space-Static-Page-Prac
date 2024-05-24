/********************************************************************
 * Logo effect
 * 
 *********************************************************************/
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

/********************************************************************
 * Menu bar effect
 * 
 *********************************************************************/

// get dom of menu bar
// click add class active or remove it
const menuBar = document.getElementById('menu-bar');
const crossBtn = document.getElementById('menu-cross');
const menuContent = document.querySelector('.menu-content');
menuBar.addEventListener('click', () => {
    menuContent.style.transform = 'translateX(0)';
});
crossBtn.addEventListener('click', () => {
    menuContent.style.transform = 'translateX(-100vw)';
});


/********************************************************************
 * Slider effect
 * 
 *********************************************************************/

// global var
let pointer = 2;

/**
 * Big screen:
 */
// get dom of arrow-left
const arrowLeft = document.getElementById('arrow-left');
// get dom of arrow-right
const arrowRight = document.getElementById('arrow-right');
// .slider-list li {
//     right: 41vw;
// }
// get dom of slider-list
const sliderList = document.querySelector('.slider .slider-list');

// initialization vars
const numLi = sliderList.children.length;
const initialRight = 41;
const moveRight = 61;

arrowLeft.addEventListener('click', () => {
    handleClickLeft(sliderList, numLi, initialRight, moveRight);
});

arrowRight.addEventListener('click', () => {
    handleClickRight(sliderList, numLi, initialRight, moveRight);
});

/**
 * Small screen:
 */
// get dom of slider-list
const sliderListMobile = document.querySelector('.slider-mobile .slider-list');
const indicatorList = document.querySelector('.indicators').children;

// initialization vars
const numLiMobile = sliderListMobile.children.length;
const initialRightMobile = 0;
const moveRightMobile = 80;
// global vars
let touchStartX = 0;
let touchEndX = 0;

sliderListMobile.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, false);

sliderListMobile.addEventListener('touchmove', (e) => {
    if (!touchStartX) return;
    touchEndX = e.touches[0].clientX;
    const diffX = touchEndX - touchStartX;
    if (diffX > 0) {
        // to right 
        handleClickRight(sliderListMobile, numLiMobile, initialRightMobile, moveRightMobile);
    } else {
        // to left
        handleClickLeft(sliderListMobile, numLiMobile, initialRightMobile, moveRightMobile);
    }
    switchIndicator();
}, false);
// alg:
// pointer = 2;
// li's numLi = li.length;
// click arrowLeft -> sliderList.li.style.right+=61; pointer++;
// click arrowRight -> sliderList.li.style.right-=61; pointer--;

// if pointer === numLi-1: 
// click arrowLeft -> sliderList.li.style.right = 61;
// if pointer === 2;
// click arrowLeft ->sliderList.li.style.right = 61*numLi;

// commonly used functions for left move and right move
const handleClickLeft = (sliderList, numLi, initialRight, moveRight) => {
    if (pointer === numLi - 1) {
        Array.from(sliderList.children).forEach(li => {
            li.style.right = initialRight + 'vw';
        });
        pointer = 2;
    } else {
        Array.from(sliderList.children).forEach(li => {
            li.style.right = initialRight + moveRight * (pointer - 1) + 'vw';
        });
        pointer++;
    }
}

const handleClickRight = (sliderList, numLi, initialRight, moveRight) => {
    if (pointer === 2) {
        pointer = numLi - 1;
        Array.from(sliderList.children).forEach(li => {
            li.style.right = initialRight + moveRight * (pointer - 2) + 'vw';
        });
    } else {
        pointer--;
        Array.from(sliderList.children).forEach(li => {
            li.style.right = initialRight + moveRight * (pointer - 2) + 'vw';
        });
    }
}

// indicator switch
// alg: show solid circle for index of pointer-2
// empty all; set indexed circle on

const switchIndicator = () => {
    Array.from(indicatorList).forEach(li => {
        li.firstElementChild.style.backgroundColor = "white";
    });
    indicatorList[pointer - 2].firstElementChild.style.backgroundColor = "black";
}
