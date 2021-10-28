import { createGlobalStyle } from 'styled-components';
import { bsBg, bsLight, bsDark, bsGray, bsWhiter } from '../../../theme/colors';
import { secondary } from '../../../theme/fonts';
 import theme from '../../../utils/anandGroupTheme';

/* eslint no-unused-expressions: 0 */
export default createGlobalStyle`
  .Collapsible {
    background-color: ${bsBg}};
  }
  .Collapsible__contentInner {
    padding: 4px 2px;
    ${'' /* border: 1px solid ${bsGray}; */}

    p {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }


  .Collapsible__trigger {
    display: block;
    font-weight: 400;
    font-size: 0.8rem;
    text-decoration: none;
    color: ${bsWhiter};
    position: relative;
    padding: 2px 0 2px 4px;
    background-color: ${bsLight};

    &:after {
      content: url("/graphics/caret-symbol.svg");
      position: absolute;
      right: 4px;
      top: 4px;
      display: block;
      transform-origin: center;
      transition: transform 120ms, top 120ms;
    }

    &.is-open {
      &:after {
        top: 2px;
        transform: rotateZ(-180deg);
      }
    }

    &.is-disabled {
      opacity: 0.5;
      background-color: grey;
    }
  }


  .CustomTriggerCSS {
    background-color: lightcoral;
    transition: background-color 200ms ease;
  }


  .CustomTriggerCSS--open {
    background-color: darkslateblue;
  }

  .Collapsible__custom-sibling {
    padding: 5px;
    font-size: 12px;
    background-color: #CBB700;
    color: black;
  }


  .ProductDetails {
    background-color: ${bsBg};
  }


  .ProductList__ {
    &:hover {
      background: red
    }
  }


  .ProductDetails__contentInner {
    padding: 4px 2px;
    ${'' /* border: 1px solid ${bsGray}; */}

    p {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .ProductDetails__trigger {
    width: 100%;
    display: block;
    position: relative;
    border-bottom: 1px #e8e5e5 solid;
    margin-top: 10px;
    cursor: pointer;
    font-size: 16px;
    padding-bottom: 10px;
    padding-left: 8px;


    &:after {
      content: url("/graphics/caret-symbol.svg");
      position: absolute;
      right: 4px;
      top: 4px;
      display: block;
      transform-origin: center;
      transition: transform 120ms, top 120ms;
    }

    &.is-open {
      &:after {
        top: 2px;
        transform: rotateZ(-180deg);
      }
    }

    &.is-disabled {
      opacity: 0.5;
      background-color: grey;
    }
  }
  a {
    text-decoration: none;
    }
  
    .no-pad {
    padding: 0!important;
    color:#c9ab39;
    display:flex;
    align-items:center;
    margin-left:10px; 
    }
    .font_size{ font-size:1.5em; margin-right:10px;}
    .arrow-close{ font-size:1.5em; margin-right:10px;}

    .mob_loginbtn{ 
      border:1px solid #979797;
      cursor:pointer; 
      font-size:10px; 
      border-radius:2px; 
      padding:0px 10px; 
      font-weight:500;
      line-height:20px;}
  
    html {
      box-sizing: border-box;
      font-size: 14px;
      @media (min-width: 1000px) {
        font-size: 15px;
      }
      @media (min-width: 1000px) {
        font-size: 16px;
      }
      @media (min-width: 1400px) {
        font-size: 18px;
      }
      @media (min-width: 1600px) {
        font-size: 19px;
      }
      @media (min-width: 2000px) {
        font-size: 20px;
      }
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }

  

  body.fontLoaded {
    font-family: ${secondary};
  }

  body {
    padding: 0;
    margin: 0;
    line-height: 1.62;
    background-color: #fff;
    // color : #fff;
    color: ${theme.general.color};
  }
  a {
    text-decoration: none;
    color : #fff;
    // color: {theme.general.linkColor};
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
  }
 a, h2,  button, p , span , h1, h2,  h3, li, div{
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    outline: none;
  }

  ul{
    list-style: none;
  }

  /* HELPER CLASSES */
  .hidden {
    visibility: hidden;
  }
  .padding-normal {
    @media screen and (max-width: 800px) {
    }
  }

  .product-wrapper {
    margin: 0 0.5rem;
  }


  
// Mobile Only Puneet
  .italics_m {
    font-weight: 300;
    font-style: italic;
    width:254px;
    text-align:center!important;
    margin:15px auto;
    font-size:16px;
    line-height: 28px;
  }
  .crest-heading_m{ padding:0px; margin:0px; font-size:16px; line-height:70px;}



  #app {
    min-height: 100%;
    min-width: 100%;
    // overflow-x: hidden;
  }

  /* h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: 1px;
  } */

  strong {
    color: #fff;
  }

  .tiny.description {
    font-size: 0.8em;
  }

  .noScroll {
    overflow: hidden;
  }
  .pushable::after {
    content: " ";
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0,0,0,0);
    z-index: 10;
    transition: background-color 0.6s ease-in-out;
  }
  .noScroll {
    .pushable::after {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.6);
    }
  }
  .headroom {
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .headroom--unfixed {
    position: relative;
    transform: translateY(0);
  }
  .headroom--scrolled {
    transition: transform 200ms ease-in-out;
  }
  .headroom--unpinned {
    position: fixed;
    transform: translateY(-100%);
  }
  .headroom--pinned {
    position: fixed;
    transform: translateY(0%);
  }
  .SVGInline-abs {
    position: absolute;
  }
  .PaginatorButton {
    z-index: 5
  }
  .menu-main {
    .ItalicText {
      margin-bottom: 24px;

      &:hover {
        color: ${bsLight}!important;
      }
    }
  }
  .footer-col {
    margin-bottom: 20px !important;
  }
  .bez {
    transform-origin: top right;
    ${'' /* transition: transform 0.4s cubic-bezier(0.84, -0.01, 0.48, 0.995); */}
    transition: transform 0.82s cubic-bezier(0.01, 0.6, 0.58, 0.9);
  }

  .bez-fast {
    transform-origin: top right;
    ${'' /* transition: transform 0.4s cubic-bezier(0.84, -0.01, 0.48, 0.995); */}
    transition: transform 0.6s cubic-bezier(0.01, 0.6, 0.58, 1);
  }
  .animate-appear {
    opacity: 0;
    transform: translate(0, 50px);
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.1s;

    &.is-visible {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  .pseudohack {
    &::before {
      display: table;
      content: ' ';
    }
    &::after {
      display: table;
      content: ' ';
      clear: both;
    }
  }

  .wipe {
    &.rel {
      position: relative;
    }
    padding: 1rem .5rem;


    &.is-visible {
      &::before {
      -webkit-transform: scale(0, 1);
          -ms-transform: scale(0, 1);
              transform: scale(0, 1);
      }
    }

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      content: "";
      width: 100%;
      height: 100%;
      z-index: 4;
      background: #ffffff;
      -webkit-transition: -webkit-transform 0.9s cubic-bezier(0.84, -0.01, 0.48, 0.995);
      transition: -webkit-transform 0.9s cubic-bezier(0.84, -0.01, 0.48, 0.995);
      transition: transform 0.9s cubic-bezier(0.84, -0.01, 0.48, 0.995);
      transition: transform 0.9s cubic-bezier(0.84, -0.01, 0.48, 0.995), -webkit-transform 0.9s cubic-bezier(0.84, -0.01, 0.48, 0.995);
      transform-origin: top right;
      -webkit-transform: scale(1, 1);
      -ms-transform: scale(1, 1);
      transform: scale(1, 1);
      transition-delay: 0.2s;
    }

    &.dark {
      &::before {
        background: ${bsDark};
      }
    }

    &.light {
      &::before {
        background: ${bsLight};
      }
    }

    &.down {
      &::before {
        transform-origin: bottom center;
      }

      &.is-visible {
        &::before {
          transform: scale(1, 0);
        }
      }
    }

    &.move {
      & > div,
      & > img {
        -webkit-transition: -webkit-transform 0.9s 0.1s cubic-bezier(0.84, -0.01, 0.48, 0.995);
        transition: -webkit-transform 0.9s 0.1s cubic-bezier(0.84, -0.01, 0.48, 0.995);
        transition: transform 0.9s 0.1s cubic-bezier(0.84, -0.01, 0.48, 0.995);
        transition: transform 0.9s 0.1s cubic-bezier(0.84, -0.01, 0.48, 0.995), -webkit-transform 0.9s 0.1s cubic-bezier(0.84, -0.01, 0.48, 0.995);
        -webkit-transform: translate(-80px, 0);
            -ms-transform: translate(-80px, 0);
                transform: translate(-80px, 0);
        transition-delay: 0.1s;
      }

      &::before {
        & > div,
        & > img {
          -webkit-transform: translate(0px, 0);
              -ms-transform: translate(0px, 0);
                  transform: translate(0px, 0);
        }
      }
    }
  }

  .uibtn {
    .SVGInline.cart-add {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);

      .cart-add-svg {
        height: 1rem;

        path {
          fill: ${bsDark};
        }
      }
    }

    &:hover {
      path {
        fill: #fff!important;
      }
    }
  }

  .hamburger {
    &-svg {
      max-width: 40px;
    }
  }

  .accordion {
    h3 {
      color: ${bsDark};
    }

    &__title {
      &::after {
        width: 60%;
        content: '';
        bottom: 0;
        position: absolute;
        height: 2px;
        background-color: ${bsLight};
        transition: width 0.28s cubic-bezier(0.01, 0.6, 0.58, 0.9);
      }
      &:hover {
        &::after {
          width: 90%;
        }
      }
    }
  }

  .lightbox-ico {
    svg {
      width: 54px;
      height: auto;
    }
  }

  .bleed {
    overflow: visible !important;
  }

   @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
   }

   .animated {
     -webkit-animation-duration: 1.2s;
     animation-duration: 1.2s;
     -webkit-animation-fill-mode: both;
     animation-fill-mode: both;
     animation-iteration-count: infinite;
  }

 .pulse {
    -webkit-animation-name: pulse;
    animation-name: pulse;
 }

 .checkout-limit {
   @media screen and (min-width: 768px) {
     max-width: 380px;
   }
 }

 .ui.secondary.pointing.menu {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    
}

.ui.segment {
    position: relative;
    background: #141617;
    margin: 2px 0;
    padding: 2px 4px;
    border-radius: 0;
    border: none;
}

a {
  &:hover {
    color: #fff;
  }
}
`;
