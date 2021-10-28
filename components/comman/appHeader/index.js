import React from "react";
import { connect } from "react-redux";
import { compose } from "redux"; 
import Link from "next/link";
import Head from 'next/head';
import { withRouter } from "next/router";
import styled from "styled-components";
import Wrapper from "../../shared/Wrapper"; 
import MenuList from './MenuList'
import window from 'global/window'
import { disableAnalyticTracking, openAuthWindow ,changeWidth} from '../../../actions/comman/window.actions';
 
const Image = '../../static/images/icon/'
//import style from '../../static/scss/main.scss';
function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}
const style = lazyWithPreload(() => import("../../../static/scss/main.scss"));



const MainDiv = styled.div`
width:100%;
padding:0px 60px 0px 60px;
z-index:150;
@media (max-width:1000px)
{
    padding:0px 30px 0px 30px;
}
@media (max-width:768px)
{
    padding:${props => props.padding ? props.padding : "0px 30px 0px 54px"} ;
}

`;

const MobileWrap = styled.div` 
  left: ${props => props.visible ? '0%' : '-100%'};
  position:fixed;
  top:0;
  transition: all .2s linear;
  background-image: linear-gradient(to right, rgb(0,0,0) 70% , rgb(0, 0, 0,0.45) 30%);
`;

const MenuHolder = styled.div`
  background-color: ${({ theme }) => theme.general.darkBg};
  /* // padding: 60px 40px; */
  width: 70vw;
  height: 100vh;
  padding-top: 70px;
`;

const DivWrapper = styled.div`
    position: fixed;
    top: ${props => props.offerPopup ? "70px" : "0px"};
    left: 0;
    width: 100%;
    align-items: center;
    color: white;
    padding: 0px 0px;
    box-sizing: border-box;
    z-index: 10;
    height: 70px;
    box-sizing: border-box;
    box-shadow: ${props => props.atHome && props.scrolledCompleteVideo ? undefined : '0 0px 20px 0 rgba(0, 0, 0, 0.50)'};
    background-color: #ffffff;
    /* background-color: ${props => { return props.atHome && props.scrolledCompleteVideo ? 'transparent' : '#1a1a1a' }}; */
`;

 
const LinkDiv = styled.div`
 display:flex;
`;

 
const LogoWrapper = styled.div`
width: 164px;
position: relative;
background-color: ${props => props.atHome && props.scrolledCompleteVideo ? 'transparent' : '#ffffff'};
height: 70px;

box-sizing: border-box;
 .logo_div{
   display: flex;
   height: 100%;
   width: 100%;
   flex-direction: row;
   background:#ffffff;
   align-items: center;
   justify-content: flex-start;
   padding: 0px 12px 0px 0px;
   @media screen and (max-width: 767px){
     padding: 0px;
   }
   box-sizing: border-box;
   cursor: pointer;
   .logo{
    height: 48px;
     max-width: 250px;
     margin-right: 10px;
   }
 }

 &:hover {
  background-color: #1a1a1a;
}

 &:hover .hover_list {
  top: 100%;
 }
 &:hover .chevron{
       transform: rotate(180deg);
 }


.chevron{
transition: all 0.1s ;
}

.hover_list{
  transition: all 0.1s ;
  position: absolute;
  top: -200px;
  left: 0px;
  width: 230px;
  height: 130px;
  background-color: #1a1a1a;
  padding: 5px 21px;
  border-bottom-right-radius: 22px;
  border-bottom-left-radius: 22px;
  .poker{
    display: inline-block;
    width: 30px;
    margin-right: 9px;
    img{
      max-width: 30px;
      vertical-align: middle;
    }
  }
  .shop{
    display: inline-block;
    width: 30px;
    text-align: center;
    margin-right: 9px;
    
    img{
      max-width: 15px;
       vertical-align: middle;
    }
  }
  ul{
    margin: 0px;
    padding: 0px;
    padding-top: 10px;
    li{
      display: block;
      line-height: 45px;
        a{
        display: block;
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        /* line-height: 1.67; */
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
        
        }
    }
  }
}

// :after {
//   content: " ";
//   position: absolute;
//   border-left: 1px #6c757d solid;
//   top: 35%;
//   right: 0;
//   height: 30%;
//   margin-top: auto;
//   margin-bottom: auto;
// }
@media (max-width:1000px)
{
   width:153px;
}
@media (max-width:768px)
{
  width:180px;
    :after{
    
      border-left: unset; 
    }
}
`;
 
let scrollTop = '';
export const Overlay = styled.div`
 position: fixed;
 z-index:112;
 top: 0;
 right: 0;
 width: 30%;
 height: 100%;
 background: rgba(0, 0, 0, 0.1);
 `;
 
 const CallusDiv = styled.div` 
  position : fixed;
  right:82px;
  top:20px;
  width: 357px;
  z-index:0;
  height: 27px;
  font-family: SuisseIntl;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.25;
  letter-spacing: normal;
  text-align: right;
  color: #ffffff; 
`;

export class AppHeader extends Wrapper {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      removeIcon: false,
      scrolling: 0,
      windowInnerHeight: window.innerHeight,
      onHoverActive: false,
      isPokerreoureceActive: false,
      IsSelectedPokerGlossaryActive: false
    }
  }

  handleClickOutside() {
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false });
    }
  }

  togglemenuOpen() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  _linkClicked = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  
  componentDidMount() {
    this.setState({
      ...this.state,
      windowInnerHeight: window.innerHeight
    })

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('screen', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('screen', this.handleScroll);
  }

  LoginbuttonClick = (e) => {
    this.props.toggleAuth();

  }
 
  handleScroll = (event) => {
    this.scrollTop = window.scrollY > 50

    this.setState({
      removeIcon: false,
      scrolling: window.scrollY
    });
  }
 

  render() {

    const { data, router, courseData } = this.props;
    
    const small = this.props.width < 768;
    const smallTab = this.props.width < 1000 && this.props.width > 768;
    const windowInnerHeight = this.state.windowInnerHeight
    let profilePic = '';
 
    return (
      <div>
        <Head>
          <link rel="icon" href='favico.png'/>
 
        </Head>
        
          <DivWrapper>
            <MainDiv
            padding="0px 20px"
            >
              <LinkDiv>
                <LogoWrapper atHome={router && router.pathname === '/' ? true : false} scrolledCompleteVideo={this.state.scrolling < 20 ? true : false}>
                  <div className="logo_div">
                    <img className="logo" src="../../static/application_logo.png" title="Nokia" alt="logo" />
                  </div>
                </LogoWrapper>
              </LinkDiv>

            </MainDiv>
            {!small &&
            <CallusDiv>
             Have a query? Call us @ <a href="tel: +91-9876198761 " >+91-9876198761</a>
            </CallusDiv>

            }
          </DivWrapper> 
      </div>
    );
  }
}

const mapStateToProps = state => {

  const width = state.windowReducer.width;


  return { width };
};



export default withRouter(connect(mapStateToProps, { openAuthWindow,changeWidth, disableAnalyticTracking })(AppHeader));
