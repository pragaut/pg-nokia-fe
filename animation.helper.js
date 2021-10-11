/**
 * This module will help us write animations
 */

import window from 'global/window';

let _previousY = 0;
let _refs = {};
let _successEvent = {};
let _inactiveClasses = {};
let _heightCriterias = {};


let runEvent = true;

const handleScroll = event => {
    handleScrollForHomePage();
    handleScrollForChildComponents();

    _previousY = window.scrollY;

};


export const bindRefs = (key, refForTop, successEvent, heightCriteria) => {
    if (window && window.addEventListener) {
        // window.addEventListener('scroll', handleScroll, { passive: true });
    }

    _refs[key] = refForTop;

    // console.log('bind it: ', refForTop.current ? refForTop.current.offsetTop : 0)

    _successEvent[key] = successEvent;
    _heightCriterias[key] = heightCriteria;
};


const handleScrollForChildComponents = () => {
    const currentY = window.scrollY;


    const evaluate = key => {

        if (currentY > _previousY) {
            // it means it is a scroll down event
            const refForTop = _refs[key];

            if (refForTop && refForTop.current && refForTop.current.offsetTop) {
                // a valid ref is found
                const whenToRun = currentY > (refForTop.current.offsetTop + (_heightCriterias[key] || 0) - window.innerHeight);
                
                if (whenToRun) {
                    if (_successEvent[key]) {
                        _successEvent[key]();
                        //delete _successEvent[key];
                    }
                }
            }
        }
    }


    Object.keys(_refs).forEach(key => {
        evaluate(key);
    });

    /** scroll animation code goes here */
}

const handleScrollForHomePage = () => {

    const currentY = window.scrollY;

    runEvent = true;


    const scrollToRef = (currentRef, nextRef, previousRef) => {
        const direction = (currentY > _previousY) ? 'down' : 'up';
        const refHeight = (currentRef && currentRef.current) ? currentRef.current.clientHeight : 10;
        const refHeightBy2 = refHeight / 3;
        const refOffsetTop = (currentRef && currentRef.current) ? currentRef.current.offsetTop : 10;
        
        const nextRefOffsetTop = (nextRef && nextRef.current) ? nextRef.current.offsetTop - 70 : 10;


        if (direction === 'down') {
            // down logic
            const currentPointWhereScrollShouldJump = refHeightBy2 + refOffsetTop;
            const currentBottomPoint = refOffsetTop + refHeight;

            if (currentY >= currentPointWhereScrollShouldJump && currentY <= currentBottomPoint) {
                runEvent = false;

                if (refHeight > 10) window.scrollTo(0, nextRefOffsetTop);

                setTimeout(() => {
                    handleScrollForChildComponents();
                }, 100);
            }
            else {
            }
        }
        else {
            // up logic
        }
    }


    if (_totalRefs && _totalRefs.length > 0 && window) {

        for (let refIndex = 0; refIndex < _totalRefs.length; refIndex++) {
            if (!runEvent) break;
            const thisRef = _totalRefs[refIndex];
            let nextRef = undefined;
            let previousRef = undefined;

            if (refIndex > 0) {
                previousRef = _totalRefs[refIndex - 1];
            }

            if (refIndex < _totalRefs.length - 1) {
                nextRef = _totalRefs[refIndex + 1];
            }

            scrollToRef(thisRef, nextRef, previousRef);
        }
    }

    runEvent = true;

};



export const deconstruct = (key) => {
    if (window && window.removeEventListener)
        window.removeEventListener('scroll', handleScroll)
};



/**
 * 
 * for scrolling animation
 * 
 */

let _totalRefs = [];

let lastScrollTime = undefined;


const bindWindowEventListener = () => {
    // if (window && window.addEventListener) {
    //     window.addEventListener('scroll', () => {
    //         runEvent = false;

    //         // let's not run first time, noone can scroll just only 1 time anyway
    //         setTimeout(() => {
    //             if (lastScrollTime) {
    //                 const thisScrollTime = new Date();
    //                 const differenceInTime = (thisScrollTime - lastScrollTime);

    //                 if (differenceInTime >= 200) {
    //                     console.log('doro1', thisScrollTime.toTimeString() + '.' + thisScrollTime.getMilliseconds(), window.scrollY);
    //                     handleScroll();
    //                 }
    //             }
    
    //         }, 200);
    //         lastScrollTime = new Date();

    //     }, { passive: true });
    // }

}


export const bindRefsForScrollAnimation = refs => {
    bindWindowEventListener();
    _totalRefs = refs;
}